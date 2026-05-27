// BookingModal.jsx - Komplett neues Terminanfrage-Popup
// Radikal vereinfacht: Kein Scrollen, dead-simple Flow

const { useState: useS, useEffect: useE } = React;

// ========== CUSTOM HOOK: Booking Flow State Management ==========
const useBookingFlow = () => {
  const [currentStep, setCurrentStep] = useS(1); // 1-4
  const [doctor, setDoctor] = useS(null); // "jahn" | "hancock"
  const [wishSlots, setWishSlots] = useS([null, null, null]); // max 3 slots
  const [contactData, setContactData] = useS({
    name: "",
    phone: "",
    email: "",
    consent: false,
    honeypot: ""
  });
  const [loading, setLoading] = useS(false);
  const [error, setError] = useS("");

  // Slot structure: { date: "2026-05-28", dayTime: "morning" | "noon" | "afternoon" }

  const selectDoctor = (doctorId) => {
    setDoctor(doctorId);
    // Auto-advance after 400ms (Häkchen-Animation Zeit)
    setTimeout(() => setCurrentStep(2), 400);
  };

  const updateSlot = (index, slotData) => {
    const newSlots = [...wishSlots];
    newSlots[index] = slotData;
    setWishSlots(newSlots);
  };

  const removeSlot = (index) => {
    const newSlots = [...wishSlots];
    newSlots[index] = null;
    setWishSlots(newSlots);
  };

  const updateContact = (field, value) => {
    setContactData({ ...contactData, [field]: value });
  };

  const canProceed = (step) => {
    switch (step) {
      case 1: return !!doctor;
      case 2: return wishSlots[0] !== null; // mindestens Slot 1 gefüllt
      case 3:
        return contactData.name.trim() &&
               contactData.phone.trim() &&
               contactData.consent;
      default: return false;
    }
  };

  const goNext = () => {
    if (currentStep < 4 && canProceed(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submit = async () => {
    setError("");
    setLoading(true);

    // Validation
    if (!contactData.name.trim()) {
      setError("Bitte geben Sie Ihren Namen ein.");
      setLoading(false);
      return;
    }
    if (!contactData.phone.trim()) {
      setError("Bitte geben Sie Ihre Telefonnummer ein.");
      setLoading(false);
      return;
    }
    if (!contactData.consent) {
      setError("Bitte stimmen Sie der Datenschutzerklärung zu.");
      setLoading(false);
      return;
    }

    // Email optional validation
    if (contactData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactData.email.trim())) {
        setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        setLoading(false);
        return;
      }
    }

    // Prepare data for backend
    const filledSlots = wishSlots.filter(slot => slot !== null);
    const termine = filledSlots.map(slot => ({
      date: slot.date,
      time: slot.dayTime // Backend bekommt dayTime statt exakter Uhrzeit
    }));

    try {
      const response = await fetch('/api/termin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactData.name.trim(),
          telefon: contactData.phone.trim(),
          email: contactData.email.trim() || undefined,
          arzt: doctor,
          termine: termine,
          consent: contactData.consent,
          honeypot: contactData.honeypot
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Momentan hohe Auslastung. Bitte in wenigen Minuten erneut versuchen oder direkt anrufen: 089 38 80 86 87');
        }
        throw new Error(data.error || 'Beim Versenden ist ein Fehler aufgetreten.');
      }

      setCurrentStep(4); // Success screen
    } catch (err) {
      setError(err.message || 'Beim Versenden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCurrentStep(1);
    setDoctor(null);
    setWishSlots([null, null, null]);
    setContactData({
      name: "",
      phone: "",
      email: "",
      consent: false,
      honeypot: ""
    });
    setError("");
    setLoading(false);
  };

  return {
    currentStep,
    doctor,
    wishSlots,
    contactData,
    loading,
    error,
    selectDoctor,
    updateSlot,
    removeSlot,
    updateContact,
    canProceed,
    goNext,
    goBack,
    submit,
    reset
  };
};

// ========== PROGRESS BAR ==========
const ProgressBar = ({ currentStep }) => {
  const totalSteps = 3; // 1=Doctor, 2=Slots, 3=Contact (Success hat keine Progress)
  if (currentStep === 4) return null;

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="booking-progress">
      <div className="booking-progress-text">Schritt {currentStep} von {totalSteps}</div>
      <div className="booking-progress-track">
        <div className="booking-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

// ========== MODAL HEADER ==========
const BookingHeader = ({ onClose }) => (
  <div className="booking-header">
    <div className="booking-logo">
      <div className="logo-mark" style={{ width: '48px', height: '48px' }} aria-hidden="true"></div>
    </div>
    <button className="booking-close" onClick={onClose} aria-label="Schließen">
      <Icon name="x" size={20} />
    </button>
  </div>
);

// ========== MODAL FOOTER ==========
const BookingFooter = ({ currentStep, canProceed, onBack, onNext, onSubmit, loading }) => {
  const showBack = currentStep > 1 && currentStep < 4;
  const showNext = currentStep === 2;
  const showSubmit = currentStep === 3;

  return (
    <div className="booking-footer">
      {showBack && (
        <button className="btn btn-secondary booking-btn-back" onClick={onBack}>
          <Icon name="arrow-left" size={16} /> Zurück
        </button>
      )}
      <div style={{ flex: 1 }}></div>
      {showNext && (
        <button
          className="btn btn-primary booking-btn-next"
          onClick={onNext}
          disabled={!canProceed}
        >
          Weiter <Icon name="arrow-right" size={16} />
        </button>
      )}
      {showSubmit && (
        <button
          className="btn btn-primary booking-btn-submit"
          onClick={onSubmit}
          disabled={!canProceed || loading}
        >
          {loading ? "Wird gesendet..." : "Anfrage senden"}
        </button>
      )}
    </div>
  );
};

// ========== STEP 1: DOCTOR SELECT ==========
const Step1DoctorSelect = ({ doctor, onSelect }) => {
  const [showCheckmark, setShowCheckmark] = React.useState(null);

  const handleSelect = (doctorId) => {
    setShowCheckmark(doctorId);
    setTimeout(() => {
      onSelect(doctorId);
    }, 400);
  };

  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Bei wem möchten Sie einen Termin?</h2>
      <p className="booking-step-subtitle">Wählen Sie Ihre bevorzugte Ärztin aus</p>

      <div className="doctor-cards">
        <button
          className={`doctor-card ${doctor === "jahn" || showCheckmark === "jahn" ? "selected" : ""}`}
          onClick={() => handleSelect("jahn")}
          disabled={showCheckmark !== null}
        >
          <div className="doctor-avatar">
            <img src="assets/dr-jahn.jpg" alt="Dr. Irene Jahn" loading="lazy" />
          </div>
          <div className="doctor-name">Dr. Irene Jahn</div>
          {showCheckmark === "jahn" && (
            <div className="doctor-checkmark">
              <Icon name="check" size={24} />
            </div>
          )}
        </button>

        <button
          className={`doctor-card ${doctor === "hancock" || showCheckmark === "hancock" ? "selected" : ""}`}
          onClick={() => handleSelect("hancock")}
          disabled={showCheckmark !== null}
        >
          <div className="doctor-avatar">
            <img src="assets/dr-hancock-diener.jpg" alt="Dr. Hancock-Diener" loading="lazy" />
          </div>
          <div className="doctor-name">Dr. Hancock-Diener</div>
          {showCheckmark === "hancock" && (
            <div className="doctor-checkmark">
              <Icon name="check" size={24} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

// ========== STEP 2: WISH SLOTS + SUB-PICKER ==========

// Helper: Format date to German display
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const WDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  return `${WDAYS[date.getDay()]}, ${day}. ${MONTHS[date.getMonth()]}`;
};

// Helper: Format dayTime to German
const formatDayTime = (dayTime) => {
  const map = {
    morning: "Vormittag",
    noon: "Mittag",
    afternoon: "Nachmittag"
  };
  return map[dayTime] || dayTime;
};

// Sub-Component: Wish Slot Card
const WishSlotCard = ({ index, slot, onClick, onRemove, isFirst }) => {
  const isEmpty = !slot;
  const isOptional = index > 0;

  if (isEmpty) {
    return (
      <button
        className={`wish-slot-card empty ${isOptional ? "optional" : "required"}`}
        onClick={onClick}
      >
        <Icon name="plus" size={20} />
        <span className="wish-slot-text">
          {isFirst ? "+ Wunschtermin wählen" : "+ Weiteren Termin hinzufügen (optional)"}
        </span>
      </button>
    );
  }

  return (
    <div className="wish-slot-card filled">
      <button className="wish-slot-main" onClick={onClick}>
        <div className="wish-slot-info">
          <div className="wish-slot-date">{formatDate(slot.date)}</div>
          <div className="wish-slot-badge">{formatDayTime(slot.dayTime)}</div>
        </div>
      </button>
      <button
        className="wish-slot-remove"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label="Entfernen"
      >
        <Icon name="x" size={16} />
      </button>
    </div>
  );
};

// Sub-Component: Mini Calendar
const MiniCalendar = ({ selectedDate, onSelectDate }) => {
  const now = new Date();
  const [viewMonth, setViewMonth] = React.useState(now.getMonth());
  const [viewYear, setViewYear] = React.useState(now.getFullYear());

  const MONTHS_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const WDAYS_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday = 0

  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const isWeekend = (y, m, d) => {
    const dow = new Date(y, m, d).getDay();
    return dow === 0 || dow === 6;
  };

  const isPast = (y, m, d) => {
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return dateStr < todayStr;
  };

  const canPrev = viewYear > now.getFullYear() || (viewYear === now.getFullYear() && viewMonth > now.getMonth());
  const maxFuture = new Date(now.getFullYear() + 1, now.getMonth(), 1);
  const canNext = new Date(viewYear, viewMonth + 1, 1) < maxFuture;

  const goPrev = () => {
    if (!canPrev) return;
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goNext = () => {
    if (!canNext) return;
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSelectDate(dateStr);
  };

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-nav">
        <button
          className="mini-calendar-nav-btn"
          onClick={goPrev}
          disabled={!canPrev}
          aria-label="Vorheriger Monat"
        >
          <Icon name="arrow-left" size={14} />
        </button>
        <div className="mini-calendar-month">
          {MONTHS_DE[viewMonth]} {viewYear}
        </div>
        <button
          className="mini-calendar-nav-btn"
          onClick={goNext}
          disabled={!canNext}
          aria-label="Nächster Monat"
        >
          <Icon name="arrow-right" size={14} />
        </button>
      </div>

      <div className="mini-calendar-grid">
        {WDAYS_SHORT.map(wd => (
          <div key={wd} className="mini-calendar-day header">{wd}</div>
        ))}
        {Array.from({ length: firstDow }, (_, i) => (
          <div key={`empty-${i}`} className="mini-calendar-day"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isDisabled = isWeekend(viewYear, viewMonth, day) || isPast(viewYear, viewMonth, day);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;

          return (
            <button
              key={day}
              className={`mini-calendar-day ${isDisabled ? 'disabled' : 'available'} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
              disabled={isDisabled}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Sub-Component: DayTime Pills
const DayTimePills = ({ selectedDayTime, onSelect }) => {
  const dayTimes = [
    { id: "morning", label: "🌅 Vormittag", subLabel: "8–12 Uhr" },
    { id: "noon", label: "☀️ Mittag", subLabel: "12–14 Uhr" },
    { id: "afternoon", label: "🌇 Nachmittag", subLabel: "14–18 Uhr" }
  ];

  return (
    <div className="daytime-pills">
      {dayTimes.map(dt => (
        <button
          key={dt.id}
          className={`daytime-pill ${selectedDayTime === dt.id ? 'selected' : ''}`}
          onClick={() => onSelect(dt.id)}
        >
          <div className="daytime-pill-label">{dt.label}</div>
          <div className="daytime-pill-sublabel">{dt.subLabel}</div>
        </button>
      ))}
    </div>
  );
};

// Sub-Component: Slot Picker (Sub-Picker Overlay)
const SlotPicker = ({ onSubmit, onCancel }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedDayTime, setSelectedDayTime] = React.useState(null);

  const canSubmit = selectedDate && selectedDayTime;

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit({ date: selectedDate, dayTime: selectedDayTime });
    }
  };

  return (
    <div className="slot-picker">
      <div className="slot-picker-header">
        <h3 className="slot-picker-title">Termin wählen</h3>
      </div>

      <div className="slot-picker-body">
        <MiniCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <DayTimePills selectedDayTime={selectedDayTime} onSelect={setSelectedDayTime} />
      </div>

      <div className="slot-picker-footer">
        <button className="btn-text" onClick={onCancel}>
          Abbrechen
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          Übernehmen
        </button>
      </div>
    </div>
  );
};

// Main Step 2 Component
const Step2WishSlots = ({ wishSlots, onUpdate, onRemove }) => {
  const [pickerOpen, setPickerOpen] = React.useState(null); // null | 0 | 1 | 2 (slot index)

  const handleSlotClick = (index) => {
    setPickerOpen(index);
  };

  const handlePickerSubmit = (slotData) => {
    if (pickerOpen !== null) {
      onUpdate(pickerOpen, slotData);
      setPickerOpen(null);
    }
  };

  const handlePickerCancel = () => {
    setPickerOpen(null);
  };

  const handleRemove = (index) => {
    onRemove(index);
  };

  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Ihre Wunschtermine</h2>
      <p className="booking-step-subtitle">Wählen Sie 1 bis 3 Termine, an denen Sie Zeit hätten</p>

      <div className="wish-slots">
        {wishSlots.map((slot, index) => (
          <WishSlotCard
            key={index}
            index={index}
            slot={slot}
            onClick={() => handleSlotClick(index)}
            onRemove={() => handleRemove(index)}
            isFirst={index === 0}
          />
        ))}
      </div>

      {pickerOpen !== null && (
        <>
          <div className="slot-picker-backdrop" onClick={handlePickerCancel}></div>
          <SlotPicker
            onSubmit={handlePickerSubmit}
            onCancel={handlePickerCancel}
          />
        </>
      )}
    </div>
  );
};

const Step3ContactForm = ({ contactData, onUpdate, error }) => (
  <div className="booking-step">
    <h2 className="booking-step-title">Ihre Kontaktdaten</h2>
    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
      Step 3 - Contact Form (wird in Phase 4 implementiert)
    </div>
  </div>
);

const Step4Success = ({ onClose, onNew }) => (
  <div className="booking-step booking-success">
    <div className="booking-success-icon">
      <Icon name="check" size={48} />
    </div>
    <h2 className="booking-success-title">Anfrage erfolgreich gesendet!</h2>
    <p className="booking-success-text">
      Wir melden uns innerhalb eines Werktags telefonisch bei Ihnen, um Ihren Termin zu bestätigen.
    </p>
    <button className="btn btn-primary" onClick={onClose}>
      Schließen
    </button>
  </div>
);

// ========== MAIN BOOKING MODAL ==========
const BookingModal = ({ open, onClose }) => {
  const flow = useBookingFlow();

  // Escape-Key & Body Overflow
  useE(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleClose = () => {
    if (flow.currentStep > 1 && flow.currentStep < 4) {
      const confirmed = window.confirm(
        'Möchten Sie die Terminanfrage wirklich abbrechen? Ihre Eingaben gehen verloren.'
      );
      if (confirmed) {
        flow.reset();
        onClose();
      }
    } else {
      flow.reset();
      onClose();
    }
  };

  const handleNewRequest = () => {
    flow.reset();
  };

  const renderStep = () => {
    switch (flow.currentStep) {
      case 1:
        return <Step1DoctorSelect doctor={flow.doctor} onSelect={flow.selectDoctor} />;
      case 2:
        return (
          <Step2WishSlots
            wishSlots={flow.wishSlots}
            onUpdate={flow.updateSlot}
            onRemove={flow.removeSlot}
          />
        );
      case 3:
        return (
          <Step3ContactForm
            contactData={flow.contactData}
            onUpdate={flow.updateContact}
            error={flow.error}
          />
        );
      case 4:
        return <Step4Success onClose={handleClose} onNew={handleNewRequest} />;
      default:
        return null;
    }
  };

  if (!open) return null;

  return (
    <div className={`booking-backdrop ${open ? "open" : ""}`} onClick={handleClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <BookingHeader onClose={handleClose} />
        <ProgressBar currentStep={flow.currentStep} />
        <div className="booking-content">
          {renderStep()}
        </div>
        {flow.currentStep < 4 && (
          <BookingFooter
            currentStep={flow.currentStep}
            canProceed={flow.canProceed(flow.currentStep)}
            onBack={flow.goBack}
            onNext={flow.goNext}
            onSubmit={flow.submit}
            loading={flow.loading}
          />
        )}
      </div>
    </div>
  );
};

// Export für globalen Zugriff
window.BookingModal = BookingModal;
