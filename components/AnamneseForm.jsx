// AnamneseForm — interactive online Anamnesebogen matching the real practice form.
// Content comes from the shared window.ANAMNESE_CONTENT (defined in AnamnesePDF.jsx),
// so the form and the generated PDF stay in sync. State keys match the PDF builder's fields.
const { useState: useFS, useRef: useFR } = React;

const AnamneseForm = ({ lang, onBack }) => {
  const C = (window.ANAMNESE_CONTENT && window.ANAMNESE_CONTENT[lang]) ||
            (window.ANAMNESE_CONTENT && window.ANAMNESE_CONTENT.de) || {};
  const U = C.ui || {};
  const isDE = lang !== "en";
  const specify = isDE ? "Bitte erläutern …" : "Please specify …";
  const formRef = useFR(null);

  const [form, setForm] = useFS({
    patLast: "", patFirst: "", patBirth: "",
    memLast: "", memFirst: "", memBirth: "",
    street: "", plzOrt: "",
    telPrivat: "", telMobil: "", telBeruf: "", email: "",
    beruf: "", arbeitgeber: "",
    insuranceType: "", insuranceName: "",
    consentPayment: false, consentSMS: false, consentDSGVO: false,
    health: {}, diseaseNone: false, diseases: {},
    pregnancy: {}, ortho: {}, perio: {}, complications: {}, accident: {},
    teethNone: false, teeth: {},
    jawPain: {}, xray: {},
    heard: {}, reminderService: false
  });
  const [error, setError] = useFS("");

  // --- Setters (functional updates) ---
  const setVal = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggle = (k) => setForm(f => ({ ...f, [k]: !f[k] }));
  const setGroup = (k, sub, v) => setForm(f => ({ ...f, [k]: { ...(f[k] || {}), [sub]: v } }));
  const setHealth = (i, sub, v) => setForm(f => ({ ...f, health: { ...f.health, [i]: { ...(f.health[i] || {}), [sub]: v } } }));
  const setDisease = (i, sub, v) => setForm(f => ({ ...f, diseases: { ...f.diseases, [i]: { ...(f.diseases[i] || {}), [sub]: v } } }));
  const setTeeth = (i) => setForm(f => ({ ...f, teeth: { ...f.teeth, [i]: !f.teeth[i] } }));
  const setHeard = (sub, v) => setForm(f => ({ ...f, heard: { ...f.heard, [sub]: v } }));

  // --- Render helpers (plain functions → keep input focus on re-render) ---
  const textField = (label, key, ph) => (
    <label className="anamnese-field">
      <span className="anamnese-label">{label}</span>
      <input className="anamnese-input" value={form[key]} onChange={e => setVal(key, e.target.value)} placeholder={ph} />
    </label>
  );

  const yn = (ans, onAns) => (
    <div className="anamnese-yn">
      <button type="button" className={`anamnese-yn-btn ${ans === "nein" ? "selected" : ""}`}
        onClick={() => onAns(ans === "nein" ? "" : "nein")}>{C.no}</button>
      <button type="button" className={`anamnese-yn-btn ${ans === "ja" ? "selected" : ""}`}
        onClick={() => onAns(ans === "ja" ? "" : "ja")}>{C.yes}</button>
    </div>
  );

  const qBlock = (qText, ans, onAns, hasDetail, detailVal, onDetail, detailPh) => (
    <div className="anamnese-q">
      <div className="anamnese-q-head">
        <span className="anamnese-q-text">{qText}</span>
        {yn(ans, onAns)}
      </div>
      {hasDetail && ans === "ja" && (
        <input className="anamnese-input anamnese-q-detail" placeholder={detailPh || specify}
          value={detailVal || ""} onChange={e => onDetail(e.target.value)} />
      )}
    </div>
  );

  const groupBlock = (qText, group, hasDetail, detailPh) =>
    qBlock(qText, (form[group] || {}).a, v => setGroup(group, "a", v),
      hasDetail, (form[group] || {}).detail, v => setGroup(group, "detail", v), detailPh);

  const cbItem = (label, checked, onToggle, key) => (
    <label className="anamnese-checkbox" key={key}>
      <input type="checkbox" checked={!!checked} onChange={onToggle} />
      <span className="anamnese-check-box">{checked && <Icon name="check" size={14} />}</span>
      {label}
    </label>
  );

  // --- Validation + download ---
  const validate = () => form.patLast.trim() && form.patFirst.trim();
  const handleDownload = () => {
    if (!validate()) {
      setError(U.fillRequired);
      if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setError("");
    window.generateAnamnesePDF(form, lang);
  };

  return (
    <div className="anamnese-form" ref={formRef}>
      <div className="anamnese-form-header">
        <button className="btn btn-secondary anamnese-back-btn" onClick={onBack}>
          <Icon name="arrow-left" size={16} /> {U.back}
        </button>
        <h2 className="display-md">{U.formTitle}</h2>
        <p className="body-lg" style={{ color: "var(--text-secondary)", marginTop: "8px" }}>{U.formSubtitle}</p>
      </div>

      {error && <div className="anamnese-error"><Icon name="alert" size={16} /> {error}</div>}

      {/* Patient master data */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="user" size={18} /> {C.masterTitle}</legend>

        <p className="anamnese-subhead">{(C.masters || {}).patient}</p>
        <div className="anamnese-row-3">
          {textField(C.f.name + " *", "patLast")}
          {textField(C.f.vorname + " *", "patFirst")}
          {textField(C.f.birthPlace, "patBirth")}
        </div>

        <p className="anamnese-subhead">{(C.masters || {}).member}</p>
        <div className="anamnese-row-3">
          {textField(C.f.name, "memLast")}
          {textField(C.f.vorname, "memFirst")}
          {textField(C.f.birth, "memBirth")}
        </div>

        <p className="anamnese-subhead">{(C.masters || {}).address}</p>
        {textField(C.f.street, "street")}
        {textField(C.f.plzOrt, "plzOrt")}

        <p className="anamnese-subhead">{(C.masters || {}).phone}</p>
        <div className="anamnese-row-3">
          {textField(C.f.telPrivat, "telPrivat")}
          {textField(C.f.telMobil, "telMobil")}
          {textField(C.f.telBeruf, "telBeruf")}
        </div>
        {textField(C.f.email, "email")}

        <p className="anamnese-subhead">{(C.masters || {}).occupation}</p>
        <div className="anamnese-row-2">
          {textField(C.f.beruf, "beruf")}
          {textField(C.f.arbeitgeber, "arbeitgeber")}
        </div>
      </fieldset>

      {/* Insurance */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="shield" size={18} /> {(C.masters || {}).insurance}</legend>
        {textField(C.f.kasse, "insuranceName")}
        <div className="anamnese-radios">
          {(C.insuranceOptions || []).map((opt, i) => (
            <label key={i} className={`anamnese-radio ${form.insuranceType === i ? "selected" : ""}`}>
              <input type="radio" name="insuranceType" checked={form.insuranceType === i}
                onChange={() => setVal("insuranceType", i)} />
              <span className="anamnese-radio-dot"></span>{opt}
            </label>
          ))}
        </div>
        <p className="anamnese-notice-text">{C.paymentNotice}</p>
        {cbItem(C.paymentNotice && (isDE ? "Gelesen und zur Kenntnis genommen." : "Read and acknowledged."),
          form.consentPayment, () => toggle("consentPayment"))}
      </fieldset>

      {/* SMS consent */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="phone" size={18} /> {(C.sms || {}).heading}</legend>
        <p className="anamnese-subhead">{(C.sms || {}).sub}</p>
        <p className="anamnese-notice-text">{(C.sms || {}).body}</p>
        {cbItem((C.sms || {}).consent, form.consentSMS, () => toggle("consentSMS"))}
      </fieldset>

      {/* Health */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="heart" size={18} /> {(C.health || {}).title}</legend>
        <p className="anamnese-intro">{(C.health || {}).eyebrow}</p>

        {(C.healthQuestions || []).map((hq, i) =>
          <React.Fragment key={i}>
            {qBlock(hq.q, (form.health[i] || {}).a, v => setHealth(i, "a", v),
              hq.detail, (form.health[i] || {}).detail, v => setHealth(i, "detail", v))}
          </React.Fragment>
        )}

        {/* Disease list */}
        <p className="anamnese-q-text anamnese-strong">{(C.disease || {}).q}</p>
        {cbItem((C.disease || {}).none, form.diseaseNone, () => toggle("diseaseNone"))}
        <p className="anamnese-intro" style={{ marginTop: "8px" }}>{(C.disease || {}).hint}</p>
        <div className="anamnese-disease-list">
          {((C.disease || {}).list || []).map((name, i) => (
            <div className="anamnese-disease-row" key={i}>
              {cbItem(name, (form.diseases[i] || {}).checked, () => setDisease(i, "checked", !(form.diseases[i] || {}).checked))}
              {(form.diseases[i] || {}).checked && (
                <input className="anamnese-input anamnese-year" placeholder={(C.disease || {}).yearLabel}
                  value={(form.diseases[i] || {}).year || ""} onChange={e => setDisease(i, "year", e.target.value)} />
              )}
            </div>
          ))}
        </div>

        {/* Further questions */}
        {groupBlock(C.pregnancyQ, "pregnancy", true)}
        <div className="anamnese-q">
          <div className="anamnese-q-head">
            <span className="anamnese-q-text">{C.orthoQ}</span>
            {yn((form.ortho || {}).a, v => setGroup("ortho", "a", v))}
          </div>
          {(form.ortho || {}).a === "ja" && <p className="anamnese-q-note">{C.orthoYes}</p>}
        </div>
        {groupBlock(C.perioQ, "perio", true, C.perioDetail)}
        {groupBlock(C.complicationsQ, "complications", true, C.complicationsDetail)}
        {groupBlock(C.accidentQ, "accident", true, C.accidentDetail)}

        {/* Teeth changes */}
        <p className="anamnese-q-text anamnese-strong">{C.teethQ}</p>
        {cbItem(C.teethNone, form.teethNone, () => toggle("teethNone"))}
        <div className="anamnese-checkbox-list">
          {(C.teethOptions || []).map((opt, i) => cbItem(opt, form.teeth[i], () => setTeeth(i), i))}
        </div>

        {groupBlock(C.jawQ, "jawPain", true, C.jawDetail)}
        {groupBlock(C.xrayQ, "xray", true, C.xrayDetail)}
      </fieldset>

      {/* How heard */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="clipboard" size={18} /> {C.heardQ}</legend>
        <div className="anamnese-checkbox-list">
          {cbItem((C.heard || {}).internet, form.heard.internet, () => setHeard("internet", !form.heard.internet))}
          <div className="anamnese-heard-row">
            {cbItem((C.heard || {}).bekannt, form.heard.bekannt, () => setHeard("bekannt", !form.heard.bekannt))}
            {form.heard.bekannt && (
              <input className="anamnese-input anamnese-year" placeholder={(C.heard || {}).bekanntDetail}
                value={form.heard.bekanntDetail || ""} onChange={e => setHeard("bekanntDetail", e.target.value)} />
            )}
          </div>
          {cbItem((C.heard || {}).schild, form.heard.schild, () => setHeard("schild", !form.heard.schild))}
          <div className="anamnese-heard-row">
            {cbItem((C.heard || {}).arzt, form.heard.arzt, () => setHeard("arzt", !form.heard.arzt))}
            {form.heard.arzt && (
              <input className="anamnese-input anamnese-year" placeholder={(C.heard || {}).arztDetail}
                value={form.heard.arztDetail || ""} onChange={e => setHeard("arztDetail", e.target.value)} />
            )}
          </div>
        </div>
      </fieldset>

      {/* Reminder service */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="smile" size={18} /> {(C.service || {}).heading}</legend>
        <p className="anamnese-notice-text">{(C.service || {}).q}</p>
        {cbItem((C.service || {}).optYes, form.reminderService, () => toggle("reminderService"))}
      </fieldset>

      {/* Important notice (info only) */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="alert" size={18} /> {(C.notice || {}).heading}</legend>
        <p className="anamnese-notice-text">{(C.notice || {}).body}</p>
        <p className="anamnese-notice-text">{(C.notice || {}).thanks}</p>
      </fieldset>

      {/* GDPR consent */}
      <fieldset className="anamnese-section">
        <legend className="anamnese-legend"><Icon name="file-text" size={18} /> {(C.dsgvo || {}).heading}</legend>
        <p className="anamnese-subhead">{(C.dsgvo || {}).sub}</p>
        <p className="anamnese-notice-text">{(C.dsgvo || {}).body}</p>
        {cbItem(isDE ? "Ich willige in die Verarbeitung meiner Daten ein." : "I consent to the processing of my data.",
          form.consentDSGVO, () => toggle("consentDSGVO"))}
        <p className="anamnese-intro" style={{ marginTop: "12px", fontStyle: "italic" }}>{U.note}</p>
      </fieldset>

      {/* Actions */}
      <div className="anamnese-actions">
        <button className="btn btn-primary" onClick={handleDownload}>
          <Icon name="download" size={18} /> {U.downloadPDF}
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          <Icon name="arrow-left" size={16} /> {U.back}
        </button>
      </div>
    </div>
  );
};

window.AnamneseForm = AnamneseForm;
