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
      <div className="testimonials-footer" style={{flexWrap:'wrap'}}>
        <a href="https://www.google.com/maps?cid=1265538615126076787" target="_blank" rel="noopener noreferrer" className="google-rating-link">
          <Icon name="google" size={18}/>
          <span><strong style={{color:'var(--text-primary)'}}>5.0 / 5</strong> · 21 Bewertungen</span>
          <span style={{color:'var(--text-muted)',fontSize:'13px'}}>Dr. Hancock-Diener</span>
          <Icon name="arrow-up-right" size={14} style={{color:'var(--brand-primary)'}}/>
        </a>
        <a href="https://www.google.com/maps?cid=14794690419727512583" target="_blank" rel="noopener noreferrer" className="google-rating-link">
          <Icon name="google" size={18}/>
          <span><strong style={{color:'var(--text-primary)'}}>4.4 / 5</strong> · 7 Bewertungen</span>
          <span style={{color:'var(--text-muted)',fontSize:'13px'}}>Dr. Jahn</span>
          <Icon name="arrow-up-right" size={14} style={{color:'var(--brand-primary)'}}/>
        </a>
      </div>
    </div>
  </section>
);

// ----- Booking calendar — up to 3 Wunschtermine, real month navigation, mailto: submission -----
const PRAXIS_EMAIL = "empfang@zahnarztpraxis-schwabing.de";
const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const WDAYS = ["So","Mo","Di","Mi","Do","Fr","Sa"];

const CalendarBooking = () => {
  const now = new Date();
  const todayStr = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
  const [doctor, setDoctor] = useS3("jahn");
  const [vYear, setVYear] = useS3(now.getFullYear());
  const [vMonth, setVMonth] = useS3(now.getMonth());
  const [selDate, setSelDate] = useS3(null);
  const [slots, setSlots] = useS3([]);
  const [name, setName] = useS3("");
  const [phone, setPhone] = useS3("");
  const [sent, setSent] = useS3(false);
  const [error, setError] = useS3("");

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
    setSlots([...slots, {date:selDate, time:t}]);
    setSelDate(null);
    setError("");
  };
  const removeSlot = i => setSlots(slots.filter((_,j)=>j!==i));

  const parseLocal = ds => { const [y,m,d] = ds.split('-').map(Number); return new Date(y, m-1, d); };
  const fmtSlot = s => {
    const d = parseLocal(s.date);
    return `${WDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS_DE[d.getMonth()]} ${d.getFullYear()} · ${s.time} Uhr`;
  };

  const canSubmit = slots.length>0 && name.trim() && phone.trim();
  const handleSubmit = () => {
    if (slots.length===0) { setError("Bitte wählen Sie mindestens einen Wunschtermin."); return; }
    if (!name.trim()) { setError("Bitte geben Sie Ihren Namen ein."); return; }
    if (!phone.trim()) { setError("Bitte geben Sie Ihre Telefonnummer ein."); return; }
    const dn = doctor==="hancock" ? "Dr. Hancock-Diener" : "Dr. Jahn";
    const lines = slots.map((s,i) => `  Wunschtermin ${i+1}: ${fmtSlot(s)}`).join('\n');
    const subject = encodeURIComponent(`Terminanfrage von ${name.trim()} bei ${dn}`);
    const body = encodeURIComponent(
      `Neue Terminanfrage über die Website\n\nName: ${name.trim()}\nTelefon: ${phone.trim()}\nGewünschte Ärztin: ${dn}\n\n${lines}\n\nBitte kontaktieren Sie den/die Patient:in telefonisch zur Terminbestätigung.`
    );
    window.location.href = `mailto:${PRAXIS_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) return (
    <div className="calendar-mock" style={{textAlign:'center', padding:'32px 0'}}>
      <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'var(--brand-soft)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
        <Icon name="check" size={24} style={{color:'var(--brand-primary)'}}/>
      </div>
      <h4 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'20px',marginBottom:'8px'}}>Anfrage vorbereitet</h4>
      <p style={{color:'var(--text-secondary)',fontSize:'14px',maxWidth:'36ch',margin:'0 auto 16px'}}>
        Bitte senden Sie die E-Mail in Ihrem E-Mail-Programm ab. Wir melden uns telefonisch bei Ihnen.
      </p>
      <button className="btn btn-secondary" onClick={() => { setSent(false); setSlots([]); setName(""); setPhone(""); setError(""); }}>
        Neue Anfrage
      </button>
    </div>
  );

  const times = selDate ? timesFor(selDate) : [];

  return (
    <div className="calendar-mock">
      <div className="calendar-step">Schritt 1 · Ärztin wählen</div>
      <div className="calendar-doctors">
        <button className={`cal-doctor ${doctor==="hancock"?"selected":""}`} onClick={()=>setDoctor("hancock")}>Dr. Hancock-Diener</button>
        <button className={`cal-doctor ${doctor==="jahn"?"selected":""}`} onClick={()=>setDoctor("jahn")}>Dr. Jahn</button>
      </div>

      <div className="calendar-step">Schritt 2 · Bis zu 3 Wunschtermine wählen</div>

      {slots.length > 0 && (
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

      {slots.length < 3 && (
        <>
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

          {selDate && times.length > 0 && (
            <>
              <div className="calendar-step" style={{marginTop:'4px'}}>
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
            </>
          )}

          {slots.length > 0 && slots.length < 3 && !selDate && (
            <p className="cal-hint" style={{color:'var(--brand-primary)'}}>
              <Icon name="plus" size={14}/> Noch {3-slots.length} Wunschtermin{3-slots.length>1?'e':''} möglich,  wählen Sie ein weiteres Datum.
            </p>
          )}
        </>
      )}

      <div className="calendar-step">Schritt 3 · Ihre Kontaktdaten</div>
      <div className="cal-contact">
        <input type="text" className="cal-input" placeholder="Ihr Name" value={name} onChange={e=>setName(e.target.value)}/>
        <input type="tel" className="cal-input" placeholder="Telefonnummer für Rückruf" value={phone} onChange={e=>setPhone(e.target.value)}/>
      </div>

      {error && <p style={{color:'#c0392b',fontSize:'13px',margin:'8px 0 0'}}>{error}</p>}

      <button className="btn btn-primary" style={{marginTop:'8px',width:'100%',justifyContent:'center',opacity:canSubmit?1:0.5}} onClick={handleSubmit}>
        Wunschtermin{slots.length>1?'e':''} anfragen <Icon name="arrow-right" size={16} className="btn-arrow"/>
      </button>
      <p className="cal-hint">
        <Icon name="phone" size={14}/> Wir melden uns telefonisch bei Ihnen, um einen der Termine zu bestätigen.
      </p>
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
                <CalendarBooking/>
              ) : (
                <div className="call-cards">
                  <a href="tel:+498938808687" className="call-card">
                    <div className="call-avatar"><img src="assets/dr-jahn.jpg" alt=""/></div>
                    <div>
                      <p className="call-name">Dr. Irene Jahn</p>
                      <p className="call-number">089 38 80 86 87</p>
                    </div>
                    <Icon name="arrow-right" size={18} className="arrow"/>
                  </a>
                  <a href="tel:+498938889500" className="call-card">
                    <div className="call-avatar"><img src="assets/dr-hancock-diener.jpg" alt=""/></div>
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
            <div className="info-label">Öffnungszeiten</div>
            <div className="info-content">
              <div className="hours-table">
                <span className="day">Mo – Do</span><span className="time">8 – 18 Uhr</span>
                <span className="day">Fr</span><span className="time">8 – 16 Uhr</span>
                <span className="day">Sa, So</span><span className="time" style={{color:'var(--text-muted)'}}>geschlossen</span>
              </div>
              <p style={{fontSize:'13px', color:'var(--text-muted)', marginTop:'8px'}}>Abweichungen im Einzelfall möglich.</p>
            </div>
          </div>
          <div className="info-block">
            <div className="info-label">Anfahrt</div>
            <div className="info-content body-md" style={{color:'var(--text-secondary)'}}>U3/U6 Münchner Freiheit, ca. 7-10 Min. Fußweg.</div>
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
          {tab === "online" ? <CalendarBooking/> : (
            <div className="call-cards">
              <a href="tel:+498938808687" className="call-card">
                <div className="call-avatar"><img src="assets/dr-jahn.jpg" alt=""/></div>
                <div>
                  <p className="call-name">Dr. Irene Jahn</p>
                  <p className="call-number">089 38 80 86 87</p>
                </div>
                <Icon name="arrow-right" size={18} className="arrow"/>
              </a>
              <a href="tel:+498938889500" className="call-card">
                <div className="call-avatar"><img src="assets/dr-hancock-diener.jpg" alt=""/></div>
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
window.Testimonials = Testimonials;
window.TerminCTA = TerminCTA;
window.Standort = Standort;
window.FAQ = FAQ;
window.Footer = Footer;
window.TerminModal = TerminModal;
window.CookieBanner = CookieBanner;
