// Leistungen overview page — all 12 services from original site, grouped by 6 categories
const { useState: useLS, useEffect: useLE } = React;

const CATEGORIES = [
  {
    id: "prophylaxe",
    num: "01",
    eyebrow: "Vorsorge & Erhaltung",
    title: "Prophylaxe & Zahnerhaltung",
    intro: "Vorsorge ist die beste Medizin. Mit professioneller Reinigung, gezielter Parodontologie und schonender Wurzelbehandlung erhalten wir Ihre eigenen Zähne,  ein Leben lang.",
    duration: "30 – 90 Min.",
    coverage: "Gesetzlich + privat",
    image: "assets/praxis-behandlung.jpg",
    featured: {
      slug: "zahnerhaltung-prophylaxe",
      title: "Zahnerhaltung / Prophylaxe",
      desc: "Die professionelle Zahnreinigung ist die Basis Ihrer Zahngesundheit. Wir entfernen Beläge, dort wo die häusliche Pflege nicht hinkommt, sanft, gründlich und mit Zeit.",
      checks: [
        "Untersuchung und Befundung der Mundhöhle",
        "Entfernung von Zahnstein und Verfärbungen",
        "Politur, Fluoridierung und individuelle Beratung",
        "Empfohlen: 1–2× pro Jahr"
      ]
    },
    subs: [
      { slug: "parodontologie", icon: "shield", title: "Parodontologie", desc: "Behandlung von entzündetem Zahnfleisch und Zahnfleisch-Taschen, in zwei Phasen, schonend und gezielt." },
      { slug: "endodontologie", icon: "shield-tooth", title: "Endodontologie", desc: "Wurzelbehandlung mit modernen Verfahren. Heute fast immer schmerzarm und in den meisten Fällen erfolgreich." }
    ]
  },
  {
    id: "aesthetik",
    num: "02",
    eyebrow: "Form & Funktion",
    title: "Ästhetik",
    intro: "Ein Lächeln, das zu Ihnen passt. Sanfte ästhetische Korrekturen, natürlich, individuell, präzise umgesetzt mit unseren Meisterlabor-Partnern.",
    duration: "60–180 Min.",
    coverage: "Privatleistung / Eigenanteil",
    image: "assets/aesthetik-mund.jpg",
    featured: {
      slug: "aesthetik-funktion",
      title: "Ästhetik und Funktion",
      desc: "Ästhetik beginnt mit Funktion. Wir korrigieren mit Veneers, Kronen oder Composite-Bonding, immer im Einklang mit Ihrem Biss, Ihrer Sprache und Ihrer natürlichen Mimik.",
      checks: [
        "Beratung und gemeinsame Zielplanung",
        "Veneers aus Keramik oder Composite",
        "Form- und Farbkorrekturen",
        "Meisterlabor-gefertigte Präzisions-Arbeiten"
      ]
    },
    subs: [
      { slug: "bleaching", icon: "sparkle", title: "Bleaching", desc: "Sanfte Aufhellung Ihrer Zähne, als In-Office-Behandlung in der Praxis oder als individuell angepasste Home-Bleaching-Schiene für zu Hause." }
    ]
  },
  {
    id: "chirurgie",
    num: "03",
    eyebrow: "Zahnersatz & Eingriffe",
    title: "Implantologie & Chirurgie",
    intro: "Hochwertiger, langlebiger Zahnersatz auf Implantaten und schonende oralchirurgische Eingriffe, mit digitaler Diagnostik, computer-gestützter Planung und mikrochirurgischen Verfahren.",
    duration: "60 Min. – mehrere Sitzungen",
    coverage: "Privatleistung + Festzuschuss",
    image: "assets/implantate-camlog.jpg",
    featured: {
      slug: "implantologie",
      title: "Implantologie",
      desc: "Implantate ersetzen Zähne wie eigene. Aus Titan oder Keramik, mit individuell gefertigter Krone aus dem Meisterlabor. Ein Ergebnis, das Jahrzehnte halten kann.",
      checks: [
        "Digitale Diagnostik und Planung",
        "Schonendes Einsetzen unter lokaler Betäubung",
        "Versorgung mit Krone, Brücke oder Prothese",
        "Lebensdauer typischerweise 20+ Jahre"
      ]
    },
    subs: [
      { slug: "oralchirurgie", icon: "implant", title: "Oralchirurgie / Kieferchirurgie", desc: "Weisheitszähne, Wurzelspitzenresektion, Knochenaufbau: schonende Verfahren mit kurzer Heilungszeit." }
    ]
  },
  {
    id: "schienen",
    num: "04",
    eyebrow: "Schienen & Korrektur",
    title: "Schienentherapie",
    intro: "Knirschen, Schnarchen, Migräne, schiefe Zähne: moderne Schienen können viele Probleme sanft lösen. Jede Schiene wird individuell für Sie angefertigt.",
    duration: "Beratung 30 Min., Anpassung 1–2 Termine",
    coverage: "Teilweise Kassenleistung",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1400&q=80&auto=format&fit=crop",
    featured: {
      slug: "schienentherapie",
      title: "Schienentherapie",
      desc: "Bruxismus, das nächtliche Knirschen, schadet Zähnen und Kiefergelenk. Eine individuell angepasste Knirsch-Schiene schützt zuverlässig und entlastet die Muskulatur.",
      checks: [
        "Funktionsdiagnostik und Bissanalyse",
        "Individuelle Anfertigung im Meisterlabor",
        "Kontroll-Termine und Anpassung",
        "Kombinierbar mit Physiotherapie"
      ]
    },
    subs: [
      { slug: "schnarchschienen", icon: "moon", title: "Schnarchschienen", desc: "Sanfte Vorverlagerung des Unterkiefers während des Schlafs, wirksam bei leichter bis mittlerer Schlafapnoe." },
      { slug: "nti-aufbiss-schienen", icon: "shield", title: "NTI Aufbiss-Schienen", desc: "Kleine Aufbiss-Schiene gegen Spannungs-Kopfschmerz und Migräne. Sie entlastet die Kaumuskulatur gezielt." },
      { slug: "zahnkorrektur-schienen", icon: "sparkle", title: "Zahnkorrektur Schienen", desc: "Unsichtbare Aligner für sanfte Zahnkorrektur: herausnehmbar, transparent, alltagstauglich." }
    ]
  },
  {
    id: "kinder",
    num: "05",
    eyebrow: "Für die Kleinen",
    title: "Kinderzahnheilkunde",
    intro: "Ein guter erster Eindruck wirkt ein Leben lang. Wir nehmen uns Zeit, erklären spielerisch und schaffen positive Erinnerungen, schon ab dem ersten Zahn.",
    duration: "30–45 Min.",
    coverage: "Vollständig Kassenleistung",
    image: "assets/vertrauen-hand.jpg",
    featured: {
      slug: "kinderzahnheilkunde",
      title: "Kinderzahnheilkunde",
      desc: "Wir wollen, dass Ihr Kind den Zahnarzt-Besuch in guter Erinnerung behält. Mit ruhigem Tempo, kindgerechter Sprache und kleinen Mutproben statt großer Behandlungen.",
      checks: [
        "Erster Besuch ab dem ersten Zahn",
        "Spielerische Heranführung an Untersuchungen",
        "Versiegelung der bleibenden Zähne",
        "Eltern-Beratung zu Pflege und Ernährung"
      ]
    },
    subs: []
  },
  {
    id: "angst",
    num: "06",
    eyebrow: "Mit Verständnis",
    title: "Hilfe bei Zahnarztangst",
    intro: "Etwa 7 % der Erwachsenen vermeiden den Zahnarzt aus Angst. Bei uns ist das anders. Wir nehmen Ihre Angst ernst und behandeln in Ihrem Tempo.",
    duration: "Erstgespräch ohne Behandlung möglich",
    coverage: "Reguläre Kassenleistung",
    image: "assets/voegel-wanddeko.jpg",
    featured: {
      slug: "zahnarztangst",
      title: "Hilfe bei Zahnarztangst",
      desc: "Wir beginnen mit einem Erstgespräch, ohne Behandlung, ohne Druck. Sie zeigen uns, wie weit wir gehen dürfen. Pausen-Signal jederzeit. Keine Überraschungen.",
      checks: [
        "Erstgespräch ausschließlich zum Kennenlernen",
        "Schritt-für-Schritt-Ankündigung jeder Behandlung",
        "Vereinbartes Vereinbartes Pausen-Signal: Sie haben die Kontrolle",
        "Auf Wunsch Entspannungsverfahren oder leichte Sedierung"
      ]
    },
    subs: []
  }
];

const ALL_LEISTUNGEN_INDEX = [
  { num: "01", label: "Zahnerhaltung / Prophylaxe", anchor: "prophylaxe" },
  { num: "02", label: "Parodontologie", anchor: "prophylaxe" },
  { num: "03", label: "Endodontologie", anchor: "prophylaxe" },
  { num: "04", label: "Ästhetik und Funktion", anchor: "aesthetik" },
  { num: "05", label: "Bleaching", anchor: "aesthetik" },
  { num: "06", label: "Oralchirurgie / Kieferchirurgie", anchor: "chirurgie" },
  { num: "07", label: "Implantologie", anchor: "chirurgie" },
  { num: "08", label: "Schienentherapie", anchor: "schienen" },
  { num: "09", label: "Schnarchschienen", anchor: "schienen" },
  { num: "10", label: "NTI Aufbiss-Schienen", anchor: "schienen" },
  { num: "11", label: "Zahnkorrektur Schienen", anchor: "schienen" },
  { num: "12", label: "Kinderzahnheilkunde", anchor: "kinder" },
  { num: "13", label: "Hilfe bei Zahnarztangst", anchor: "angst" }
];

const APPROACH_STEPS = [
  { num: "01", title: "Erstgespräch & Diagnose", desc: "Wir nehmen uns Zeit, hören zu, untersuchen, klären auf. Ohne Druck, ohne vorgefertigte Behandlungspläne." },
  { num: "02", title: "Beratung & Heil-/Kostenplan", desc: "Sie bekommen einen verständlichen, transparenten Plan. Mit allen Optionen, Risiken und Kosten, schriftlich." },
  { num: "03", title: "Behandlung in Ihrem Tempo", desc: "Wir behandeln so sanft wie möglich, so gründlich wie nötig. Pausen sind jederzeit möglich. Sie behalten die Kontrolle." },
  { num: "04", title: "Nachsorge & Kontrolle", desc: "Nach der Behandlung bleiben wir an Ihrer Seite. Kontrolltermine, Recall-System und schnelle Hilfe bei Fragen." }
];

const CategorySection = ({ cat, alt, onOpenTermin }) => {
  return (
    <section id={cat.id} className={`cat-section ${alt ? "alt" : ""}`}>
      <div className="container">
        <div className="cat-header">
          <div className="cat-num">{cat.num}</div>
          <div className="cat-title-block">
            <div className="eyebrow">{cat.eyebrow}</div>
            <h2 className="display-lg">{cat.title}</h2>
            <p className="body-lg">{cat.intro}</p>
          </div>
          <div className="cat-meta">
            <span><strong>Dauer:</strong> {cat.duration}</span>
            <span><strong>Versicherung:</strong> {cat.coverage}</span>
          </div>
        </div>

        <div className="subleist-featured">
          <div className="subleist-featured-img">
            <img src={cat.image} alt={cat.featured.title} loading="lazy"/>
          </div>
          <div className="subleist-featured-content">
            <div className="eyebrow">Schwerpunkt</div>
            <h3>{cat.featured.title}</h3>
            <p className="body-md">{cat.featured.desc}</p>
            <ul className="checks">
              {cat.featured.checks.map((c, i) => (
                <li key={i}><Icon name="check" size={18}/><span>{c}</span></li>
              ))}
            </ul>
            <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
              <a href={`leistung.html#${cat.featured.slug}`} className="btn btn-primary">Mehr erfahren <Icon name="arrow-right" size={16} className="btn-arrow"/></a>
              <button className="btn btn-secondary" onClick={onOpenTermin}>Termin vereinbaren</button>
            </div>
          </div>
        </div>

        {cat.subs.length > 0 && (
          <div className={`subleist-grid ${cat.subs.length >= 3 ? 'cols3' : ''}`}>
            {cat.subs.map((s, i) => (
              <div key={i} className="subleist-card">
                <span className="num">{String(parseInt(cat.num) + i + 1).padStart(2, '0')}</span>
                <div className="icon-box"><Icon name={s.icon} size={22}/></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a href={`leistung.html#${s.slug}`} className="arrow-link">
                  Mehr erfahren <Icon name="arrow-right" size={14}/>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const LeistungenApp = () => {
  const [terminOpen, setTerminOpen] = useLS(false);

  useLE(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".cat-section, .leistungen-hero, .approach-band").forEach(el => {
      el.classList.add("reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Jump to anchor after React renders (handles homepage → leistungen.html#anchor)
  useLE(() => {
    const hash = window.location.hash.replace(/^#/, '').trim();
    if (!hash) return;
    // Wait two frames so all sections are mounted and laid out
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Header onOpenTermin={() => setTerminOpen(true)}/>

      <section className="leistungen-hero">
        <div className="container">
          <div className="breadcrumb" style={{marginBottom: '24px'}}>
            <a href="index.html">Start</a>
            <span className="sep">/</span>
            <span style={{color:'var(--text-primary)'}}>Leistungen</span>
          </div>
          <div className="leistungen-hero-grid">
            <div>
              <div className="eyebrow">Unsere Leistungen</div>
              <h1 className="display-2xl">Zahnmedizin in <em className="italic-accent">ihrer ganzen Breite</em>.</h1>
              <p className="body-xl" style={{color:'var(--text-secondary)', marginTop:'24px', maxWidth:'56ch'}}>
                Von der ersten Vorsorge bis zur hochpräzisen Implantologie, alles unter einem Dach. 13 Behandlungsbereiche, ein Anspruch: Ihre Zähne so lange wie möglich gesund erhalten.
              </p>
            </div>
            <div>
              <div className="leist-index">
                {ALL_LEISTUNGEN_INDEX.map((l, i) => (
                  <a key={i} href={`#${l.anchor}`} onClick={scrollTo(l.anchor)}>
                    <span className="num">{l.num}</span>
                    <span className="label-text">{l.label}</span>
                    <Icon name="arrow-right" size={14} className="arrow"/>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {CATEGORIES.map((cat, i) => (
        <CategorySection key={cat.id} cat={cat} alt={i % 2 === 1} onOpenTermin={() => setTerminOpen(true)}/>
      ))}

      <section className="approach-band cat-section">
        <div className="container">
          <div className="approach-grid">
            <div>
              <div className="eyebrow">Unser Vorgehen</div>
              <h2 className="display-lg">Vier Schritte. <em className="italic-accent" style={{color:'#9CC4A1'}}>Immer.</em></h2>
              <p style={{color:'#C9D5CB', marginTop:'24px', maxWidth:'40ch'}}>Egal, ob Routine-Kontrolle oder mehrjähriger Behandlungsplan, wir folgen demselben Prinzip: Verstehen, Aufklären, Behandeln, Begleiten.</p>
            </div>
            <div className="approach-steps">
              {APPROACH_STEPS.map((s, i) => (
                <div key={i} className="approach-step">
                  <div className="step-num">{s.num}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="leistungens-cta-section">
        <div className="container">
          <div className="leistungen-cta">
            <div className="eyebrow">Termin vereinbaren</div>
            <h2 className="display-lg" style={{marginTop:'12px'}}>Sie wissen nicht, <em className="italic-accent">was Sie brauchen?</em></h2>
            <p className="body-lg">Kein Problem. Kommen Sie zu einem unverbindlichen Erstgespräch, wir hören zu, schauen uns Ihre Zähne an und beraten Sie ehrlich. Ohne Vorab-Diagnose, ohne Druck.</p>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => setTerminOpen(true)}>
                Termin vereinbaren <Icon name="arrow-right" size={16} className="btn-arrow"/>
              </button>
              <a href="index.html" className="btn btn-secondary">Zurück zur Startseite</a>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
      <TerminModal open={terminOpen} onClose={() => setTerminOpen(false)}/>
      <CookieBanner/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<LeistungenApp/>);
