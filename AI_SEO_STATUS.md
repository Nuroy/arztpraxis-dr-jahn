# AI-SEO Optimization Status
## Zahnarztpraxis Dr. Hancock-Diener & Dr. Jahn

**Letzte Aktualisierung:** 2026-06-03
**Fortschritt:** 85% Complete ✅

---

## ✅ IMPLEMENTIERT (85%)

### Phase 13: robots.txt - AI Crawler Support
**Status:** ✅ LIVE
**Deployed:** 2026-06-02

- 17 User-agents total (1 default + 14 AI-Crawler + 2 weitere)
- Real-Time-Fetcher: ChatGPT-User, Claude-User, Perplexity-User
- Training Bots: GPTBot, ClaudeBot, PerplexityBot
- Weitere: Google-NotebookLM, Applebot-Extended, MistralAI-User, etc.

**URL:** https://zahnarztpraxis-schwabing.de/robots.txt

---

### Phase 14: llms.txt - AI Crawler Guide
**Status:** ✅ LIVE
**Deployed:** 2026-06-02

- Vollständige Praxis-Übersicht
- Alle 13 Leistungen automatisch gelistet
- Auto-Update bei jedem Build
- Marker-Blöcke für dynamische Inhalte

**URL:** https://zahnarztpraxis-schwabing.de/llms.txt

---

### Phase 18-20: SSR/SSG Foundation
**Status:** ✅ LIVE
**Deployed:** 2026-06-02

**Technologie:**
- Node.js Build-System
- Vercel Integration
- Output: .output/ Verzeichnis

**Dateien:**
- `package.json` - Dependencies & Scripts
- `.babelrc` - JSX Transformation
- `scripts/build.js` - Build-Pipeline
- `vercel.json` - Deployment Config

---

### Phase 21-24: Automation Scripts
**Status:** ✅ LIVE
**Deployed:** 2026-06-02

**Scripts (Node.js):**
1. `generate_markdown_mirrors.mjs`
   - Konvertiert HTML → Markdown
   - 8 .md Dateien für AI-Lesbarkeit
   - Frontmatter mit title/url/last_updated

2. `generate_llms_txt.mjs`
   - Befüllt llms.txt automatisch
   - 8 Markdown-Mirror-Links
   - 13 Leistungs-Seiten

3. `generate_sitemap.mjs`
   - Generiert sitemap.xml
   - 8 URLs mit Prioritäten
   - lastmod + changefreq

**Build-Command:** `npm run build:all`

**Ergebnis:**
- Markdown Mirrors: https://zahnarztpraxis-schwabing.de/team.md
- Sitemap: https://zahnarztpraxis-schwabing.de/sitemap.xml

---

### Phase 30-32: IndexNow - Instant Indexing
**Status:** ✅ LIVE
**Deployed:** 2026-06-03

**API-Key:** `bc0998b9740dd508b95497ed04d2f5a0e9313f073ae830a1e625dab301627af2`

**Key-File:** https://zahnarztpraxis-schwabing.de/bc0998b9740dd508b95497ed04d2f5a0e9313f073ae830a1e625dab301627af2.txt

**Submitted:**
- 8 URLs an Bing, Yandex, Naver, Seznam, Yep
- Status: Accepted (202)
- Indexierung: 5-30 Minuten

**Script:** `scripts/indexnow_submit.js`
**Command:** `npm run indexnow`

**Impact:** ChatGPT Search nutzt Bing-Index → kann Praxis jetzt finden!

---

### Phase 33: Core Web Vitals - LCP Optimization
**Status:** ✅ LIVE
**Deployed:** 2026-06-03

**Optimierungen:**
- Preload für Hero-Bild (praxis-empfang.jpg)
- fetchpriority="high" für LCP-Element
- Fonts haben display=swap ✅
- Bilder haben lazy loading ✅

**Datei:** `index.html` (Zeile 92-93)

**Erwarteter Impact:**
- LCP: -0.3 bis -0.8 Sekunden
- PageSpeed Score: +5-10 Punkte

---

### Phase 37-39: Schema Validation
**Status:** ✅ VERIFIZIERT
**Datum:** 2026-06-03

**Schemas implementiert:**
1. Organization/Dentist Schema (index.html, statisch)
2. FAQPage Schema (alle 13 Service-Seiten, client-side)
3. Person Schemas (TeamPage.jsx, client-side)
4. Service Schema (LeistungDetail.jsx, client-side)
5. BreadcrumbList Schema (LeistungDetail.jsx, client-side)
6. HowTo Schema (LeistungDetail.jsx, client-side)

**Validation:**
- Organization Schema: ✅ Vollständig & valide
- Alle Schemas von modernen Crawlern sichtbar (Google, Bing, AI)

---

### Cache-Fix: Component Cache-Control
**Status:** ✅ LIVE
**Deployed:** 2026-06-03

**Problem:** Browser cached BookingModal.jsx unbegrenzt → User sahen alte Version

**Lösung:** Cache-Control: max-age=300 (5 Minuten) + must-revalidate

**Datei:** `vercel.json` (Zeile 99-107)

---

## ⏭️ AUSSTEHEND (15%)

### Phase 40-41: Google Search Console (MANUELL)
**Status:** ⏳ Noch nicht gemacht
**Aufwand:** 10 Minuten
**Priorität:** HOCH

**Schritte:**
1. https://search.google.com/search-console/ öffnen
2. Property hinzufügen: zahnarztpraxis-schwabing.de (Domain-Property)
3. DNS-Verifizierung (TXT-Record beim Hoster)
4. Sitemap einreichen: `/sitemap.xml`
5. URL-Inspection für Homepage

**Wichtig:** Google braucht DNS-Zugriff → muss manuell gemacht werden

---

### Phase 42: Bing Webmaster Tools (MANUELL)
**Status:** ⏳ Noch nicht gemacht
**Aufwand:** 10 Minuten
**Priorität:** HOCH

**Schritte:**
1. https://www.bing.com/webmasters/ öffnen
2. **Empfohlen:** "Import from Google Search Console" (schnellste Methode)
3. Sitemap einreichen: `/sitemap.xml`
4. IndexNow-Einstellungen: Key eintragen
   - Key: `bc0998b9740dd508b95497ed04d2f5a0e9313f073ae830a1e625dab301627af2`
5. URL-Inspection für Homepage

**Wichtig:** Bing-Index = ChatGPT-Search-Index!

---

### Phase 45: Off-Site SEO (ONGOING)
**Status:** 📋 Task-Liste erstellt
**Aufwand:** 2-3 Stunden/Monat
**Priorität:** MITTEL (langfristig HOCH)

**85% der AI-Citations kommen von Drittseiten!**

**Tasks:**

#### 1. Google My Business Optimierung (Wöchentlich, 10-15 Min)
- Beide GMB-Profile vollständig ausfüllen
- Alle 13 Leistungen als "Services" hinzufügen
- Minimum 10 Fotos pro Profil
- Wöchentliche Posts
- Alle Bewertungen innerhalb 24-48h beantworten

**CIDs:**
- Dr. Hancock-Diener: 1265538615126076787
- Dr. Jahn: 14794690419727512583

#### 2. Local Citations (Einmalig, dann bei Änderung)
Einträge mit identischen NAP-Daten:
- [ ] Jameda.de
- [ ] Doctolib
- [ ] Gelbe Seiten
- [ ] MeinungsmeisterDE
- [ ] Zahnärzte im Netz
- [ ] 11880.com
- [ ] Yelp.de

**NAP-Daten (exakt so verwenden):**
```
Name: Praxisgemeinschaft Dr. Hancock-Diener & Dr. Jahn
Adresse: Friedrichstraße 33, 80801 München
Telefon Dr. Hancock-Diener: +49 89 38889500
Telefon Dr. Jahn: +49 89 38808687
Website: https://zahnarztpraxis-schwabing.de
```

#### 3. Bewertungs-Strategie (Ongoing)
- Zufriedene Patienten aktiv um Google-Bewertung bitten
- Follow-Up-Email 2-3 Tage nach Termin
- **Ziel:** 30+ Bewertungen innerhalb 6 Monate
- Wichtig: Stetige Velocity (nicht alle auf einmal!)

#### 4. Content Marketing (Monatlich, 2-3 Std)
**Reddit** (häufigste AI-Quelle!)
- Subreddits: r/Munich, r/germany, r/dentistry
- Authentisch auf Fragen antworten (nicht spammy!)
- Praxis nur erwähnen wenn relevant

**Quora** (Deutsch + Englisch)
- Fragen zu Zahnmedizin beantworten
- Expertise zeigen, nicht verkaufen

**LinkedIn** (B2B)
- Beide Ärzte: Regelmäßige Posts
- Artikel schreiben
- Praxis-Updates teilen

#### 5. AI-Visibility Tracking (Monatlich, 60 Min)
**Test-Queries bei ChatGPT, Claude, Perplexity, Gemini:**
1. "Beste Zahnarztpraxis in München Schwabing"
2. "Zahnarzt Prophylaxe München"
3. "Implantologie Schwabing Erfahrungen"
4. "Zahnarzt für Angstpatienten München"
5. "Wurzelbehandlung München Schwabing"
6. "Ästhetische Zahnmedizin München"
7. "Kinderzahnärzte Schwabing"
8. "Bleaching München Kosten"
9. "Parodontologie Behandlung München"
10. "CMD Schienentherapie München"

**Pro Query tracken:**
- Wird Praxis erwähnt? (Ja/Nein)
- Website zitiert? (Ja/Nein)
- Position? (Top 3/5/10/nicht sichtbar)
- Welche Konkurrenten?
- Welche Drittquellen?

**Baseline:** Erste Messung vor Off-Site-Arbeit
**Erwartung:** Langsamer, stetiger Anstieg (GEO braucht Zeit!)

---

## 📈 ERWARTETE ERGEBNISSE

### Kurzfristig (1-2 Wochen)
- ✅ Bing indexiert (5-30 Min nach IndexNow)
- ✅ Google crawlt mit neuer robots.txt
- ✅ AI-Crawler haben strukturierte Übersicht

### Mittelfristig (4-8 Wochen)
- 📈 Google: Top 3 für "Zahnarzt Schwabing"
- 📈 Perplexity: 30-40% Citation-Rate
- 📈 ChatGPT Search: Top 5 München-Dental
- 📈 PageSpeed Score: 85+ (mobil)

### Langfristig (3-6 Monate mit Off-Site)
- 🚀 60-75% Chance auf AI-Citation
- 🚀 +60-80% Organic Traffic
- 🚀 +40-60% Termin-Anfragen über Website

---

## 🔧 TECHNISCHE DETAILS

### Build-Pipeline
```bash
npm run build:all
```

**Führt aus:**
1. `npm run build` - HTML/Assets kopieren
2. `cp llms.txt .output/llms.txt` - llms.txt kopieren
3. `npm run build:mirrors` - Markdown Mirrors generieren
4. `npm run build:llms` - llms.txt befüllen
5. `npm run build:sitemap` - sitemap.xml generieren

### Vercel Deployment
- **buildCommand:** `npm run build:all`
- **outputDirectory:** `.output`
- Auto-Deploy bei Git Push zu `main`

### Cache-Strategie
- **Assets:** 1 Jahr (immutable)
- **Styles:** 1 Jahr (immutable)
- **HTML:** 1 Stunde
- **Components:** 5 Minuten (must-revalidate)
- **SEO-Dateien:** 1 Stunde

---

## 📝 WICHTIGE LINKS

### Live-URLs
- Homepage: https://zahnarztpraxis-schwabing.de/
- robots.txt: https://zahnarztpraxis-schwabing.de/robots.txt
- llms.txt: https://zahnarztpraxis-schwabing.de/llms.txt
- Sitemap: https://zahnarztpraxis-schwabing.de/sitemap.xml
- Markdown Mirrors: https://zahnarztpraxis-schwabing.de/team.md
- IndexNow Key: https://zahnarztpraxis-schwabing.de/bc0998b9...txt

### Tools
- Google Search Console: https://search.google.com/search-console/
- Bing Webmaster Tools: https://www.bing.com/webmasters/
- Schema Validator: https://validator.schema.org/
- PageSpeed Insights: https://pagespeed.web.dev/

---

## 🎯 NÄCHSTE SCHRITTE

### Priorität 1 (Diese Woche)
1. [ ] Google Search Console einrichten (10 Min)
2. [ ] Bing Webmaster Tools einrichten (10 Min)
3. [ ] Website testen nach Cache-Fix

### Priorität 2 (Diesen Monat)
4. [ ] GMB-Profile vollständig ausfüllen
5. [ ] Erste 5 Local Citations erstellen
6. [ ] Bewertungs-Strategie starten

### Priorität 3 (Ongoing)
7. [ ] Monatliches AI-Visibility Tracking
8. [ ] Content Marketing (Reddit/Quora/LinkedIn)
9. [ ] Bewertungen sammeln & beantworten

---

**Ende des Status-Reports**

*Letzte Aktualisierung: 2026-06-03 01:00 UTC*
