// BookingModal.jsx - Komplett neues Terminanfrage-Popup
// Radikal vereinfacht: Kein Scrollen, dead-simple Flow

const { useState: useS, useEffect: useE } = React;

// ========== DOCTOR HOURS CONFIG ==========
const DOCTOR_HOURS = {
  jahn: {
    1: { start: "9:00", end: "13:00" },   // Mo
    2: { start: "8:00", end: "17:30" },    // Di
    3: { start: "8:00", end: "17:30" },    // Mi
    // Do: kein Eintrag = nicht verfügbar
    5: { start: "8:00", end: "15:30" },    // Fr
  },
  hancock: {
    1: { start: "8:30", end: "18:00" },    // Mo
    2: { start: "8:30", end: "18:00" },    // Di
    3: { start: "8:30", end: "18:00" },    // Mi
    4: { start: "8:30", end: "18:00" },    // Do
    5: { start: "8:30", end: "15:00" },    // Fr
  }
};

// ========== REASON OPTIONS ==========
const REASON_OPTIONS = [
  { id: "schmerzen", label: "Schmerzen", subLabel: "akut" },
  { id: "kontrolle", label: "Kontrolle", subLabel: "Routine" },
  { id: "kontrolle_pzr", label: "Kontrolle + PZR", subLabel: "mit Zahnreinigung" },
  { id: "anderer_grund", label: "Anderer Grund", subLabel: "bitte beschreiben" }
];

const REASON_LABELS = {
  schmerzen: "Schmerzen (akut)",
  kontrolle: "Kontrolle (Routine)",
  kontrolle_pzr: "Kontrolle + PZR",
  anderer_grund: "Anderer Grund"
};

// ========== HELPER: Dynamic Time Pills ==========
function formatTimeRange(startMin, endMin) {
  const fmtTime = (m) => {
    const h = Math.floor(m / 60);
    const min = m % 60;
    return min === 0 ? `${h}` : `${h}:${String(min).padStart(2, '0')}`;
  };
  return `${fmtTime(startMin)}–${fmtTime(endMin)} Uhr`;
}

function getDayTimePills(doctor, dateStr) {
  const dow = new Date(dateStr).getDay(); // 0=So..6=Sa
  const hours = DOCTOR_HOURS[doctor]?.[dow];
  if (!hours) return [];

  const pills = [];
  const [startH, startM] = hours.start.split(':').map(Number);
  const [endH, endM] = hours.end.split(':').map(Number);
  const startMin = startH * 60 + (startM || 0);
  const endMin = endH * 60 + (endM || 0);

  // Vormittag: start bis min(12:00, end)
  if (startMin < 720) {
    const vmEnd = Math.min(endMin, 720);
    pills.push({ id: "morning", label: "Vormittag", subLabel: formatTimeRange(startMin, vmEnd) });
  }

  // Mittag: max(12:00, start) bis min(14:00, end)
  if (startMin < 840 && endMin > 720) {
    const mtStart = Math.max(startMin, 720);
    const mtEnd = Math.min(endMin, 840);
    if (mtEnd > mtStart) {
      pills.push({ id: "noon", label: "Mittag", subLabel: formatTimeRange(mtStart, mtEnd) });
    }
  }

  // Nachmittag: max(14:00, start) bis end (wenn > 14:00)
  if (endMin > 840) {
    const nmStart = Math.max(startMin, 840);
    pills.push({ id: "afternoon", label: "Nachmittag", subLabel: formatTimeRange(nmStart, endMin) });
  }

  return pills;
}

// ========== CUSTOM HOOK: Booking Flow State Management ==========
const useBookingFlow = () => {
  const [currentStep, setCurrentStep] = useS(0); // 0=Methode, 1=Arzt, 2=Grund, 3=Slots, 4=Kontakt, 5=Success, 6=Call
  const [bookingMethod, setBookingMethod] = useS(null); // "online" | "call"
  const [doctor, setDoctor] = useS(null); // "jahn" | "hancock"
  const [reason, setReason] = useS(null); // "schmerzen" | "kontrolle" | "kontrolle_pzr" | "anderer_grund"
  const [reasonText, setReasonText] = useS(""); // Freitext bei "anderer_grund"
  const [wishSlots, setWishSlots] = useS([null, null, null]); // max 3 slots
  const [contactData, setContactData] = useS({
    name: "",
    phone: "",
    email: "",
    notes: "",
    consent: false,
    honeypot: ""
  });
  const [loading, setLoading] = useS(false);
  const [error, setError] = useS("");

  // Slot structure: { date: "2026-05-28", dayTime: "morning" | "noon" | "afternoon" }

  const selectMethod = (method) => {
    setBookingMethod(method);
    if (method === "call") {
      setCurrentStep(6); // Call-Screen
    } else {
      setCurrentStep(1); // Arzt auswählen
    }
  };

  const selectDoctor = (doctorId) => {
    setDoctor(doctorId);
    // Auto-advance after 400ms (Häkchen-Animation Zeit)
    setTimeout(() => setCurrentStep(2), 400);
  };

  const selectReason = (reasonId) => {
    setReason(reasonId);
    setReasonText(""); // Reset Freitext bei Wechsel
    if (reasonId !== "anderer_grund") {
      // Auto-advance after 400ms
      setTimeout(() => setCurrentStep(3), 400);
    }
    // Bei "anderer_grund": kein auto-advance, Textfeld wird angezeigt
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
      case 0: return !!bookingMethod;
      case 1: return !!doctor;
      case 2: return reason !== null && (reason !== 'anderer_grund' || reasonText.trim().length >= 3);
      case 3: return wishSlots[0] !== null; // mindestens Slot 1 gefüllt
      case 4:
        return contactData.name.trim() &&
               contactData.phone.trim() &&
               contactData.consent;
      default: return false;
    }
  };

  const goNext = () => {
    if (currentStep < 5 && canProceed(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep === 6) {
      // Von Call-Screen zurück zu Step 0
      setCurrentStep(0);
      setBookingMethod(null);
    } else if (currentStep === 1) {
      // Von Arzt-Auswahl zurück zu Step 0
      setCurrentStep(0);
      setBookingMethod(null);
      setDoctor(null);
    } else if (currentStep === 2) {
      // Von Grund zurück zu Arzt
      setCurrentStep(1);
      setReason(null);
      setReasonText("");
    } else if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submit = async () => {
    console.log('[BookingModal] Submit started');
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

    const payload = {
      name: contactData.name.trim(),
      telefon: contactData.phone.trim(),
      email: contactData.email.trim() || undefined,
      nachricht: contactData.notes.trim() || undefined,
      arzt: doctor,
      grund: reason,
      ...(reason === 'anderer_grund' ? { grundText: reasonText.trim() } : {}),
      termine: termine,
      consent: contactData.consent,
      honeypot: contactData.honeypot
    };

    console.log('[BookingModal] Sending payload:', payload);

    const FALLBACK_ERROR = 'Beim Versenden ist leider ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: 089 38 80 86 87';

    try {
      const response = await fetch('/api/termin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('[BookingModal] Response status:', response.status);

      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        // Server hat kein JSON zurückgegeben (z.B. HTML-Fehlerseite)
        console.error('[BookingModal] JSON parse error:', parseErr);
        throw new Error(FALLBACK_ERROR);
      }
      console.log('[BookingModal] Response data:', data);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Momentan hohe Auslastung. Bitte in wenigen Minuten erneut versuchen oder direkt anrufen: 089 38 80 86 87');
        }
        throw new Error(data.error || FALLBACK_ERROR);
      }

      console.log('[BookingModal] Success! Going to step 5');
      setCurrentStep(5); // Success screen
    } catch (err) {
      console.error('[BookingModal] Error:', err);
      setError(err.message || FALLBACK_ERROR);
    } finally {
      setLoading(false);
      console.log('[BookingModal] Submit finished');
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setBookingMethod(null);
    setDoctor(null);
    setReason(null);
    setReasonText("");
    setWishSlots([null, null, null]);
    setContactData({
      name: "",
      phone: "",
      email: "",
      notes: "",
      consent: false,
      honeypot: ""
    });
    setError("");
    setLoading(false);
  };

  return {
    currentStep,
    bookingMethod,
    doctor,
    reason,
    reasonText,
    wishSlots,
    contactData,
    loading,
    error,
    selectMethod,
    selectDoctor,
    selectReason,
    setReasonText,
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
  // Keine Progress für Step 0 (Methode wählen), Step 5 (Success), Step 6 (Call)
  if (currentStep === 0 || currentStep === 5 || currentStep === 6) return null;

  const totalSteps = 4; // 1=Doctor, 2=Reason, 3=Slots, 4=Contact
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

// ========== STEP 0: METHOD SELECTION ==========
const Step0MethodSelect = ({ onSelectMethod }) => {
  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Wie möchten Sie einen Termin vereinbaren?</h2>
      <p className="booking-step-subtitle">Wählen Sie Ihre bevorzugte Kontaktmethode</p>

      <div className="method-cards">
        <button className="method-card" onClick={() => onSelectMethod('online')}>
          <div className="method-card-icon">
            <Icon name="calendar" size={32} />
          </div>
          <div className="method-card-title">Online anfragen</div>
          <div className="method-card-subtitle">Wunschtermine auswählen</div>
        </button>

        <button className="method-card" onClick={() => onSelectMethod('call')}>
          <div className="method-card-icon">
            <Icon name="phone" size={32} />
          </div>
          <div className="method-card-title">Jetzt anrufen</div>
          <div className="method-card-subtitle">Direkt Termin vereinbaren</div>
        </button>
      </div>
    </div>
  );
};

// ========== STEP 6: CALL SCREEN ==========
const Step6CallScreen = ({ onBack }) => {
  return (
    <div className="booking-step call-screen">
      <h2 className="booking-step-title">Rufen Sie uns an</h2>
      <p className="booking-step-subtitle">Wir vereinbaren gerne telefonisch einen Termin mit Ihnen</p>

      <div className="call-cards">
        <a href="tel:+498938808687" className="call-card">
          <div className="call-card-doctor">
            <div className="call-card-avatar">
              <img src="assets/dr-jahn.jpg" alt="Dr. Irene Jahn" loading="lazy" />
            </div>
            <div className="call-card-name">Dr. Irene Jahn</div>
          </div>
          <div className="call-card-phone">
            <Icon name="phone" size={20} />
            <span>089 38 80 86 87</span>
          </div>
        </a>

        <a href="tel:+498938889500" className="call-card">
          <div className="call-card-doctor">
            <div className="call-card-avatar">
              <img src="assets/dr-hancock-diener.jpg" alt="Dr. Hancock-Diener" loading="lazy" />
            </div>
            <div className="call-card-name">Dr. Hancock-Diener</div>
          </div>
          <div className="call-card-phone">
            <Icon name="phone" size={20} />
            <span>089 38 88 95 00</span>
          </div>
        </a>
      </div>

      <div className="call-hours">
        <Icon name="clock" size={16} />
        <span>Mo–Do: 8–18 Uhr · Fr: 8–16 Uhr</span>
      </div>
    </div>
  );
};

// ========== MODAL FOOTER ==========
const BookingFooter = ({ currentStep, canProceed, onBack, onNext, onSubmit, loading }) => {
  // Kein Footer für Step 0 (Methode wählen), Step 5 (Success)
  if (currentStep === 0 || currentStep === 5) return null;

  const showBack = (currentStep > 1 && currentStep < 5) || currentStep === 6;
  const showNext = currentStep === 2 || currentStep === 3;
  const showSubmit = currentStep === 4;

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
      </div>
    </div>
  );
};

// ========== STEP 2: REASON SELECT (NEU) ==========
const Step2ReasonSelect = ({ reason, reasonText, onSelectReason, onReasonTextChange }) => {
  const [showCheckmark, setShowCheckmark] = React.useState(null);

  const handleSelect = (reasonId) => {
    setShowCheckmark(reasonId);
    onSelectReason(reasonId);
    // Auto-advance wird im Hook gesteuert (nicht bei anderer_grund)
    if (reasonId !== "anderer_grund") {
      // Checkmark bleibt kurz sichtbar, dann advance
    }
  };

  // Reset checkmark wenn reason wechselt (z.B. zurück navigiert)
  React.useEffect(() => {
    if (!reason) setShowCheckmark(null);
  }, [reason]);

  return (
    <div className="booking-step">
      <h2 className="booking-step-title">Was ist der Grund Ihres Besuchs?</h2>
      <p className="booking-step-subtitle">Damit können wir die passende Terminlänge einplanen</p>

      <div className="reason-cards">
        {REASON_OPTIONS.map(opt => {
          // Bei "anderer_grund" ausgewählt: nur diese Karte zeigen
          if (reason === "anderer_grund" && opt.id !== "anderer_grund") return null;

          return (
            <button
              key={opt.id}
              className={`reason-card ${reason === opt.id || showCheckmark === opt.id ? "selected" : ""}`}
              onClick={() => handleSelect(opt.id)}
              disabled={showCheckmark !== null && showCheckmark !== "anderer_grund" && reason !== "anderer_grund"}
            >
              <div className="reason-card-content">
                <div className="reason-card-label">{opt.label}</div>
                <div className="reason-card-sublabel">{opt.subLabel}</div>
              </div>
              {showCheckmark === opt.id && opt.id !== "anderer_grund" && (
                <div className="reason-checkmark">
                  <Icon name="check" size={18} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {reason === "anderer_grund" && (
        <div className="reason-text-wrapper">
          <textarea
            className="reason-text-input"
            placeholder="Bitte beschreiben Sie kurz Ihr Anliegen"
            value={reasonText}
            onChange={(e) => onReasonTextChange(e.target.value)}
            maxLength={200}
            rows={3}
            autoFocus
          />
          <div className="reason-text-counter">{reasonText.length}/200</div>
        </div>
      )}
    </div>
  );
};

// ========== STEP 3: WISH SLOTS + SUB-PICKER ==========

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
const MiniCalendar = ({ selectedDate, onSelectDate, doctor }) => {
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

  const isDoctorUnavailable = (y, m, d) => {
    if (!doctor) return false;
    const dow = new Date(y, m, d).getDay(); // 0=So..6=Sa
    return !DOCTOR_HOURS[doctor]?.[dow];
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
          const isDisabled = isWeekend(viewYear, viewMonth, day) || isPast(viewYear, viewMonth, day) || isDoctorUnavailable(viewYear, viewMonth, day);
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

// Sub-Component: DayTime Pills (now dynamic based on doctor + date)
const DayTimePills = ({ selectedDayTime, onSelect, doctor, selectedDate }) => {
  const pills = (doctor && selectedDate)
    ? getDayTimePills(doctor, selectedDate)
    : [
        { id: "morning", label: "Vormittag", subLabel: "8–12 Uhr" },
        { id: "noon", label: "Mittag", subLabel: "12–14 Uhr" },
        { id: "afternoon", label: "Nachmittag", subLabel: "14–18 Uhr" }
      ];

  return (
    <div className="daytime-pills">
      {pills.map(dt => (
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

// Sub-Component: Slot Picker (2-Step: Datum → Tageszeit)
const SlotPicker = ({ onSubmit, onCancel, hasFilledSlots, doctor }) => {
  const [step, setStep] = React.useState(1); // 1=Datum, 2=Tageszeit
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedDayTime, setSelectedDayTime] = React.useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Auto-advance zu Step 2 nach kurzer Verzögerung
    setTimeout(() => setStep(2), 100);
  };

  const handleDayTimeSelect = (dayTime) => {
    setSelectedDayTime(dayTime);
    // Auto-submit nach Auswahl
    setTimeout(() => {
      onSubmit({ date: selectedDate, dayTime: dayTime });
    }, 100);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedDayTime(null);
    } else {
      onCancel();
    }
  };

  return (
    <div className="slot-picker">
      <div className="slot-picker-header">
        <h3 className="slot-picker-title">
          {step === 1 ? 'Datum wählen' : 'Tageszeit wählen'}
        </h3>
      </div>

      <div className="slot-picker-body">
        {step === 1 ? (
          <MiniCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} doctor={doctor} />
        ) : (
          <DayTimePills selectedDayTime={selectedDayTime} onSelect={handleDayTimeSelect} doctor={doctor} selectedDate={selectedDate} />
        )}
      </div>

      <div className="slot-picker-footer">
        <button className="btn-text" onClick={handleBack}>
          {step === 1 ? 'Abbrechen' : 'Zurück'}
        </button>
        {hasFilledSlots && step === 1 && (
          <button className="btn-text" onClick={onCancel} style={{marginLeft: 'auto', color: 'var(--brand-primary)', fontWeight: 500}}>
            Fertig (ohne weiteren Termin)
          </button>
        )}
      </div>
    </div>
  );
};

// Main Step 3 Component (was Step 2)
const Step3WishSlots = ({ wishSlots, onUpdate, onRemove, doctor }) => {
  const [pickerOpen, setPickerOpen] = React.useState(null); // null | 0 | 1 | 2 (slot index)

  const handleSlotClick = (index) => {
    setPickerOpen(index);
  };

  const handlePickerSubmit = (slotData) => {
    if (pickerOpen !== null) {
      onUpdate(pickerOpen, slotData);

      // Auto-open next empty slot after short delay
      setTimeout(() => {
        const currentIndex = pickerOpen;
        setPickerOpen(null);

        // Find next empty slot
        setTimeout(() => {
          const nextEmptyIndex = wishSlots.findIndex((slot, idx) => idx > currentIndex && slot === null);
          if (nextEmptyIndex !== -1) {
            setPickerOpen(nextEmptyIndex);
          }
        }, 150);
      }, 100);
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
      <p className="booking-step-subtitle">Wählen Sie nacheinander 1 bis 3 Wunschtermine. Wir rufen Sie zurück und vereinbaren gemeinsam einen passenden Termin.</p>

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
            hasFilledSlots={wishSlots.some(slot => slot !== null)}
            doctor={doctor}
          />
        </>
      )}
    </div>
  );
};

// ========== STEP 4: CONTACT FORM (was Step 3) ==========
const Step4ContactForm = ({ contactData, onUpdate, error, doctor, wishSlots, reason, reasonText }) => {
  const filledSlotsCount = wishSlots.filter(s => s !== null).length;
  const doctorName = doctor === "jahn" ? "Dr. Jahn" : "Dr. Hancock-Diener";

  const reasonDisplay = reason === "anderer_grund"
    ? reasonText.trim()
    : (REASON_LABELS[reason] || "");

  return (
    <div className="booking-step step-contact">
      {/* Mini-Summary (statt Headline) */}
      <div className="contact-summary">
        {doctorName} · {reasonDisplay} · {filledSlotsCount} Wunschtermin{filledSlotsCount > 1 ? 'e' : ''}
      </div>

      {/* Form Fields */}
      <div className="contact-form">
        <input
          type="text"
          className="contact-input"
          placeholder="Ihr Name *"
          value={contactData.name}
          onChange={(e) => onUpdate('name', e.target.value)}
          required
        />

        <input
          type="tel"
          className="contact-input"
          placeholder="Telefonnummer für Rückruf *"
          value={contactData.phone}
          onChange={(e) => onUpdate('phone', e.target.value)}
          required
        />

        <input
          type="email"
          className="contact-input"
          placeholder="E-Mail (optional)"
          value={contactData.email}
          onChange={(e) => onUpdate('email', e.target.value)}
        />

        <textarea
          className="contact-input contact-textarea"
          placeholder="Anmerkungen (optional)"
          value={contactData.notes}
          onChange={(e) => onUpdate('notes', e.target.value)}
          rows={3}
          maxLength={500}
        />

        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={contactData.honeypot}
          onChange={(e) => onUpdate('honeypot', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
          aria-hidden="true"
        />

        {/* Hinweistext */}
        <div className="contact-hint">
          <Icon name="info" size={14} />
          <span>Bitte keine medizinischen Details per Formular — wir besprechen alles persönlich am Telefon.</span>
        </div>

        {/* DSGVO Checkbox */}
        <label className="contact-consent">
          <input
            type="checkbox"
            checked={contactData.consent}
            onChange={(e) => onUpdate('consent', e.target.checked)}
            required
          />
          <span>
            Ich willige in die Verarbeitung meiner Daten zur Bearbeitung meiner Terminanfrage ein. <a href="datenschutz.html" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> *
          </span>
        </label>

        {/* Error Message */}
        {error && <div className="contact-error">{error}</div>}
      </div>
    </div>
  );
};

const Step5Success = ({ onClose, onNew }) => (
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
    if (flow.currentStep > 1 && flow.currentStep < 5) {
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
      case 0:
        return <Step0MethodSelect onSelectMethod={flow.selectMethod} />;
      case 1:
        return <Step1DoctorSelect doctor={flow.doctor} onSelect={flow.selectDoctor} />;
      case 2:
        return (
          <Step2ReasonSelect
            reason={flow.reason}
            reasonText={flow.reasonText}
            onSelectReason={flow.selectReason}
            onReasonTextChange={flow.setReasonText}
          />
        );
      case 3:
        return (
          <Step3WishSlots
            wishSlots={flow.wishSlots}
            onUpdate={flow.updateSlot}
            onRemove={flow.removeSlot}
            doctor={flow.doctor}
          />
        );
      case 4:
        return (
          <Step4ContactForm
            contactData={flow.contactData}
            onUpdate={flow.updateContact}
            error={flow.error}
            doctor={flow.doctor}
            wishSlots={flow.wishSlots}
            reason={flow.reason}
            reasonText={flow.reasonText}
          />
        );
      case 5:
        return <Step5Success onClose={handleClose} onNew={handleNewRequest} />;
      case 6:
        return <Step6CallScreen onBack={flow.goBack} />;
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
        <BookingFooter
          currentStep={flow.currentStep}
          canProceed={flow.canProceed(flow.currentStep)}
          onBack={flow.goBack}
          onNext={flow.goNext}
          onSubmit={flow.submit}
          loading={flow.loading}
        />
      </div>
    </div>
  );
};

// Export für globalen Zugriff
window.BookingModal = BookingModal;
