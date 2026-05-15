#!/bin/bash
set -e  # Exit on error

cd "/Users/jouls/Desktop/arztpraxis dr jahn/assets"

echo "=== Bild-Optimierung für Zahnarztpraxis Website ==="
echo ""

# Zähler
OPTIMIZED=0

# Hero & große Landscape-Bilder (1920px max, Qualität 75)
echo "Optimiere Hero & große Landscape-Bilder..."
HERO_IMAGES=(
  "praxis-blumen.jpg"
  "praxis-kisses.jpg"
  "praxis-flur.jpg"
  "praxis-blumen-wide.jpg"
  "praxis-schild.jpg"
  "praxis-behandlung.jpg"
  "praxis-wartebereich.jpg"
  "praxis-roentgen.jpg"
)

for img in "${HERO_IMAGES[@]}"; do
  if [ -f "$img" ]; then
    echo "  - $img"
    sips -Z 1920 --setProperty formatOptions 75 "$img" > /dev/null 2>&1
    ((OPTIMIZED++))
  fi
done

echo ""
echo "Optimiere Portrait-Bilder..."
PORTRAIT_IMAGES=(
  "vertrauen-hand.jpg"
  "praxis-empfang-portrait.jpg"
)

for img in "${PORTRAIT_IMAGES[@]}"; do
  if [ -f "$img" ]; then
    echo "  - $img"
    sips -Z 1200 --setProperty formatOptions 78 "$img" > /dev/null 2>&1
    ((OPTIMIZED++))
  fi
done

echo ""
echo "Optimiere Leistungsbilder (Landscape)..."
LEISTUNG_IMAGES=(
  "nti-schiene.jpg"
  "implantat-aufbau.jpg"
  "frontzaehne-aesthetik.jpg"
  "aligner-schiene-transparent.jpg"
  "keramik-kronen-inlays.jpg"
  "implantate-camlog-system.jpg"
  "gebiss-gipsmodell.jpg"
  "chirurgie-instrumente.jpg"
)

for img in "${LEISTUNG_IMAGES[@]}"; do
  if [ -f "$img" ]; then
    echo "  - $img"
    sips -Z 1600 --setProperty formatOptions 75 "$img" > /dev/null 2>&1
    ((OPTIMIZED++))
  fi
done

echo ""
echo "Optimiere Praxistour & sonstige Bilder..."
PRAXIS_IMAGES=(
  "aussenansicht.jpg"
  "eingang.jpg"
  "erster_stock.jpg"
  "anmeldung.jpg"
  "warteraum.jpg"
  "platz_fuer_kunst.jpg"
  "zimmer-jahn-02.jpg"
  "zimmer-hancock-02.jpg"
  "hinterer_trakt.jpg"
  "praxis-anmeldung.jpg"
  "praxis-zahnmodelle.jpg"
  "praxis-behandlung-detail.jpg"
  "praxis-behandlung-schild.jpg"
  "laecheln-weisse-zaehne.jpg"
)

for img in "${PRAXIS_IMAGES[@]}"; do
  if [ -f "$img" ]; then
    echo "  - $img"
    sips -Z 1200 --setProperty formatOptions 75 "$img" > /dev/null 2>&1
    ((OPTIMIZED++))
  fi
done

echo ""
echo "=== Optimierung abgeschlossen ==="
echo "✅ $OPTIMIZED Bilder optimiert!"
echo ""
echo "Größenvergleich vorher/nachher:"
du -sh originals/ .
