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

const Step2WishSlots = ({ wishSlots, onUpdate, onRemove }) => (
  <div className="booking-step">
    <h2 className="booking-step-title">Ihre Wunschtermine</h2>
    <p className="booking-step-subtitle">Wählen Sie 1 bis 3 Termine, an denen Sie Zeit hätten</p>
    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
      Step 2 - Wish Slots (wird in Phase 3 implementiert)
    </div>
  </div>
);

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
