const { useState: useS3, useEffect: useE3 } = React;

// Praxis-Bilder mit Beschreibungen
const praxisImages = [
  {
    src: "assets/aussenansicht.jpg",
    title: "Außenansicht",
    desc: "Die Praxis befindet sich gegenüber der St. Ursula Kirche, Friedrichstraße, Ecke Kaiserstraße. Parkplätze gibt es gegen eine geringe Parkgebühr."
  },
  {
    src: "assets/eingang.jpg",
    title: "Eingang",
    desc: "Der Eingang: Friedrichstrasse 33"
  },
  {
    src: "assets/erster_stock.jpg",
    title: "Treppenaufgang",
    desc: "Flache Stufen mit Zwischenabsatz führen zum ersten Stock."
  },
  {
    src: "assets/anmeldung.jpg",
    title: "Anmeldung",
    desc: "An der Anmeldung empfangen wir Sie freundlich und beraten Sie gern."
  },
  {
    src: "assets/warteraum.jpg",
    title: "Warteraum",
    desc: "Warteraum im Erker mit Blick auf die Kirche."
  },
  {
    src: "assets/platz_fuer_kunst.jpg",
    title: "Kunstgalerie",
    desc: "Der Altbau bietet Platz für Kunst und ist angenehm von Licht durchflutet."
  },
  {
    src: "assets/zimmer-jahn-2019-01.jpg",
    title: "Behandlungszimmer Dr. Jahn",
    desc: "Das Behandlungszimmer von Dr. Irene Jahn."
  },
  {
    src: "assets/zimmer-jahn-02.jpg",
    title: "Behandlung Dr. Jahn",
    desc: "Behandlung Dr. Irene Jahn."
  },
  {
    src: "assets/zimmer-hancock-2019-01.jpg",
    title: "Behandlungszimmer Dr. Hancock-Diener",
    desc: "Das Behandlungszimmer von Dr. B. Hancock-Diener."
  },
  {
    src: "assets/zimmer-hancock-02.jpg",
    title: "Behandlung Dr. Hancock-Diener",
    desc: "Behandlung Dr. B. Hancock-Diener."
  },
  {
    src: "assets/hinterer_trakt.jpg",
    title: "Hinterer Trakt",
    desc: "Im hinteren Trakt befindet sich der Röntgenraum, der Sterilisationsraum und das zahntechnische Praxislabor."
  },
  {
    src: "assets/roentgen-ii.jpg",
    title: "Röntgenbereich",
    desc: "Digitales Panorama-Röntgengerät zusätzlich zum digitalen Kleinbild-Röntgengerät."
  },
  {
    src: "assets/tour-wir-freuen-uns.jpg",
    title: "Willkommen",
    desc: "Wir freuen uns auf Ihren Besuch!"
  }
];

// Lightbox-Komponente mit Navigation
const Lightbox = ({ image, onClose, onNext, onPrev, currentIndex, totalImages }) => {
  useE3(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    const handleArrowLeft = (e) => { if (e.key === "ArrowLeft") onPrev(); };
    const handleArrowRight = (e) => { if (e.key === "ArrowRight") onNext(); };
    const handleClick = (e) => { if (e.target.classList.contains("lightbox-overlay")) onClose(); };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("keydown", handleArrowLeft);
    document.addEventListener("keydown", handleArrowRight);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", handleArrowLeft);
      document.removeEventListener("keydown", handleArrowRight);
      document.removeEventListener("click", handleClick);
    };
  }, [onClose, onNext, onPrev]);

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
          <span className="lightbox-counter">{currentIndex + 1} / {totalImages}</span>
        </div>

        {/* Navigation Buttons unter dem Bild */}
        <div className="lightbox-nav-container">
          <button
            className="lightbox-nav lightbox-nav-prev"
            onClick={onPrev}
            disabled={currentIndex === 0}
            aria-label="Vorheriges Bild"
          >
            <Icon name="arrow-left" size={24} />
            <span>Zurück</span>
          </button>

          <button
            className="lightbox-nav lightbox-nav-next"
            onClick={onNext}
            disabled={currentIndex === totalImages - 1}
            aria-label="Nächstes Bild"
          >
            <span>Weiter</span>
            <Icon name="arrow-right" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Hauptseite
const PraxistourPage = () => {
  const [lightboxImage, setLightboxImage] = useS3(null);
  const [lightboxIndex, setLightboxIndex] = useS3(0);
  const [terminOpen, setTerminOpen] = useS3(false);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxImage(praxisImages[index]);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const showNext = () => {
    const nextIndex = (lightboxIndex + 1) % praxisImages.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(praxisImages[nextIndex]);
  };

  const showPrev = () => {
    const prevIndex = (lightboxIndex - 1 + praxisImages.length) % praxisImages.length;
    setLightboxIndex(prevIndex);
    setLightboxImage(praxisImages[prevIndex]);
  };

  return (
    <>
      <Header onOpenTermin={() => setTerminOpen(true)} />
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
                  onClick={() => openLightbox(idx)}
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
          <div className="container praxistour-cta-grid">
            <div className="praxistour-cta-content">
              <h2>Überzeugt?</h2>
              <p>Vereinbaren Sie jetzt einen Termin und erleben Sie unsere Praxis persönlich.</p>
              <a href="index.html#termin" className="btn btn-primary">
                Termin vereinbaren
              </a>
            </div>
            <div className="praxistour-cta-image">
              <img
                src="assets/keramik-zahn-tulpen-deko.jpg"
                alt="Willkommen in unserer Praxis"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />

      {/* TerminModal */}
      <TerminModal open={terminOpen} onClose={() => setTerminOpen(false)} />

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={closeLightbox}
          onNext={showNext}
          onPrev={showPrev}
          currentIndex={lightboxIndex}
          totalImages={praxisImages.length}
        />
      )}
    </>
  );
};

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PraxistourPage />);
