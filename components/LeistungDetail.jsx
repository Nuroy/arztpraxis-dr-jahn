// Detail page for a single Leistung — driven by URL hash or ?id=
const { useState: useDS, useEffect: useDE } = React;

const getSlug = () => {
  const hash = window.location.hash.replace(/^#/, '').trim();
  if (hash) return hash;
  const params = new URLSearchParams(window.location.search);
  return params.get('id') || '';
};

const ALL_SIBLINGS = {
  prophylaxe: ["zahnerhaltung-prophylaxe", "parodontologie", "endodontologie"],
  aesthetik: ["aesthetik-funktion", "bleaching"],
  chirurgie: ["implantologie", "oralchirurgie"],
  schienen: ["schienentherapie", "schnarchschienen", "nti-aufbiss-schienen", "zahnkorrektur-schienen"],
  kinder: ["kinderzahnheilkunde"],
  angst: ["zahnarztangst"]
};

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useDS(false);
  return (
    <div className={`detail-faq-item ${open ? 'open' : ''}`}>
      <button className="detail-faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="toggle-icon"><Icon name="plus" size={14}/></span>
      </button>
      <div className="detail-faq-a">{a}</div>
    </div>
  );
};

const NotFound = ({ onOpenTermin }) => (
  <>
    <Header onOpenTermin={onOpenTermin}/>
    <div className="container detail-notfound">
      <div className="eyebrow">404 · Leistung nicht gefunden</div>
      <h1 className="display-lg" style={{marginTop:'16px'}}>Diese Leistung gibt es <em className="italic-accent">nicht</em>.</h1>
      <p className="body-lg" style={{color:'var(--text-secondary)', maxWidth:'48ch', margin:'24px auto 32px'}}>Die gesuchte Detail-Seite existiert nicht. Vielleicht finden Sie das Gesuchte in unserer Leistungsübersicht.</p>
      <a href="leistungen.html" className="btn btn-primary">Zur Leistungs-Übersicht <Icon name="arrow-right" size={16} className="btn-arrow"/></a>
    </div>
    <Footer/>
  </>
);

const LeistungDetailApp = () => {
  const [slug, setSlug] = useDS(getSlug());
  const [terminOpen, setTerminOpen] = useDS(false);

  useDE(() => {
    const onHash = () => setSlug(getSlug());
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  useDE(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const data = window.LEISTUNG_DATA[slug];

  if (!data) return <NotFound onOpenTermin={() => setTerminOpen(true)}/>;

  // update document title
  useDE(() => {
    document.title = `${data.title} — Praxisgemeinschaft Dr. Hancock-Diener & Dr. Jahn`;
  }, [slug]);

  const siblings = (ALL_SIBLINGS[data.parent.anchor] || []).filter(s => s !== slug);

  return (
    <>
      <Header onOpenTermin={() => setTerminOpen(true)}/>

      <section className="detail-hero">
        <div className="container">
          <div className="breadcrumb" style={{marginBottom:'24px'}}>
            <a href="index.html">Start</a>
            <span className="sep">/</span>
            <a href="leistungen.html">Leistungen</a>
            <span className="sep">/</span>
            <a href={`leistungen.html#${data.parent.anchor}`}>{data.parent.label}</a>
            <span className="sep">/</span>
            <span style={{color:'var(--text-primary)'}}>{data.title}</span>
          </div>
          <div className="detail-hero-grid">
            <div>
              <div className="eyebrow">{data.eyebrow}</div>
              <h1 className="display-2xl">{data.title.split(' / ')[0]}<span style={{color:'var(--brand-primary)'}}>.</span></h1>
              <p className="lede">{data.lede}</p>
              <div style={{display:'flex', gap:'12px', marginTop:'32px', flexWrap:'wrap'}}>
                <button className="btn btn-primary" onClick={() => setTerminOpen(true)}>Termin vereinbaren <Icon name="arrow-right" size={16} className="btn-arrow"/></button>
                <a href={`leistungen.html#${data.parent.anchor}`} className="btn btn-secondary">Zur Übersicht</a>
              </div>
            </div>
            <div className={`detail-hero-image ${data.imageFormat || 'portrait'}`}>
              <img src={data.image} alt={data.title} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="detail-meta-strip">
          {data.meta.map((m, i) => (
            <div key={i} className="detail-meta-item">
              <div className="label">{m.label}</div>
              <div className="value">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="detail-body">
        <div className="container">
          <div className="detail-body-grid">
            <div>
              <div className="detail-block">
                <div className="eyebrow">Worum es geht</div>
                <h2>{data.intro.title}</h2>
                {data.intro.body.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="detail-block">
                <div className="eyebrow">Was enthalten ist</div>
                <h2>Was wir für Sie tun</h2>
                <ul className="detail-checklist">
                  {data.inclusions.map((inc, i) => (
                    <li key={i}>
                      <div className="checkmark"><Icon name="check" size={16}/></div>
                      <div>
                        <strong>{inc.title}</strong>
                        <span className="desc">{inc.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-block">
                <div className="eyebrow">Ablauf</div>
                <h2>So gehen wir vor</h2>
                <div className="detail-process">
                  {data.process.map((step, i) => (
                    <div key={i} className="detail-step">
                      <div className="step-num">SCHRITT {step.num}</div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-block">
                <div className="eyebrow">Häufige Fragen</div>
                <h2>FAQ</h2>
                <div className="detail-faq">
                  {data.faqs.map((f, i) => (
                    <FAQItem key={i} q={f.q} a={f.a}/>
                  ))}
                </div>
              </div>
            </div>

            <aside className="detail-sidebar">
              <div className="sidebar-card">
                <h3>Termin vereinbaren</h3>
                <p>Erstgespräch online buchen oder anrufen — wir nehmen uns Zeit für Sie.</p>
                <button className="btn btn-primary" onClick={() => setTerminOpen(true)}>
                  Termin online <Icon name="arrow-right" size={16} className="btn-arrow"/>
                </button>
                <div style={{marginTop:'16px', display:'flex', flexDirection:'column', gap:'6px', fontSize:'14px', color:'#9CC4A1'}}>
                  <span>oder anrufen:</span>
                  <a href="tel:+498938808687" style={{color:'#FFFFFF', textDecoration:'underline'}}>089 38 80 86 87 <span style={{color:'#9CC4A1', fontSize:'12px'}}>(Dr. Jahn)</span></a>
                  <a href="tel:+498938889500" style={{color:'#FFFFFF', textDecoration:'underline'}}>089 38 88 95 00 <span style={{color:'#9CC4A1', fontSize:'12px'}}>(Dr. Hancock-Diener)</span></a>
                </div>
              </div>

              {siblings.length > 0 && (
                <div className="sidebar-other">
                  <div className="sidebar-other-title">Weitere Leistungen aus diesem Bereich</div>
                  {siblings.map(s => {
                    const sd = window.LEISTUNG_DATA[s];
                    if (!sd) return null;
                    return (
                      <a key={s} href={`leistung.html#${s}`}>
                        <span>{sd.title}</span>
                        <Icon name="arrow-right" size={14}/>
                      </a>
                    );
                  })}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section className="detail-cta-band">
        <div className="container">
          <div className="eyebrow">Termin vereinbaren</div>
          <h2>Lassen Sie uns über <em className="italic-accent" style={{color:'#9CC4A1'}}>Ihre Situation</em> sprechen.</h2>
          <p>Ein erstes Gespräch ist unverbindlich. Wir hören zu, untersuchen sorgfältig und beraten ehrlich — auch über Alternativen.</p>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => setTerminOpen(true)}>
              Termin vereinbaren <Icon name="arrow-right" size={16} className="btn-arrow"/>
            </button>
            <a href="leistungen.html" className="btn btn-secondary">Alle Leistungen</a>
          </div>
        </div>
      </section>

      <Footer/>
      <TerminModal open={terminOpen} onClose={() => setTerminOpen(false)}/>
      <CookieBanner/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<LeistungDetailApp/>);
