// Tech Spotlight (3D-ish tooth), Testimonials, Termin CTA, Standort, FAQ, Footer
const { useState: useS3, useEffect: useE3 } = React;

// ----- Scan visual (bold tooth outline + scan-line animation) -----
const ScanVisual = () => (
  <div className="tech-3d">
    <span className="tech-tag t1">Intraoraler 3D-Scanner</span>
    <span className="tech-tag t2">Digitales Röntgen</span>
    <div className="scan-visual">
      <div className="scan-glow"></div>
      <svg className="scan-tooth" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
        {/* Tooth outline traced from PNG icon */}
        <path d="
          M 78 68
          C 60 68, 30 82, 28 120
          C 26 150, 38 178, 52 206
          C 60 222, 68 240, 76 248
          C 80 252, 84 250, 86 244
          C 90 232, 92 216, 94 200
          C 95 190, 98 184, 100 182
          C 102 184, 105 190, 106 200
          C 108 216, 110 232, 114 244
          C 116 250, 120 252, 124 248
          C 132 240, 140 222, 148 206
          C 162 178, 174 150, 172 120
          C 170 82, 140 68, 122 68
          C 112 68, 106 74, 100 80
          C 94 74, 88 68, 78 68
          Z
        " fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
      <div className="scan-line"></div>
    </div>
  </div>
);

const TechSpotlight = () => (
  <section className="section tech-spotlight">
    <div className="container">
      <div className="tech-grid">
        <div>
          <div className="eyebrow">Moderne Zahnheilkunde</div>
          <h2 className="display-lg">Präzision, die man <em className="italic-accent" style={{color:'#9CC4A1'}}>sehen</em> kann.</h2>
          <p className="body-lg" style={{marginTop:'24px'}}>Moderne Zahnmedizin ist heute deutlich mehr als Bohren und Füllen. Mit digitaler Diagnostik, präzisen intraoralen 3D-Aufnahmen und enger Zusammenarbeit mit zahntechnischen Meisterlaboren erreichen wir Ergebnisse, die noch vor wenigen Jahren undenkbar waren.</p>
          <ul className="tech-bullets">
            <li><Icon name="check" size={20}/><span>Digitales Röntgen für minimale Strahlenbelastung</span></li>
            <li><Icon name="check" size={20}/><span>3D-Scans für präzise Diagnose und Herstellung von hochwertigem Zahnersatz</span></li>
            <li><Icon name="check" size={20}/><span>Zertifizierte Meisterlabor-Partner</span></li>
          </ul>
          <a href="leistungen.html" className="btn-tertiary" style={{color:'#9CC4A1'}}>Unsere Leistungen ansehen <Icon name="arrow-right" size={14} className="btn-arrow"/></a>
        </div>
        <ScanVisual/>
      </div>
    </div>
  </section>
);

// ----- Deko-Bild: Zahn & Tulpen -----
const DekoSection = () => (
  <div className="deko-section">
    <div className="container">
      <img
        src="assets/keramik-zahn-tulpen-deko.jpg"
        alt="Zahnmedizin mit Herz - Keramik-Zahn und Tulpen"
        className="deko-image deko-image-float-right"
        loading="lazy"
      />
    </div>
  </div>
);

// ----- Testimonials -----
const TESTI = [
  { quote: "Endlich eine Praxis, in der man sich wirklich Zeit nimmt. Frau Dr. Jahn hat mir alles geduldig erklärt, ich gehe zum ersten Mal gerne zum Zahnarzt.", author: "Sabine M.", meta: "Patientin seit 2019" },
  { quote: "Sehr professionell, sehr menschlich. Die Behandlung war absolut schmerzfrei, das Ergebnis übertrifft meine Erwartungen.", author: "Markus K.", meta: "Patient seit 2021" },
  { quote: "Ich war ein klassischer Angstpatient. Hier habe ich gelernt, dass es auch anders geht. Vielen Dank an das gesamte Team.", author: "Julia R.", meta: "über Google" },
];
const Testimonials = () => (
  <section className="section">
    <div className="container">
      <div className="section-header">
        <div className="eyebrow">Was unsere Patient:innen sagen</div>
        <h2 className="display-lg">Vertrauen, <em className="italic-accent">gewachsen</em> über Jahre.</h2>
      </div>
      <div className="testimonials-grid">
        {TESTI.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="testimonial-quote-mark">"</div>
            <div className="testimonial-stars">
              {[...Array(5)].map((_,j) => <Icon key={j} name="star" size={14}/>)}
            </div>
            <p className="testimonial-text">{t.quote}</p>
            <div className="testimonial-divider"></div>
            <p className="testimonial-author">{t.author}</p>
            <p className="testimonial-meta">{t.meta}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ----- Booking calendar — up to 3 Wunschtermine, real month navigation, mailto: submission -----
const PRAXIS_EMAIL = "empfang@zahnarztpraxis-schwabing.de";
const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const WDAYS = ["So","Mo","Di","Mi","Do","Fr","Sa"];

// ----- Sub-Components for UX Improvements -----
const CalProgressDots = ({ currentStep }) => (
  <div className="cal-progress-dots">
    <div className={`cal-progress-dot ${currentStep >= 1 ? 'active' : ''}`}></div>
    <div className="cal-progress-line"></div>
    <div className={`cal-progress-dot ${currentStep >= 2 ? 'active' : ''}`}></div>
    <div className="cal-progress-line"></div>
    <div className={`cal-progress-dot ${currentStep >= 3 ? 'active' : ''}`}></div>
  </div>
);

const CalStickyHeader = ({ slots, currentStep, onCallClick }) => {
  const parseLocal = ds => { const [y,m,d] = ds.split('-').map(Number); return new Date(y, m-1, d); };
  const fmtCompact = s => {
    const d = parseLocal(s.date);
    return `${WDAYS[d.getDay()]} ${d.getDate()}.${d.getMonth()+1}. · ${s.time}`;
  };

  return (
    <div className="cal-sticky-header">
      <CalProgressDots currentStep={currentStep} />
      {slots.length > 0 && (
        <div className="cal-compact-slots">
          {slots.map((s, i) => (
            <div key={i} className="cal-compact-slot">
              <span className="cal-compact-num">{i+1}</span>
              <span className="cal-compact-text">{fmtCompact(s)}</span>
            </div>
          ))}
        </div>
      )}
      <button className="cal-quick-call-btn" onClick={onCallClick}>
        <Icon name="phone" size={14}/>
        <span>Anrufen?</span>
      </button>
    </div>
  );
};

const CalPhoneDivider = ({ phoneRef }) => (
  <div ref={phoneRef} className="cal-phone-divider">
    <div className="cal-phone-header">
      <Icon name="phone" size={24}/>
      <h4>Oder lieber direkt anrufen?</h4>
    </div>
    <p className="cal-phone-subtitle">Erreichen Sie uns sofort – keine Wartezeit.</p>
    <div className="cal-phone-cards">
      <a href="tel:+498938808687" className="cal-phone-card">
        <div className="cal-phone-avatar">
          <img src="assets/dr-jahn.jpg" alt="Dr. Jahn" loading="lazy"/>
        </div>
        <div className="cal-phone-info">
          <p className="cal-phone-name">Dr. Irene Jahn</p>
          <p className="cal-phone-number font-mono">089 38 80 86 87</p>
        </div>
        <Icon name="arrow-right" size={18}/>
      </a>
      <a href="tel:+498938889500" className="cal-phone-card">
        <div className="cal-phone-avatar">
          <img src="assets/dr-hancock-diener.jpg" alt="Dr. Hancock-Diener" loading="lazy"/>
        </div>
        <div className="cal-phone-info">
          <p className="cal-phone-name">Dr. Hancock-Diener</p>
          <p className="cal-phone-number font-mono">089 38 88 95 00</p>
        </div>
        <Icon name="arrow-right" size={18}/>
      </a>
    </div>
  </div>
);

const CalCollapsedSummary = ({ onExpand }) => (
  <div className="cal-collapsed-summary">
    <div className="cal-collapsed-check">
      <Icon name="check" size={20}/>
    </div>
    <div className="cal-collapsed-text">
      <p className="cal-collapsed-title">3 Wunschtermine ausgewählt</p>
      <p className="cal-collapsed-sub">Ihre Termine sind gespeichert</p>
    </div>
    <button className="cal-collapsed-btn" onClick={onExpand}>
      Termine ändern
    </button>
  </div>
);

const { useRef: useFR } = React;

const CalendarBooking = () => {
  const now = new Date();
  const todayStr = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
  const [doctor, setDoctor] = useS3("jahn");
  const [vYear, setVYear] = useS3(now.getFullYear());
  const [vMonth, setVMonth] = useS3(now.getMonth());
  const [selDate, setSelDate] = useS3(null);
  const [slots, setSlots] = useS3([]);
  const [name, setName] = useS3("");
  const [email, setEmail] = useS3("");
  const [phone, setPhone] = useS3("");
  const [nachricht, setNachricht] = useS3("");
  const [consent, setConsent] = useS3(false);
  const [honeypot, setHoneypot] = useS3("");
  const [loading, setLoading] = useS3(false);
  const [sent, setSent] = useS3(false);
  const [error, setError] = useS3("");
  const [showCalendar, setShowCalendar] = useS3(true);

  const phoneRef = useFR(null);
  const calendarRef = useFR(null);
  const isInitialMount = useFR(true);

  const pad = n => String(n).padStart(2,'0');
  const dk = (y,m,d) => `${y}-${pad(m+1)}-${pad(d)}`;
  const daysInMonth = new Date(vYear, vMonth+1, 0).getDate();
  const firstDow = (new Date(vYear, vMonth, 1).getDay() + 6) % 7;

  const isWE = (y,m,d) => { const w = new Date(y,m,d).getDay(); return w===0||w===6; };
  const isPast = (y,m,d) => dk(y,m,d) < todayStr;

  const timesFor = (ds) => {
    const [y,m,d] = ds.split('-').map(Number);
    const dow = new Date(y, m-1, d).getDay();
    if (dow===0||dow===6) return [];
    const endH = dow===5 ? 16 : 18;
    const t = [];
    for (let h=8; h<endH; h++) { t.push(pad(h)+':00'); t.push(pad(h)+':30'); }
    return t;
  };

  const canPrev = vYear > now.getFullYear() || (vYear === now.getFullYear() && vMonth > now.getMonth());
  const maxFuture = new Date(now.getFullYear()+1, now.getMonth(), 1);
  const canNext = new Date(vYear, vMonth+1, 1) < maxFuture;
  const goPrev = () => { if(!canPrev) return; vMonth===0 ? (setVYear(vYear-1),setVMonth(11)) : setVMonth(vMonth-1); setSelDate(null); };
  const goNext = () => { if(!canNext) return; vMonth===11 ? (setVYear(vYear+1),setVMonth(0)) : setVMonth(vMonth+1); setSelDate(null); };

  const pickDate = d => { const key = dk(vYear, vMonth, d); setSelDate(selDate===key ? null : key); };
  const pickTime = t => {
    if (slots.length>=3) return;
    if (slots.some(s => s.date===selDate && s.time===t)) return;
    const newSlots = [...slots, {date:selDate, time:t}];
    setSlots(newSlots);
    setSelDate(null);
    setError("");
  };
  const removeSlot = i => {
    setSlots(slots.filter((_,j)=>j!==i));
    setShowCalendar(true);
  };

  // Auto-scroll when 3 slots are selected
  useE3(() => {
    if (slots.length === 3) {
      setShowCalendar(false);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion && phoneRef.current) {
        setTimeout(() => {
          phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    }
  }, [slots.length]);

  // Auto-scroll to calendar when doctor is selected (but not on initial mount)
  useE3(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (doctor && calendarRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        setTimeout(() => {
          calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
      }
    }
  }, [doctor]);

  const parseLocal = ds => { const [y,m,d] = ds.split('-').map(Number); return new Date(y, m-1, d); };
  const fmtSlot = s => {
    const d = parseLocal(s.date);
    return `${WDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS_DE[d.getMonth()]} ${d.getFullYear()} · ${s.time} Uhr`;
  };

  const canSubmit = slots.length>0 && name.trim() && email.trim() && phone.trim() && consent && !loading;

  const handleSubmit = async () => {
    setError("");

    // Client-seitige Validierung
    if (slots.length===0) { setError("Bitte wählen Sie mindestens einen Wunschtermin."); return; }
    if (!name.trim()) { setError("Bitte geben Sie Ihren Namen ein."); return; }
    if (!email.trim()) { setError("Bitte geben Sie Ihre E-Mail-Adresse ein."); return; }
    if (!phone.trim()) { setError("Bitte geben Sie Ihre Telefonnummer ein."); return; }
    if (!consent) { setError("Bitte stimmen Sie der Datenschutzerklärung zu."); return; }

    // E-Mail Format prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/termin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          telefon: phone.trim(),
          arzt: doctor,
          termine: slots,
          nachricht: nachricht.trim() || undefined,
          consent: consent,
          honeypot: honeypot
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Beim Versenden ist ein Fehler aufgetreten.');
      }

      setSent(true);
    } catch (err) {
      setError(err.message || 'Beim Versenden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) return (
    <div className="calendar-mock" style={{textAlign:'center', padding:'32px 0'}}>
      <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'var(--brand-soft)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
        <Icon name="check" size={24} style={{color:'var(--brand-primary)'}}/>
      </div>
      <h4 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'20px',marginBottom:'8px'}}>Anfrage erfolgreich versendet!</h4>
      <p style={{color:'var(--text-secondary)',fontSize:'14px',maxWidth:'40ch',margin:'0 auto 16px'}}>
        Vielen Dank für Ihre Terminanfrage. Wir melden uns in Kürze telefonisch bei Ihnen, um einen der Wunschtermine zu bestätigen.
      </p>
      <button className="btn btn-secondary" onClick={() => {
        setSent(false);
        setSlots([]);
        setName("");
        setEmail("");
        setPhone("");
        setNachricht("");
        setConsent(false);
        setError("");
      }}>
        Neue Anfrage
      </button>
    </div>
  );

  const times = selDate ? timesFor(selDate) : [];

  // Determine current step
  let currentStep = 1;
  if (doctor) currentStep = 2;
  if (slots.length > 0) currentStep = 2;
  if (slots.length === 3 || (name && email && phone)) currentStep = 3;

  const scrollToPhone = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && phoneRef.current) {
      phoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="calendar-mock">
      <CalStickyHeader slots={slots} currentStep={currentStep} onCallClick={scrollToPhone} />

      <div className="calendar-step">Schritt 1 · Ärztin wählen</div>
      <div className="calendar-doctors">
        <button className={`cal-doctor ${doctor==="hancock"?"selected":""}`} onClick={()=>setDoctor("hancock")}>Dr. Hancock-Diener</button>
        <button className={`cal-doctor ${doctor==="jahn"?"selected":""}`} onClick={()=>setDoctor("jahn")}>Dr. Jahn</button>
      </div>

      <div ref={calendarRef} className="calendar-step">Schritt 2 · Bis zu 3 Wunschtermine wählen</div>

      {slots.length > 0 && showCalendar && (
        <div className="cal-slots">
          {slots.map((s,i) => (
            <div key={i} className="cal-slot-chip">
              <span className="cal-slot-num">{i+1}</span>
              <span className="cal-slot-text">{fmtSlot(s)}</span>
              <button className="cal-slot-remove" onClick={()=>removeSlot(i)} aria-label="Entfernen">×</button>
            </div>
          ))}
        </div>
      )}

      {slots.length === 3 && !showCalendar ? (
        <CalCollapsedSummary onExpand={() => setShowCalendar(true)} />
      ) : slots.length < 3 ? (
        <>
          <div className="cal-booking-grid">
            <div className="cal-booking-col">
              <div className="cal-month-nav">
                <button className="cal-nav-btn" onClick={goPrev} disabled={!canPrev} aria-label="Vorheriger Monat">
                  <Icon name="arrow-left" size={16}/>
                </button>
                <span className="cal-month-label">{MONTHS_DE[vMonth]} {vYear}</span>
                <button className="cal-nav-btn" onClick={goNext} disabled={!canNext} aria-label="Nächster Monat">
                  <Icon name="arrow-right" size={16}/>
                </button>
              </div>

              <div className="calendar-grid">
                {["Mo","Di","Mi","Do","Fr","Sa","So"].map(d => <div key={d} className="cal-day cal-day-header">{d}</div>)}
                {Array.from({length:firstDow}, (_,i) => <div key={"e"+i} className="cal-day"></div>)}
                {Array.from({length:daysInMonth}, (_,i) => {
                  const d = i+1;
                  const we = isWE(vYear, vMonth, d);
                  const past = isPast(vYear, vMonth, d);
                  const dis = we || past;
                  const key = dk(vYear, vMonth, d);
                  const sel = selDate === key;
                  const slotted = slots.some(s => s.date === key);
                  return (
                    <button key={d}
                      className={`cal-day ${dis?"disabled":"available"} ${sel?"selected":""} ${slotted?"slotted":""}`}
                      disabled={dis}
                      onClick={() => !dis && pickDate(d)}>
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {selDate && times.length > 0 && (
              <div className="cal-booking-col">
                <div className="calendar-step" style={{marginTop:'0px'}}>
                  Uhrzeit wählen · {WDAYS[parseLocal(selDate).getDay()]}, {parseLocal(selDate).getDate()}. {MONTHS_DE[parseLocal(selDate).getMonth()]}
                </div>
                <div className="cal-times">
                  {times.map(t => {
                    const picked = slots.some(s => s.date===selDate && s.time===t);
                    return (
                      <button key={t}
                        className={`cal-time ${picked?"taken":""}`}
                        disabled={picked}
                        onClick={() => !picked && pickTime(t)}>
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {slots.length > 0 && slots.length < 3 && !selDate && (
            <p className="cal-hint" style={{color:'var(--brand-primary)'}}>
              <Icon name="plus" size={14}/> Noch {3-slots.length} Wunschtermin{3-slots.length>1?'e':''} möglich,  wählen Sie ein weiteres Datum.
            </p>
          )}
        </>
      ) : null}

      {slots.length > 0 && <CalPhoneDivider phoneRef={phoneRef} />}

      <div className="calendar-step">Schritt 3 · Ihre Kontaktdaten</div>
      <div className="cal-contact">
        <input
          type="text"
          className="cal-input"
          placeholder="Ihr Name *"
          value={name}
          onChange={e=>setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="cal-input"
          placeholder="Ihre E-Mail *"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          className="cal-input"
          placeholder="Telefonnummer für Rückruf *"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
          required
        />
        <textarea
          className="cal-input"
          placeholder="Nachricht (optional)"
          value={nachricht}
          onChange={e=>setNachricht(e.target.value)}
          maxLength={500}
          rows={3}
          style={{resize:'vertical',fontFamily:'inherit'}}
        />
        <p style={{fontSize:'12px',color:'var(--text-secondary)',margin:'-4px 0 12px',lineHeight:'1.4'}}>
          <Icon name="info" size={12} style={{verticalAlign:'text-top'}}/> Bitte keine medizinischen Details oder Beschwerden hier eintragen — diese besprechen wir telefonisch oder vor Ort.
        </p>

        {/* Honeypot (versteckt für Menschen, sichtbar für Bots) */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={e=>setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          style={{position:'absolute',left:'-9999px',width:'1px',height:'1px'}}
          aria-hidden="true"
        />

        {/* DSGVO Consent Checkbox */}
        <label style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'13px',lineHeight:'1.5',color:'var(--text-secondary)',cursor:'pointer',marginTop:'8px'}}>
          <input
            type="checkbox"
            checked={consent}
            onChange={e=>setConsent(e.target.checked)}
            style={{marginTop:'2px',cursor:'pointer',accentColor:'var(--brand-primary)'}}
            required
          />
          <span>
            Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener noreferrer" style={{color:'var(--brand-primary)',textDecoration:'underline'}}>Datenschutzerklärung</a> gelesen und willige in die Verarbeitung meiner Daten zur Bearbeitung meiner Terminanfrage ein. *
          </span>
        </label>
      </div>

      {error && <p style={{color:'#c0392b',fontSize:'13px',margin:'12px 0 0',padding:'12px',background:'#fee',borderRadius:'6px',border:'1px solid #fcc'}}>{error}</p>}

      <button
        className="btn btn-primary"
        style={{marginTop:'12px',width:'100%',justifyContent:'center',opacity:canSubmit?1:0.5}}
        onClick={handleSubmit}
        disabled={!canSubmit || loading}
      >
        {loading ? (
          <>Wird gesendet...</>
        ) : (
          <>Wunschtermin{slots.length>1?'e':''} anfragen <Icon name="arrow-right" size={16} className="btn-arrow"/></>
        )}
      </button>
      <p className="cal-hint">
        <Icon name="phone" size={14}/> Wir melden uns telefonisch bei Ihnen, um einen der Termine zu bestätigen.
      </p>
    </div>
  );
};

// ----- WIZARD BOOKING SYSTEM -----
const useWizard = () => {
  const now = new Date();
  const [currentStep, setCurrentStep] = useS3(1);
  const [wizardData, setWizardData] = useS3({
    doctor: "jahn",
    selectedDates: [],
    selectedSlots: [],
    name: "",
    email: "",
    phone: "",
    nachricht: "",
    consent: false,
    honeypot: ""
  });

  const [viewMonth, setViewMonth] = useS3(now.getMonth());
  const [viewYear, setViewYear] = useS3(now.getFullYear());
  const [loading, setLoading] = useS3(false);
  const [error, setError] = useS3("");
  const [direction, setDirection] = useS3('forward');

  const canProceed = (step) => {
    switch(step) {
      case 1: return !!wizardData.doctor;
      case 2: return wizardData.selectedDates.length > 0;
      case 3: return wizardData.selectedSlots.length > 0;
      case 4: return wizardData.name.trim() &&
                     wizardData.email.trim() &&
                     wizardData.phone.trim() &&
                     wizardData.consent;
      default: return false;
    }
  };

  const goNext = () => {
    if (currentStep < 5 && canProceed(currentStep)) {
      setDirection('forward');
      setTimeout(() => setCurrentStep(currentStep + 1), 50);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setDirection('back');
      setTimeout(() => setCurrentStep(currentStep - 1), 50);
    }
  };

  const updateData = (field, value) => {
    setWizardData({ ...wizardData, [field]: value });
  };

  const reset = () => {
    setCurrentStep(1);
    setWizardData({
      doctor: "jahn",
      selectedDates: [],
      selectedSlots: [],
      name: "",
      email: "",
      phone: "",
      nachricht: "",
      consent: false,
      honeypot: ""
    });
    setError("");
    setLoading(false);
  };

  return {
    currentStep,
    wizardData,
    viewMonth,
    viewYear,
    loading,
    error,
    direction,
    canProceed,
    goNext,
    goBack,
    updateData,
    setCurrentStep,
    setViewMonth,
    setViewYear,
    setLoading,
    setError,
    reset
  };
};

const WizardProgress = ({ currentStep }) => {
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  if (currentStep === 5) return null;

  return (
    <div className="wizard-progress">
      <div className="wizard-progress-label">
        Schritt {currentStep} von {totalSteps}
      </div>
      <div className="wizard-progress-track">
        <div className="wizard-progress-fill" style={{width: `${progress}%`}} />
      </div>
    </div>
  );
};

const WizardFooter = ({ currentStep, canProceed, onBack, onNext, onSubmit, loading }) => {
  const showBack = currentStep > 1 && currentStep < 5;
  const showNext = currentStep < 4;
  const showSubmit = currentStep === 4;

  return (
    <div className="wizard-footer">
      {showBack && (
        <button className="btn btn-secondary wizard-btn-back" onClick={onBack}>
          <Icon name="arrow-left" size={16}/> Zurück
        </button>
      )}
      <div className="wizard-footer-spacer"></div>
      {showNext && (
        <button
          className="btn btn-primary wizard-btn-next"
          onClick={onNext}
          disabled={!canProceed}
        >
          Weiter <Icon name="arrow-right" size={16}/>
        </button>
      )}
      {showSubmit && (
        <button
          className="btn btn-primary wizard-btn-submit"
          onClick={onSubmit}
          disabled={!canProceed || loading}
        >
          {loading ? "Wird gesendet..." : "Anfrage senden"}
        </button>
      )}
    </div>
  );
};

const WizardStep1DoctorSelect = ({ doctor, onSelect }) => {
  return (
    <div className="wizard-content-inner">
      <h2 className="wizard-step-title">Bei wem möchten Sie einen Termin?</h2>
      <p className="wizard-step-subtitle">Wählen Sie Ihre bevorzugte Ärztin aus</p>
      <div className="wizard-doctor-grid">
        <button
          className={`wizard-doctor-card ${doctor === "jahn" ? "selected" : ""}`}
          onClick={() => onSelect("jahn")}
        >
          <div className="wizard-doctor-avatar">
            <img src="assets/dr-jahn.jpg" alt="Dr. Irene Jahn" loading="lazy"/>
          </div>
          <p className="wizard-doctor-name">Dr. Irene Jahn</p>
          <div className="wizard-doctor-check">
            <Icon name="check" size={16}/>
          </div>
        </button>
        <button
          className={`wizard-doctor-card ${doctor === "hancock" ? "selected" : ""}`}
          onClick={() => onSelect("hancock")}
        >
          <div className="wizard-doctor-avatar">
            <img src="assets/dr-hancock-diener.jpg" alt="Dr. Hancock-Diener" loading="lazy"/>
          </div>
          <p className="wizard-doctor-name">Dr. Hancock-Diener</p>
          <div className="wizard-doctor-check">
            <Icon name="check" size={16}/>
          </div>
        </button>
      </div>
    </div>
  );
};

const WizardStep2DatePicker = ({ selectedDates, onToggleDate, viewMonth, viewYear, onPrevMonth, onNextMonth, onNext }) => {
  const now = new Date();
  const todayStr = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
  const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
  const WDAYS_SHORT = ["Mo","Di","Mi","Do","Fr","Sa","So"];

  const pad = n => String(n).padStart(2,'0');
  const dk = (y,m,d) => `${y}-${pad(m+1)}-${pad(d)}`;
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const firstDow = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

  const isWE = (y,m,d) => { const w = new Date(y,m,d).getDay(); return w===0||w===6; };
  const isPast = (y,m,d) => dk(y,m,d) < todayStr;

  const canPrev = viewYear > now.getFullYear() || (viewYear === now.getFullYear() && viewMonth > now.getMonth());
  const maxFuture = new Date(now.getFullYear()+1, now.getMonth(), 1);
  const canNext = new Date(viewYear, viewMonth+1, 1) < maxFuture;

  const parseLocal = ds => { const [y,m,d] = ds.split('-').map(Number); return new Date(y, m-1, d); };
  const fmtDate = ds => {
    const d = parseLocal(ds);
    const WDAYS = ["So","Mo","Di","Mi","Do","Fr","Sa"];
    return `${WDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS_DE[d.getMonth()]}`;
  };

  return (
    <div className="wizard-content-inner">
      <h2 className="wizard-step-title">Wann hätten Sie Zeit?</h2>
      <p className="wizard-step-subtitle">Wählen Sie bis zu 3 Wunschtermine</p>

      {selectedDates.length > 0 && (
        <div className="wizard-selected-dates">
          {selectedDates.map((date, i) => (
            <div key={i} className="wizard-date-chip">
              <span>{fmtDate(date)}</span>
              <button className="wizard-date-chip-remove" onClick={() => onToggleDate(date)} aria-label="Entfernen">
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="wizard-calendar-nav">
        <button className="cal-nav-btn" onClick={onPrevMonth} disabled={!canPrev} aria-label="Vorheriger Monat">
          <Icon name="arrow-left" size={16}/>
        </button>
        <span className="wizard-calendar-month">{MONTHS_DE[viewMonth]} {viewYear}</span>
        <button className="cal-nav-btn" onClick={onNextMonth} disabled={!canNext} aria-label="Nächster Monat">
          <Icon name="arrow-right" size={16}/>
        </button>
      </div>

      <div className="calendar-grid">
        {WDAYS_SHORT.map(d => <div key={d} className="cal-day cal-day-header">{d}</div>)}
        {Array.from({length:firstDow}, (_,i) => <div key={"e"+i} className="cal-day"></div>)}
        {Array.from({length:daysInMonth}, (_,i) => {
          const d = i+1;
          const we = isWE(viewYear, viewMonth, d);
          const past = isPast(viewYear, viewMonth, d);
          const dis = we || past || selectedDates.length >= 3;
          const key = dk(viewYear, viewMonth, d);
          const sel = selectedDates.includes(key);
          return (
            <button key={d}
              className={`cal-day ${dis && !sel?"disabled":"available"} ${sel?"selected":""}`}
              disabled={dis && !sel}
              onClick={() => onToggleDate(key)}>
              {d}
            </button>
          );
        })}
      </div>

      {selectedDates.length > 0 && selectedDates.length < 3 && (
        <div className="wizard-hint">
          <Icon name="plus" size={14}/>
          <span>Noch {3-selectedDates.length} Wunschtermin{3-selectedDates.length>1?'e':''} möglich</span>
        </div>
      )}

      {selectedDates.length > 0 && (
        <div className="wizard-inline-proceed">
          <div className="wizard-inline-proceed-message">
            <Icon name="check" size={18}/>
            <span>{selectedDates.length} {selectedDates.length === 1 ? 'Tag' : 'Tage'} gewählt</span>
          </div>
          <button className="btn btn-primary btn-sm wizard-inline-btn" onClick={onNext}>
            Weiter <Icon name="arrow-right" size={14}/>
          </button>
        </div>
      )}
    </div>
  );
};

const WizardStep3TimePicker = ({ selectedDates, selectedSlots, onToggleSlot, onNext }) => {
  const [activeDate, setActiveDate] = useS3(selectedDates[0] || null);
  const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
  const WDAYS = ["So","Mo","Di","Mi","Do","Fr","Sa"];

  const parseLocal = ds => { const [y,m,d] = ds.split('-').map(Number); return new Date(y, m-1, d); };
  const fmtDate = ds => {
    const d = parseLocal(ds);
    return `${WDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS_DE[d.getMonth()]}`;
  };

  const timesFor = (ds) => {
    const [y,m,d] = ds.split('-').map(Number);
    const dow = new Date(y, m-1, d).getDay();
    if (dow===0||dow===6) return [];
    const endH = dow===5 ? 16 : 18;
    const t = [];
    const pad = n => String(n).padStart(2,'0');
    for (let h=8; h<endH; h++) { t.push(pad(h)+':00'); t.push(pad(h)+':30'); }
    return t;
  };

  const times = activeDate ? timesFor(activeDate) : [];

  useE3(() => {
    if (selectedDates.length > 0 && !activeDate) {
      setActiveDate(selectedDates[0]);
    }
  }, [selectedDates]);

  return (
    <div className="wizard-content-inner">
      <h2 className="wizard-step-title">Wählen Sie EINE Uhrzeit</h2>
      <p className="wizard-step-subtitle">
        Sie können aus allen {selectedDates.length} {selectedDates.length === 1 ? 'Tag' : 'Tagen'} wählen
      </p>

      {selectedDates.length > 1 && (
        <div className="wizard-date-tabs">
          {selectedDates.map(date => (
            <button
              key={date}
              className={`wizard-date-tab ${activeDate === date ? "active" : ""}`}
              onClick={() => setActiveDate(date)}
            >
              {fmtDate(date)}
            </button>
          ))}
        </div>
      )}

      {selectedDates.length === 1 && (
        <div style={{marginBottom:'20px', textAlign:'center', fontSize:'15px', color:'var(--text-primary)', fontWeight:'500'}}>
          {fmtDate(activeDate)}
        </div>
      )}

      <div className="wizard-time-grid">
        {times.map(t => {
          const picked = selectedSlots.some(s => s.date===activeDate && s.time===t);
          const disabled = selectedSlots.some(s => s.date===activeDate && s.time===t);
          return (
            <button key={t}
              className={`wizard-time-slot ${picked?"selected":""}`}
              disabled={disabled && !picked}
              onClick={() => onToggleSlot(activeDate, t)}>
              {t}
            </button>
          );
        })}
      </div>

      {selectedSlots.length > 0 && (
        <div className="wizard-time-summary">
          <div className="wizard-time-summary-title">Gewählte Zeiten ({selectedSlots.length})</div>
          <div className="wizard-time-summary-list">
            {selectedSlots.map((s, i) => (
              <div key={i} className="wizard-time-summary-item">
                <Icon name="check" size={14}/>
                <span>{fmtDate(s.date)} · {s.time} Uhr</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSlots.length > 0 && (
        <div className="wizard-inline-proceed">
          <div className="wizard-inline-proceed-message">
            <Icon name="check" size={18}/>
            <span>Zeit gewählt</span>
          </div>
          <button className="btn btn-primary btn-sm wizard-inline-btn" onClick={onNext}>
            Weiter <Icon name="arrow-right" size={14}/>
          </button>
        </div>
      )}
    </div>
  );
};

const WizardStep4ContactForm = ({ wizardData, onUpdate, error }) => {
  const doctorName = wizardData.doctor === "jahn" ? "Dr. Jahn" : "Dr. Hancock-Diener";

  return (
    <div className="wizard-content-inner">
      <h2 className="wizard-step-title">Ihre Kontaktdaten</h2>
      <p className="wizard-step-subtitle">Damit wir Sie erreichen können</p>

      <div className="wizard-contact-summary">
        <div className="wizard-contact-summary-title">Ihre Auswahl</div>
        <div className="wizard-contact-summary-text">
          Termin bei {doctorName} · {wizardData.selectedSlots.length} Wunschtermin{wizardData.selectedSlots.length>1?'e':''}
        </div>
      </div>

      <div className="wizard-form">
        <div className="wizard-form-grid">
          <input
            type="text"
            className="wizard-input"
            placeholder="Ihr Name *"
            value={wizardData.name}
            onChange={e => onUpdate('name', e.target.value)}
            required
          />
          <input
            type="email"
            className="wizard-input"
            placeholder="Ihre E-Mail *"
            value={wizardData.email}
            onChange={e => onUpdate('email', e.target.value)}
            required
          />
        </div>
        <input
          type="tel"
          className="wizard-input"
          placeholder="Telefonnummer für Rückruf *"
          value={wizardData.phone}
          onChange={e => onUpdate('phone', e.target.value)}
          required
        />
        <textarea
          className="wizard-input wizard-textarea"
          placeholder="Nachricht (optional)"
          value={wizardData.nachricht}
          onChange={e => onUpdate('nachricht', e.target.value)}
          maxLength={500}
        />
        <div className="wizard-hint-text">
          <Icon name="info" size={12}/>
          <span>Bitte keine medizinischen Details oder Beschwerden hier eintragen — diese besprechen wir telefonisch oder vor Ort.</span>
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={wizardData.honeypot}
          onChange={e => onUpdate('honeypot', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          style={{position:'absolute',left:'-9999px',width:'1px',height:'1px'}}
          aria-hidden="true"
        />

        <label className="wizard-consent">
          <input
            type="checkbox"
            checked={wizardData.consent}
            onChange={e => onUpdate('consent', e.target.checked)}
            required
          />
          <span>
            Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> gelesen und willige in die Verarbeitung meiner Daten zur Bearbeitung meiner Terminanfrage ein. *
          </span>
        </label>
      </div>

      {error && <div className="wizard-error">{error}</div>}
    </div>
  );
};

const WizardStep5Success = ({ onClose, onNewRequest }) => {
  return (
    <div className="wizard-success">
      <div className="wizard-success-icon">
        <Icon name="check" size={40}/>
      </div>
      <h2 className="wizard-success-title">Anfrage erfolgreich versendet!</h2>
      <p className="wizard-success-text">
        Vielen Dank für Ihre Terminanfrage. Wir melden uns in Kürze telefonisch bei Ihnen, um einen der Wunschtermine zu bestätigen.
      </p>
      <div className="wizard-success-buttons">
        <button className="btn btn-secondary" onClick={onNewRequest}>
          Neue Anfrage
        </button>
        <button className="btn btn-primary" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
};

const CalendarWizard = ({ onClose }) => {
  const wizard = useWizard();

  const handleDoctorSelect = (doctor) => {
    wizard.updateData('doctor', doctor);
    setTimeout(() => wizard.goNext(), 300);
  };

  const handleToggleDate = (date) => {
    const dates = wizard.wizardData.selectedDates;
    if (dates.includes(date)) {
      wizard.updateData('selectedDates', dates.filter(d => d !== date));
      wizard.updateData('selectedSlots', wizard.wizardData.selectedSlots.filter(s => s.date !== date));
    } else if (dates.length < 3) {
      wizard.updateData('selectedDates', [...dates, date]);
    }
  };

  const handlePrevMonth = () => {
    if (wizard.viewMonth === 0) {
      wizard.setViewYear(wizard.viewYear - 1);
      wizard.setViewMonth(11);
    } else {
      wizard.setViewMonth(wizard.viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (wizard.viewMonth === 11) {
      wizard.setViewYear(wizard.viewYear + 1);
      wizard.setViewMonth(0);
    } else {
      wizard.setViewMonth(wizard.viewMonth + 1);
    }
  };

  const handleToggleSlot = (date, time) => {
    const slots = wizard.wizardData.selectedSlots;
    const exists = slots.find(s => s.date === date && s.time === time);
    if (exists) {
      wizard.updateData('selectedSlots', slots.filter(s => !(s.date === date && s.time === time)));
    } else {
      const dateSlots = slots.filter(s => s.date === date);
      if (dateSlots.length === 0) {
        wizard.updateData('selectedSlots', [...slots, {date, time}]);
      } else {
        wizard.updateData('selectedSlots', slots.map(s => s.date === date ? {date, time} : s));
      }
    }
  };

  const handleSubmit = async () => {
    wizard.setError("");

    if (wizard.wizardData.selectedSlots.length === 0) {
      wizard.setError("Bitte wählen Sie mindestens einen Wunschtermin.");
      return;
    }
    if (!wizard.wizardData.name.trim()) {
      wizard.setError("Bitte geben Sie Ihren Namen ein.");
      return;
    }
    if (!wizard.wizardData.email.trim()) {
      wizard.setError("Bitte geben Sie Ihre E-Mail-Adresse ein.");
      return;
    }
    if (!wizard.wizardData.phone.trim()) {
      wizard.setError("Bitte geben Sie Ihre Telefonnummer ein.");
      return;
    }
    if (!wizard.wizardData.consent) {
      wizard.setError("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(wizard.wizardData.email.trim())) {
      wizard.setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    wizard.setLoading(true);

    try {
      const response = await fetch('/api/termin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: wizard.wizardData.name.trim(),
          email: wizard.wizardData.email.trim(),
          telefon: wizard.wizardData.phone.trim(),
          arzt: wizard.wizardData.doctor,
          termine: wizard.wizardData.selectedSlots,
          nachricht: wizard.wizardData.nachricht.trim() || undefined,
          consent: wizard.wizardData.consent,
          honeypot: wizard.wizardData.honeypot
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Momentan hohe Auslastung. Bitte in wenigen Minuten erneut versuchen oder direkt anrufen: 089 38 80 86 87');
        }
        throw new Error(data.error || 'Beim Versenden ist ein Fehler aufgetreten.');
      }

      wizard.setCurrentStep(5);
    } catch (err) {
      wizard.setError(err.message || 'Beim Versenden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.');
    } finally {
      wizard.setLoading(false);
    }
  };

  const handleClose = () => {
    if (wizard.currentStep > 1 && wizard.currentStep < 5) {
      const confirmed = window.confirm(
        'Möchten Sie die Terminanfrage wirklich abbrechen? Ihre Eingaben gehen verloren.'
      );
      if (confirmed) {
        wizard.reset();
        if (onClose) onClose();
      }
    } else {
      if (onClose) onClose();
    }
  };

  const handleNewRequest = () => {
    wizard.reset();
  };

  const renderStep = () => {
    switch(wizard.currentStep) {
      case 1:
        return <WizardStep1DoctorSelect doctor={wizard.wizardData.doctor} onSelect={handleDoctorSelect} />;
      case 2:
        return (
          <WizardStep2DatePicker
            selectedDates={wizard.wizardData.selectedDates}
            onToggleDate={handleToggleDate}
            viewMonth={wizard.viewMonth}
            viewYear={wizard.viewYear}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onNext={wizard.goNext}
          />
        );
      case 3:
        return (
          <WizardStep3TimePicker
            selectedDates={wizard.wizardData.selectedDates}
            selectedSlots={wizard.wizardData.selectedSlots}
            onToggleSlot={handleToggleSlot}
            onNext={wizard.goNext}
          />
        );
      case 4:
        return (
          <WizardStep4ContactForm
            wizardData={wizard.wizardData}
            onUpdate={wizard.updateData}
            error={wizard.error}
          />
        );
      case 5:
        return <WizardStep5Success onClose={handleClose} onNewRequest={handleNewRequest} />;
      default:
        return null;
    }
  };

  return (
    <div className="wizard-container">
      <WizardProgress currentStep={wizard.currentStep} />
      <div className="wizard-content">
        {renderStep()}
      </div>
      {wizard.currentStep < 5 && (
        <WizardFooter
          currentStep={wizard.currentStep}
          canProceed={wizard.canProceed(wizard.currentStep)}
          onBack={wizard.goBack}
          onNext={wizard.goNext}
          onSubmit={handleSubmit}
          loading={wizard.loading}
        />
      )}
    </div>
  );
};

const TerminCTA = ({ onOpenTermin }) => {
  const [tab, setTab] = useS3("online");
  return (
    <section className="section">
      <div className="container">
        <div className="termin-cta">
          <div className="termin-grid">
            <div>
              <div className="eyebrow">Termin vereinbaren</div>
              <h2 className="display-lg">Bereit für Ihr <em className="italic-accent" style={{color:'#9CC4A1'}}>schönstes Lächeln</em>?</h2>
              <p className="body-lg lead">Wählen Sie Ihren Wunschtermin,  wir rufen Sie zurück und bestätigen. Oder erreichen Sie uns direkt telefonisch.</p>
              <div style={{display:'flex',gap:'24px',alignItems:'center',color:'#C9D5CB',fontSize:'14px',flexWrap:'wrap'}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:'8px'}}>
                  <Icon name="clock" size={18}/> Mo–Do 8–18 Uhr · Fr 8–16 Uhr - mögliche Abweichungen im Einzelfall
                </div>
                <div style={{display:'inline-flex',alignItems:'center',gap:'8px'}}>
                  <Icon name="phone" size={18}/> Rückruf werktags &lt; 24 h
                </div>
              </div>
            </div>
            <div className="booking-card">
              <div className="booking-tabs">
                <button className={`booking-tab ${tab === "online" ? "active" : ""}`} onClick={() => setTab("online")}>Wunschtermin</button>
                <button className={`booking-tab ${tab === "call" ? "active" : ""}`} onClick={() => setTab("call")}>Anrufen</button>
              </div>
              {tab === "online" ? (
                <CalendarWizard/>
              ) : (
                <div className="call-cards">
                  <a href="tel:+498938808687" className="call-card">
                    <div className="call-avatar"><img src="assets/dr-jahn.jpg" alt="" loading="lazy"/></div>
                    <div>
                      <p className="call-name">Dr. Irene Jahn</p>
                      <p className="call-number">089 38 80 86 87</p>
                    </div>
                    <Icon name="arrow-right" size={18} className="arrow"/>
                  </a>
                  <a href="tel:+498938889500" className="call-card">
                    <div className="call-avatar"><img src="assets/dr-hancock-diener.jpg" alt="" loading="lazy"/></div>
                    <div>
                      <p className="call-name">Dr. Hancock-Diener</p>
                      <p className="call-number">089 38 88 95 00</p>
                    </div>
                    <Icon name="arrow-right" size={18} className="arrow"/>
                  </a>
                  <div className="notfall-box">
                    <Icon name="alert" size={20}/>
                    <span>Außerhalb der Sprechzeiten: <strong><a href="https://www.notdienst-zahn.de" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent-warning)'}}>www.notdienst-zahn.de</a></strong> oder <strong><a href="tel:01805908008">01805 908008</a></strong> (14 Ct/Min.)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ----- STANDORT -----
const StylizedMap = () => (
  <svg className="map-svg" viewBox="0 0 600 480" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="600" height="480" fill="#EDE7D7"/>
    {/* park (Englischer Garten) */}
    <path d="M380 0 Q 420 100 480 180 Q 540 260 600 320 L 600 0 Z" fill="#D6DEC2"/>
    <path d="M380 0 Q 420 100 480 180 Q 540 260 600 320" stroke="#B8C4A0" strokeWidth="1.5" fill="none"/>
    {/* river */}
    <path d="M520 0 Q 480 80 500 180 Q 520 280 480 360 Q 460 420 480 480" stroke="#9FB7C9" strokeWidth="6" fill="none" opacity="0.6"/>
    {/* main streets */}
    <line x1="0" y1="240" x2="600" y2="240" stroke="#FFFFFF" strokeWidth="6"/>
    <line x1="0" y1="240" x2="600" y2="240" stroke="#D9CFB5" strokeWidth="1"/>
    <line x1="300" y1="0" x2="300" y2="480" stroke="#FFFFFF" strokeWidth="6"/>
    <line x1="300" y1="0" x2="300" y2="480" stroke="#D9CFB5" strokeWidth="1"/>
    <line x1="0" y1="120" x2="380" y2="120" stroke="#FFFFFF" strokeWidth="4"/>
    <line x1="0" y1="360" x2="600" y2="360" stroke="#FFFFFF" strokeWidth="4"/>
    <line x1="150" y1="0" x2="150" y2="480" stroke="#FFFFFF" strokeWidth="4"/>
    <line x1="450" y1="0" x2="450" y2="480" stroke="#FFFFFF" strokeWidth="4"/>
    {/* minor */}
    <line x1="0" y1="60" x2="380" y2="60" stroke="#FFFFFF" strokeWidth="2"/>
    <line x1="0" y1="180" x2="380" y2="180" stroke="#FFFFFF" strokeWidth="2"/>
    <line x1="0" y1="300" x2="600" y2="300" stroke="#FFFFFF" strokeWidth="2"/>
    <line x1="0" y1="420" x2="600" y2="420" stroke="#FFFFFF" strokeWidth="2"/>
    <line x1="75" y1="0" x2="75" y2="480" stroke="#FFFFFF" strokeWidth="2"/>
    <line x1="225" y1="0" x2="225" y2="480" stroke="#FFFFFF" strokeWidth="2"/>
    <line x1="375" y1="0" x2="375" y2="480" stroke="#FFFFFF" strokeWidth="2"/>
    {/* blocks */}
    {[[20,260,40,30],[80,260,60,30],[160,260,55,30],[230,260,65,30],[310,260,55,30],[380,260,60,30],[470,260,30,30],
      [20,310,40,40],[80,310,60,40],[160,310,55,40],[230,310,65,40],[310,310,55,40],[380,310,60,40],
      [20,180,40,50],[80,180,60,50],[160,180,55,50],[230,180,65,50]].map((b,i) => (
      <rect key={i} x={b[0]} y={b[1]} width={b[2]} height={b[3]} fill="#FFFFFF" opacity="0.7" rx="2"/>
    ))}
    {/* labels */}
    <text x="540" y="120" fontFamily="Inter" fontSize="11" fill="#7A8B62" fontWeight="500">Englischer Garten</text>
    <text x="100" y="232" fontFamily="Inter" fontSize="10" fill="#A89878">Leopoldstraße</text>
    <text x="310" y="100" fontFamily="Inter" fontSize="10" fill="#A89878">Münchner Freiheit</text>
    <text x="170" y="270" fontFamily="Inter" fontSize="9" fill="#A89878" fontWeight="500">Friedrichstr.</text>
    {/* U-Bahn marker */}
    <circle cx="300" cy="120" r="8" fill="#1F3A28"/>
    <text x="300" y="124" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#FFFFFF" fontWeight="700">U</text>
  </svg>
);

const Standort = () => (
  <section id="standort" className="section" style={{background:'var(--bg-subtle)'}}>
    <div className="container">
      <div className="section-header left" style={{maxWidth:'none', textAlign:'left', marginBottom:'48px'}}>
        <div className="eyebrow">So finden Sie uns</div>
        <h2 className="display-lg">Mitten in <em className="italic-accent">Schwabing</em>.</h2>
      </div>
      <div className="standort-grid">
        <div className="map-wrap">
          <iframe
            className="map-embed"
            src="https://www.google.com/maps?q=Friedrichstra%C3%9Fe+33,+80801+M%C3%BCnchen&output=embed&hl=de&z=16"
            title="Praxis-Standort Friedrichstraße 33, München"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
          <a
            className="map-overlay"
            href="https://www.google.com/maps/dir/?api=1&destination=Friedrichstra%C3%9Fe+33,+80801+M%C3%BCnchen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="pin" size={20} style={{color:'var(--brand-primary)'}}/>
            <div>
              <div className="map-overlay-text">Friedrichstraße 33</div>
              <div className="map-overlay-sub">Route in Google Maps öffnen →</div>
            </div>
          </a>
        </div>
        <div className="standort-info">
          <div className="info-block">
            <div className="info-label">Adresse</div>
            <div className="info-content">Friedrichstraße 33<br/>80801 München (Schwabing)</div>
          </div>
          <div className="info-block">
            <div className="info-label">Praxisöffnungszeiten</div>
            <div className="info-content">
              <div className="hours-table">
                <span className="day">Mo – Do</span><span className="time">8 – 18 Uhr</span>
                <span className="day">Fr</span><span className="time">8 – 16 Uhr</span>
                <span className="day">Sa, So</span><span className="time" style={{color:'var(--text-muted)'}}>geschlossen</span>
              </div>
            </div>
          </div>
          <div className="info-block">
            <div className="info-label">Kernzeiten Dr. Jahn</div>
            <div className="info-content">
              <div className="hours-table">
                <span className="day">Mo</span><span className="time">9 – 13 Uhr</span>
                <span className="day">Di, Mi</span><span className="time">8 – 17:30 Uhr</span>
                <span className="day">Fr</span><span className="time">8 – 15:30 Uhr</span>
              </div>
            </div>
          </div>
          <div className="info-block">
            <div className="info-label">Kernzeiten Dr. Hancock-Diener</div>
            <div className="info-content">
              <div className="hours-table">
                <span className="day">Mo – Do</span><span className="time">8:30 – 18 Uhr</span>
                <span className="day">Fr</span><span className="time">8:30 – 14 Uhr</span>
              </div>
              <p style={{fontSize:'13px', color:'var(--text-muted)', marginTop:'8px'}}>Abweichungen im Einzelfall möglich.</p>
            </div>
          </div>
          <div className="info-block">
            <div className="info-label">Anfahrt</div>
            <div className="info-content body-md" style={{color:'var(--text-secondary)'}}>
              <div>U-Bahn: U3/U6 Münchner Freiheit, ca. 7–10 Min. Fußweg.</div>
              <div style={{marginTop:'6px'}}>
                Bus ab Münchner Freiheit:<br/>
                Linie 53 Ri. Aidenbachstr. / Linie 59 Ri. Ackermannbogen<br/>
                2 Stationen bis Haltestelle Friedrichstr.
              </div>
            </div>
          </div>
          <div className="info-block">
            <div className="info-label">Telefon</div>
            <div className="info-content" style={{display:'flex',flexDirection:'column',gap:'6px'}}>
              <a href="tel:+498938808687" className="font-mono" style={{color:'var(--brand-primary)'}}>089 38 80 86 87 <span style={{color:'var(--text-muted)',fontSize:'13px'}}>· Dr. Jahn</span></a>
              <a href="tel:+498938889500" className="font-mono" style={{color:'var(--brand-primary)'}}>089 38 88 95 00 <span style={{color:'var(--text-muted)',fontSize:'13px'}}>· Dr. Hancock-Diener</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ----- FAQ -----
const FAQS = [
  { q: "Wie vereinbare ich einen Termin?", a: "Wählen Sie online Ihren Wunschtermin,  wir rufen Sie anschließend zurück, um den Termin zu bestätigen. Alternativ erreichen Sie uns telefonisch zu unseren Sprechzeiten unter den Direktnummern beider Ärztinnen." },
  { q: "Was sollte ich zum ersten Termin mitbringen?", a: "Versicherungskarte, Bonusheft (falls vorhanden), frühere Röntgenbilder (vorab mailen oder zum Arztkontakt bereithalten), eine Liste aktueller Medikamente und gegebenenfalls Ihren Allergie-Pass. Bei Kindern bitte das Kinder-Untersuchungsheft." },
  { q: "Welche Krankenkassen werden akzeptiert?", a: "Wir behandeln gesetzlich und privat versicherte Patient:innen sowie Selbstzahler. Bei Privatleistungen erstellen wir Ihnen vorab einen transparenten Heil- und Kostenplan." },
  { q: "Wie lange dauert eine professionelle Zahnreinigung?", a: "Eine PZR dauert in der Regel 45 bis 60 Minuten inklusive Beratung, Reinigung schwer zugänglicher Stellen, Politur und Fluoridierung." },
  { q: "Behandeln Sie auch Angstpatienten?", a: "Ja und das ist uns besonders wichtig. Wir nehmen uns Zeit, beginnen mit einem Erstgespräch ohne Behandlung und stimmen jeden weiteren Schritt mit Ihnen ab." },
  { q: "Was passiert bei einem Notfall außerhalb der Sprechzeiten?", a: "Wenden Sie sich an den zahnärztlichen Notdienst unter www.notdienst-zahn.de oder telefonisch unter 01805 908008 (14 Ct/Min.). Der Notdienst ist rund um die Uhr erreichbar." },
];
const FAQ = () => {
  const [open, setOpen] = useS3(0);
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Häufig gefragt</div>
          <h2 className="display-lg">Antworten <em className="italic-accent">vor</em> dem ersten Besuch.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-trigger" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq-icon"><Icon name="plus" size={14}/></span>
              </button>
              <div className="faq-content" style={{maxHeight: open === i ? '300px' : '0px'}}>
                <div className="faq-content-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----- FOOTER -----
const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#top" className="logo-link">
            <div className="logo-mark" aria-hidden="true"></div>
            <div className="logo-text">
              <span className="logo-name">Hancock-Diener &amp; Jahn</span>
              <span className="logo-sub">Zahnmedizin Schwabing</span>
            </div>
          </a>
          <p>Praxisgemeinschaft für Zahnmedizin in München-Schwabing. Friedrichstraße 33, 80801 München.</p>
          <div className="footer-status"><LiveStatus compact/></div>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Praxis</div>
          <ul>
            <li><a href="#ueber">Über uns</a></li>
            <li><a href="team.html">Team</a></li>
            <li><a href="praxistour.html">Praxis-Tour</a></li>
            <li><a href="neupatienten.html">Neupatienten</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Leistungen</div>
          <ul>
            <li><a href="leistungen.html#prophylaxe">Prophylaxe & Zahnerhaltung</a></li>
            <li><a href="leistungen.html#aesthetik">Ästhetik & Bleaching</a></li>
            <li><a href="leistungen.html#chirurgie">Implantologie & Chirurgie</a></li>
            <li><a href="leistungen.html#schienen">Schienentherapie</a></li>
            <li><a href="leistungen.html#kinder">Kinderzahnheilkunde</a></li>
            <li><a href="leistungen.html#angst">Hilfe bei Zahnarztangst</a></li>
            <li><a href="leistungen.html" style={{color:'var(--brand-primary)'}}>Alle Leistungen →</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Kontakt</div>
          <ul>
            <li><a href="tel:+498938808687" className="font-mono">089 38 80 86 87</a></li>
            <li><a href="tel:+498938889500" className="font-mono">089 38 88 95 00</a></li>
            <li><a href="mailto:empfang@zahnarztpraxis-schwabing.de">E-Mail</a></li>
            <li><a href="https://www.notdienst-zahn.de" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent-warning)'}}>Notdienst: www.notdienst-zahn.de / 01805 908008</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Praxisgemeinschaft Dr. Hancock-Diener &amp; Dr. Jahn</span>
        <span style={{display:'flex',gap:'24px'}}>
          <a href="impressum.html">Impressum</a>
          <a href="datenschutz.html">Datenschutz</a>
          <a href="#">Cookie-Einstellungen</a>
        </span>
      </div>
    </div>
  </footer>
);

// ----- TERMIN MODAL -----
const TerminModal = ({ open, onClose }) => {
  const [tab, setTab] = useS3("online");
  useE3(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return (
    <div className={`modal-backdrop ${open ? "open" : ""}`} onClick={onClose} aria-hidden={!open}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Schließen"><Icon name="x" size={18}/></button>
        <div className="modal-logo">
          <div className="logo-mark" style={{width: '64px', height: '64px'}} aria-hidden="true"></div>
        </div>
        <div className="modal-header">
          <h3>Wunschtermin anfragen</h3>
          <p>Wählen Sie Ihren Wunschtermin,  wir rufen Sie zur Bestätigung zurück.</p>
          <div className="booking-tabs">
            <button className={`booking-tab ${tab === "online" ? "active" : ""}`} onClick={() => setTab("online")}>Wunschtermin</button>
            <button className={`booking-tab ${tab === "call" ? "active" : ""}`} onClick={() => setTab("call")}>Anrufen</button>
          </div>
        </div>
        <div className="modal-body">
          {tab === "online" ? <CalendarWizard onClose={onClose}/> : (
            <div className="call-cards">
              <a href="tel:+498938808687" className="call-card">
                <div className="call-avatar"><img src="assets/dr-jahn.jpg" alt="" loading="lazy"/></div>
                <div>
                  <p className="call-name">Dr. Irene Jahn</p>
                  <p className="call-number">089 38 80 86 87</p>
                </div>
                <Icon name="arrow-right" size={18} className="arrow"/>
              </a>
              <a href="tel:+498938889500" className="call-card">
                <div className="call-avatar"><img src="assets/dr-hancock-diener.jpg" alt="" loading="lazy"/></div>
                <div>
                  <p className="call-name">Dr. Hancock-Diener</p>
                  <p className="call-number">089 38 88 95 00</p>
                </div>
                <Icon name="arrow-right" size={18} className="arrow"/>
              </a>
              <div className="notfall-box">
                <Icon name="alert" size={20}/>
                <span>Außerhalb der Sprechzeiten: <strong><a href="https://www.notdienst-zahn.de" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent-warning)'}}>www.notdienst-zahn.de</a></strong> oder <strong><a href="tel:01805908008">01805 908008</a></strong> (14 Ct/Min.)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ----- COOKIE BANNER -----
const CookieBanner = () => {
  const [show, setShow] = useS3(false);
  useE3(() => {
    const seen = localStorage.getItem("cookies-seen");
    if (!seen) setTimeout(() => setShow(true), 1200);
  }, []);
  const accept = () => {
    localStorage.setItem("cookies-seen", "1");
    setShow(false);
  };
  return (
    <div className={`cookie-banner ${show ? "show" : ""}`}>
      <div className="cookie-text">
        Wir verwenden Cookies, um unsere Website zu verbessern. Sie können auswählen, welche Sie zulassen möchten. Mehr in unserer <a href="datenschutz.html" style={{color:'var(--brand-primary)',textDecoration:'underline'}}>Datenschutzerklärung</a>.
      </div>
      <div className="cookie-actions">
        <button className="btn btn-secondary" onClick={accept}>Nur notwendige</button>
        <button className="btn btn-primary" onClick={accept}>Alle akzeptieren</button>
      </div>
    </div>
  );
};

window.TechSpotlight = TechSpotlight;
window.DekoSection = DekoSection;
window.Testimonials = Testimonials;
window.TerminCTA = TerminCTA;
window.Standort = Standort;
window.FAQ = FAQ;
window.Footer = Footer;
window.TerminModal = TerminModal;
window.CookieBanner = CookieBanner;
