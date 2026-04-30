// Header + Mobile menu + Termin Modal
const { useState, useEffect, useRef } = React;

const NAV_SERVICES = [
  { id: "prophylaxe", title: "Prophylaxe & Zahnerhaltung", desc: "Zahnerhaltung, Parodontologie, Endodontologie", icon: "shield-tooth" },
  { id: "aesthetik", title: "Ästhetik", desc: "Ästhetik und Funktion, Bleaching", icon: "sparkle" },
  { id: "chirurgie", title: "Implantologie & Chirurgie", desc: "Implantologie, Oralchirurgie / Kieferchirurgie", icon: "implant" },
  { id: "schienen", title: "Schienentherapie", desc: "Knirschen, Schnarchen, NTI, Aligner", icon: "moon" },
  { id: "kinder", title: "Kinderzahnheilkunde", desc: "Sanfter Einstieg, ab dem ersten Zahn", icon: "smile" },
  { id: "angst", title: "Hilfe bei Zahnarztangst", desc: "Zeit, Verständnis, Ihr Tempo", icon: "heart" },
];

// ----- Live status -----
function getLiveStatus(now = new Date()) {
  const day = now.getDay(); // 0 Sun..6 Sat
  const minutes = now.getHours() * 60 + now.getMinutes();
  // Mo-Do 8-18, Fr 8-16
  const hours = {
    1: [8 * 60, 18 * 60], // Mon
    2: [8 * 60, 18 * 60], // Tue
    3: [8 * 60, 18 * 60], // Wed
    4: [8 * 60, 18 * 60], // Thu
    5: [8 * 60, 16 * 60], // Fri
  };
  const today = hours[day];
  if (today && minutes >= today[0] && minutes < today[1]) {
    const closeH = Math.floor(today[1] / 60);
    return { state: "open", text: `Jetzt geöffnet · schließt um ${closeH} Uhr` };
  }
  // Find next opening
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (hours[d]) {
      const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
      const openH = Math.floor(hours[d][0] / 60);
      return { state: "closed", text: `Geschlossen · öffnet ${dayNames[d]} ${openH} Uhr` };
    }
  }
  return { state: "closed", text: "Geschlossen" };
}

const LiveStatus = ({ compact = false }) => {
  const [status, setStatus] = useState(() => getLiveStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="live-status">
      <span className={`live-dot ${status.state}`}></span>
      <span>{compact ? (status.state === "open" ? "Jetzt geöffnet" : "Geschlossen") : status.text}</span>
    </span>
  );
};

// ----- Header -----
const Header = ({ onOpenTermin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const openDrop = () => { clearTimeout(closeTimer.current); setDropdownOpen(true); };
  const closeDrop = () => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 150); };

  const smooth = (id) => (e) => {
    e.preventDefault();
    setMobileOpen(false);
    setDropdownOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Anchor not on this page — go to home page with hash
      window.location.href = `index.html#${id}`;
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <a href="#top" className="logo-link" onClick={smooth("top")}>
            <div className="logo-mark" aria-hidden="true"></div>
            <div className="logo-text">
              <span className="logo-name">Hancock-Diener &amp; Jahn</span>
              <span className="logo-sub">Zahnmedizin Schwabing</span>
            </div>
          </a>

          <nav className="nav-desktop" aria-label="Hauptnavigation">
            <div onMouseEnter={openDrop} onMouseLeave={closeDrop} style={{ position: "relative" }}>
              <a href="leistungen.html" className={`nav-item ${dropdownOpen ? "open" : ""}`} aria-expanded={dropdownOpen}>
                Leistungen <Icon name="chevron-down" size={16} className="chev" />
              </a>
              <div className={`dropdown ${dropdownOpen ? "open" : ""}`} role="menu">
                {NAV_SERVICES.map(s => (
                  <a key={s.id} href={`leistungen.html#${s.id}`} className="dropdown-item">
                    <div className="icon-box"><Icon name={s.icon} size={20} /></div>
                    <div>
                      <div className="item-title">{s.title}</div>
                      <div className="item-desc">{s.desc}</div>
                    </div>
                  </a>
                ))}
                <div className="dropdown-footer">
                  <a href="leistungen.html" className="btn-tertiary">
                    Alle Leistungen ansehen <Icon name="arrow-right" size={14} className="btn-arrow" />
                  </a>
                </div>
              </div>
            </div>
            <a href="team.html" className="nav-item">Team</a>
            <a href="#ueber" className="nav-item" onClick={smooth("ueber")}>Über uns</a>
            <a href="#standort" className="nav-item" onClick={smooth("standort")}>Kontakt</a>
          </nav>

          <div className="header-right">
            <LiveStatus />
            <button className="btn btn-primary" onClick={onOpenTermin}>
              Termin <Icon name="arrow-right" size={16} className="btn-arrow" />
            </button>
            <button className={`hamburger ${mobileOpen ? "open" : ""}`} aria-label="Menü öffnen" onClick={() => setMobileOpen(!mobileOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <a href="leistungen.html">Leistungen</a>
        <a href="team.html">Team</a>
        <a href="#ueber" onClick={smooth("ueber")}>Über uns</a>
        <a href="#standort" onClick={smooth("standort")}>Kontakt</a>
        <a href="#faq" onClick={smooth("faq")}>FAQ</a>
        <button className="btn btn-primary mobile-cta" onClick={() => { setMobileOpen(false); onOpenTermin(); }}>
          Termin vereinbaren <Icon name="arrow-right" size={16} className="btn-arrow" />
        </button>
      </div>
    </>
  );
};

window.Header = Header;
window.LiveStatus = LiveStatus;
