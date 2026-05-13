# Ausstehende Bild-Updates

Diese Datei dokumentiert die noch ausstehenden Bild-Updates für die Website.

## 1. Team-Bilder angleichen

**Status:** Team-Bilder sind bereits im assets-Ordner vorhanden, müssen aber ggf. noch ausgetauscht werden

**Betroffene Dateien:**
- `components/TeamPage.jsx` (Zeilen 32-33)
- Bilder im `assets/`-Ordner

**Aktuell verwendete Bilder:**
- Nisveta Cerovina: `assets/team-cerovina.jpg` (13.9 KB) - **ggf. falsch (lächelt zur falschen Seite?)**
- Michaela Müller: `assets/team-michaela.jpg` (2.5 MB) - **ggf. schief, Shirtausschnitt abgeschnitten?**

**Wenn neue Bilder verfügbar:**
1. Neue Bilder in `assets/` hochladen
2. Alte Dateien überschreiben ODER neue Dateinamen in TeamPage.jsx anpassen
3. Bildgröße prüfen: sollten 140x140px rund dargestellt werden (`object-fit: cover`)
4. Falls nötig: `object-position` in CSS anpassen für besseren Fokus

**CSS-Location:** `styles/team-page.css` - Klasse `.staff-photo`

---

## 2. Tablett-Bild mit Keramikzahn und Vase

**Status:** Wird noch produziert

**Betroffene Dateien:**
- `components/LeistungenPage.jsx` (Zeile 38)

**Aktuelle Zeile 38:**
```javascript
image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80&auto=format&fit=crop",
```

**Ändern zu:**
```javascript
image: "assets/tablett-keramikzahn-vase.jpg",
```

**Wenn Bild verfügbar:**
1. Bild in `assets/` hochladen als `tablett-keramikzahn-vase.jpg`
2. Bildgröße optimieren (Ziel: <300KB, Format: landscape 16:9 oder 4:3)
3. Zeile 38 in `components/LeistungenPage.jsx` anpassen
4. Unsplash-Link entfernen

**Verwendungskontext:** Ästhetik-Sektion Hero-Bild

---

## 3. Oralchirurgie-Bilder

**Status:** Kommen Montag

**Betroffene Dateien:**
- `components/LeistungData.jsx` (Zeile 227)

**Aktuelle Zeile 227:**
```javascript
image: "assets/praxis-behandlung-detail.jpg",
```

**Ändern zu:**
```javascript
image: "assets/oralchirurgie.jpg",
imageFormat: "landscape", // oder "portrait" je nach Bild
```

**Wenn Bilder verfügbar (Montag):**
1. Bilder in `assets/` hochladen
2. Falls mehrere Bilder: das beste als `oralchirurgie.jpg` benennen
3. Bildgröße optimieren (<300KB)
4. Bildformat prüfen und `imageFormat` in LeistungData.jsx setzen
5. Testen: Bild wird auf Detailseite `/leistung.html?id=oralchirurgie` angezeigt

**Verwendungskontext:** Oralchirurgie-Detailseite

---

## Schnell-Anleitung zum Bild-Update

### Schritt 1: Bild vorbereiten
```bash
# Bildgröße optimieren (MacOS)
sips -Z 1400 original.jpg --out optimiert.jpg

# Oder mit ImageMagick:
convert original.jpg -resize 1400x1400\> -quality 85 optimiert.jpg
```

### Schritt 2: Bild hochladen
```bash
cp neues-bild.jpg "/Users/jouls/Desktop/arztpraxis dr jahn/assets/"
```

### Schritt 3: Code anpassen
Entsprechende Zeilen in den oben genannten Dateien ändern.

### Schritt 4: Testen
```bash
cd "/Users/jouls/Desktop/arztpraxis dr jahn"
python3 -m http.server 8080
# Browser öffnen: http://localhost:8080
```

### Schritt 5: Commit
```bash
git add assets/neues-bild.jpg components/[geänderte-datei].jsx
git commit -m "Bild-Update: [Beschreibung]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Offene Punkte (später)

### 4. Hauptlabore verlinken

**Status:** Zurückgestellt - Namen und URLs noch nicht verfügbar

**Mögliche Implementierung:**
- Option A: Im Footer als neue "Partner"-Spalte
- Option B: Bei LeistungData.jsx in relevanten Leistungen (Ästhetik, Zahnersatz)
- Option C: Als neue Sektion auf Hauptseite "Unsere Meisterlabor-Partner"

**Warten auf:** Labor-Namen und URLs von Dr. Jahn

---

## Verifikations-Checkliste (nach jedem Bild-Update)

### Visual Testing:
- [ ] Desktop (>1024px): Layout intakt, keine Überlappungen
- [ ] Tablet (768-1023px): Responsive funktioniert
- [ ] Mobile (<640px): Alles lesbar, keine abgeschnittenen Elemente

### Funktional:
- [ ] Bild lädt (keine 404-Fehler in Browser-Konsole)
- [ ] Lazy Loading funktioniert
- [ ] Richtige Bildproportionen (nicht verzerrt)

### Performance:
- [ ] Bildgröße <300KB
- [ ] Format: WebP oder JPG (optimiert)
- [ ] Ladezeit <1s

### Browser:
- [ ] Chrome/Edge (aktuell)
- [ ] Safari (Desktop + iOS)
- [ ] Firefox

---

Letzte Aktualisierung: 2026-05-13
