// AnamneseForm — online Anamnesebogen with bilingual labels
const { useState: useFS, useEffect: useFE, useRef: useFR } = React;

const LABELS = {
  de: {
    formTitle: "Anamnesebogen",
    formSubtitle: "Bitte füllen Sie alle Felder sorgfältig aus.",
    required: "Pflichtfeld",
    // Section 1
    personal: "Persönliche Daten",
    lastName: "Nachname",
    firstName: "Vorname",
    birthDate: "Geburtsdatum",
    street: "Straße + Hausnr.",
    zip: "PLZ",
    city: "Ort",
    phone: "Telefon",
    email: "E-Mail",
    // Section 2
    insurance: "Versicherung",
    public: "Gesetzlich",
    private: "Privat",
    selfPay: "Selbstzahler",
    insuranceName: "Krankenkasse",
    // Section 3
    conditions: "Allgemeinerkrankungen",
    conditionsIntro: "Bitte kreuzen Sie zutreffende Erkrankungen an:",
    conditionsList: [
      "Herz-Kreislauf-Erkrankungen", "Bluthochdruck", "Diabetes",
      "Blutungsneigung / Blutverdünner", "Hepatitis / HIV", "Rheuma",
      "Osteoporose", "Schilddrüsenerkrankungen", "Epilepsie",
      "Asthma / Atemwegserkrankungen", "Magen-Darm-Erkrankungen",
      "Leber- / Nierenerkrankungen", "Psychische Erkrankungen",
      "Schlaganfall", "Tumor / Bestrahlung"
    ],
    // Section 4
    medications: "Medikamente",
    medicationsQ: "Welche Medikamente nehmen Sie regelmäßig ein?",
    medicationsPlaceholder: "z. B. Aspirin, Blutdrucksenker, Insulin …",
    // Section 5
    allergies: "Allergien / Unverträglichkeiten",
    allergyList: ["Penicillin", "Latex", "Betäubungsmittel", "Sonstige"],
    allergyOtherPlaceholder: "Bitte angeben …",
    // Section 6
    women: "Für Frauen",
    pregnant: "Schwangerschaft",
    nursing: "Stillzeit",
    // Section 7
    dental: "Zahnärztliche Angaben",
    lastVisit: "Letzter Zahnarztbesuch",
    lastVisitPlaceholder: "z. B. vor 6 Monaten",
    visitReason: "Grund des heutigen Besuchs",
    visitReasonPlaceholder: "z. B. Kontrolluntersuchung, Schmerzen …",
    specialWishes: "Besondere Probleme / Wünsche",
    specialWishesPlaceholder: "z. B. Zahnarztangst, bestimmte Wünsche …",
    // Section 8
    other: "Sonstiges",
    otherPlaceholder: "Weitere Hinweise, die für die Behandlung relevant sein könnten …",
    // Section 9
    signature: "Unterschrift",
    signDate: "Ort, Datum",
    signName: "Name (als digitale Unterschrift)",
    consent: "Ich bestätige die Richtigkeit der obigen Angaben und bin damit einverstanden, dass meine Daten zum Zweck der zahnärztlichen Behandlung gespeichert werden.",
    // Buttons
    downloadPDF: "Als PDF herunterladen",
    back: "Zurück zur Übersicht",
    // Validation
    fillRequired: "Bitte füllen Sie alle Pflichtfelder aus."
  },
  en: {
    formTitle: "Medical History Form",
    formSubtitle: "Please fill out all fields carefully.",
    required: "Required",
    personal: "Personal Information",
    lastName: "Last Name",
    firstName: "First Name",
    birthDate: "Date of Birth",
    street: "Street + No.",
    zip: "Postal Code",
    city: "City",
    phone: "Phone",
    email: "Email",
    insurance: "Insurance",
    public: "Public",
    private: "Private",
    selfPay: "Self-Pay",
    insuranceName: "Insurance Provider",
    conditions: "Medical Conditions",
    conditionsIntro: "Please check any conditions that apply to you:",
    conditionsList: [
      "Cardiovascular disease", "High blood pressure", "Diabetes",
      "Bleeding tendency / Blood thinners", "Hepatitis / HIV", "Rheumatism",
      "Osteoporosis", "Thyroid disorders", "Epilepsy",
      "Asthma / Respiratory diseases", "Gastrointestinal diseases",
      "Liver / Kidney diseases", "Mental health conditions",
      "Stroke", "Tumor / Radiation therapy"
    ],
    medications: "Medications",
    medicationsQ: "Which medications do you take regularly?",
    medicationsPlaceholder: "e.g. Aspirin, blood pressure medication, insulin …",
    allergies: "Allergies / Intolerances",
    allergyList: ["Penicillin", "Latex", "Anesthetics", "Other"],
    allergyOtherPlaceholder: "Please specify …",
    women: "For Women",
    pregnant: "Pregnancy",
    nursing: "Breastfeeding",
    dental: "Dental Information",
    lastVisit: "Last dental visit",
    lastVisitPlaceholder: "e.g. 6 months ago",
    visitReason: "Reason for today's visit",
    visitReasonPlaceholder: "e.g. check-up, pain …",
    specialWishes: "Special concerns / wishes",
    specialWishesPlaceholder: "e.g. dental anxiety, specific wishes …",
    other: "Other",
    otherPlaceholder: "Any other information relevant to your treatment …",
    signature: "Signature",
    signDate: "Place, Date",
    signName: "Name (digital signature)",
    consent: "I confirm that the above information is correct and consent to my data being stored for the purpose of dental treatment.",
    downloadPDF: "Download as PDF",
    back: "Back to overview",
    fillRequired: "Please fill out all required fields."
  }
};

const AnamneseForm = ({ lang, onBack }) => {
  const L = LABELS[lang] || LABELS.de;
  const formRef = useFR(null);

  const now = new Date();
  const todayStr = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;

  const [form, setForm] = useFS({
    lastName: "", firstName: "", birthDate: "", street: "", zip: "", city: "",
    phone: "", email: "",
    insuranceType: "",
    insuranceName: "",
    conditions: {},
    medications: "",
    allergies: {},
    allergyOther: "",
    pregnant: false, nursing: false,
    lastVisit: "", visitReason: "", specialWishes: "",
    other: "",
    signDate: todayStr,
    consent: false
  });

  const [error, setError] = useFS("");

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const setCheck = (key) => (e) => setForm({ ...form, [key]: e.target.checked });

  const toggleCondition = (idx) => {
    const c = { ...form.conditions };
    c[idx] = !c[idx];
    setForm({ ...form, conditions: c });
  };

  const toggleAllergy = (idx) => {
    const a = { ...form.allergies };
    a[idx] = !a[idx];
    setForm({ ...form, allergies: a });
  };

  const validate = () => {
    if (!form.lastName.trim() || !form.firstName.trim()) {
      return false;
    }
    return true;
  };

  const handleDownload = () => {
    if (!validate()) {
      setError(L.fillRequired);
      if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setError("");
    const data = {
      lastName: form.lastName,
      firstName: form.firstName,
      birthDate: form.birthDate,
      street: form.street,
      zip: form.zip,
      city: form.city,
      phone: form.phone,
      email: form.email,
      insuranceType: form.insuranceType,
      insuranceName: form.insuranceName,
      conditions: form.conditions,
      medications: form.medications,
      allergies: {
        ...form.allergies,
        other: form.allergies[3],
        otherText: form.allergyOther
      },
      pregnant: form.pregnant,
      nursing: form.nursing,
      lastVisit: form.lastVisit,
      visitReason: form.visitReason,
      specialWishes: form.specialWishes,
      other: form.other,
      signDate: form.signDate,
      signName: ""
    };
    window.generateAnamnesePDF(data, lang);
  };

  return (
    <div className="anamnese-form" ref={formRef}>
      <div className="anamnese-form-header">
        <button className="btn btn-secondary anamnese-back-btn" onClick={onBack}>
          <Icon name="arrow-left" size={16}/> {L.back}
        </button>
        <h2 className="display-md">{L.formTitle}</h2>
        <p className="body-lg" style={{color:'var(--text-secondary)', marginTop:'8px'}}>{L.formSubtitle}</p>
      </div>

      {error && <div className="anamnese-error"><Icon name="alert" size={16}/> {error}</div>}

      {/* Section 1: Personal */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="user" size={18}/> {L.personal}</legend>
        <div className="anamnese-row-2">
          <label className="anamnese-field">
            <span className="anamnese-label">{L.lastName} *</span>
            <input type="text" value={form.lastName} onChange={set("lastName")} className="anamnese-input" required/>
          </label>
          <label className="anamnese-field">
            <span className="anamnese-label">{L.firstName} *</span>
            <input type="text" value={form.firstName} onChange={set("firstName")} className="anamnese-input" required/>
          </label>
        </div>
        <label className="anamnese-field">
          <span className="anamnese-label">{L.birthDate}</span>
          <input type="text" value={form.birthDate} onChange={set("birthDate")} className="anamnese-input" placeholder="TT.MM.JJJJ"/>
        </label>
        <div className="anamnese-row-3">
          <label className="anamnese-field" style={{flex:2}}>
            <span className="anamnese-label">{L.street}</span>
            <input type="text" value={form.street} onChange={set("street")} className="anamnese-input"/>
          </label>
          <label className="anamnese-field" style={{flex:0.6}}>
            <span className="anamnese-label">{L.zip}</span>
            <input type="text" value={form.zip} onChange={set("zip")} className="anamnese-input"/>
          </label>
          <label className="anamnese-field" style={{flex:1}}>
            <span className="anamnese-label">{L.city}</span>
            <input type="text" value={form.city} onChange={set("city")} className="anamnese-input"/>
          </label>
        </div>
        <div className="anamnese-row-2">
          <label className="anamnese-field">
            <span className="anamnese-label">{L.phone}</span>
            <input type="tel" value={form.phone} onChange={set("phone")} className="anamnese-input"/>
          </label>
          <label className="anamnese-field">
            <span className="anamnese-label">{L.email}</span>
            <input type="email" value={form.email} onChange={set("email")} className="anamnese-input"/>
          </label>
        </div>
      </fieldset>

      {/* Section 2: Insurance */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="shield" size={18}/> {L.insurance}</legend>
        <div className="anamnese-radios">
          {[
            { key: "public", label: L.public },
            { key: "private", label: L.private },
            { key: "selfpay", label: L.selfPay }
          ].map(opt => (
            <label key={opt.key} className={`anamnese-radio ${form.insuranceType === opt.key ? "selected" : ""}`}>
              <input type="radio" name="insuranceType" value={opt.key}
                checked={form.insuranceType === opt.key}
                onChange={() => setForm({...form, insuranceType: opt.key})}/>
              <span className="anamnese-radio-dot"></span>
              {opt.label}
            </label>
          ))}
        </div>
        <label className="anamnese-field">
          <span className="anamnese-label">{L.insuranceName}</span>
          <input type="text" value={form.insuranceName} onChange={set("insuranceName")} className="anamnese-input"/>
        </label>
      </fieldset>

      {/* Section 3: Conditions */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="heart" size={18}/> {L.conditions}</legend>
        <p className="anamnese-intro">{L.conditionsIntro}</p>
        <div className="anamnese-checkbox-grid">
          {L.conditionsList.map((c, i) => (
            <label key={i} className="anamnese-checkbox">
              <input type="checkbox" checked={!!form.conditions[i]} onChange={() => toggleCondition(i)}/>
              <span className="anamnese-check-box">
                {form.conditions[i] && <Icon name="check" size={14}/>}
              </span>
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Section 4: Medications */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="clipboard" size={18}/> {L.medications}</legend>
        <label className="anamnese-field">
          <span className="anamnese-label">{L.medicationsQ}</span>
          <textarea value={form.medications} onChange={set("medications")}
            className="anamnese-textarea" rows={3} placeholder={L.medicationsPlaceholder}/>
        </label>
      </fieldset>

      {/* Section 5: Allergies */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="alert" size={18}/> {L.allergies}</legend>
        <div className="anamnese-checkbox-row">
          {L.allergyList.map((a, i) => (
            <label key={i} className="anamnese-checkbox">
              <input type="checkbox" checked={!!form.allergies[i]} onChange={() => toggleAllergy(i)}/>
              <span className="anamnese-check-box">
                {form.allergies[i] && <Icon name="check" size={14}/>}
              </span>
              {a}
            </label>
          ))}
        </div>
        {form.allergies[3] && (
          <label className="anamnese-field" style={{marginTop:'12px'}}>
            <input type="text" value={form.allergyOther} onChange={set("allergyOther")}
              className="anamnese-input" placeholder={L.allergyOtherPlaceholder}/>
          </label>
        )}
      </fieldset>

      {/* Section 6: Women */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend">{L.women}</legend>
        <div className="anamnese-checkbox-row">
          <label className="anamnese-checkbox">
            <input type="checkbox" checked={form.pregnant} onChange={setCheck("pregnant")}/>
            <span className="anamnese-check-box">
              {form.pregnant && <Icon name="check" size={14}/>}
            </span>
            {L.pregnant}
          </label>
          <label className="anamnese-checkbox">
            <input type="checkbox" checked={form.nursing} onChange={setCheck("nursing")}/>
            <span className="anamnese-check-box">
              {form.nursing && <Icon name="check" size={14}/>}
            </span>
            {L.nursing}
          </label>
        </div>
      </fieldset>

      {/* Section 7: Dental */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="smile" size={18}/> {L.dental}</legend>
        <label className="anamnese-field">
          <span className="anamnese-label">{L.lastVisit}</span>
          <input type="text" value={form.lastVisit} onChange={set("lastVisit")}
            className="anamnese-input" placeholder={L.lastVisitPlaceholder}/>
        </label>
        <label className="anamnese-field">
          <span className="anamnese-label">{L.visitReason}</span>
          <textarea value={form.visitReason} onChange={set("visitReason")}
            className="anamnese-textarea" rows={2} placeholder={L.visitReasonPlaceholder}/>
        </label>
        <label className="anamnese-field">
          <span className="anamnese-label">{L.specialWishes}</span>
          <textarea value={form.specialWishes} onChange={set("specialWishes")}
            className="anamnese-textarea" rows={2} placeholder={L.specialWishesPlaceholder}/>
        </label>
      </fieldset>

      {/* Section 8: Other */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend">{L.other}</legend>
        <label className="anamnese-field">
          <textarea value={form.other} onChange={set("other")}
            className="anamnese-textarea" rows={3} placeholder={L.otherPlaceholder}/>
        </label>
      </fieldset>

      {/* Section 9: Signature */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="file-text" size={18}/> {L.signature}</legend>
        <label className="anamnese-field">
          <span className="anamnese-label">{L.signDate}</span>
          <input type="text" value={form.signDate} onChange={set("signDate")} className="anamnese-input"/>
        </label>
        <p className="anamnese-intro" style={{marginTop:'8px', fontStyle:'italic'}}>
          {lang === "en"
            ? "The signature field will be left blank on the PDF — please sign by hand after printing."
            : "Das Unterschriftenfeld bleibt im PDF frei — bitte nach dem Ausdrucken von Hand unterschreiben."}
        </p>
        <label className="anamnese-checkbox" style={{marginTop:'12px'}}>
          <input type="checkbox" checked={form.consent} onChange={setCheck("consent")}/>
          <span className="anamnese-check-box">
            {form.consent && <Icon name="check" size={14}/>}
          </span>
          <span style={{fontSize:'14px', color:'var(--text-secondary)'}}>{L.consent}</span>
        </label>
      </fieldset>

      {/* Actions */}
      <div className="anamnese-actions">
        <button className="btn btn-primary" onClick={handleDownload}>
          <Icon name="download" size={18}/> {L.downloadPDF}
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          <Icon name="arrow-left" size={16}/> {L.back}
        </button>
      </div>
    </div>
  );
};

window.AnamneseForm = AnamneseForm;
