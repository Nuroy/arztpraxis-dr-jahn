# Local Development Setup

Anleitung zum lokalen Testen der Website auf deinem Computer.

---

## 🚀 Schnellstart (Empfohlen)

### Methode 1: Start-Script (Einfachste Methode)

```bash
# Terminal öffnen und ausführen:
cd "/Users/jouls/Desktop/arztpraxis dr jahn"
./start-local.sh
```

**Oder mit anderem Port:**
```bash
./start-local.sh 8080
```

**Dann im Browser öffnen:** http://localhost:3000/

**Server stoppen:** `Ctrl + C` im Terminal

---

### Methode 2: Manuell mit Python

```bash
# Terminal öffnen
cd "/Users/jouls/Desktop/arztpraxis dr jahn"

# Server starten (Python 3)
python3 -m http.server 3000

# Im Browser öffnen: http://localhost:3000/
```

---

## 📄 Verfügbare Seiten

Nach dem Start kannst du folgende URLs öffnen:

### Haupt-Seiten
- **Homepage:** http://localhost:3000/
- **Leistungen Übersicht:** http://localhost:3000/leistungen.html
- **Team:** http://localhost:3000/team.html
- **Neupatienten:** http://localhost:3000/neupatienten.html
- **Praxistour:** http://localhost:3000/praxistour.html
- **Impressum:** http://localhost:3000/impressum.html
- **Datenschutz:** http://localhost:3000/datenschutz.html

### Service-Detail-Seiten (alle 13)
- http://localhost:3000/leistung.html#zahnerhaltung-prophylaxe
- http://localhost:3000/leistung.html#parodontologie
- http://localhost:3000/leistung.html#endodontologie
- http://localhost:3000/leistung.html#aesthetik-funktion
- http://localhost:3000/leistung.html#bleaching
- http://localhost:3000/leistung.html#implantologie
- http://localhost:3000/leistung.html#oralchirurgie
- http://localhost:3000/leistung.html#schienentherapie
- http://localhost:3000/leistung.html#schnarchschienen
- http://localhost:3000/leistung.html#nti-aufbiss-schienen
- http://localhost:3000/leistung.html#zahnkorrektur-schienen
- http://localhost:3000/leistung.html#kinderzahnheilkunde
- http://localhost:3000/leistung.html#zahnarztangst

---

## 🧪 SEO Schemas testen

### 1. DevTools öffnen
- Chrome/Edge: `F12` oder `Cmd + Opt + I` (Mac)
- Firefox: `F12` oder `Cmd + Opt + K` (Mac)

### 2. Schemas im `<head>` prüfen

**FAQPage Schema (auf Service-Seiten):**
1. Öffne http://localhost:3000/leistung.html#zahnerhaltung-prophylaxe
2. DevTools → Elements → `<head>`
3. Suche nach `<script type="application/ld+json">` mit `"@type":"FAQPage"`

**Person Schemas (auf Team-Seite):**
1. Öffne http://localhost:3000/team.html
2. DevTools → Elements → `<head>`
3. Suche nach zwei `<script>` Tags mit `"@type":"Person"`

**BreadcrumbList, Service, HowTo (auf Service-Seiten):**
1. Öffne eine beliebige Service-Seite
2. DevTools → Elements → `<head>`
3. Suche nach entsprechenden Schema-Scripts

### 3. Console auf Fehler prüfen
- DevTools → Console
- Sollte keine roten Fehler zeigen

### 4. Network Tab prüfen
- DevTools → Network
- Alle Assets sollten `200 OK` Status haben
- Keine `404 Not Found` Fehler

---

## 🔍 Schema Validation

### Online Validators

**Schema.org Validator:**
1. Kopiere das JSON aus dem `<script type="application/ld+json">` Tag
2. Gehe zu https://validator.schema.org/
3. Paste das JSON
4. Sollte "0 Errors" zeigen

**Google Rich Results Test:**
- **WICHTIG:** Funktioniert nur mit öffentlichen URLs
- Localhost-URLs können nicht getestet werden
- Nutze die Live-URL: https://zahnarztpraxis-schwabing.de/
- Tool: https://search.google.com/test/rich-results

---

## 🎨 Design-Testing

### Responsive Design testen
1. DevTools → Device Toolbar (`Cmd + Shift + M`)
2. Teste verschiedene Geräte:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - iPad Pro (1024px)
   - Desktop (1440px)

### Visual Regression Check
- Vergleiche mit Live-Version: https://zahnarztpraxis-schwabing.de/
- Sollte identisch aussehen (keine visuellen Änderungen durch SEO-Updates)

---

## 🐛 Troubleshooting

### Port bereits belegt
```bash
# Anderer Port verwenden
python3 -m http.server 8080
# Oder
./start-local.sh 8080
```

### Python nicht gefunden
```bash
# Python Version prüfen
python3 --version

# Falls nicht installiert:
# Lade von https://www.python.org/downloads/
```

### Schemas erscheinen nicht
1. Hard Refresh: `Cmd + Shift + R` (Mac) oder `Ctrl + Shift + R` (Windows)
2. Browser-Cache leeren
3. Console auf JavaScript-Fehler prüfen
4. Sicherstellen, dass React-Scripts geladen wurden

### Seite lädt nicht / weiße Seite
1. Console auf Fehler prüfen
2. Network Tab: Alle Scripts geladen?
3. React und ReactDOM URLs korrekt?
4. Babel Standalone geladen?

### CORS-Fehler (bei file:// URLs)
- Nutze einen lokalen Server (Python, Node.js)
- **Nicht** Dateien direkt im Browser öffnen (`file://`)

---

## 🔧 Alternative Server-Optionen

### Option 1: Node.js http-server

```bash
# Einmalig installieren
npm install -g http-server

# Im Projektordner starten
cd "/Users/jouls/Desktop/arztpraxis dr jahn"
http-server -p 3000 -o

# -o öffnet automatisch den Browser
```

### Option 2: PHP Built-in Server

```bash
cd "/Users/jouls/Desktop/arztpraxis dr jahn"
php -S localhost:3000
```

### Option 3: VS Code Live Server

1. VS Code installieren
2. Extension "Live Server" installieren (Ritwick Dey)
3. Rechtsklick auf `index.html` → "Open with Live Server"
4. Automatisch öffnet sich http://127.0.0.1:5500/

---

## 📊 Performance Testing (lokal)

### Lighthouse in Chrome DevTools

1. Öffne http://localhost:3000/
2. DevTools → Lighthouse Tab
3. Kategorie auswählen: Performance, SEO
4. "Analyze page load" klicken

**Expected Scores (lokal):**
- Performance: 90-100
- SEO: 95-100
- Best Practices: 90-100
- Accessibility: 85-95

---

## 🚀 Vergleich: Lokal vs. Live

### Lokal (localhost:3000)
- ✅ Schnelles Testing
- ✅ Keine Deployment-Zeit
- ✅ DevTools voller Zugriff
- ❌ Google Rich Results Test nicht möglich
- ❌ Keine echten AI-Crawler

### Live (zahnarztpraxis-schwabing.de)
- ✅ Google Rich Results Test möglich
- ✅ Echte Crawler-Tests
- ✅ Echte Performance-Metriken
- ✅ AI-Search-Testing möglich
- ⏳ Vercel Deployment-Zeit (~1-2 Min)

**Empfehlung:**
1. Lokales Testing für schnelle Code-Änderungen
2. Live-Testing für SEO-Validation (nach Git Push)

---

## 📝 Workflow für Änderungen

### 1. Lokale Änderung testen
```bash
# Server starten
./start-local.sh

# Im Browser öffnen und testen
# Änderungen in Code machen
# Browser neu laden (Cmd+R)
```

### 2. Commit & Push
```bash
git add .
git commit -m "Beschreibung der Änderung"
git push origin main
```

### 3. Vercel Auto-Deployment abwarten
- Dauert ca. 1-2 Minuten
- Check: https://vercel.com/dashboard

### 4. Live-Version testen
- https://zahnarztpraxis-schwabing.de/
- Google Rich Results Test
- Schema Validators

---

## ⚡ Tipps & Tricks

### Browser-Cache umgehen
- Chrome/Edge: `Cmd + Shift + R` (Mac) oder `Ctrl + Shift + R` (Windows)
- DevTools offen → Network Tab → "Disable cache" aktivieren

### Schemas schnell kopieren (DevTools Console)
```javascript
// Alle Schema-Scripts finden
document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
  console.log(s.textContent);
});

// FAQPage Schema finden
const faqSchema = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
  .find(s => s.textContent.includes('FAQPage'));
console.log(JSON.parse(faqSchema.textContent));
```

### React-Komponenten debuggen
```javascript
// Im Browser Console
React.version // React Version prüfen
```

---

## 📁 Projekt-Struktur

```
arztpraxis dr jahn/
├── index.html              # Homepage
├── leistungen.html         # Leistungen Übersicht
├── leistung.html           # Service Detail (dynamisch)
├── team.html               # Team-Seite
├── neupatienten.html       # Neupatienten
├── praxistour.html         # Praxistour
├── impressum.html          # Impressum
├── datenschutz.html        # Datenschutz
├── sitemap.xml             # SEO Sitemap (aktualisiert)
├── robots.txt              # Crawler-Anweisungen
├── start-local.sh          # Local Server Script ⭐
├── components/             # React Komponenten
│   ├── LeistungDetail.jsx  # Service-Seiten (mit Schemas)
│   ├── TeamPage.jsx        # Team-Seite (mit Person Schemas)
│   ├── Header.jsx
│   ├── Sections1.jsx
│   ├── Sections2.jsx
│   └── ...
├── styles/                 # CSS Dateien
│   ├── leistung-detail.css # (Semantic HTML Updates)
│   └── ...
├── assets/                 # Bilder
└── api/                    # Backend API
```

---

## 🎓 Nächste Schritte

1. **Jetzt testen:**
   ```bash
   ./start-local.sh
   ```

2. **Alle Seiten durchgehen:**
   - Funktionalität prüfen
   - Schemas prüfen (DevTools)
   - Visuelles Design prüfen

3. **SEO Testing:**
   - Siehe `TEST_SEO_SCHEMAS.md` für Details

4. **Phase 2 (optional):**
   - Siehe `PHASE_2_SSR_GUIDE.md` für SSR-Implementation

---

**Happy Testing! 🦷✨**
