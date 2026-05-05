// Team page — full team showcase
const { useState: useTS, useEffect: useTE } = React;


const DOCTORS = [
  {
    slug: "hancock-diener",
    name: "Dr. Birte Hancock-Diener",
    role: "Zahnärztin · Inhaberin",
    photo: "assets/dr-hancock-diener.jpg",
    seit: "Praxis-Inhaberin seit 2006",
    tags: ["Ästhetik", "Implantate", "Zahnerhaltung"],
    bio: "Seit über 25 Jahren begleitet sie Patient:innen, von der ersten Beratung bis zur fertigen Versorgung. Ihr Anspruch: individuelle Behandlung, ehrliche Aufklärung und Ergebnisse, die langfristig überzeugen.",
    phone: "089 38 88 95 00",
    phoneHref: "tel:+498938889500"
  },
  {
    slug: "jahn",
    name: "Dr. Irene Jahn",
    role: "Zahnärztin · Inhaberin",
    photo: "assets/dr-jahn.jpg",
    seit: "Praxis-Inhaberin seit 2006",
    tags: ["Ästhetik", "Zahnerhaltung", "Angstpatienten"],
    bio: "Ihr Ziel ist es, natürliche Zähne so lange wie möglich zu erhalten. Besonderes Augenmerk legt sie auf einfühlsame Beratung, besonders bei Patient:innen, die den Zahnarztbesuch mit Sorge verbinden.",
    phone: "089 38 80 86 87",
    phoneHref: "tel:+498938808687"
  }
];

const STAFF = [
  { name: "Margit Leopold", role: "ZFA, Verwaltung, QM", initials: "ML", photo: "assets/team-leopold.jpg" },
  { name: "Nisveta Cerovina", role: "ZMA, ZMP, Prophylaxe (PZR)", initials: "NC", photo: "assets/team-cerovina.jpg" },
  { name: "Michaela Müller", role: "ZFA", initials: "MM", photo: "assets/team-michaela.jpg" },
  { name: "Bianca Hannemann", role: "ZFA, Assistenz, Prophylaxe (PZR)", initials: "BH", photo: "assets/team-bianca.jpg" },
  { name: "Yodit Hadgu", role: "ZFA", initials: "YH", photo: "assets/team-yodit.jpg" },
  { name: "Klaudia Furtmayr", role: "ZMA, Prophylaxe (PZR), Assistenz", initials: "KF", photo: "assets/team-klaudia.jpg" }
];

const VALUES = [
  {
    icon: "clock",
    title: "Zeit für jeden Menschen",
    desc: "Ein Standard-Termin bei uns dauert mindestens 30 Minuten, meistens länger. Wir hören zu, bevor wir behandeln, und erklären, bevor wir entscheiden."
  },
  {
    icon: "shield",
    title: "Ehrliche Aufklärung",
    desc: "Heil- und Kostenpläne sind verständlich formuliert. Wir zeigen Alternativen auf und drängen nichts auf. Die Entscheidung treffen Sie."
  },
  {
    icon: "sparkle",
    title: "Fortbildung als Anspruch",
    desc: "Regelmäßige Weiterbildungen, insbesondere für die Ärztinnen. Was sich in der Zahnmedizin bewährt, kommt zu Ihnen. Alles andere lassen wir weg."
  }
];

const DoctorCard = ({ doc, onOpenTermin }) => (
  <div className="doctor-card reveal">
    <div className="doctor-photo">
      <img src={doc.photo} alt={doc.name} loading="lazy"/>
      <div className="doctor-photo-meta">{doc.seit}</div>
    </div>
    <div className="doctor-content">
      <div className="eyebrow">{doc.role}</div>
      <h2 className="doctor-name">{doc.name}</h2>
      <div className="doctor-tags">
        {doc.tags.map((t, i) => <span key={i} className="doctor-tag">{t}</span>)}
      </div>
      <p className="doctor-bio">{doc.bio}</p>
      <div className="doctor-actions">
        <button className="btn btn-primary" onClick={onOpenTermin}>Termin bei {doc.name.split(' ').slice(-1)[0]} <Icon name="arrow-right" size={16} className="btn-arrow"/></button>
        <a href={doc.phoneHref} className="btn btn-secondary">
          <Icon name="phone" size={16}/> {doc.phone}
        </a>
      </div>
    </div>
  </div>
);

const TeamApp = () => {
  const [terminOpen, setTerminOpen] = useTS(false);

  useTE(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => observer.observe(el));

    const colorObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("color-reveal");
          colorObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".doctor-photo img").forEach(el => colorObserver.observe(el));

    return () => { observer.disconnect(); colorObserver.disconnect(); };
  }, []);

  return (
    <>
      <Header onOpenTermin={() => setTerminOpen(true)}/>

      <section className="team-hero">
        <div className="container">
          <div className="breadcrumb" style={{marginBottom:'24px'}}>
            <a href="index.html">Start</a>
            <span className="sep">/</span>
            <span style={{color:'var(--text-primary)'}}>Team</span>
          </div>
          <div className="team-hero-grid">
            <div className="reveal">
              <div className="eyebrow">Unser Team</div>
              <h1 className="display-2xl">Menschen, denen Sie Ihr <em className="italic-accent">Lächeln</em> anvertrauen.</h1>
              <p className="body-xl" style={{color:'var(--text-secondary)', marginTop:'24px', maxWidth:'52ch'}}>
                Zwei Zahnärztinnen, ein Praxisteam, ein gemeinsamer Anspruch: gute Zahnmedizin braucht Qualität, Vertrauen und Zeit.
              </p>
            </div>
            <div className="team-hero-stack reveal">
              <div className="team-hero-card team-hero-card-1">
                <img src="assets/praxis-blumen.jpg" alt="Unsere Praxis"/>
                <div className="caption">Unsere Praxis</div>
              </div>
              <div className="team-hero-card team-hero-card-2">
                <img src="assets/praxis-kisses.jpg" alt="Praxis-Atmosphäre"/>
                <div className="caption">Praxis-Atmosphäre</div>
              </div>
              <div className="team-hero-card team-hero-card-3">
                <img src="assets/praxis-empfang.jpg" alt="Unser Empfang"/>
                <div className="caption">Unser Empfang</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="doctors-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="eyebrow">Die Zahnärztinnen</div>
            <h2 className="display-lg">Zwei Schwerpunkte. <em className="italic-accent">Ein Team.</em></h2>
            <p className="body-lg">Zwei Praxen, ein Team. Seit 2006 führen Dr. B. Hancock-Diener und Dr. I. Jahn nach anderweitiger Selbständigkeit die Praxis in der Friedrichstraße gemeinsam. Durch regelmäßige Fortbildung einerseits, durch ständige Modernisierung und Digitalisierung andererseits bringen sie die Praxis sowohl wissenschaftlich als auch technisch immer auf den neuesten Stand.</p>
          </div>
          <div className="doctors-grid">
            {DOCTORS.map((doc) => (
              <DoctorCard key={doc.slug} doc={doc} onOpenTermin={() => setTerminOpen(true)}/>
            ))}
          </div>
        </div>
      </section>

      <section className="praxisteam-section">
        <div className="container">
          <div className="section-header reveal" style={{textAlign:'center', marginBottom:'72px'}}>
            <div className="eyebrow">Hinter den Kulissen</div>
            <h2 className="display-lg">Unser <em className="italic-accent">Praxisteam</em>.</h2>
            <p className="body-lg" style={{maxWidth:'52ch', margin:'24px auto 0', textWrap:'pretty'}}>
              Neben den Ärztinnen sind es vor allem unsere zahnmedizinischen Fach- und Verwaltungskräfte, die den Praxisalltag tragen, mit Kompetenz, Sorgfalt und Herzlichkeit.
            </p>
          </div>
          <div className="praxisteam-grid reveal-stagger">
            {STAFF.map((s, i) => (
              <div key={i} className="staff-card">
                {s.photo ? (
                  <div className="staff-photo">
                    <img src={s.photo} alt={s.name} loading="lazy"/>
                  </div>
                ) : (
                  <div className="staff-photo staff-initials">
                    <span>{s.initials}</span>
                  </div>
                )}
                <h3 className="staff-name">{s.name}</h3>
                <div className="staff-role">{s.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-values-band">
        <div className="container">
          <div className="section-header reveal">
            <div className="eyebrow" style={{color:'#9CC4A1'}}>Unsere Haltung</div>
            <h2 className="display-lg">Was uns <em className="italic-accent">verbindet</em>.</h2>
            <p>Drei Prinzipien, die für jede:n im Team gelten. Egal, ob Erstgespräch, Routine-Kontrolle oder ein mehrjähriger Behandlungsplan.</p>
          </div>
          <div className="team-values-grid reveal-stagger">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon"><Icon name={v.icon} size={26}/></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="leistungens-cta-section">
        <div className="container">
          <div className="leistungen-cta">
            <div className="eyebrow">Termin vereinbaren</div>
            <h2 className="display-lg" style={{marginTop:'12px'}}>Lernen Sie uns <em className="italic-accent">persönlich</em> kennen.</h2>
            <p className="body-lg">Ein erstes Gespräch ist unverbindlich und der schnellste Weg, herauszufinden, ob wir gut zusammenpassen. Wir freuen uns auf Sie.</p>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => setTerminOpen(true)}>
                Termin vereinbaren <Icon name="arrow-right" size={16} className="btn-arrow"/>
              </button>
              <a href="leistungen.html" className="btn btn-secondary">Unsere Leistungen ansehen</a>
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

ReactDOM.createRoot(document.getElementById("root")).render(<TeamApp/>);
