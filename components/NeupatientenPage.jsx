// NeupatientenPage — page shell: hero, checklist, language tabs, option cards, form toggle
const { useState: useNS, useEffect: useNE } = React;

const CHECKLIST_DE = [
  "Krankenversichertenkarte",
  "Bisherige Röntgenaufnahmen (falls vorhanden)",
  "Bonusheft",
  "Medikamentenliste",
  "Ausgefüllter Anamnesebogen"
];
const CHECKLIST_EN = [
  "Health insurance card",
  "Previous X-rays (if available)",
  "Dental bonus booklet",
  "Medication list",
  "Completed medical history form"
];

const NeupatientenApp = () => {
  const [terminOpen, setTerminOpen] = useNS(false);
  const [showForm, setShowForm] = useNS(false);
  const [lang, setLang] = useNS("de");

  useNE(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [showForm]);

  const checklist = lang === "en" ? CHECKLIST_EN : CHECKLIST_DE;
  const isDE = lang === "de";

  return (
    <>
      <Header onOpenTermin={() => setTerminOpen(true)}/>

      {!showForm ? (
        <main>
          {/* Hero */}
          <section className="np-hero">
            <div className="container">
              <div className="breadcrumb" style={{marginBottom:'24px'}}>
                <a href="index.html">Start</a>
                <span className="sep">/</span>
                <span style={{color:'var(--text-primary)'}}>
                  {isDE ? "Neupatienten" : "New Patients"}
                </span>
              </div>
              <div className="reveal">
                <div className="eyebrow">
                  {isDE ? "Willkommen in unserer Praxis" : "Welcome to our dental practice"}
                </div>
                <h1 className="display-2xl" style={{maxWidth:'16ch'}}>
                  {isDE
                    ? <>Ihr erster <em className="italic-accent">Besuch</em> bei uns.</>
                    : <>Your first <em className="italic-accent">visit</em> with us.</>}
                </h1>
                <p className="body-xl" style={{color:'var(--text-secondary)', marginTop:'24px', maxWidth:'56ch'}}>
                  {isDE
                    ? "Damit wir Sie bestmöglich behandeln können, bitten wir Sie, den Anamnesebogen vorab auszufüllen — entweder online oder als PDF zum Ausdrucken."
                    : "To provide you with the best possible care, we ask you to fill out the medical history form in advance — either online or as a printable PDF."}
                </p>
              </div>
            </div>
          </section>

          {/* Checklist */}
          <section className="section np-checklist-section" style={{background:'var(--bg-subtle)'}}>
            <div className="container">
              <div className="np-checklist-grid reveal">
                <div>
                  <div className="eyebrow" style={{marginBottom:'16px'}}>
                    {isDE ? "Checkliste" : "Checklist"}
                  </div>
                  <h2 className="display-md">
                    {isDE
                      ? <>Was Sie <em className="italic-accent">mitbringen</em> sollten</>
                      : <>What to <em className="italic-accent">bring</em> along</>}
                  </h2>
                  <p className="body-lg" style={{color:'var(--text-secondary)', marginTop:'16px', maxWidth:'48ch'}}>
                    {isDE
                      ? "Je mehr Unterlagen Sie beim ersten Termin dabei haben, desto schneller können wir uns ein vollständiges Bild Ihrer Zahngesundheit machen."
                      : "The more documents you bring to your first appointment, the faster we can get a complete picture of your dental health."}
                  </p>
                </div>
                <div className="np-checklist">
                  {checklist.map((item, i) => (
                    <div key={i} className="np-check-item">
                      <div className="np-check-icon"><Icon name="check" size={18}/></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Anamnesebogen Section */}
          <section className="section np-anamnese-section">
            <div className="container">
              <div className="section-header reveal">
                <div className="eyebrow">
                  {isDE ? "Anamnesebogen" : "Medical History Form"}
                </div>
                <h2 className="display-lg">
                  {isDE
                    ? <><em className="italic-accent">Vorab</em> ausfüllen — Zeit sparen.</>
                    : <>Fill out <em className="italic-accent">in advance</em> — save time.</>}
                </h2>
                <p style={{color:'var(--text-secondary)', marginTop:'16px'}}>
                  {isDE
                    ? "Wählen Sie Ihre bevorzugte Sprache und entscheiden Sie, ob Sie den Bogen online ausfüllen oder lieber als PDF herunterladen und ausdrucken möchten."
                    : "Choose your preferred language and decide whether to fill out the form online or download it as a printable PDF."}
                </p>
              </div>

              {/* Language Tabs */}
              <div className="np-lang-tabs reveal">
                <button className={`np-lang-tab ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>
                  Deutsch
                </button>
                <button className={`np-lang-tab ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>
                  English
                </button>
              </div>

              {/* Option Cards */}
              <div className="np-option-cards reveal">
                <div className="np-option-card">
                  <div className="np-option-icon"><Icon name="download" size={28}/></div>
                  <h3 className="heading-md">
                    {isDE ? "PDF herunterladen" : "Download PDF"}
                  </h3>
                  <p style={{color:'var(--text-secondary)', margin:'12px 0 24px'}}>
                    {isDE
                      ? "Laden Sie den leeren Anamnesebogen als PDF herunter, drucken Sie ihn aus und füllen Sie ihn handschriftlich aus."
                      : "Download the blank medical history form as a PDF, print it out and fill it in by hand."}
                  </p>
                  <button className="btn btn-secondary" onClick={() => window.generateBlankPDF(lang)}>
                    <Icon name="printer" size={16}/>
                    {isDE ? "PDF herunterladen" : "Download PDF"}
                  </button>
                </div>
                <div className="np-option-card np-option-card-primary">
                  <div className="np-option-icon primary"><Icon name="file-text" size={28}/></div>
                  <h3 className="heading-md">
                    {isDE ? "Online ausfüllen" : "Fill out online"}
                  </h3>
                  <p style={{color:'var(--text-secondary)', margin:'12px 0 24px'}}>
                    {isDE
                      ? "Füllen Sie den Anamnesebogen direkt hier aus und laden Sie ihn anschließend als ausgefüllte PDF herunter."
                      : "Fill out the medical history form right here and download it as a completed PDF."}
                  </p>
                  <button className="btn btn-primary" onClick={() => { setShowForm(true); window.scrollTo({top:0, behavior:'smooth'}); }}>
                    <Icon name="arrow-right" size={16}/>
                    {isDE ? "Jetzt ausfüllen" : "Fill out now"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Band */}
          <section className="section np-cta">
            <div className="container">
              <div className="leistungen-cta reveal">
                <div className="eyebrow">{isDE ? "Termin vereinbaren" : "Book an appointment"}</div>
                <h2 className="display-lg" style={{marginTop:'12px'}}>
                  {isDE
                    ? <>Wir freuen uns auf Ihren <em className="italic-accent">Besuch</em>.</>
                    : <>We look forward to your <em className="italic-accent">visit</em>.</>}
                </h2>
                <p className="body-lg">
                  {isDE
                    ? "Vereinbaren Sie jetzt einen Termin — wir nehmen uns Zeit für eine ausführliche Erstuntersuchung."
                    : "Book an appointment now — we take the time for a thorough initial examination."}
                </p>
                <div className="btn-row">
                  <button className="btn btn-primary" onClick={() => setTerminOpen(true)}>
                    {isDE ? "Termin vereinbaren" : "Book appointment"} <Icon name="arrow-right" size={16} className="btn-arrow"/>
                  </button>
                  <a href="leistungen.html" className="btn btn-secondary">
                    {isDE ? "Unsere Leistungen" : "Our services"}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="np-form-main">
          <div className="container">
            <AnamneseForm lang={lang} onBack={() => { setShowForm(false); window.scrollTo({top:0, behavior:'smooth'}); }}/>
          </div>
        </main>
      )}

      <Footer/>
      <TerminModal open={terminOpen} onClose={() => setTerminOpen(false)}/>
      <CookieBanner/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<NeupatientenApp/>);
