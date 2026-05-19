// Landing page sections
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

// ----- HERO -----
const Hero = ({ onOpenTermin }) => (
  <section id="top" className="hero">
    <div className="container">
      <div className="hero-grid">
        <div>
          <div className="eyebrow hero-eyebrow">Zahnmedizin in München-Schwabing</div>
          <h1 className="display-xl">Bewährtes und Fortschritt für Ihr <em className="italic-accent">Lächeln</em>.</h1>
          <p className="body-xl hero-sub">Praxisgemeinschaft Dr. Birte Hancock-Diener und Dr. Irene Jahn. Wir nehmen uns Zeit für Ihre Gesundheit, Ihre Ästhetik, Ihr Wohlbefinden.</p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={onOpenTermin}>
              Termin vereinbaren <Icon name="arrow-right" size={16} className="btn-arrow" />
            </button>
            <a href="#leistungen" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById("leistungen").scrollIntoView({ behavior: "smooth" }); }}>
              Unsere Leistungen
            </a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src="assets/praxis-empfang.jpg" alt="Empfang der Praxis" />
          <div className="hero-badge">
            <div className="check"><Icon name="check" size={16} /></div>
            <div className="hero-badge-text">
              <div className="hero-badge-title">Meisterlabor-Qualität</div>
              <div className="hero-badge-sub">Partnerschaft seit 25+ & 30+ Jahren</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ----- TRUST BAR -----
const TRUST = [
  { icon: "shield", text: "20+ Jahre Praxis-Erfahrung" },
  { icon: "award", text: "Meisterlabor-Partnerschaft" },
  { icon: "clock", text: "Terminanfrage" },
  { icon: "leaf", text: "Sanfte Behandlungsmethoden" },
  { icon: "pin", text: "Friedrichstraße 33, Schwabing" },
];
const TrustBar = () => (
  <div className="trustbar">
    <div className="trustbar-track">
      {[0, 1].map(copy => (
        <div key={copy} className="trustbar-inner" aria-hidden={copy === 1 ? "true" : undefined}>
          {TRUST.map((t, i) => (
            <div key={i} className="trust-item">
              <Icon name={t.icon} size={20} />
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// ----- INTRO -----
const Intro = () => (
  <section id="ueber" className="section">
    <div className="container">
      <div className="intro-grid">
        <div className="intro-image">
          <img src="assets/praxis-flur-neu.jpg" alt="Flur der Praxis" loading="lazy" />
        </div>
        <div className="intro-text">
          <div className="eyebrow">Willkommen</div>
          <h2 className="display-lg">Eine Praxisgemeinschaft, die sich <em className="italic-accent">Zeit</em> nimmt.</h2>
          <p className="body-lg">Seit über 20 Jahren führen Dr. Birte Hancock-Diener und Dr. Irene Jahn ihre Praxis in der Schwabinger Friedrichstraße. Was uns ausmacht: Wir hören zu, bevor wir behandeln. Wir erklären, bevor wir beginnen. Und wir arbeiten Hand in Hand mit hervorragenden deutschen zahntechnischen Meisterlaboren.</p>
          <p className="body-lg">Ob Vorsorge, Implantat, Wurzelbehandlung oder ästhetische Korrektur. Bei uns sind Sie nicht ein Termin im Kalender, sondern ein Mensch mit individuellen Wünschen.</p>
          <a href="team.html" className="btn-tertiary">Mehr über uns erfahren <Icon name="arrow-right" size={14} className="btn-arrow" /></a>
        </div>
      </div>
    </div>
  </section>
);

// ----- LEISTUNGEN -----
const SERVICES = [
  { icon: "shield-tooth", title: "Prophylaxe & Zahnerhaltung", desc: "Zahnerhaltung, professionelle Zahnreinigung, Parodontologie und Endodontologie.  Vorsorge ist die beste Medizin.", items: [{label:"Zahnerhaltung / Prophylaxe", slug:"zahnerhaltung-prophylaxe"}, {label:"Parodontologie", slug:"parodontologie"}, {label:"Endodontologie", slug:"endodontologie"}], anchor: "prophylaxe" },
  { icon: "smile", title: "Ästhetik", desc: "Bleaching und ästhetische Korrekturen, für ein Lächeln, das zu Ihnen passt.", items: [{label:"Ästhetik und Funktion", slug:"aesthetik-funktion"}, {label:"Bleaching", slug:"bleaching"}], anchor: "aesthetik" },
  { icon: "implant", title: "Implantologie & Chirurgie", desc: "Hochwertiger, langlebiger Zahnersatz und schonende oralchirurgische Eingriffe.", items: [{label:"Implantologie", slug:"implantologie"}, {label:"Oralchirurgie / Kieferchirurgie", slug:"oralchirurgie"}], anchor: "chirurgie" },
  { icon: "moon", title: "Schienentherapie", desc: "Knirschen, Schnarchen, Migräne und sanfte Zahnkorrektur mit Alignern.", items: [{label:"Schienentherapie", slug:"schienentherapie"}, {label:"Schnarchschienen", slug:"schnarchschienen"}, {label:"NTI Aufbiss-Schienen", slug:"nti-aufbiss-schienen"}, {label:"Zahnkorrektur Schienen", slug:"zahnkorrektur-schienen"}], anchor: "schienen" },
  { icon: "smile", title: "Kinderzahnheilkunde", desc: "Sanfter, spielerischer Einstieg,  schon ab dem ersten Zahn.", items: [{label:"Kinderzahnheilkunde", slug:"kinderzahnheilkunde"}], anchor: "kinder" },
  { icon: "heart", title: "Hilfe bei Zahnarztangst", desc: "Zeit, Verständnis und Behandlung im eigenen Tempo.", items: [{label:"Hilfe bei Zahnarztangst", slug:"zahnarztangst"}], anchor: "angst" },
];
const Leistungen = () => (
  <section id="leistungen" className="section" style={{ background: "var(--bg-subtle)" }}>
    <div className="container">
      <div className="section-header">
        <div className="eyebrow">Unsere Leistungen</div>
        <h2 className="display-lg">Zahnmedizin in <em className="italic-accent">ihrer ganzen Breite</em>.</h2>
        <p className="body-lg">13 Behandlungsbereiche, alles unter einem Dach.</p>
      </div>
      <div className="leistungen-grid">
        {SERVICES.map((s, i) => (
          <div key={i} className="service-card" style={{display:'flex', flexDirection:'column'}}>
            <div className="icon-box"><Icon name={s.icon} size={24} /></div>
            <h3 className="heading-md">{s.title}</h3>
            <p className="body-md">{s.desc}</p>
            <ul style={{listStyle:'none', padding:0, margin:'12px 0 16px', display:'flex', flexDirection:'column', gap:'2px'}}>
              {s.items.map((it, j) => (
                <li key={j}>
                  <a href={`leistung.html#${it.slug}`} style={{fontSize:'13px', color:'var(--text-secondary)', display:'flex', alignItems:'center', gap:'8px', padding:'4px 0', textDecoration:'none', transition:'color 150ms'}} onMouseEnter={e => e.currentTarget.style.color = 'var(--brand-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                    <span style={{width:'4px', height:'4px', borderRadius:'50%', background:'var(--brand-primary)', flexShrink:0}}></span>
                    <span style={{flex:1}}>{it.label}</span>
                    <Icon name="arrow-right" size={12} />
                  </a>
                </li>
              ))}
            </ul>
            <a href={`leistungen.html#${s.anchor}`} className="btn-tertiary" style={{marginTop:'auto', alignSelf:'flex-start'}}>Bereich ansehen <Icon name="arrow-right" size={14} className="btn-arrow" /></a>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center', marginTop:'48px'}}>
        <a href="leistungen.html" className="btn btn-secondary">Alle Leistungen ansehen <Icon name="arrow-right" size={16} className="btn-arrow"/></a>
      </div>
    </div>
  </section>
);

// ----- WERTE -----
const Werte = () => (
  <section className="section werte">
    <div className="container">
      <div className="section-header">
        <div className="eyebrow">Unsere Werte</div>
        <h2 className="display-lg"><em className="italic-accent">Bewährtes</em> und Fortschritt.</h2>
      </div>
      <div className="werte-grid">
        <div className="wert-card">
          <span className="wert-num">01</span>
          <h3 className="heading-lg">Wir nehmen uns Zeit</h3>
          <p>Beratung, Diagnose, Behandlung: alles in Ruhe. Bei uns sind Sie kein Termin im Minutentakt, sondern Mensch mit individuellen Bedürfnissen.</p>
        </div>
        <div className="wert-card">
          <span className="wert-num">02</span>
          <h3 className="heading-lg">Unsere Partner</h3>
          <p style={{marginBottom:'16px'}}>Über 25 bzw. 30 Jahre Zusammenarbeit mit deutschen zahntechnischen Meisterlaboren und kompetenten Partnerpraxen.</p>
          <div style={{fontSize:'14px', lineHeight:'1.6'}}>
            <strong style={{display:'block', marginBottom:'8px', color:'var(--text-primary)'}}>Meisterlabore:</strong>
            <a href="https://www.oraldesign-chiemsee.de/" target="_blank" rel="noopener noreferrer" style={{display:'block', color:'var(--brand-primary)', textDecoration:'underline', marginBottom:'4px'}}>Oraldesign Chiemsee</a>
            <a href="https://zahnwerk-dreilinden.de/" target="_blank" rel="noopener noreferrer" style={{display:'block', color:'var(--brand-primary)', textDecoration:'underline', marginBottom:'12px'}}>Zahnwerk Dreilinden</a>
            <strong style={{display:'block', marginBottom:'8px', color:'var(--text-primary)'}}>Partnerpraxen:</strong>
            <a href="https://kfo-am-kaiserplatz.de/" target="_blank" rel="noopener noreferrer" style={{display:'block', color:'var(--brand-primary)', textDecoration:'underline', marginBottom:'4px'}}>Kieferorthopädie am Kaiserplatz</a>
            <a href="https://zahnplanet.de/" target="_blank" rel="noopener noreferrer" style={{display:'block', color:'var(--brand-primary)', textDecoration:'underline'}}>Zahnplanet</a>
          </div>
        </div>
        <div className="wert-card">
          <span className="wert-num">03</span>
          <h3 className="heading-lg">Erfahrung, die wirkt</h3>
          <p>Zwei Zahnärztinnen, drei Jahrzehnte Praxiserfahrung, regelmäßige Fortbildungen.  Sie sind in fachkundigen Händen.</p>
        </div>
      </div>
    </div>
  </section>
);

// ----- TEAM -----
const Team = ({ onOpenTermin }) => {
  const teamRef = useRef2(null);
  useEffect2(() => {
    if (!teamRef.current) return;
    const cards = teamRef.current.querySelectorAll('.team-card');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = [...cards].indexOf(e.target);
          setTimeout(() => e.target.classList.add('pop'), idx * 200);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return (
  <section id="team" className="section">
    <div className="container">
      <div className="section-header">
        <div className="eyebrow">Ihre Zahnärztinnen</div>
        <h2 className="display-lg">Zwei Zahnärztinnen, <em className="italic-accent">ein Anspruch</em>.</h2>
      </div>
      <div className="team-grid" ref={teamRef}>
        <div className="team-card">
          <div className="team-photo">
            <img src="assets/dr-hancock-diener.jpg" alt="Dr. Birte Hancock-Diener" loading="lazy" />
          </div>
          <div className="team-content">
            <h3 className="team-name">Dr. Birte Hancock-Diener</h3>
            <p className="team-role">Zahnärztin</p>
            <div className="team-tags">
              <span className="team-tag">Ästhetik</span>
              <span className="team-tag">Implantate</span>
              <span className="team-tag">Zahnerhaltung</span>
            </div>
            <p className="team-bio">Seit über 25 Jahren begleitet sie Patient:innen, von der ersten Beratung bis zur fertigen Versorgung. Ihr Anspruch: individuelle Behandlung, ehrliche Aufklärung und Ergebnisse, die langfristig überzeugen.</p>
            <div className="team-actions">
              <button className="btn btn-primary" onClick={onOpenTermin}>Termin bei Dr. Hancock-Diener</button>
              <a href="team.html" className="btn-tertiary">Unser Team <Icon name="arrow-right" size={14} className="btn-arrow" /></a>
            </div>
          </div>
        </div>
        <div className="team-card">
          <div className="team-photo">
            <img src="assets/dr-jahn.jpg" alt="Dr. Irene Jahn" loading="lazy" />
          </div>
          <div className="team-content">
            <h3 className="team-name">Dr. Irene Jahn</h3>
            <p className="team-role">Zahnärztin</p>
            <div className="team-tags">
              <span className="team-tag">Ästhetik</span>
              <span className="team-tag">Zahnerhaltung</span>
              <span className="team-tag">Angstpatienten</span>
            </div>
            <p className="team-bio">Ihr Ziel ist es, natürliche Zähne so lange wie möglich zu erhalten. Besonderes Augenmerk legt sie auf einfühlsame Beratung,  gerade bei Patient:innen, die den Zahnarztbesuch mit Sorge verbinden.</p>
            <div className="team-actions">
              <button className="btn btn-primary" onClick={onOpenTermin}>Termin bei Dr. Jahn</button>
              <a href="team.html" className="btn-tertiary">Unser Team <Icon name="arrow-right" size={14} className="btn-arrow" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

window.Hero = Hero;
window.TrustBar = TrustBar;
window.Intro = Intro;
window.Leistungen = Leistungen;
window.Werte = Werte;
window.Team = Team;
