# Structure.md — Zahnarztpraxis Schwabing

> **Zweck:** Vollständige Architektur-, Inhalts- und Sektionsspezifikation. Komplementär zur `Design.md`. Hier steht, **was wo steht und wie es aufgebaut ist** — inkl. konkreter Texte, Datei-Struktur und Build-Anleitung für Claude Code.

> **Praxis-Stammdaten (verifiziert von der Original-Seite):**
> - **Name:** Zahnärztliche Praxisgemeinschaft Dr. Birte Hancock-Diener & Dr. Irene Jahn
> - **Adresse:** Friedrichstraße 33, 80801 München
> - **Tel. Dr. Jahn:** 089 38 80 86 87
> - **Tel. Dr. Hancock-Diener:** 089 38 88 95 00
> - **Notdienst:** 089 72 33 093 (notdienst-zahn.de)
> - **Öffnungszeiten:** Mo, Fr 8–16 · Di, Do 8–18 · Mi 8–17
> - **Meisterlabor-Partner:** Zahnwerk Dreilinden, Oraldesign Chiemsee, Dentallabor Demmel

---

## 1. Komplette Sitemap

```
/                                              → Landing Page
/ueber-uns                                     → Praxis-Story, Werte
/team                                          → Team-Übersicht
  /team/dr-hancock-diener                      → Einzelprofil
  /team/dr-jahn                                → Einzelprofil
/leistungen                                    → Leistungen-Übersicht
  /leistungen/prophylaxe-zahnerhaltung         → Prophylaxe + Parodontologie + Endodontologie
  /leistungen/aesthetik                        → Ästhetische Zahnheilkunde + Bleaching
  /leistungen/implantologie-chirurgie          → Implantologie + Oralchirurgie
  /leistungen/schienentherapie                 → Schienen (Knirsch/Schnarch/NTI/Aligner)
  /leistungen/kinderzahnheilkunde              → Kinderzahnheilkunde
  /leistungen/angstpatienten                   → Hilfe bei Zahnarztangst
/praxis-tour                                   → Bilder-/Video-Rundgang
/neupatienten                                  → Erstbesuch, Anamnese, Mitzubringen
/kontakt                                       → Kontakt, Anfahrt, Formular
/termin                                        → Termin-Buchung (auch als Modal)
/notfall                                       → Notdienst & Selbsthilfe
/karriere                                      → Stellenanzeigen (Phase 2, optional)
/aktuelles                                     → Blog/News (Phase 2, optional)
/impressum
/datenschutz
```

### Konsolidierung gegenüber alter Seite

| Alt (13 Unterseiten) | Neu (6 Detail-Seiten + Anker-Nav) |
|---|---|
| Zahnerhaltung + Parodontologie + Endodontologie | → **Prophylaxe & Zahnerhaltung** |
| Ästhetik & Funktion + Bleaching | → **Ästhetik** |
| Oralchirurgie + Implantologie | → **Implantologie & Chirurgie** |
| Schienentherapie + Schnarch + NTI + Aligner | → **Schienentherapie** |
| Kinderzahnheilkunde | → bleibt eigenständig |
| Angstpatienten | → bleibt eigenständig |

**Begründung:** Konsolidierung verbessert SEO (keine dünnen Seiten), Lesefluss und Navigation. Innerhalb der Seiten Anker-Sticky-Nav für Sub-Themen.

---

## 2. Globale Komponenten

### 2.1 `<Header>`

**Layout:**
```
[Logo]   Leistungen ▾  Team  Über uns  Kontakt   🟢 [Termin →]
```

- Logo links → `/`
- 5 Nav-Items: Leistungen (Dropdown), Team, Über uns, Kontakt, Notfall (klein, rechts)
- Rechts: Live-Status-Indicator + Primary-CTA „Termin vereinbaren"
- Bei Scroll: Backdrop-Blur, dezenter Bottom-Border, Höhe 72→64px

**Leistungen-Dropdown:**
- `--bg-surface`, `radius-lg`, `shadow-md`, padding 24px
- 6 Mini-Cards: Icon + Titel + 1-Zeilen-Description
- Footer-Link: „Alle Leistungen ansehen →"

**Mobile:** Hamburger → Vollbild-Overlay, große Items in Display-Schrift

**Datei:** `components/layout/Header.tsx`

### 2.2 `<Footer>`

**Layout (4 Spalten Desktop):**

```
Spalte 1: Brand              Spalte 2: Praxis
- Logo                        - Über uns
- 1-Satz Claim                - Team
- Adresse                     - Praxis-Tour
- Live-Status                 - Neupatienten

Spalte 3: Leistungen          Spalte 4: Kontakt & Recht
- Prophylaxe                  - Tel. Dr. Jahn
- Ästhetik                    - Tel. Dr. Hancock-Diener
- Implantologie               - E-Mail
- Schienentherapie            - Adresse
- Kinder                      - Notfall
- Angstpatienten              - Impressum / Datenschutz
                              - Cookie-Einstellungen
```

Mobile: Akkordeon (außer Brand-Spalte). Trenner unten + Copyright + optional Social-Icons.

**Datei:** `components/layout/Footer.tsx`

### 2.3 `<TerminModal>` (global)

Trigger: Jeder „Termin"-Button.

**Layout:** 720px Modal, `radius-xl`, `shadow-lg`, Backdrop-Blur. Close-X oben rechts. 2 Tabs.

**Tab 1 „Online buchen":**
- Embedded Cal.com / Doctolib Inline-Widget
- Schritte: Ärztin → Termin-Typ → Datum/Zeit → Daten → Bestätigung
- E-Mail an Patient + Praxis nach Buchung

**Tab 2 „Anrufen":**
- 2 Karten nebeneinander (gestapelt Mobile):
  - Foto Dr. Jahn + Name + 📞 089 38 80 86 87
  - Foto Dr. Hancock-Diener + Name + 📞 089 38 88 95 00
- Notfall-Hinweis-Box darunter

**Datei:** `components/modals/TerminModal.tsx`
**State:** Globaler Context mit `useTerminModal()` Hook

### 2.4 `<NotfallBanner>` (klein, dezent)
- Im Footer + optional Header (Mobile)
- Klick → `/notfall`

### 2.5 `<CookieConsent>`
- Schmal am unteren Rand
- 3 Buttons: „Alle akzeptieren" / „Nur notwendige" / „Einstellungen"
- DSGVO-konform, `localStorage`

### 2.6 `<LiveStatusIndicator>`
- Server-zeitbasiert (Server Component)
- Geöffnet: grüner Punkt + „Jetzt geöffnet · schließt um {Zeit}"
- Bald öffnet: gelber Punkt + „Öffnet in {Zeit}"
- Geschlossen: grauer Punkt + „Geschlossen · öffnet {Wochentag} {Zeit}"

**Datei:** `components/shared/LiveStatusIndicator.tsx`

---

## 3. Landing Page (`/`)

> **Datei:** `app/page.tsx`
> **Ziel:** In 3 Sekunden Premium-Anspruch + Vertrauen + Termin-Buchung kommunizieren.

### Sektion 3.1 — `<Hero>`

**Layout:** 55/45 Text/Bild Desktop, gestapelt Mobile.

**Links:**
- Eyebrow: `ZAHNMEDIZIN IN MÜNCHEN-SCHWABING`
- Headline (display-xl): **„Bewährtes und Fortschritt für Ihr *Lächeln*."**
- Subhead (body-xl): „Praxisgemeinschaft Dr. Hancock-Diener und Dr. Jahn. Wir nehmen uns Zeit — für Ihre Gesundheit, Ihre Ästhetik, Ihr Wohlbefinden."
- Primary-CTA: „Termin vereinbaren →" (öffnet TerminModal)
- Secondary-CTA: „Unsere Leistungen" (Smooth-Scroll)

**Rechts:**
- Hero-Bild 4:5, `radius-xl` — Behandlungsraum, warmes Licht
- Floating Badge unten links: ✓ „Meisterlabor-Qualität" + „In-House-Partnerschaft seit 20+ Jahren"

**Datei:** `components/sections/Hero.tsx`

### Sektion 3.2 — `<TrustBar>`

Schmal, direkt unter Hero, `--bg-subtle`.

5 Items horizontal mit 1px-Trennern:
- 🛡️ 30+ Jahre Praxis-Erfahrung
- 🏆 Zahntechnische Meisterlabor-Partnerschaft
- 🕐 Online-Buchung 24/7
- 💚 Sanfte Behandlungsmethoden
- 📍 Friedrichstraße 33, Schwabing

Mobile: horizontal scrollbar.

**Datei:** `components/sections/TrustBar.tsx`

### Sektion 3.3 — `<Intro>` (Praxis-Anriss)

**Layout:** 50/50, Bild + Text.

- Eyebrow: `WILLKOMMEN`
- Headline (display-lg): „Eine Praxisgemeinschaft, die *Zeit* nimmt."
- Body (body-lg, 2 Absätze):

> „Seit über 20 Jahren führen Dr. Birte Hancock-Diener und Dr. Irene Jahn ihre Praxis in der Schwabinger Friedrichstraße. Was uns ausmacht: Wir hören zu, bevor wir behandeln. Wir erklären, bevor wir beginnen. Und wir arbeiten Hand in Hand mit den besten zahntechnischen Meisterlaboren Süddeutschlands."
>
> „Ob Vorsorge, Implantat, Wurzelbehandlung oder ästhetische Korrektur — bei uns sind Sie nicht ein Termin im Kalender, sondern ein Mensch mit individuellen Wünschen."

- CTA: „Mehr über uns erfahren →"
- Bild: Detail-Aufnahme der Praxis

**Datei:** `components/sections/Intro.tsx`

### Sektion 3.4 — `<LeistungenGrid>`

**Layout:** 3×2 Desktop, 2×3 Tablet, 1×6 Mobile.

**Header:**
- Eyebrow: `UNSERE LEISTUNGEN`
- Headline (display-lg): „Zahnmedizin in *ihrer ganzen Breite*."
- Subhead: „Von der Vorsorge bis zur hochpräzisen Implantologie — alles unter einem Dach."

**Cards:**

| # | Titel | Description | Icon | Link |
|---|---|---|---|---|
| 1 | Prophylaxe & Zahnerhaltung | Professionelle Zahnreinigung, Parodontologie und Wurzelbehandlung — Vorsorge ist die beste Medizin. | Schild-Zahn | `/leistungen/prophylaxe-zahnerhaltung` |
| 2 | Ästhetik | Bleaching, Veneers und ästhetische Korrekturen — für ein Lächeln, das zu Ihnen passt. | Stern | `/leistungen/aesthetik` |
| 3 | Implantologie & Chirurgie | Hochwertiger, langlebiger Zahnersatz und schonende oralchirurgische Eingriffe. | Schraube | `/leistungen/implantologie-chirurgie` |
| 4 | Schienentherapie | Hilfe bei Knirschen, Schnarchen und sanfte Zahnkorrektur. | Mond | `/leistungen/schienentherapie` |
| 5 | Kinderzahnheilkunde | Sanfter, spielerischer Einstieg — schon ab dem ersten Zahn. | Lächeln | `/leistungen/kinderzahnheilkunde` |
| 6 | Angstpatienten | Zeit, Verständnis und Behandlung im eigenen Tempo. | Herz | `/leistungen/angstpatienten` |

**Datei:** `components/sections/LeistungenGrid.tsx`

### Sektion 3.5 — `<Werte>`

- Eyebrow: `UNSERE WERTE`
- Headline (display-lg): „*Bewährtes* und Fortschritt."

**3 Karten:**

| Säule | Titel | Body |
|---|---|---|
| Zeit | „Wir nehmen uns Zeit" | „Beratung, Diagnose, Behandlung — alles in Ruhe. Bei uns sind Sie kein Termin im Minutentakt, sondern Mensch mit individuellen Bedürfnissen." |
| Präzision | „Meisterlabor-Qualität" | „Über 20 Jahre Zusammenarbeit mit zahntechnischen Meisterlaboren. Jeder Zahnersatz wird individuell angefertigt, perfekt angepasst und sorgfältig kontrolliert." |
| Vertrauen | „Erfahrung, die wirkt" | „Zwei Zahnärztinnen, drei Jahrzehnte Praxiserfahrung, regelmäßige Fortbildungen — Sie sind in fachkundigen Händen." |

**Datei:** `components/sections/Werte.tsx`

### Sektion 3.6 — `<Team>` (zentral!)

**Layout:** 2 große Profile-Karten nebeneinander Desktop, gestapelt Mobile.

- Eyebrow: `IHRE ZAHNÄRZTINNEN`
- Headline (display-lg): „Zwei Zahnärztinnen, *ein Anspruch*."

**Pro Karte:**
- B&W-Portrait 4:5, `radius-xl`
- Name (heading-lg), Rolle in `--brand-primary`
- Spezialisierungs-Tags (Pills `--brand-soft`)
- Bio (3–4 Zeilen)
- Primary „Termin bei Dr. [Name]" + Tertiary „Profil ansehen →"
- Hover: Foto wird farbig (600ms)

**Beispiel-Bios:**

> **Dr. Birte Hancock-Diener** · Zahnärztin
> Tags: Implantologie · Ästhetik · Zahnerhaltung
> „Zahnmedizinstudium an der LMU München, anschließend mehrjährige Tätigkeit in renommierten Praxen. Schwerpunkt: Implantologie und Ästhetik. Eng vernetzt mit dem Meisterlabor Zahnwerk Dreilinden für individuell gefertigten Zahnersatz."

> **Dr. Irene Jahn** · Zahnärztin
> Tags: Endodontologie · Parodontologie · Funktionsdiagnostik
> „Zahnmedizin in München. Schwerpunkte: Endodontologie, Parodontologie und Funktionsdiagnostik. Langjährige Zusammenarbeit mit dem Meisterlabor Oraldesign Chiemsee. Besonderes Augenmerk auf einfühlsame Betreuung von Angstpatienten."

**Datei:** `components/sections/Team.tsx`

### Sektion 3.7 — `<TechSpotlight>` (3D-Element / Wow-Moment)

**Layout:** 50/50 — Text + 3D-Element.

**Links:**
- Eyebrow: `MODERNE ZAHNHEILKUNDE`
- Headline (display-lg): „Präzision, die man *sehen* kann."
- Body (body-lg):

> „Moderne Zahnmedizin ist heute deutlich mehr als Bohren und Füllen. Mit digitaler Diagnostik, präzisen 3D-Aufnahmen und enger Zusammenarbeit mit zahntechnischen Meisterlaboren erreichen wir Ergebnisse, die noch vor wenigen Jahren undenkbar waren."

- 3 Bullet-Points mit Häkchen:
  - Digitales Röntgen für minimale Strahlenbelastung
  - 3D-Scans für präzise Diagnose und Planung
  - Zertifizierte Meisterlabor-Partner
- CTA: „Erfahren Sie mehr →"

**Rechts:** 3D-Zahnmodell (siehe Design.md 9.4)
- Container: Aspect 1:1
- Drag-to-rotate, Auto-Rotation default
- Optionale Hotspots: „Zahnschmelz", „Wurzel", „Pulpa"
- Mobile-Fallback: statisches gerendertes Bild

**Dateien:**
- `components/sections/TechSpotlight.tsx`
- `components/3d/ToothModel.tsx`

### Sektion 3.8 — `<Patientenstimmen>`

**Layout:** 3 Karten Desktop, Slider Mobile.

- Eyebrow: `WAS UNSERE PATIENT:INNEN SAGEN`
- Headline (display-lg): „Vertrauen, *gewachsen* über Jahre."

**3–6 Patientenstimmen-Karten** (Design.md 6.2). Echte Bewertungen, sonst Platzhalter:

> „Endlich eine Praxis, in der man sich wirklich Zeit nimmt. Frau Dr. Jahn hat mir alles geduldig erklärt — ich gehe zum ersten Mal *gerne* zum Zahnarzt."
> *— Sabine M., Patientin seit 2019*

> „Sehr professionell, sehr menschlich. Die Behandlung war absolut schmerzfrei, das Ergebnis übertrifft meine Erwartungen."
> *— Markus K., Patient seit 2021*

> „Ich war ein klassischer Angstpatient. Hier habe ich gelernt, dass es auch anders geht. Vielen Dank an das gesamte Team."
> *— Julia R., über Google*

**Footer-Link:** Zu Google-Bewertungen / Jameda.

**Datei:** `components/sections/Patientenstimmen.tsx`

### Sektion 3.9 — `<TerminCTA>` (eingebettete Buchung)

**Layout:** Volle Breite, dunkle Banner-Karte (`--bg-emphasis`).

- Eyebrow: `TERMIN VEREINBAREN`
- Headline (display-lg, weiß): „Bereit für Ihr *schönstes Lächeln*?"
- Subhead: „Buchen Sie online — rund um die Uhr. Oder rufen Sie uns direkt an."

**2-Spalten:**
- **Links:** Embedded Buchungs-Widget (`--bg-surface`, `radius-xl`, ~520px Höhe)
- **Rechts:** 2 gestapelte Direkt-Kontakt-Karten + Notfall-Hinweis

**Datei:** `components/sections/TerminCTA.tsx`

### Sektion 3.10 — `<Standort>` (Google Maps)

**Layout:** 60/40 — Map + Info-Karte.

- Eyebrow: `SO FINDEN SIE UNS`
- Headline (display-lg): „Mitten in *Schwabing*."

**Links: Map**
- Leaflet + CartoDB Positron
- Custom Marker Friedrichstraße 33
- Höhe 480px Desktop / 320px Mobile, `radius-xl`
- Pulse-Animation auf Marker
- Overlay: Adresse + „Route in Google Maps öffnen →"

**Rechts: Info**
- Adresse:
  > Friedrichstraße 33
  > 80801 München (Schwabing)
- Öffnungszeiten:
  > Mo, Fr: 8 – 16 Uhr
  > Di, Do: 8 – 18 Uhr
  > Mi: 8 – 17 Uhr
- ÖPNV: „U3/U6 Münchner Freiheit — 5 Min. Fußweg" *(verifizieren)*
- Parken: Tiefgarage / Anwohner-Parkplätze *(verifizieren)*
- Barrierefreiheit *(verifizieren)*

**Dateien:**
- `components/sections/Standort.tsx`
- `components/maps/PracticeMap.tsx`

### Sektion 3.11 — `<FAQ>` (Kurz-Version)

**Layout:** Akkordeon, max-width 720px, zentriert.

- Eyebrow: `HÄUFIG GEFRAGT`
- Headline (display-lg): „Antworten *vor* dem ersten Besuch."

**6 Top-Fragen:**
1. Wie buche ich einen Termin?
2. Was sollte ich zum ersten Termin mitbringen?
3. Welche Krankenkassen werden akzeptiert?
4. Wie lange dauert eine professionelle Zahnreinigung?
5. Behandeln Sie auch Angstpatienten?
6. Was passiert bei einem Notfall außerhalb der Sprechzeiten?

**Footer:** „*Alle FAQ ansehen* →" → `/neupatienten#faq`

**Datei:** `components/sections/FAQ.tsx`

### Landing Page — Reihenfolge

```
1. <Header>
2. <Hero>
3. <TrustBar>
4. <Intro>
5. <LeistungenGrid>
6. <Werte>
7. <Team>
8. <TechSpotlight>
9. <Patientenstimmen>
10. <TerminCTA>
11. <Standort>
12. <FAQ>
13. <Footer>
14. <CookieConsent>
```

---

## 4. Über uns (`/ueber-uns`)

> **Datei:** `app/ueber-uns/page.tsx`

### 4.1 `<Hero>`
- Eyebrow: `ÜBER DIE PRAXIS`
- Headline (display-2xl): „Eine Praxis, die *Bewährtes* mit Fortschritt verbindet."
- Subhead: „Seit über 20 Jahren in der Schwabinger Friedrichstraße."
- Bild darunter (16:9): Praxis-Außenansicht oder Empfang

### 4.2 `<Story>` (Long-Form-Text)
- max-width 720px
- Eyebrow: `UNSERE GESCHICHTE`
- Headline (display-lg): „Wie alles *begann*."
- 4–6 Absätze:
  - Lead (body-xl): Gründung, Vision
  - Warum Schwabing
  - Die Partnerschaft der zwei Ärztinnen
  - Philosophie („Zeit für den Patienten")
  - Heute
- Pull-Quote: „*Wir nehmen uns Zeit — für Sie, für Ihre Fragen, für die richtige Diagnose.*"
- 2 Bilder im Text-Fluss („inset" + „wide")

### 4.3 `<Werte>` (3 Säulen, ausführlicher)
- Wie Landing 3.5, aber 3–4 Sätze pro Säule

### 4.4 `<Meilensteine>` (Timeline)
- Vertikale Timeline, 5–7 Stationen:
  - 2003: Praxisgründung
  - 2008: Erste Erweiterung
  - 2015: Modernisierung mit digitalem Röntgen
  - 2020: Online-Terminbuchung
  - 2024: Komplette Neuausstattung
- *Alle Daten mit Auftraggeber verifizieren!*

### 4.5 `<Partner>` (Meisterlabor-Partner)
- Eyebrow: `UNSERE PARTNER`
- Headline: „Zahntechnik auf *höchstem* Niveau."
- 3 Partner-Karten:
  - **Zahnwerk Dreilinden** (Dr. Hancock-Diener) — Logo + Kurztext + Link
  - **Oraldesign Chiemsee** (Dr. Jahn) — Logo + Kurztext + Link
  - **Dentallabor Demmel München** — Logo + Kurztext

### 4.6 `<PraxisGalerie>` (6–8 Bilder, Masonry, Lightbox)
- Footer: „Vollständigen Rundgang ansehen →" → `/praxis-tour`

### 4.7 `<TerminCTA>` (helle Variante)

### 4.8 `<Footer>`

---

## 5. Team (`/team`)

> **Datei:** `app/team/page.tsx`

### 5.1 `<Hero>`
- Eyebrow: `UNSER TEAM`
- Headline (display-xl): „Menschen, denen Sie Ihr *Lächeln* anvertrauen."

### 5.2 `<DieZahnaerztinnen>`
Zickzack-Layout, alternierend Bild/Text.

**Pro Profil:**
- B&W-Portrait 4:5, `radius-xl`
- Name + Titel (display-lg)
- Spezialisierungs-Tags
- Bio (3–5 Absätze, Drop-Cap)
- Fortbildungen (ausklappbar, 10–20 Einträge)
- Meisterlabor-Hinweis-Box
- Telefon-Button + Termin-Button + Link zum Einzelprofil

### 5.3 `<Praxisteam>` (falls vorhanden — verifizieren)
- Eyebrow: `UNSER PRAXISTEAM`
- Headline: „*Hinter den Kulissen*."
- Grid: 3–4 kreisförmige B&W-Portraits 200px
- Pro Person: Name, Rolle, 1-Satz

### 5.4 `<TerminCTA>` + `<Footer>`

### 5.X Einzel-Profile (`/team/[slug]`) — Phase 2

> **Dateien:** `app/team/dr-hancock-diener/page.tsx`, `app/team/dr-jahn/page.tsx`

**Aufbau:**
1. Hero: Großes Portrait + Name + Titel + Tags
2. Lange Bio (Long-Form, Pull-Quotes, Bilder)
3. Fachliche Schwerpunkte (3–4 Karten)
4. Werdegang (Timeline)
5. Fortbildungen (vollständige Liste)
6. Mitgliedschaften (DGI, BDIZ EDI, DGZMK)
7. Persönliches (optional)
8. CTA: „Termin bei Dr. [Name]"

---

## 6. Leistungen-Übersicht (`/leistungen`)

> **Datei:** `app/leistungen/page.tsx`

### 6.1 `<Hero>`
- Eyebrow: `UNSERE LEISTUNGEN`
- Headline (display-xl): „Zahnmedizin in *ihrer ganzen Breite*."

### 6.2 `<LeistungenDetail>` (6 große Karten)
**Layout:** 2 Spalten Desktop, 1 Spalte Mobile.

**Pro Leistung — große Featured Card:**
- Bild (3:2)
- Eyebrow „LEISTUNG #X"
- Heading-lg: Titel
- Body-lg: Description
- Liste (3 Stichpunkte mit Häkchen): Sub-Themen
- Button: „Mehr erfahren →"

### 6.3 `<TerminCTA>` + `<Footer>`

---

## 7. Leistungs-Detailseiten (Template + 6 Instanzen)

### 7.0 Template

```
1. <Header>
2. <ServiceHero>
3. <StickyAnchorNav> (bei Sub-Themen)
4. <Einleitung> (Long-Form)
5. <SubthemenSections> (1–4 je nach Seite)
6. <Behandlungsablauf> (Step-by-Step)
7. <Technik>
8. <KostenInfo> (Info-Box)
9. <FAQ>
10. <Patientenstimmen>
11. <CrossSell>
12. <TerminCTA>
13. <Footer>
```

#### `<ServiceHero>`
- Eyebrow: Übergeordnete Kategorie
- Headline (display-xl): Leistungsname
- Subhead: 1–2 Sätze
- Hero-Bild rechts (3:2 oder 4:5)

#### `<StickyAnchorNav>`
- Sticky links Desktop / oben Mobile
- Anker-Links der Sub-Themen
- Aktiver Link: `--brand-primary` + Border-Left 2px
- Smooth-Scroll bei Klick

#### `<Behandlungsablauf>`
- Eyebrow: `SO LÄUFT'S AB`
- Headline: „Ihre Behandlung — *Schritt für Schritt*."
- 4–6 Behandlungs-Schritt-Karten

#### `<KostenInfo>` (Info-Box)
- Hellgrüner Hintergrund
- Titel: „Was zahlt die Krankenkasse?"
- Body: Erklärt Kassenleistung vs. Eigenanteil
- Disclaimer: „Konkrete Kosten im Beratungsgespräch."

---

### 7.1 Prophylaxe & Zahnerhaltung

**Datei:** `app/leistungen/prophylaxe-zahnerhaltung/page.tsx`

**Sub-Themen:** Professionelle Zahnreinigung (PZR) · Parodontologie · Endodontologie

**Hero:**
- Eyebrow: `PROPHYLAXE & ZAHNERHALTUNG`
- Headline: „Vorsorge ist die *beste* Medizin."
- Subhead: „Mit regelmäßiger Prophylaxe und gezielter Therapie erhalten wir Ihre Zähne ein Leben lang."

**Einleitung (Long-Form, 3 Absätze):**
> „Die meisten Zahnprobleme entstehen schleichend — und können mit konsequenter Vorsorge verhindert werden. Genau deshalb steht die Prophylaxe im Zentrum unserer Arbeit. Wer regelmäßig zur professionellen Zahnreinigung kommt, hat statistisch gesehen weniger Karies, weniger Zahnfleischprobleme und behält seine Zähne länger gesund."
>
> „Aber auch wenn bereits Probleme bestehen — Karies, entzündetes Zahnfleisch, eine schmerzhafte Wurzel —, ist die Erhaltung des eigenen Zahns fast immer die bessere Wahl als der Ersatz. Mit modernen Verfahren ist das heute in vielen Fällen möglich."
>
> „In diesem Bereich bündeln wir drei Disziplinen: Prophylaxe, Parodontologie und Endodontologie. Hier erfahren Sie, was wir für Ihre Zahngesundheit tun können."

**Sub-Sektion 1: Professionelle Zahnreinigung (PZR)**
- H2: „Professionelle Zahnreinigung — *die Basis*."
- 3–4 Absätze über Ablauf, Häufigkeit, Vorteile
- Liste „Was passiert bei einer PZR?":
  - Untersuchung Ihrer Mundhöhle
  - Entfernung von hartem Zahnstein
  - Reinigung schwer zugänglicher Stellen
  - Politur der Zahnoberflächen
  - Fluoridierung zum Schutz
  - Beratung zur häuslichen Pflege
- Bild rechts: Detail einer PZR

**Sub-Sektion 2: Parodontologie**
- H2: „Wenn das *Zahnfleisch* krank ist."
- Body über Parodontitis, Ursachen, Folgen
- 2 Phasen erklären: nicht-chirurgisch (Reinigung der Taschen) + chirurgisch
- Hinweis auf systemische Auswirkungen (Herz-Kreislauf-System)

**Sub-Sektion 3: Endodontologie (Wurzelbehandlung)**
- H2: „Eine Wurzelbehandlung *muss* nicht schmerzhaft sein."
- Body über moderne Verfahren, Schmerz-Management
- Optional: 3D-Visualisierung eines Zahn-Querschnitts

**Behandlungsablauf:** 4 Schritte: Diagnose → Beratung → Behandlung → Nachsorge

**Technik:** Mikroskop · Digitale Diagnose · Schonende Anästhesie

**Kosten-Info-Box:** „Was zahlt die Krankenkasse bei der PZR?"

**FAQ (5–7):**
- Wie oft sollte ich zur PZR?
- Tut eine Wurzelbehandlung weh?
- Was kostet eine Parodontitis-Behandlung?
- Wann ist Karies gefährlich?
- Kann man Zahnstein selbst entfernen?

**Patientenstimmen:** 2 leistungsspezifische Stimmen

**CrossSell:** Ästhetik · Implantologie

---

### 7.2 Ästhetik

**Datei:** `app/leistungen/aesthetik/page.tsx`

**Sub-Themen:** Bleaching · Veneers · Ästhetische Korrekturen

**Hero:**
- Eyebrow: `ÄSTHETIK`
- Headline: „Ein Lächeln, das *zu Ihnen* passt."
- Subhead: „Sanfte ästhetische Zahnmedizin — natürlich, individuell, präzise."

**Spezial: Vorher/Nachher-Slider** (2–3 Fälle, mit Einverständnis!)

**Sub-Sektion 1: Bleaching**
- In-Office vs. Home-Bleaching
- Verfahren, Dauer, Resultat
- Dauer der Wirkung

**Sub-Sektion 2: Veneers**
- Was sind Veneers?
- Materialien (Keramik vs. Composite)
- Ablauf: Beratung → Anpassung → Anbringung
- Wie lange halten sie?

**Sub-Sektion 3: Ästhetische Korrekturen**
- Bonding · Formkorrekturen · Farb-Anpassung

**Behandlungsablauf, Technik, FAQ** wie Template.

---

### 7.3 Implantologie & Chirurgie

**Datei:** `app/leistungen/implantologie-chirurgie/page.tsx`

**Sub-Themen:** Implantologie · Oralchirurgie

**Hero:**
- Eyebrow: `IMPLANTOLOGIE & CHIRURGIE`
- Headline: „Hochwertiger Zahnersatz, *langfristig* gedacht."
- Subhead: „Implantate, die wie eigene Zähne wirken — dank moderner Diagnostik und Meisterlabor-Qualität."

**Spezial: 3D-Implantat-Modell** (interaktiv, mit Hotspots „Implantat", „Aufbau", „Krone", „Knochen")

**Sub-Sektion 1: Implantologie**
- Was ist ein Implantat?
- Materialien (Titan, Keramik)
- Ablauf: Planung → Einsetzen → Heilung → Versorgung
- Lebensdauer
- Wann nicht möglich?

**Sub-Sektion 2: Oralchirurgie**
- Weisheitszähne
- Wurzelspitzenresektion
- Knochenaufbau
- Schonende OP-Verfahren

**Behandlungs-Timeline:** Implantat-Prozess (3–6 Monate visualisiert)

**Technik:** 3D-Diagnose (DVT) · Computer-gestützte Planung · Mikrochirurgische Verfahren

**Kosten-Info-Box:** Was zahlt die Kasse beim Implantat? (sehr ausführlich!)

**FAQ:** 8–10 Fragen (häufige Patientenfrage)

---

### 7.4 Schienentherapie

**Datei:** `app/leistungen/schienentherapie/page.tsx`

**Sub-Themen:** Knirsch-Schienen · Schnarch-Schienen · NTI · Aligner

**Hero:**
- Eyebrow: `SCHIENENTHERAPIE`
- Headline: „Wenn die Schiene *die Lösung* ist."
- Subhead: „Knirschen, Schnarchen, Zahnkorrektur — moderne Schienen können viele Probleme sanft lösen."

**Sub-Sektion 1: Knirsch-Schienen**
- Was ist Bruxismus?
- Folgen (Zahnabrieb, Kiefergelenk-Probleme)
- Behandlung mit individuell angepasster Schiene

**Sub-Sektion 2: Schnarch-Schienen**
- Wie funktioniert eine Anti-Schnarch-Schiene?
- Wann sinnvoll? Wann zum HNO-Arzt?

**Sub-Sektion 3: NTI Aufbiss-Schienen**
- Was ist NTI?
- Bei Migräne, Spannungs-Kopfschmerz

**Sub-Sektion 4: Aligner / Zahnkorrektur**
- Unsichtbare Zahnkorrektur
- Dauer, Ablauf, Vorteile gegenüber festen Brackets

**Behandlungsablauf, Technik, FAQ** wie Template.

---

### 7.5 Kinderzahnheilkunde

**Datei:** `app/leistungen/kinderzahnheilkunde/page.tsx`

**Hero:**
- Eyebrow: `KINDERZAHNHEILKUNDE`
- Headline: „Sanfter Einstieg — *schon ab dem ersten Zahn*."
- Subhead: „Wir wollen, dass der Zahnarzt-Besuch ein gutes Erlebnis bleibt."

**Sektionen:**
- **Erster Zahnarzt-Besuch:** Wann? Was wird gemacht? Wie bereiten Eltern vor?
- **Spielerischer Ansatz:** Wie wir mit Kindern umgehen
- **Vorsorge & Prophylaxe für Kinder**
- **Versiegelung**
- **Tipps für Eltern:** Zähneputzen · Ernährung · Zähneputz-Lieder

**Spezial:** Eventuell illustrative Anatomie-Grafik für Kinder

**Eltern-FAQ:** 8–10 typische Fragen

**Bild-Tonalität:** Warm, kindfreundlich, dokumentarisch (nicht kitschig).

---

### 7.6 Angstpatienten

**Datei:** `app/leistungen/angstpatienten/page.tsx`

**Hero:**
- Eyebrow: `ANGSTPATIENTEN`
- Headline: „Angst beim Zahnarzt? *Bei uns nicht*."
- Subhead: „Wir nehmen Zahnarzt-Angst ernst. Mit Zeit, Verständnis und sanften Methoden."

**Wichtig:** Warmer, einfühlsamer Ton durchweg!

**Sektionen:**
- **Sie sind nicht allein:** ~7% der Bevölkerung sind Angstpatienten
- **Unser Versprechen:** Was wir anders machen
- **Methoden bei uns:**
  - Erstgespräch ohne Behandlung
  - Schritt-für-Schritt-Ankündigungen
  - Pausen-Signal (Patient kann jederzeit „Stopp" zeigen)
  - Dämmerschlaf / Lachgas (falls angeboten)
  - Hypnose / Entspannungsverfahren (falls angeboten)
- **Patientenstimmen ehemaliger Angstpatienten** (besonders wichtig hier!)
- **Wie kommen Sie zu uns?** Schritt-für-Schritt-Anleitung
- **FAQ:** 6–8 Fragen

**Pull-Quote prominent:**
> „Hier habe ich gelernt, dass es auch anders geht."
> *— Patientin, ehemalige Angstpatientin*

---

## 8. Praxis-Tour (`/praxis-tour`)

**Datei:** `app/praxis-tour/page.tsx`

### 8.1 `<Hero>`
- Eyebrow: `EIN BLICK HINTER DIE TÜREN`
- Headline (display-xl): „Willkommen in *Ihrer* Praxis."

### 8.2 `<VideoTour>` (Optional)
- Eingebettetes Video, Aspect 16:9
- Stumm autoplay möglich (mit DSGVO-Consent für YouTube)

### 8.3 `<BildGalerie>` (Hauptkomponente)
- 12–20 Bilder, Masonry-Layout
- Lightbox bei Klick
- Bildunterschriften
- Filter-Kategorien:
  - Behandlungsräume
  - Empfang & Wartezimmer
  - Details & Ausstattung
  - Außenansicht

### 8.4 `<Highlights>` (3–4 Karten)
- Modernes Behandlungszimmer
- Eigener Sterilisationsbereich
- Kinder-Wohlfühl-Ecke
- Barrierefreier Zugang

### 8.5 `<TerminCTA>` + `<Footer>`

---

## 9. Neupatienten (`/neupatienten`)

**Datei:** `app/neupatienten/page.tsx`

### 9.1 `<Hero>`
- Eyebrow: `NEUE PATIENT:INNEN`
- Headline (display-xl): „Ihr *erster* Besuch bei uns."
- Subhead: „Was Sie wissen sollten, was Sie mitbringen — und wie Sie sich vorbereiten."

### 9.2 `<ErstbesuchAblauf>` (5 Schritte)
1. **Termin vereinbaren** — Online oder per Telefon
2. **Anamnesebogen** — Zuhause vorab ausfüllen (PDF-Download)
3. **Anmeldung** — Bei uns am Empfang
4. **Beratungsgespräch** — Wir hören zu, schauen, beraten
5. **Behandlungsplan** — Gemeinsam besprochen, transparent

### 9.3 `<AnamnesebogenDownload>`
- PDF-Mockup links, Text rechts
- Headline: „Sparen Sie 10 Minuten Wartezeit."
- Body: „Füllen Sie unseren Anamnesebogen schon zuhause aus. So beginnen wir Ihren ersten Termin entspannt mit dem Beratungsgespräch."
- Download-Button: „Anamnesebogen herunterladen (PDF)"

### 9.4 `<MitzubringenChecklist>`
- ✓ Versicherungskarte (gesetzlich oder privat)
- ✓ Bonusheft (falls vorhanden)
- ✓ Frühere Röntgenbilder
- ✓ Liste aktueller Medikamente
- ✓ Allergie-Pass
- ✓ Bei Kindern: Kinder-Untersuchungsheft
- ✓ Den ausgefüllten Anamnesebogen

### 9.5 `<Versicherung>`
- Body über GKV vs. PKV vs. Selbstzahler
- Tabelle (vereinfacht): Welche Leistung welche Kasse
- Hinweis: „Bei Privatleistungen erstellen wir einen transparenten Heil- und Kostenplan."

### 9.6 `<FAQ>` (10–15 Fragen, themenblockweise)
- Termin & Erstbesuch
- Versicherung & Kosten
- Behandlung allgemein
- Notfälle
- Praktisches (Anfahrt, Parken)

### 9.7 `<TerminCTA>` + `<Footer>`

---

## 10. Kontakt (`/kontakt`)

**Datei:** `app/kontakt/page.tsx`

### 10.1 `<Hero>`
- Eyebrow: `KONTAKT`
- Headline (display-xl): „So *erreichen* Sie uns."

### 10.2 `<KontaktKarten>` (3 Spalten)

**Karte Telefon:**
- 📞 Anrufen
- Dr. Jahn: 089 38 80 86 87
- Dr. Hancock-Diener: 089 38 88 95 00
- Notfall: 089 72 33 093
- Hinweis: „Außerhalb der Sprechzeiten erreichen Sie den zahnärztlichen Notdienst."

**Karte E-Mail:**
- ✉️ Schreiben
- kontakt@zahnarztpraxis-schwabing.de *(verifizieren)*
- „Wir antworten innerhalb von 24 Stunden (werktags)."

**Karte Vor Ort:**
- 📍 Vor Ort
- Friedrichstraße 33, 80801 München
- „Route in Google Maps öffnen →"

### 10.3 `<Oeffnungszeiten>`
- Saubere Tabelle (siehe Stammdaten)
- Live-Status-Indicator
- Hinweis: „Termine bitte nur nach Vereinbarung."

### 10.4 `<Anfahrt>`
- Map (volle Breite oder 60%)
- ÖPNV / Parken / Barrierefreiheit (alles verifizieren!)

### 10.5 `<Kontaktformular>`
- Eyebrow: `NACHRICHT SCHREIBEN`
- Headline: „Sie haben *eine Frage*?"
- Hinweis: „Für Termin-Anfragen nutzen Sie bitte unser Buchungstool."
- Felder: Name (req) · E-Mail (req) · Telefon · Betreff (Dropdown) · Nachricht (req) · Datenschutz-Checkbox (req)
- Submit → API-Route `/api/contact`

### 10.6 `<TerminCTA>` + `<Footer>`

---

## 11. Termin (`/termin`)

**Datei:** `app/termin/page.tsx`

Standalone-Variante für Direkt-Aufruf.

- Hero: „Termin *vereinbaren*."
- Tabs „Online buchen" / „Anrufen" (wie TerminModal-Inhalt)

---

## 12. Notfall (`/notfall`)

**Datei:** `app/notfall/page.tsx`

### 12.1 `<Hero>`
- Eyebrow: `NOTFALL`
- Headline (display-xl): „Wenn es *schnell* gehen muss."
- Subhead: „So erreichen Sie zahnärztliche Hilfe — auch außerhalb unserer Sprechzeiten."

### 12.2 `<NotdienstHinweis>` (große Banner-Karte)
- `--bg-surface` mit `--accent-warning` Akzent
- Headline: „Zahnärztlicher Notdienst Bayern"
- Telefonnummer prominent (display-lg, klickbar): **089 72 33 093**
- Button: „Notdienst-Webseite öffnen →" → notdienst-zahn.de
- Verfügbarkeit: „Außerhalb unserer Sprechzeiten und am Wochenende"

### 12.3 `<WasTun>` (Soforthilfe-Tipps)
- „Was tun bei Zahnschmerzen außerhalb der Sprechzeiten?"
- Liste:
  - Kühlen (von außen, nicht innen)
  - Schmerztabletten (Ibuprofen / Paracetamol)
  - Aufrecht schlafen
  - Reizende Speisen vermeiden
- Hinweis: „Diese Tipps ersetzen keine zahnärztliche Behandlung."

### 12.4 `<NotfallTypen>` (3 Karten)
- **Akute Schmerzen** → Notdienst anrufen
- **Ausgeschlagener Zahn** → Sofort Praxis aufsuchen, Zahn in Milch lagern
- **Blutung nach Behandlung** → Druck ausüben, ggf. Notdienst

### 12.5 `<UnsereSprechzeiten>` (klein) + `<Footer>`

---

## 13. Karriere (`/karriere`) — Phase 2

- Hero: „Werden Sie *Teil unseres Teams*."
- Über die Arbeit, Werte als Arbeitgeber
- Offene Stellen
- Initiativbewerbung

---

## 14. Aktuelles / Blog (`/aktuelles`) — Phase 2

**Beispiel-Artikel:**
- „PZR — wie oft ist sinnvoll?"
- „Was ist Bruxismus und wann brauche ich eine Schiene?"
- „Implantat oder Brücke — was passt zu mir?"
- „Erste Hilfe bei Zahnschmerzen"
- „Zahnpflege bei Kindern — die häufigsten Fragen"

---

## 15. Rechtliches

### Impressum (`/impressum`)
- Pflichtangaben gemäß §5 TMG
- Berufsrechtliche Angaben (Approbation, zuständige Kammer, Aufsichtsbehörde)
- Berufshaftpflicht

### Datenschutz (`/datenschutz`)
- DSGVO-konform
- Speziell für medizinische Praxis
- Cookie-Hinweise
- Recht auf Auskunft etc.

> Inhalte vom Anwalt prüfen lassen!

---

## 16. Daten-Modell (TypeScript-Constants)

### `data/practice.ts`

```typescript
export const PRACTICE = {
  name: "Zahnärztliche Praxisgemeinschaft Dr. Hancock-Diener & Dr. Jahn",
  shortName: "Zahnarztpraxis Schwabing",
  address: {
    street: "Friedrichstraße 33",
    zip: "80801",
    city: "München",
    district: "Schwabing",
  },
  phones: {
    drJahn: "+498938808687",
    drHancockDiener: "+498938889500",
    notfall: "+498972330093",
  },
  email: "kontakt@zahnarztpraxis-schwabing.de", // verifizieren
  hours: {
    monday: { open: "08:00", close: "16:00" },
    tuesday: { open: "08:00", close: "18:00" },
    wednesday: { open: "08:00", close: "17:00" },
    thursday: { open: "08:00", close: "18:00" },
    friday: { open: "08:00", close: "16:00" },
    saturday: null,
    sunday: null,
  },
  coordinates: { lat: 48.165, lng: 11.585 }, // verifizieren
  social: {
    google: "https://www.google.com/maps/place/...",
    jameda: "...",
  },
};
```

### `data/team.ts`

```typescript
export const TEAM = [
  {
    slug: "dr-hancock-diener",
    name: "Dr. Birte Hancock-Diener",
    role: "Zahnärztin",
    portrait: "/images/team/hancock-diener.jpg",
    specializations: ["Implantologie", "Ästhetik", "Zahnerhaltung"],
    phone: "+498938889500",
    bio: "Kurzbio (3-4 Zeilen)...",
    longBio: "Lange Bio mit Absätzen...",
    education: ["LMU München, Zahnmedizin", "..."],
    fortbildungen: ["...", "..."],
    laborPartner: "Zahnwerk Dreilinden",
  },
  {
    slug: "dr-jahn",
    name: "Dr. Irene Jahn",
    role: "Zahnärztin",
    portrait: "/images/team/jahn.jpg",
    specializations: ["Endodontologie", "Parodontologie", "Funktionsdiagnostik"],
    phone: "+498938808687",
    bio: "...",
    longBio: "...",
    education: [],
    fortbildungen: [],
    laborPartner: "Oraldesign Chiemsee",
  },
];
```

### `data/leistungen.ts`

```typescript
export const LEISTUNGEN = [
  {
    slug: "prophylaxe-zahnerhaltung",
    title: "Prophylaxe & Zahnerhaltung",
    shortDesc: "Professionelle Zahnreinigung, Parodontologie und Wurzelbehandlung.",
    icon: "Shield",
    heroImage: "/images/leistungen/prophylaxe-hero.jpg",
    subThemes: [
      { id: "pzr", title: "Professionelle Zahnreinigung", anchor: "#pzr" },
      { id: "paro", title: "Parodontologie", anchor: "#paro" },
      { id: "endo", title: "Endodontologie", anchor: "#endo" },
    ],
  },
  // ... 5 weitere
];
```

### `data/testimonials.ts`

```typescript
export const TESTIMONIALS = [
  {
    quote: "Endlich eine Praxis, in der man sich wirklich Zeit nimmt...",
    author: "Sabine M.",
    meta: "Patientin seit 2019",
    rating: 5,
    leistung: null, // null = allgemein, sonst slug der Leistung
  },
  // ...
];
```

### `data/faqs.ts`

```typescript
export const FAQS = {
  general: [
    { q: "Wie buche ich einen Termin?", a: "..." },
    // ...
  ],
  prophylaxe: [
    { q: "Wie oft sollte ich zur PZR?", a: "..." },
    // ...
  ],
  // ... pro Leistung
};
```

---

## 17. Datei-Struktur (Next.js App Router)

```
zahnarztpraxis-schwabing/
├── app/
│   ├── layout.tsx                          # Root-Layout (Header, Footer, Modals)
│   ├── page.tsx                            # Landing
│   ├── globals.css                         # Tailwind + CSS-Variablen
│   ├── ueber-uns/page.tsx
│   ├── team/
│   │   ├── page.tsx
│   │   ├── dr-hancock-diener/page.tsx
│   │   └── dr-jahn/page.tsx
│   ├── leistungen/
│   │   ├── page.tsx
│   │   ├── prophylaxe-zahnerhaltung/page.tsx
│   │   ├── aesthetik/page.tsx
│   │   ├── implantologie-chirurgie/page.tsx
│   │   ├── schienentherapie/page.tsx
│   │   ├── kinderzahnheilkunde/page.tsx
│   │   └── angstpatienten/page.tsx
│   ├── praxis-tour/page.tsx
│   ├── neupatienten/page.tsx
│   ├── kontakt/page.tsx
│   ├── termin/page.tsx
│   ├── notfall/page.tsx
│   ├── impressum/page.tsx
│   ├── datenschutz/page.tsx
│   ├── api/
│   │   └── contact/route.ts                # Formular-Endpoint
│   ├── sitemap.ts                          # Auto-Sitemap
│   ├── robots.ts                           # robots.txt
│   └── opengraph-image.tsx                 # Default OG-Bild
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── modals/
│   │   └── TerminModal.tsx
│   ├── sections/                           # Landing-Sektionen
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── Intro.tsx
│   │   ├── LeistungenGrid.tsx
│   │   ├── Werte.tsx
│   │   ├── Team.tsx
│   │   ├── TechSpotlight.tsx
│   │   ├── Patientenstimmen.tsx
│   │   ├── TerminCTA.tsx
│   │   ├── Standort.tsx
│   │   └── FAQ.tsx
│   ├── service/                            # Leistungs-Detail-Komponenten
│   │   ├── ServiceHero.tsx
│   │   ├── StickyAnchorNav.tsx
│   │   ├── Behandlungsablauf.tsx
│   │   ├── KostenInfo.tsx
│   │   └── CrossSell.tsx
│   ├── shared/                             # Wiederverwendbar
│   │   ├── LiveStatusIndicator.tsx
│   │   ├── PhoneButton.tsx
│   │   ├── Eyebrow.tsx
│   │   ├── PullQuote.tsx
│   │   └── CookieConsent.tsx
│   ├── cards/                              # Card-Varianten
│   │   ├── ServiceCard.tsx
│   │   ├── FeaturedCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── TeamCard.tsx
│   │   ├── StepCard.tsx
│   │   └── FAQItem.tsx
│   ├── 3d/
│   │   ├── ToothModel.tsx                  # 3D-Zahn (R3F)
│   │   └── ImplantModel.tsx                # 3D-Implantat
│   ├── maps/
│   │   └── PracticeMap.tsx                 # Leaflet-Map
│   └── ui/                                 # shadcn/ui Components
│       ├── button.tsx
│       ├── input.tsx
│       └── ...
│
├── data/
│   ├── practice.ts
│   ├── team.ts
│   ├── leistungen.ts
│   ├── testimonials.ts
│   ├── faqs.ts
│   └── milestones.ts
│
├── lib/
│   ├── hooks/
│   │   ├── useTerminModal.ts
│   │   └── useOpenStatus.ts
│   ├── utils.ts
│   └── seo.ts                              # Meta-Helpers
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── team/
│   │   ├── leistungen/
│   │   └── praxis/
│   ├── 3d/
│   │   ├── tooth.glb
│   │   └── implant.glb
│   ├── docs/
│   │   └── anamnesebogen.pdf
│   └── icons/
│
├── styles/
│   └── tokens.css                          # CSS-Variablen aus Design.md
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 18. SEO-Architektur

### 18.1 Title-Tag-Struktur
`{Seitenname} | Zahnarztpraxis Dr. Hancock-Diener & Dr. Jahn | München-Schwabing`

### 18.2 Meta-Descriptions
- Custom pro Seite, 150–160 Zeichen
- Mit CTA: „Jetzt Termin vereinbaren"

### 18.3 OpenGraph
- Eigenes OG-Bild pro Seite (Next.js `opengraph-image.tsx`)
- Konsistentes Branding

### 18.4 Strukturierte Daten (Schema.org)
- `Dentist` auf Landing
- `Person` auf Team-Profilen
- `LocalBusiness` mit Öffnungszeiten, Adresse, Telefon
- `Service` für jede Leistung
- `FAQPage` auf Neupatienten-Seite
- `Review` auf Patientenstimmen

### 18.5 Local SEO
- Geo-Tags
- NAP-Konsistenz (Name/Address/Phone überall identisch)
- Auch Nachbar-Stadtteile in Texten erwähnen (Maxvorstadt, Lehel, Bogenhausen)

### 18.6 Sitemap & robots.txt
- Auto-generiert via Next.js
- Bei Google Search Console anmelden

---

## 19. Performance-Ziele

| Metrik | Ziel |
|---|---|
| Lighthouse Performance | ≥ 95 |
| LCP | < 1.8s |
| CLS | < 0.05 |
| TTI | < 3s auf 4G |
| Page-Size Landing | < 1.5MB |

**Maßnahmen:**
- Next.js Image-Component (AVIF/WebP)
- Font-Subsetting
- Code-Splitting per Route
- Critical CSS inline
- Lazy-Load below-the-fold
- 3D-Modell lazy-loaded mit Suspense

---

## 20. Build-Reihenfolge für Claude Code

> **Empfohlene Implementierungs-Phasen.** Jede Phase als eigenes Claude-Code-Issue.

### Phase 1 — Fundament (Setup)
1. Next.js-Projekt initialisieren mit TypeScript
2. Tailwind v4 + CSS-Variablen aus Design.md (`styles/tokens.css`)
3. shadcn/ui installieren, Theme anpassen
4. Fonts (Fraunces + Inter) via `next/font` einbinden
5. Daten-Constants erstellen (`data/`)
6. Lucide Icons einbinden
7. Globale Hooks (`useTerminModal`, `useOpenStatus`)

### Phase 2 — Globale Komponenten
8. `<Header>` mit Dropdown
9. `<Footer>`
10. `<TerminModal>`
11. `<LiveStatusIndicator>`
12. `<CookieConsent>`
13. Root-`layout.tsx` integrieren

### Phase 3 — Card-Bibliothek
14. Alle Card-Typen aus Design.md 6.2:
    - ServiceCard, FeaturedCard, TestimonialCard, TeamCard, StepCard, FAQItem, InfoBox

### Phase 4 — Landing Page
15. `<Hero>`
16. `<TrustBar>`
17. `<Intro>`
18. `<LeistungenGrid>`
19. `<Werte>`
20. `<Team>`
21. `<Patientenstimmen>`
22. `<FAQ>`
23. `<TerminCTA>` (ohne 3D, ohne Maps zuerst)

### Phase 5 — 3D & Maps
24. `<PracticeMap>` (Leaflet)
25. `<Standort>`-Sektion
26. `<ToothModel>` (3D, R3F)
27. `<TechSpotlight>`-Sektion

### Phase 6 — Inhalts-Seiten
28. Über uns (`/ueber-uns`)
29. Team-Übersicht (`/team`)
30. Leistungen-Übersicht (`/leistungen`)

### Phase 7 — Leistungs-Detailseiten
31. Service-Template-Komponenten (`<ServiceHero>`, `<StickyAnchorNav>`, etc.)
32. 6 Leistungs-Detailseiten (in beliebiger Reihenfolge)

### Phase 8 — Weitere Seiten
33. Praxis-Tour (`/praxis-tour`)
34. Neupatienten (`/neupatienten`)
35. Kontakt (`/kontakt`)
36. Termin (`/termin`)
37. Notfall (`/notfall`)
38. Impressum / Datenschutz

### Phase 9 — Integration
39. Termin-System (Cal.com / Doctolib)
40. Kontaktformular API-Route
41. SEO-Daten & Schema.org
42. Sitemap, robots.txt, OG-Bilder

### Phase 10 — Feinschliff
43. Animationen & Mikrointeraktionen feintunen
44. Performance-Optimierung
45. Accessibility-Audit
46. Cross-Browser-Testing
47. Mobile-Testing

### Phase 11 — Launch
48. Inhalts-Review mit Auftraggeberinnen
49. Foto-Material einsetzen
50. DSGVO-Checks
51. Deploy auf Vercel
52. DNS umschalten

---

## 21. Was wir vom Auftraggeber brauchen

- [ ] Logo-Datei (SVG bevorzugt)
- [ ] Fotoshooting: Praxis-Räume (Behandlungs, Empfang, Wartezimmer, Außen)
- [ ] Fotoshooting: Beide Zahnärztinnen (B&W, einheitlicher Stil)
- [ ] Optional: Praxisteam-Fotos
- [ ] Texte: Bios der Ärztinnen, Fortbildungen, Praxis-Geschichte, Werte
- [ ] Bestätigung der Leistungs-Konsolidierung (6 statt 13 Seiten)
- [ ] Entscheidung: Termin-System (Cal.com / Doctolib / anderes)
- [ ] Entscheidung: 3D-Element ja/nein
- [ ] Vorher/Nachher-Bilder für Ästhetik (mit schriftlichem Patienten-Einverständnis!)
- [ ] Logos der Meisterlabor-Partner (Verwendungserlaubnis)
- [ ] ÖPNV-, Parken-, Barrierefreiheits-Infos verifiziert
- [ ] Echte Patientenstimmen (Google-Bewertungen, ggf. mit Erlaubnis)
- [ ] DSGVO-konformes Impressum + Datenschutzerklärung (vom Anwalt!)
- [ ] Anamnesebogen als PDF
- [ ] Coordinates / exakte Geo-Daten der Praxis
- [ ] E-Mail-Adresse der Praxis
- [ ] Praxis-Geschichte / Meilensteine (Daten)

---

## 22. Empfehlung für den Claude-Code-Prompt

Wenn du Claude Code aufstartest, gib ihm:

1. Diese `Structure.md`
2. Die `Design.md`
3. Das Logo (sobald vorhanden)
4. Die zwei Mockup-Bilder (Bild 7 als Favorit + Bild 3 als Sekundärinspo)

**Erster Prompt-Vorschlag für Claude Code:**

> „Lies `Design.md` und `Structure.md` komplett durch. Wir bauen die Webseite für die Zahnarztpraxis Schwabing Schritt für Schritt nach Phase 1 in Structure.md Sektion 20. Beginne mit Phase 1, Schritte 1–7. Initialisiere das Next.js-Projekt mit TypeScript, App Router, Tailwind v4. Setze die CSS-Variablen aus Design.md Sektion 3 als Tokens auf, und installiere alle Tech-Stack-Abhängigkeiten aus Design.md Sektion 13. Erstelle die Daten-Constants aus Structure.md Sektion 16 mit Platzhalter-Inhalten dort, wo echte Daten noch fehlen. Verwende keine Stockfotos — leg Bild-Platzhalter in `public/images/` ab und referenziere sie. Erstelle eine README.md mit dem Setup-Prozess."

Danach jeweils die nächste Phase prompten.

---

*Version 2.0 — Stand: 30.04.2026 · Komplementär zu Design.md*
