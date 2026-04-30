# Design.md — Zahnarztpraxis Schwabing

> **Projekt:** Relaunch einer Zahnarztpraxis-Webseite in München-Schwabing. Premium-Anspruch, minimalistisch, klinisch präzise — aber warm und einladend. Kein steriles Krankenhaus-Gefühl, sondern ein kuratiertes Wellness-Refugium mit medizinischer Exzellenz.

> **Referenz:** Bild 7 (Favorit). Vereinzelte Anleihen aus Bild 3.

> **Verhältnis Text/Visualität:** Kein Hyper-Minimal mit drei Wörtern pro Seite. Eine Zahnarzt-Webseite muss informieren, aufklären, Vertrauen aufbauen und SEO-Substanz haben. Text ist willkommen — er muss nur **typografisch sauber, hierarchisch klar und mit Atmung** gesetzt sein. Reduktion bezieht sich auf *Farben und Dekoration*, nicht auf *Inhalt*.

---

## 1. Design-Philosophie

### Leitprinzipien
1. **Reduktion in der Form, Reichtum im Inhalt** — Wenige Farben, eine Akzentfarbe, klare Typografie. Aber inhaltlich ausführlich, weil Patienten echte Informationen brauchen (Behandlungs-Ablauf, Kosten, Risiken, Heilungsphasen).
2. **Warmes Minimal** — Kein kaltes Krankenhaus-Weiß. Cremiges Off-White, gedämpftes Salbeigrün, generöser Weißraum.
3. **Klinische Ruhe** — Klare Hierarchien, Platz zum Atmen, präzise Typografie. Keine visuelle Hektik.
4. **Vertrauen durch Detailtreue** — Schatten, Radien, Spacing und Mikrointeraktionen sind durchgehend konsistent.
5. **Wow durch Substanz** — Hochwertige Fotografie, ein interaktives 3D-Zahnmodell, butterweiche Animationen, absolute Konsistenz. Keine grellen Farben oder überladene Layouts.
6. **Lesbarkeit ist King** — Jeder Body-Text muss sich anfühlen wie aus einer guten Buchgestaltung: ideale Zeilenlänge, großzügiger Zeilenabstand, schöne Schriftfarbe.

### Stimmungs-Vokabular
- ✅ Ruhig, klar, sanft, präzise, warm, kuratiert, professionell, vertrauenswürdig, modern-zeitlos, eloquent
- ❌ Steril, klinisch-kalt, technisch, verspielt, bunt, trendig, laut, billig, plakativ

---

## 2. Markenidentität

| Attribut | Wert |
|---|---|
| Marken-Persönlichkeit | Der ruhige Spezialist mit Wohlfühl-Faktor |
| Tonalität | Sie-Form, eloquent, kurze Sätze, fachlich aber laienverständlich |
| Beispiel-Headline | „Sanfte Pflege für Ihr *Lächeln*." |
| Beispiel-Subhead | „Erleben Sie eine neue Dimension der Zahnheilkunde im Herzen von München." |
| Beispiel-Body | „Eine Wurzelbehandlung schreckt viele ab — zu Unrecht. Mit modernen Verfahren ist sie heute schmerzarm, schnell und in den allermeisten Fällen erfolgreich. Wir nehmen uns die Zeit, Ihnen jeden Schritt zu erklären, bevor wir beginnen." |
| Was wir NICHT sind | Discount-Praxis, 0815-Kassenpraxis, verspielte Familienpraxis |

---

## 3. Farbpalette

| Token | Hex | Verwendung |
|---|---|---|
| `--bg-canvas` | `#F4F1EA` | Haupt-Hintergrund (warmes Off-White) |
| `--bg-surface` | `#FFFFFF` | Karten, erhabene Flächen |
| `--bg-subtle` | `#FAF8F3` | Sekundärer Hintergrund / Section-Wechsel |
| `--bg-emphasis` | `#1F3A28` | Dunkler Akzent-Hintergrund (z.B. CTA-Section) |
| `--brand-primary` | `#2E7D40` | Markengrün — CTAs, Akzente, italic-Highlights |
| `--brand-primary-hover` | `#266B36` | Hover-State Buttons |
| `--brand-soft` | `#E7EFE6` | Badge-Backgrounds, sehr dezente Tints |
| `--brand-deep` | `#1F3A28` | Dunkles Markengrün für Akzent-Sections |
| `--text-primary` | `#161616` | Headlines, Hauptcopy |
| `--text-secondary` | `#5C5C5C` | Body-Copy, Subheads |
| `--text-muted` | `#8A8A85` | Captions, Meta-Infos |
| `--text-on-dark` | `#F4F1EA` | Text auf dunklem Hintergrund |
| `--border-subtle` | `#E8E4DB` | Trenner, Card-Outlines |
| `--border-strong` | `#CFC9BD` | Stärkere Trenner (Tabellen) |
| `--accent-warning` | `#B85C2E` | Notfall-Hinweise (warm, nicht knallrot) |

### Farb-Regeln
- **Maximal eine Akzentfarbe pro Viewport.**
- **Kein reines Schwarz auf reinem Weiß** — `#161616` auf `#F4F1EA` immer angenehmer.
- **Keine farbigen Schatten** — alle Schatten neutral, weich, klein.
- **Keine Gradients** außer extrem subtile Background-Washes.
- **Aus Bild 3 NICHT übernehmen:** mehrfarbige Service-Karten.
- **`--accent-warning`** ausschließlich für Notfall-Hinweise — niemals dekorativ.

---

## 4. Typografie

### Schriftfamilien

| Rolle | Schrift | Fallback |
|---|---|---|
| Display / Headlines | **Fraunces** (Variable) | `Georgia, serif` |
| Body / UI | **Inter** (Variable) | `system-ui, sans-serif` |
| Mono (Telefonnummern, Termine) | **JetBrains Mono** | `ui-monospace, monospace` |

> Fraunces: moderne Serife mit weicher Anmutung — passt zum Wellness-Premium-Charakter. Italic-Variante für Hervorhebungen. Inter: zuverlässige UI-Schrift mit erstklassiger Lesbarkeit.

### Schrift-Skala (Desktop)

| Token | Größe | Line-height | Weight | Verwendung |
|---|---|---|---|---|
| `display-2xl` | 88px | 1.0 | 500 (Fraunces) | Spezial-Hero |
| `display-xl` | 72px | 1.05 | 500 | Standard Hero-Headline |
| `display-lg` | 56px | 1.1 | 500 | Section-Titel |
| `display-md` | 40px | 1.15 | 500 | Subsection-Titel |
| `display-sm` | 32px | 1.2 | 500 | Kleine Section-Titel |
| `heading-lg` | 28px | 1.25 | 500 | Card-Titel groß, H3 |
| `heading-md` | 22px | 1.3 | 500 | Card-Titel, H4 |
| `heading-sm` | 18px | 1.4 | 600 (Inter) | UI-Labels, FAQ-Fragen |
| `body-xl` | 20px | 1.65 | 400 | Hero-Subhead, Long-Form-Lead |
| `body-lg` | 18px | 1.6 | 400 | Lead-Paragraphen |
| `body-md` | 16px | 1.6 | 400 | Standard-Body |
| `body-sm` | 14px | 1.5 | 400 | Sekundär-Text |
| `body-xs` | 13px | 1.5 | 400 | Footnote, Meta |
| `eyebrow` | 12px | 1.4 | 600, ALL CAPS, ls 0.12em | Section-Labels |
| `pull-quote` | 32px | 1.3 | 400 italic (Fraunces) | Testimonials, Highlights |

### Mobile Skalierung
- `display-2xl` → 56px
- `display-xl` → 44px
- `display-lg` → 36px
- `display-md` → 28px
- Body bleibt 16px (NIE kleiner wegen iOS-Auto-Zoom)

### Typografie-Regeln
- **Italic-Akzent:** In Display-Headlines ein Schlüsselwort italic + `--brand-primary`. **Maximal ein italic-Akzent pro Headline.**
- **Punkt am Ende der Hero-Headline** — verstärkt Statement-Charakter.
- **Eyebrow-Labels:** klein, `--brand-primary`, ALL CAPS, großzügiges letter-spacing.
- **Zeilenlänge:** ~65 Zeichen für Body. Long-Form: max-width 720px.
- **Hängende Anführungszeichen** in Pull-Quotes.
- **Drop-Cap** optional am Anfang langer Bio-Texte (Fraunces, 5em).

### Long-Form-Text-Spezifikation
- **Absatz-Abstand:** 1.2em zwischen Absätzen
- **Erster Absatz:** `body-xl` als Lead, danach `body-lg`
- **Zwischenüberschriften (H3, H4):** Top-Margin 2em
- **Listen:** Custom-Bullet (grünes Häkchen oder Plus), 0.5em Einzug
- **Inline-Hervorhebungen:** *kursiv* für Begriffe, **fett** sehr sparsam
- **Linkstil:** unterstrichen 1px, 3px Underline-Offset, `--brand-primary`

---

## 5. Layout & Spacing

### Grid
- **Max-Container:** 1280px (`max-w-7xl`)
- **Reading-Container:** 720px (Long-Form-Text)
- **Standard-Padding seitlich:** 24px Mobile, 48px Tablet, 80px Desktop
- **Spalten:** 12er-Grid mit 24px Gutter

### Spacing-Skala
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200`

### Vertikaler Rhythmus
- Section-Padding Desktop: 120px / 120px
- Section-Padding Mobile: 64px / 64px
- Headline → Subhead: 16–24px
- Subhead → CTA: 32px
- Long-Form-Absätze: 1.2em
- Eyebrow → Headline: 16px

### Border-Radius

| Token | Wert | Verwendung |
|---|---|---|
| `radius-sm` | 8px | Inputs, Tabellen |
| `radius-md` | 12px | Buttons, Tags |
| `radius-lg` | 20px | Cards, kleine Bilder |
| `radius-xl` | 28px | Hero-Bilder, große Container |
| `radius-2xl` | 40px | Spezial-Container, CTA-Banner |
| `radius-pill` | 999px | Pill-Buttons, runde Badges |

### Schatten

| Token | Wert | Verwendung |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(20,20,20,0.04)` | Buttons |
| `shadow-sm` | `0 1px 2px rgba(20,20,20,0.04), 0 4px 12px rgba(20,20,20,0.04)` | Cards |
| `shadow-md` | `0 1px 2px rgba(20,20,20,0.05), 0 12px 32px rgba(20,20,20,0.06)` | Hervorgehobene Cards, Modals |
| `shadow-lg` | `0 4px 8px rgba(20,20,20,0.06), 0 24px 56px rgba(20,20,20,0.08)` | Sticky Nav, Floating Badges |

---

## 6. Komponenten-Spezifikation

### 6.1 Buttons

**Primary (gefüllt grün)**
- Hintergrund: `--brand-primary`, Text: `#FFFFFF`, 15px, weight 500, Inter
- Padding: 14px / 28px, `radius-pill`
- Icon optional: Pfeil rechts, 16px, 8px Abstand
- Hover: `--brand-primary-hover`, `translateY(-1px)`, Pfeil läuft 4px
- Transition: 200ms ease-out

**Secondary (Ghost)**
- Transparent, 1px Border `--border-subtle`, Text `--text-primary`
- Hover: `--bg-subtle`, Border `--border-strong`

**Tertiary (Text-Link)**
- Nur Text + Pfeil, 14px, weight 500, `--brand-primary`
- Hover: Pfeil läuft 4px, Underline erscheint

**Phone-Button**
- Pill mit Telefon-Icon, Mono-Font für Nummer
- Hover: Border wird `--brand-primary`

**Notfall-Button**
- Wie Primary, Farbe `--accent-warning`

### 6.2 Karten

**Standard Service Card**
- `--bg-surface`, `radius-lg`, padding 32px, `shadow-sm`
- Icon-Container: 48×48, `--brand-soft`, `radius-md`, Icon `--brand-primary`
- Titel: `heading-md`, 24px nach Icon
- Body: `body-md`, `--text-secondary`
- Tertiary-Link unten
- Hover: `shadow-md`, `translateY(-2px)`, Pfeil läuft

**Featured Card**
- Wie Standard + Bild rechts oder Hintergrund-Bild
- Spans 2 Spalten, Primary Button statt Tertiary
- Optional: `--brand-soft` Tint

**Patientenstimmen-Karte**
- `--bg-surface`, `radius-lg`, padding 40px, `shadow-sm`
- Anführungszeichen oben (48px, `--brand-primary`, opacity 0.4)
- Zitat: `pull-quote` (Fraunces italic, 24/28px)
- Trenner-Strich (40×2px, `--brand-primary`)
- Name: `heading-sm`, Meta: `body-sm` `--text-muted`
- Optional: 5 grüne Sterne, 16px

**Team-Profil-Karte (Landing)**
- `--bg-surface`, `radius-xl`, padding 0
- Bild oben: Aspect 4:5, B&W
- Inhalt-Padding: 32px
- Name: `heading-lg`, Rolle: `body-md` `--brand-primary`
- Spezialisierungs-Tags (Pills in `--brand-soft`)
- Bio: 3–4 Zeilen
- Primary „Termin bei [Name]" + Tertiary „Profil ansehen →"
- Hover: Foto wird farbig (600ms grayscale-Transition)

**Behandlungs-Schritt-Karte**
- `--bg-surface`, padding 32px, Border-Left 3px `--brand-primary`
- Schritt-Nummer oben: `display-md` `--brand-primary` weight 300
- Titel: `heading-md`, Body: `body-md`
- Optional: Icon oben rechts

**Stat-Karte**
- Transparenter Hintergrund oder `--bg-surface` Pill
- Wert: `display-md` Fraunces weight 500
- Label: `body-sm` `--text-muted`

**FAQ-Akkordeon-Item**
- Border-Bottom 1px `--border-subtle`, padding 24px vertikal
- Frage: `heading-sm` weight 500, Plus/Minus-Icon rechts (rotiert beim Öffnen)
- Antwort: `body-md` `--text-secondary`, max-width 720px
- Smooth-Expand 300ms

**Info-Box (Kosten-Hinweise)**
- `--brand-soft`, `radius-md`, padding 24px
- Icon oben links: 24px `--brand-deep`
- Titel: `heading-sm` weight 600
- Body: `body-md` `--text-primary`

### 6.3 Navigation (Top-Bar)

- Höhe: 72px Desktop, 64px Mobile
- Hintergrund: `--bg-canvas` (kein White!)
- Bei Scroll: Backdrop-Blur 12px, `shadow-lg` dezent
- Logo links 32–40px, Nav-Items zentriert
- Aktiver Link: `--brand-primary`
- Leistungen-Dropdown: `--bg-surface`, `shadow-md`, 6 Items mit Icons
- Rechts: Live-Status-Indicator + Primary CTA
- Mobile: Hamburger → Vollbild-Overlay, gestaffelter Fade-In

### 6.4 Hero-Sektion

- Layout: 55/45 Text/Bild Desktop
- Links: Eyebrow → Headline → Subhead → CTAs
- Rechts: Bild 4:5, `radius-xl`
- Floating Badge unten links: `--bg-surface`, `radius-pill`, `shadow-md`
- Subtile Float-Animation (4px, 3s)
- **Variante:** 3D-Zahnmodell statt Foto

### 6.5 Trust-Bar

- Volle Breite, `--bg-subtle`, padding 24px
- 4–5 Items horizontal, 1px-Trenner zwischen
- Icon (24px `--brand-primary`) + Text (`body-sm`)
- Mobile: horizontal scrollbar

### 6.6 Long-Form-Text-Layout

- Container max-width 720px, zentriert
- Optional 2-Spalten ab `lg`
- Pull-Quotes ragen aus Reading-Container heraus
- Bilder: „inset" (100%) oder „wide" (130%)
- Bildunterschrift: `body-sm` `--text-muted` italic
- Custom-Bullet-Listen mit grünem Häkchen

### 6.7 Team-Sektion

**Landing:** 2 große Profile-Karten nebeneinander (NICHT 4 kleine Kreise!)

**Team-Seite:** Zickzack-Layout, alternierend Bild/Text
- Großes B&W-Portrait 4:5
- Bio mit Drop-Cap
- Spezialisierungs-Tags
- Fortbildungen ausklappbar

**Praxisteam (falls vorhanden):** kreisförmige B&W-Portraits 200px

### 6.8 CTA-Banner

**Variante A (hell):** `--bg-surface`, `radius-2xl`, padding 80/64px

**Variante B (dunkel):** `--bg-emphasis`, `--text-on-dark`
- Headline weiß mit `--brand-soft` italic-Akzent
- Optional: subtiler Background-Pattern

### 6.9 Termin-Buchungs-Widget

- `--bg-surface`, `radius-xl`, `shadow-md`
- Tabs: „Online buchen" / „Anrufen"
- Online: Cal.com / Doctolib Embed
- Anrufen: 2 Karten für Dr. Jahn / Dr. Hancock-Diener
- Höhe ~640px

### 6.10 Formulare

- Input-Höhe 48px, 1px Border `--border-subtle`, `radius-sm`
- Focus: Border `--brand-primary` + dezenter Glow (2px, 10% opacity)
- Label oberhalb (`eyebrow`-Style)
- Required-Stern in `--brand-primary`
- Helper-Text: `body-sm` `--text-muted`
- Fehler: `#B84444` (dezent)
- Custom-Checkbox 18×18, Checked → `--brand-primary`
- Textarea min-height 120px

### 6.11 Footer

- `--bg-canvas` (kein dunkler Footer!)
- 1px Trenner oben
- 4 Spalten Desktop, Akkordeon Mobile
- Eyebrow-Style Spalten-Überschriften
- Links: `body-sm` `--text-secondary`

### 6.12 Maps-Sektion

- `radius-xl`, Höhe 480/320px
- Leaflet + CartoDB Positron Tiles
- Custom Marker: kreisförmig `--brand-primary` mit Pin/Logo
- Pulse-Animation auf Marker
- Overlay-Card oben links: Adresse + „Route planen"

---

## 7. Bildsprache

### 7.1 Praxis-Fotografie

**Was wir zeigen:**
- Behandlungsräume in warmem Licht
- Details: Instrumente, Hände bei der Arbeit, Patient von hinten (anonym)
- Empfangsbereich, Wartezimmer, Architektur-Details
- Außenansicht (Dämmerlicht atmosphärisch)
- Schwabing-Kontext (Friedrichstraße / Münchner Freiheit)

**Was wir NICHT zeigen:**
- Stock-Fotos mit übertrieben lächelnden Models
- Klischee: Arzt mit Klemmbrett, Daumen hoch
- Knallig-bunte Räume, OP-Light-Charakter

**Specs:**
- Aspects: 4:5 (Hero), 3:2 (Sections), 1:1 (Features), 16:9 (Hero-Variante)
- Format: AVIF + WebP-Fallback
- Größen: 1920w / 1280w / 800w / 480w (responsive `srcset`)
- Subtiler Tönung-Filter: leichte Wärme, reduzierte Sättigung

### 7.2 Team-Portraits

- **Schwarzweiß** als Default
- Einheitlicher Hintergrund (Off-White-Wand, nicht reines Weiß)
- Einheitlicher Crop (Schultern aufwärts), gleiche Augenhöhe
- Fokus scharf auf Augen, natürliche Andeutung eines Lächelns
- Auf Detail-Profilseite: zusätzlich 2–3 Aktion-Fotos

### 7.3 Behandlungs-Bilder pro Leistung

- 1 Hero-Bild (warm beleuchtet, Patient anonym)
- 1–2 Detail-Bilder (Instrumente, Materialien, Schritte)
- Optional: Vorher/Nachher (nur Ästhetik, mit Einverständnis)

### 7.4 Illustrative Elemente

- **Implantat-/Zahnersatz-Renders** (3D, photorealistisch, transparenter BG)
- **Anatomie-Illustrationen** (Querschnitt, monochrom, `--brand-deep`)

### 7.5 Bilder pro Seite (Briefing)

| Seite | Bilder |
|---|---|
| Landing | Hero (4:5), 2× Team B&W, Tech-Detail/3D, Maps |
| Über uns | Hero (16:9), 4–6 Detail-Galerie, 2–3 atmosphärisch, Partner-Logos |
| Team | Pro Person: Portrait (4:5), 2–3 Aktion, ggf. privat |
| Leistungen-Übersicht | 6 Header-Bilder (3:2) |
| Leistungs-Detail | 1 Hero (3:2), 2–4 Detail/Schritt, ggf. Vorher/Nachher, ggf. 3D |
| Praxis-Tour | 12–20 Bilder (Räume, Details, Atmosphäre) |
| Kontakt | Außenansicht oder Empfang (16:9) |

---

## 8. Iconografie

- **Stil:** Linear (Stroke), 1.5px stroke-width, abgerundete Endungen
- **Library:** Lucide oder Phosphor (Light/Regular)
- **Größen:** 16 / 20 / 24 / 32px
- **Farben:** `--brand-primary` (Service), `--text-primary` (UI), `--text-muted` (sekundär)
- **Container:** Service-Icons in 48×48 `--brand-soft` Kästchen, `radius-md`

### Leistungs-Icons

| Leistung | Icon |
|---|---|
| Prophylaxe & Zahnerhaltung | Schild mit Zahn |
| Ästhetik | Funkeln-Stern / Diamant |
| Implantologie & Chirurgie | Schraube / Implantat |
| Schienentherapie | Mond / Schiene |
| Kinderzahnheilkunde | Lächeln / Kinder-Hand |
| Angstpatienten | Herz / Hand-die-hält |

---

## 9. Animationen & 3D

### 9.1 Globale Regeln
- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)`
- **Dauer:** 200ms (Hovers), 400–600ms (Reveals), 800ms+ (große Bewegungen)
- **Reduced-Motion respektieren**

### 9.2 Patterns
- **Scroll-Reveal:** Fade-In + 16px Up, 50ms stagger
- **Hover-Lift:** 1–2px, Schatten verstärkt
- **Image-Zoom:** Scale 1.02 bei Hover, 600ms
- **Smooth-Scroll** für Anker-Links
- **Cursor:** Standard (KEIN Custom-Cursor!)
- **Parallax:** Subtil (max 10%) auf großen Hero-Bildern
- **Number-Counter:** Stat-Zahlen zählen hoch beim Scroll-In, 1500ms

### 9.3 Premium-Details
- Buttons: Pfeil läuft 4px bei Hover
- Hero-Badge: Float-Animation (3s, 4px)
- Maps-Pin: Pulse-Effekt alle 4s
- Team-Foto: Farbumschlag bei Hover (600ms)
- FAQ: Plus rotiert 45° beim Öffnen
- Cookie-Banner: Slide-Up beim ersten Aufruf

### 9.4 3D-Zahnmodell (Wow-Element)

**Tech-Stack:**
- React Three Fiber + @react-three/drei
- Modell: GLB-Format (Sketchfab oder eigene Generation)

**Visuelle Specs:**
- PBR-Material:
  - `roughness: 0.3`
  - `metalness: 0`
  - `clearcoat: 0.4`
  - `transmission: 0.05`
  - Farbe: `#F8F6F0` (warmes Off-White)
- Lighting:
  - HDRI-Environment für realistische Reflexionen
  - Key-Light (warmweiß 4500K) oben-vorne
  - Fill-Light (kühler 6500K) links
  - Rim-Light für Kantenbetonung
- Background: transparent

**Interaktion:**
- Default: kontinuierliche Rotation (0.3 rad/sec)
- Hover/Touch: Auto-Rotation stoppt, User kann selbst rotieren
- Mobile: Touch-Drag, Pinch-Zoom
- Optional: anklickbare Hotspots mit Tooltips („Zahnschmelz", „Wurzel", „Pulpa")

**Performance:**
- Lazy-Load nur bei Viewport-Entry
- Modell < 2MB
- Suspense-Fallback: Skeleton mit Pulse
- Mobile-Lowend: statisches Bild als Fallback

**Einsatzorte:**
- **Primär:** Eigene Sektion auf Landing („Moderne Zahnheilkunde")
- **Sekundär:** Implantologie-Detailseite (3D-Implantat)
- **Sekundär:** Hero einer Leistungsseite

### 9.5 Optional: Zahn-Anatomie-Scrollytelling (Phase 2)

- Scroll-gesteuerte Kamera-Bewegungen am 3D-Modell
- Synchronisiert mit Text-Sektionen
- Hochwertiger Effekt — aber Phase 2

---

## 10. Spezial-Komponenten

### 10.1 Notfall-Indicator
- Mini-Komponente: Telefon-Icon + „Notfall: 089 72 33 093"
- `--accent-warning` als Punkt/Indicator
- Auf Notfall-Seite: dedizierte größere Komponente

### 10.2 Live-Öffnungszeiten-Indicator
- Server-zeitbasiert
- Geöffnet: grüner Punkt + „Jetzt geöffnet · schließt um {Zeit}"
- Bald öffnet: gelber Punkt + „Öffnet in {Zeit}"
- Geschlossen: grauer Punkt + „Geschlossen · öffnet {Wochentag} {Zeit}"

### 10.3 Bewertungs-Badge
- Klein, rechts oben oder im Header bei Scroll
- 5 grüne Sterne + „4.9 · 127 Bewertungen" + Google-Logo
- Klick öffnet Google-Profil

### 10.4 Anamnesebogen-Download-Karte
- Auf Neupatienten-Seite
- PDF-Mockup links
- Download-Button + „Spart Ihnen 10 Minuten Wartezeit"

### 10.5 Behandlungs-Kosten-Hinweis (Info-Box)
- `--brand-soft`, padding 24px, `radius-md`
- Titel: „Was zahlt die Krankenkasse?"
- Body: Erklärt Kassenleistung vs. Eigenanteil
- Disclaimer: „Konkrete Kosten werden im Beratungsgespräch geklärt."

### 10.6 Vorher/Nachher-Slider
- 2 Bilder übereinander, Slider trennt
- Beschriftung „Vorher" / „Nachher"
- Hinweis: „Mit Genehmigung der Patientin" + Datum

### 10.7 Behandlungs-Timeline
- Vertikal/horizontal mit 4–6 Stationen
- Pro Station: Nummer, Titel, Kurzbeschreibung, Zeitangabe
- Aktive Linie `--brand-primary`
- Bei Scroll: Stationen werden nacheinander aktiv

### 10.8 Kosten-/Versicherungs-Tabelle
- Header in `--brand-soft`
- Spalten: Leistung / Gesetzlich / Privat
- Zeilen-Hover dezent
- Footnote: „Konkrete Beträge nach Beratungsgespräch"

---

## 11. Responsive

- Mobile-First, dann Desktop erweitern
- Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536
- Hero Mobile: gestapelt
- Service-Grid: 1 → 2 → 3 Spalten
- Team: Slider Mobile, 2-Col Grid ab Tablet
- Nav: Hamburger Mobile, klassisch ab `md`
- Long-Form: Reading-Container ab `md`, Pull-Quotes ragen erst ab `lg` heraus
- 3D: reduzierte Polygons oder statisches Fallback auf Mobile

---

## 12. Accessibility

- **Kontrast:** WCAG AA (4.5:1), Body idealerweise AAA (7:1)
- **Focus-States:** 2px Outline `--brand-primary`, 2px Offset
- **Semantik:** Korrekte H-Hierarchie, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **Alt-Texte:** Beschreibend für Inhalt, leer für dekorativ
- **Tastaturnavigation:** Vollständig, auch 3D-Modell mit Skip-Option
- **Reduced-Motion:** 3D-Rotation stoppt
- **Skip-to-Content** ganz oben (verborgen, sichtbar bei Tab)
- **Form-Labels:** immer sichtbar (kein Placeholder-only)
- **Error-Messages:** mit `aria-live="polite"`

---

## 13. Tech-Stack

| Bereich | Empfehlung |
|---|---|
| Framework | Next.js 15+ (App Router) |
| Styling | Tailwind CSS v4 + CSS-Variablen |
| UI-Primitives | shadcn/ui |
| Animationen | Framer Motion |
| 3D | React Three Fiber + @react-three/drei |
| Forms | React Hook Form + Zod |
| Termin-System | Cal.com oder Doctolib |
| Maps | Leaflet + CartoDB Positron |
| Icons | Lucide React |
| Fonts | next/font (Fraunces + Inter) |
| Hosting | Vercel |
| CMS (optional) | Sanity oder Payload CMS |
| Analytics | Vercel Analytics + Plausible (DSGVO) |

---

## 14. Don'ts

| ❌ Niemals | ✅ Stattdessen |
|---|---|
| Mehrfarbige Service-Karten | Eine Akzentfarbe konsistent |
| Reines Schwarz auf reinem Weiß | `#161616` auf `#F4F1EA` |
| Harte/dunkle Schatten | Sehr weiche, neutrale Schatten |
| Mehr als ein italic-Akzent pro Headline | Maximal eines |
| Glitzer, Gradients, Glassmorphism | Solide Flächen, klare Kanten |
| Stockfoto-Lächeln in Übergröße | Echte Praxis-Fotografie |
| Auto-Play-Videos mit Sound | Stumme dezente Loops |
| Custom Cursor | Standard-Cursor |
| Riesige Cookie-Pop-ups | Schmale Bottom-Bar |
| Dunkler Footer | Footer in Canvas-Farbe |
| Übertriebene Versprechen | Sachlich-kompetent |
| Body-Text < 16px | Mindestens 16px |
| Stockfotos im Team | Eigenes Fotoshooting (Pflicht!) |

---

## 15. Texte: Stimme & Stil-Guide

### Tonalität
- Sie-Form, immer
- Eloquent, aber nicht abgehoben
- Fachlich präzise, laienverständlich
- Empathisch, nicht anbiedernd
- Selbstbewusst, nicht arrogant

### Satzbau
- Lieber kurze Sätze als Schachtelsätze
- Aktiv statt Passiv (außer Behandlungsbeschreibungen)
- Fachbegriffe einführen, dann erklären

### Beispiele

**❌ Schlecht:** „Wir bieten Ihnen ein breites Spektrum an zahnmedizinischen Dienstleistungen auf höchstem Niveau."

**✅ Gut:** „Von der Vorsorge bis zum Implantat — wir kümmern uns um Ihre Zähne. Mit Zeit, Erfahrung und moderner Technik."

**❌ Schlecht:** „Unser Team besteht aus hochqualifizierten Spezialisten."

**✅ Gut:** „Dr. Hancock-Diener und Dr. Jahn führen die Praxis seit über 20 Jahren gemeinsam. Was uns ausmacht: Wir nehmen uns Zeit. Für Sie, für Ihre Fragen, für die richtige Diagnose."

### Wording-Regeln
- „Patient" / „Patientin" — gegendert wechselnd, nicht „Patient:innen" (zu sperrig)
- „Zahn-Implantat" mit Bindestrich für Lesbarkeit
- „Praxis" statt „unsere Praxis" wo möglich
- „Willkommen" statt „Herzlich willkommen" (eleganter)

---

*Version 2.0 — Stand: 30.04.2026*
