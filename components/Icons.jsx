// Icons — Lucide-style line icons (1.5px stroke, rounded)
const Icon = ({ name, size = 24, className = "", style = {} }) => {
  const props = {
    width: size, height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className, style,
    "aria-hidden": "true"
  };
  switch (name) {
    case "shield-tooth":
      return <svg {...props}><path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z"/><path d="M9 9c0-1 1-2 3-2s3 1 3 2c0 .8-.4 1.4-.7 2.2-.3.7-.3 1.5-.3 2.3 0 .8.2 1.5-.5 2-.5.3-.8-.5-.9-1.3-.1-.6-.3-1.4-.6-1.4s-.5.8-.6 1.4c-.1.8-.4 1.6-.9 1.3-.7-.5-.5-1.2-.5-2 0-.8 0-1.6-.3-2.3-.3-.8-.7-1.4-.7-2.2z"/></svg>;
    case "sparkle":
      return <svg {...props}><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/><path d="M19 4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>;
    case "implant":
      return <svg {...props}><path d="M12 3l3 4H9l3-4z"/><rect x="9" y="7" width="6" height="3" rx="1"/><path d="M11 10v3M13 10v3M11 13l-1 4M13 13l1 4"/></svg>;
    case "moon":
      return <svg {...props}><path d="M21 12.5A8.5 8.5 0 1 1 11.5 3a6.5 6.5 0 0 0 9.5 9.5z"/></svg>;
    case "smile":
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r=".5" fill="currentColor"/><circle cx="15" cy="10" r=".5" fill="currentColor"/></svg>;
    case "heart":
      return <svg {...props}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case "shield":
      return <svg {...props}><path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z"/></svg>;
    case "award":
      return <svg {...props}><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>;
    case "clock":
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "leaf":
      return <svg {...props}><path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 8-3 16-9 16z"/><path d="M4 20c4-4 6-6 16-16"/></svg>;
    case "pin":
      return <svg {...props}><path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "phone":
      return <svg {...props}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.4 1.7.6 2.6.7a2 2 0 0 1 1.7 2z"/></svg>;
    case "mail":
      return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case "calendar":
      return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>;
    case "arrow-left":
      return <svg {...props}><path d="M19 12H5M11 19l-7-7 7-7"/></svg>;
    case "arrow-right":
      return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case "arrow-up-right":
      return <svg {...props}><path d="M7 17L17 7M7 7h10v10"/></svg>;
    case "chevron-down":
      return <svg {...props}><path d="M6 9l6 6 6-6"/></svg>;
    case "check":
      return <svg {...props}><path d="M5 12l5 5L20 7"/></svg>;
    case "plus":
      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "x":
      return <svg {...props}><path d="M18 6L6 18M6 6l12 12"/></svg>;
    case "star":
      return <svg {...props} fill="currentColor" stroke="none"><path d="M12 2l3 6.9 7.6.6-5.8 5 1.8 7.4L12 18l-6.6 3.9 1.8-7.4L1.4 9.5 9 8.9z"/></svg>;
    case "alert":
      return <svg {...props}><path d="M12 3l10 17H2L12 3z"/><path d="M12 9v5M12 17v.5"/></svg>;
    case "menu":
      return <svg {...props}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case "google":
      return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.74.13-1.45.34-2.11V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z"/><path fill="#EA4335" d="M12 5.4c1.62 0 3.06.56 4.2 1.65l3.15-3.15C17.45 2.1 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.33 9.14 5.4 12 5.4z"/></svg>;
    case "download":
      return <svg {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
    case "file-text":
      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
    case "printer":
      return <svg {...props}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
    case "clipboard":
      return <svg {...props}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
    case "user":
      return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case "search":
      return <svg {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
    default:
      return null;
  }
};

window.Icon = Icon;
