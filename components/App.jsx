// App entry
const { useState: useAppS, useEffect: useAppE } = React;

const App = () => {
  const [terminOpen, setTerminOpen] = useAppS(false);

  useAppE(() => {
    // Reveal-on-scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".section, .hero, .trustbar").forEach(el => {
      el.classList.add("reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header onOpenTermin={() => setTerminOpen(true)}/>
      <main>
        <Hero onOpenTermin={() => setTerminOpen(true)}/>
        <TrustBar/>
        <Intro/>
        <Leistungen/>
        <Werte/>
        <Team onOpenTermin={() => setTerminOpen(true)}/>
        <TechSpotlight/>
        <Testimonials/>
        <TerminCTA/>
        <Standort/>
        <FAQ/>
      </main>
      <Footer/>
      <TerminModal open={terminOpen} onClose={() => setTerminOpen(false)}/>
      <CookieBanner/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
