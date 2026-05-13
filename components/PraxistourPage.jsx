const { useS3, useE3 } = React;

// Praxis-Bilder mit Beschreibungen
const praxisImages = [
  { src: "assets/praxis-empfang.jpg", title: "Empfang", desc: "Herzlich willkommen in unserer Praxis" },
  { src: "assets/praxis-empfang-portrait.jpg", title: "Empfangsbereich", desc: "Unser freundliches Team erwartet Sie" },
  { src: "assets/praxis-wartebereich.jpg", title: "Wartebereich", desc: "Entspannte Atmosphäre zum Wohlfühlen" },
  { src: "assets/praxis-blumen.jpg", title: "Praxisdetails", desc: "Gepflegte Details für Ihr Wohlbefinden" },
  { src: "assets/praxis-blumen-wide.jpg", title: "Blumenarrangement", desc: "Frische und Eleganz in unseren Räumen" },
  { src: "assets/praxis-flur.jpg", title: "Flurbereich", desc: "Helle und moderne Räumlichkeiten" },
  { src: "assets/praxis-behandlung.jpg", title: "Behandlungsraum", desc: "Modernste Ausstattung für Ihre Behandlung" },
  { src: "assets/praxis-behandlung-detail.jpg", title: "Behandlungseinheit", desc: "Hochwertige Technologie für präzise Ergebnisse" },
  { src: "assets/praxis-behandlung-schild.jpg", title: "Behandlungsraum-Eingang", desc: "Diskrete und ruhige Behandlungsräume" },
  { src: "assets/praxis-roentgen.jpg", title: "Röntgenbereich", desc: "Moderne digitale Röntgentechnik" },
  { src: "assets/praxis-anmeldung.jpg", title: "Anmeldung", desc: "Ihr erster Anlaufpunkt in unserer Praxis" },
  { src: "assets/praxis-kisses.jpg", title: "Praxisatmosphäre", desc: "Kleine Details mit großer Wirkung" },
  { src: "assets/praxis-schild.jpg", title: "Praxisschild", desc: "Willkommen in Schwabing" },
  { src: "assets/praxis-zahnmodelle.jpg", title: "Zahnmodelle", desc: "Anschauliche Patientenaufklärung" },
  { src: "assets/praxis-team-member.jpg", title: "Unser Team", desc: "Freundlich und kompetent für Sie da" },
];

// Lightbox-Komponente
const Lightbox = ({ image, onClose }) => {
  useE3(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    const handleClick = (e) => { if (e.target.classList.contains("lightbox-overlay")) onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <div className="lightbox-overlay">
      <button className="lightbox-close" onClick={onClose} aria-label="Schließen">
        <Icon name="x" size={32} />
      </button>
      <div className="lightbox-content">
        <img src={image.src} alt={image.title} loading="lazy" />
        <div className="lightbox-caption">
          <h3>{image.title}</h3>
          <p>{image.desc}</p>
        </div>
      </div>
    </div>
  );
};

// Hauptseite
const PraxistourPage = () => {
  const [lightboxImage, setLightboxImage] = useS3(null);

  return (
    <>
      <Header />
      <main className="praxistour-page">
        {/* Hero-Bereich */}
        <section className="praxistour-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="index.html">Start</a>
              <span>/</span>
              <span>Praxis-Tour</span>
            </nav>
            <h1>Willkommen in unserer Praxis</h1>
            <p className="lead">
              Lernen Sie unsere modernen Praxisräume in München-Schwabing kennen.
              Von unserem einladenden Empfang über helle Behandlungsräume bis hin zu
              modernster Technik – hier bekommen Sie einen Eindruck von der Atmosphäre,
              die Sie bei uns erwartet.
            </p>
          </div>
        </section>

        {/* Galerie */}
        <section className="praxistour-gallery">
          <div className="container">
            <div className="gallery-grid">
              {praxisImages.map((img, idx) => (
                <div
                  key={idx}
                  className="gallery-item"
                  onClick={() => setLightboxImage(img)}
                >
                  <img src={img.src} alt={img.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <h3>{img.title}</h3>
                    <p>{img.desc}</p>
                    <Icon name="search" size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="praxistour-cta">
          <div className="container">
            <h2>Überzeugt?</h2>
            <p>Vereinbaren Sie jetzt einen Termin und erleben Sie unsere Praxis persönlich.</p>
            <a href="index.html#termin" className="btn btn-primary">
              Termin vereinbaren
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
};

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PraxistourPage />);
