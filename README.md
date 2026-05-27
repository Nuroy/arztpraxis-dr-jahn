# Praxisgemeinschaft Dr. Hancock-Diener & Dr. Jahn

Website für die Zahnarztpraxis in München-Schwabing.

## 🏗️ Architektur

Diese Website nutzt eine **statische HTML-Architektur mit React direkt im Browser**:
- React + ReactDOM + Babel Standalone werden von unpkg CDN geladen
- JSX-Komponenten werden zur Laufzeit im Browser kompiliert
- Kein Build-System, kein npm-Install im Root
- Deployment auf **Vercel**
- Domain über **Strato**

## 📅 Terminanfrage-System

### Funktionsweise

Das Terminanfrage-System besteht aus:

1. **Frontend**: `components/Sections2.jsx` → `CalendarBooking` Komponente
   - Interaktiver Kalender zur Auswahl von bis zu 3 Wunschterminen
   - DSGVO-konforme Kontaktdaten-Erfassung (Name, E-Mail, Telefon)
   - Optionales Nachricht-Feld (max. 500 Zeichen)
   - Pflicht-Checkbox für Datenschutz-Zustimmung
   - Spam-Schutz: Honeypot-Feld + Client-Validierung

2. **Backend**: `/api/termin.js` (Vercel Serverless Function)
   - Validierung mit Zod
   - Rate Limiting (max. 3 Anfragen pro 10 Min. pro IP)
   - E-Mail-Versand über **Strato SMTP** mit Nodemailer
   - **DSGVO-konform**: Keine Datenspeicherung, direkter Versand

3. **E-Mail-Flow**:
   - **Von**: `termin@zahnarztpraxis-schwabing.de` (Strato)
   - **An**: `empfang@zahnarztpraxis-schwabing.de` (Praxis-Empfang)
   - **Reply-To**: Patient-E-Mail (für direkte Antwort)
   - HTML + Plain-Text Format

### DSGVO-Konformität

✅ **Keine externen Mail-APIs** (kein Resend, SendGrid, etc.) → alle Daten bleiben bei Strato (EU)
✅ **Keine Datenspeicherung** → E-Mail wird direkt versendet, nichts persistiert
✅ **Kein Logging von Patientendaten** → nur Erfolg/Fehler-Status
✅ **Consent-Checkbox** → explizite Zustimmung zur Datenverarbeitung
✅ **Keine medizinischen Daten** → Formular akzeptiert bewusst keine Gesundheitsinformationen

⚠️ **WICHTIG**: Die Datenschutzerklärung der Praxis muss um diesen Verarbeitungszweck ergänzt werden (Terminanfrage-Verarbeitung via E-Mail).

---

## 🔧 Setup & Deployment

### 1. SMTP-Credentials bei Strato finden

1. Einloggen im [Strato Kundenservice-Bereich](https://www.strato.de/apps/CustomerService)
2. **Produkte** → **E-Mail-Postfächer**
3. Das Postfach `termin@zahnarztpraxis-schwabing.de` auswählen
4. SMTP-Daten notieren:
   - **Host**: `smtp.strato.de`
   - **Port**: `587` (STARTTLS)
   - **Benutzer**: `termin@zahnarztpraxis-schwabing.de`
   - **Passwort**: (vom Postfach)

### 2. Environment Variables in Vercel eintragen

#### Via Vercel Dashboard:
1. Gehe zu [vercel.com](https://vercel.com) → dein Projekt
2. **Settings** → **Environment Variables**
3. Füge folgende Variablen hinzu:

| Variable | Wert | Environments |
|----------|------|--------------|
| `SMTP_HOST` | `smtp.strato.de` | Production, Preview |
| `SMTP_PORT` | `587` | Production, Preview |
| `SMTP_USER` | `termin@zahnarztpraxis-schwabing.de` | Production, Preview |
| `SMTP_PASS` | `<dein-strato-passwort>` | Production, Preview |
| `ABSENDER_EMAIL` | `termin@zahnarztpraxis-schwabing.de` | Production, Preview |
| `EMPFANG_EMAIL` | `empfang@zahnarztpraxis-schwabing.de` | Production, Preview |

⚠️ **WICHTIG**: Nach dem Hinzufügen der Env Vars musst du das Projekt **neu deployen** (Vercel übernimmt die Variablen erst beim nächsten Deployment).

#### Via Vercel CLI (optional):
```bash
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add ABSENDER_EMAIL
vercel env add EMPFANG_EMAIL
```

### 3. Deployment

```bash
# Automatisch bei jedem git push (wenn Vercel-Integration aktiv)
git add .
git commit -m "Add appointment booking system"
git push

# Oder manuell via Vercel CLI
vercel --prod
```

---

## 🧪 Lokale Entwicklung & Testing

### Voraussetzungen
- Node.js 18+ (für lokale API-Tests)
- Vercel CLI (optional): `npm i -g vercel`

### Lokales Testing

1. **Environment Variables lokal setzen**:
   ```bash
   cp .env.example .env
   # Dann .env mit echten Werten befüllen
   ```

2. **API lokal testen** (mit Vercel Dev):
   ```bash
   vercel dev
   # Öffnet localhost:3000
   ```

3. **Mit Test-SMTP testen** (ohne echten Versand):

   Für Entwicklung kannst du [Ethereal Email](https://ethereal.email/) nutzen:
   - Gehe zu https://ethereal.email/create
   - Ersetze in `.env` die SMTP-Credentials temporär mit den Ethereal-Werten
   - E-Mails werden nicht wirklich versendet, aber du kannst sie im Ethereal-Dashboard ansehen

   Oder nutze [Mailtrap](https://mailtrap.io/) für lokale Tests.

---

## 📁 Projektstruktur

```
/
├── api/                          # Vercel Serverless Functions
│   ├── termin.js                # Terminanfrage-Endpoint
│   └── package.json             # Dependencies (Nodemailer, Zod)
│
├── components/                   # React-Komponenten (Browser JSX)
│   ├── Sections2.jsx            # CalendarBooking, TerminModal, etc.
│   ├── App.jsx                  # Root-Komponente
│   └── ...
│
├── styles/                       # CSS
│   ├── tokens.css
│   └── components.css
│
├── assets/                       # Bilder, Logos, etc.
│
├── index.html                    # Startseite
├── vercel.json                   # Vercel-Konfiguration
├── .env.example                  # Template für Environment Variables
└── README.md                     # Diese Datei
```

---

## 🐛 Troubleshooting

### E-Mails kommen nicht an

1. **Environment Variables prüfen**:
   - Im Vercel Dashboard: Settings → Environment Variables
   - Sind alle 6 Variablen gesetzt?
   - Neu deployen nach Änderungen!

2. **Strato SMTP-Credentials prüfen**:
   - Login im Strato-Kundenbereich
   - Ist das Postfach `termin@zahnarztpraxis-schwabing.de` aktiv?
   - Ist das Passwort korrekt?

3. **Vercel Function Logs prüfen**:
   - Vercel Dashboard → Deployment → Functions
   - `/api/termin` Logs anschauen

### "Rate Limit exceeded" Fehler

- Zu viele Anfragen vom gleichen IP in 10 Minuten (max. 3)
- Normal nach Testing → 10 Minuten warten
- Für Testing: Rate Limit in `api/termin.js` temporär erhöhen

### "Ungültige Eingabedaten" Fehler

- Zod-Validierung schlägt fehl
- Prüfe: Alle Pflichtfelder ausgefüllt? E-Mail-Format korrekt? Consent-Checkbox aktiviert?

---

## 📞 Support

Bei Fragen oder Problemen:
- **Technisch**: [GitHub Issues](https://github.com/anthropics/claude-code/issues) (für Claude Code)
- **Strato SMTP**: [Strato Support](https://www.strato.de/faq/)
- **Vercel**: [Vercel Docs](https://vercel.com/docs)

---

## 📝 Changelog

- **2025-05-27**: Terminanfrage-System implementiert (DSGVO-konform via Strato SMTP)
