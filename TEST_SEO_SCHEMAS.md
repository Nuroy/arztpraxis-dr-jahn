# Quick SEO Schema Testing Guide

Run these tests to validate all implemented SEO improvements.

---

## 1. FAQPage Schema Test

**Test URL:** https://zahnarztpraxis-schwabing.de/leistung.html#zahnerhaltung-prophylaxe

**Steps:**
1. Open the URL above
2. Open DevTools (F12 or Cmd+Opt+I)
3. Go to Elements tab
4. In `<head>`, find `<script type="application/ld+json">` containing `"@type":"FAQPage"`
5. Copy the JSON content

**Validate:**
- Go to https://validator.schema.org/
- Paste the JSON
- Should show: 0 Errors, 0 Warnings

**Expected Schema Structure:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text...",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text..."
      }
    }
  ]
}
```

**Repeat for all 13 service pages:**
- zahnerhaltung-prophylaxe ✓
- parodontologie ✓
- endodontologie ✓
- aesthetik-funktion ✓
- bleaching ✓
- implantologie ✓
- oralchirurgie ✓
- schienentherapie ✓
- schnarchschienen ✓
- nti-aufbiss-schienen ✓
- zahnkorrektur-schienen ✓
- kinderzahnheilkunde ✓
- zahnarztangst ✓

---

## 2. Person Schema Test

**Test URL:** https://zahnarztpraxis-schwabing.de/team.html

**Steps:**
1. Open URL
2. DevTools → Elements → `<head>`
3. Find TWO `<script>` tags with `"@type":"Person"`

**Expected Schemas:**

**Dr. Hancock-Diener:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Birte Hancock-Diener",
  "jobTitle": "Zahnärztin, Praxis-Inhaberin",
  "telephone": "+49 89 38889500",
  "email": "empfang@zahnarztpraxis-schwabing.de",
  "knowsAbout": ["Ästhetische Zahnmedizin", "Implantologie", ...]
}
```

**Dr. Jahn:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Irene Jahn",
  "jobTitle": "Zahnärztin, Praxis-Inhaberin",
  "telephone": "+49 89 38808687",
  ...
}
```

**Validate:** Both schemas at https://validator.schema.org/

---

## 3. BreadcrumbList Schema Test

**Test URL:** https://zahnarztpraxis-schwabing.de/leistung.html#implantologie

**Expected Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Startseite",
      "item": "https://zahnarztpraxis-schwabing.de/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Leistungen",
      "item": "https://zahnarztpraxis-schwabing.de/leistungen.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Chirurgie & Implantate",
      "item": "https://zahnarztpraxis-schwabing.de/leistungen.html#chirurgie"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Implantologie",
      "item": "https://zahnarztpraxis-schwabing.de/leistung.html#implantologie"
    }
  ]
}
```

---

## 4. Service Schema Test

**Test URL:** https://zahnarztpraxis-schwabing.de/leistung.html#bleaching

**Expected Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Praxisgemeinschaft Dr. Hancock-Diener & Dr. Jahn",
    "telephone": ["+49 89 38889500", "+49 89 38808687"]
  },
  "name": "Bleaching",
  "description": "...",
  "areaServed": {
    "@type": "City",
    "name": "München"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## 5. HowTo Schema Test

**Test URL:** https://zahnarztpraxis-schwabing.de/leistung.html#parodontologie

**Expected Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Parodontologie - Unser Ablauf",
  "description": "Schritt-für-Schritt Ablauf der Parodontologie Behandlung",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Step name",
      "text": "Step description"
    }
  ]
}
```

---

## 6. Organization Schema Test

**Test URL:** https://zahnarztpraxis-schwabing.de/

**Location:** Hardcoded in `index.html` lines 15-72

**Expected Fields (should include):**
- `email`: "empfang@zahnarztpraxis-schwabing.de"
- `image`: "https://zahnarztpraxis-schwabing.de/assets/praxis-empfang.jpg"
- `founder`: Array with both doctors
- `foundingDate`: "2002"
- `areaServed`: ["München", "Schwabing", "Bogenhausen", "Lehel"]
- `availableLanguage`: ["de", "en"]

---

## 7. Date Meta Tags Test

**Test URLs:** All pages

**Check for in `<head>`:**
```html
<meta property="article:published_time" content="2024-09-15T00:00:00+02:00"/>
<meta property="article:modified_time" content="2026-06-01T12:00:00+02:00"/>
```

**Pages to test:**
- index.html ✓
- leistungen.html ✓
- team.html ✓
- neupatienten.html ✓
- praxistour.html ✓
- leistung.html (any service) ✓ (dynamic, uses current date)

---

## 8. Sitemap.xml Test

**Test URL:** https://zahnarztpraxis-schwabing.de/sitemap.xml

**Validator:** https://www.xml-sitemaps.com/validate-xml-sitemap.html

**Should contain:**
1. index.html (/)
2. leistungen.html
3. leistung.html
4. team.html
5. **praxistour.html** ← NEW!
6. neupatienten.html
7. impressum.html
8. datenschutz.html

**Each URL should have:**
- `<loc>` - URL
- `<lastmod>` - Date
- `<changefreq>` - Frequency
- `<priority>` - Priority value

---

## 9. Semantic HTML Test

**Test URL:** https://zahnarztpraxis-schwabing.de/leistung.html#zahnerhaltung-prophylaxe

**Steps:**
1. Open DevTools → Elements
2. Find the meta-information strip (below hero)
3. Inspect the HTML structure

**Expected Structure:**
```html
<dl class="detail-meta-strip">
  <dt class="detail-meta-item label">Dauer</dt>
  <dd class="detail-meta-item value">30-60 Min.</dd>
  <dt class="detail-meta-item label">Frequenz</dt>
  <dd class="detail-meta-item value">2x jährlich</dd>
  ...
</dl>
```

**Should NOT be:**
```html
<div class="detail-meta-strip">
  <div class="detail-meta-item">
    <div class="label">...</div>
    <div class="value">...</div>
  </div>
</div>
```

**Visual Check:** Should look IDENTICAL to before (no visual changes)

---

## 10. Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

**Test each schema type:**

1. **FAQPage:**
   - Input: `https://zahnarztpraxis-schwabing.de/leistung.html#zahnerhaltung-prophylaxe`
   - Expected: "FAQPage detected"

2. **Organization:**
   - Input: `https://zahnarztpraxis-schwabing.de/`
   - Expected: "Dentist detected" or "LocalBusiness detected"

3. **BreadcrumbList:**
   - Input: `https://zahnarztpraxis-schwabing.de/leistung.html#implantologie`
   - Expected: "BreadcrumbList detected"

**Note:** Person, Service, and HowTo schemas may not show as "eligible for rich results" but are still valuable for AI search.

---

## 11. AI Search Testing (Manual, 2-4 weeks after deployment)

### Perplexity.ai
**Query:** "Zahnarzt Prophylaxe München Schwabing"
**Expected:** Praxis appears in sources/citations

### ChatGPT (with Search enabled)
**Query:** "Beste Implantologie München"
**Expected:** Praxis recommended in results

### Google Gemini
**Query:** "Zahnarzt Angstpatienten Schwabing"
**Expected:** Praxis mentioned in AI Overview

### Claude (with Search)
**Query:** "Parodontologie München"
**Expected:** Praxis cited in response

---

## 12. Google Search Console Checks

**After 1-2 weeks:**

1. **Coverage Report:**
   - All 8 HTML pages indexed
   - 0 errors
   - 13+ service URLs indexed (if Google indexes hash fragments)

2. **Experience Report:**
   - Core Web Vitals: All green
   - Mobile Usability: 0 issues

3. **Enhancements:**
   - Breadcrumb: Valid items detected
   - FAQ: Valid items detected (if showing)

4. **Sitemaps:**
   - Resubmit sitemap.xml
   - Status: "Success"
   - URLs discovered: 8

---

## Quick Terminal Commands

### Check if schemas exist (local testing):
```bash
cd "/Users/jouls/Desktop/arztpraxis dr jahn"

# Check FAQPage in component
grep -n "FAQPage" components/LeistungDetail.jsx

# Check Person schemas in component
grep -n "Person" components/TeamPage.jsx

# Check sitemap has praxistour
grep "praxistour" sitemap.xml

# Check date meta tags in static pages
grep "article:modified_time" index.html leistungen.html team.html
```

### Validate JSON schemas programmatically:
```bash
# Install jq if needed: brew install jq

# Extract and validate schema from page
curl -s "https://zahnarztpraxis-schwabing.de/leistung.html" | \
  grep -o '<script type="application/ld+json">.*</script>' | \
  sed 's/<script type="application\/ld+json">//;s/<\/script>//' | \
  jq '.'
```

---

## Success Criteria Checklist

After all tests:

- [ ] All 13 service pages have FAQPage schema (0 errors)
- [ ] Team page has 2 Person schemas (0 errors)
- [ ] All service pages have BreadcrumbList schema
- [ ] All service pages have Service schema
- [ ] Service pages with process steps have HowTo schema
- [ ] Homepage Organization schema enhanced with new fields
- [ ] All pages have date meta tags
- [ ] Sitemap.xml has all 8 URLs with metadata
- [ ] Semantic HTML (dl/dt/dd) renders correctly
- [ ] No visual design changes
- [ ] No JavaScript console errors
- [ ] Google Rich Results Test passes for FAQPage
- [ ] Sitemap validates without errors

---

## Troubleshooting

### Schema not appearing:
1. Hard refresh (Cmd+Shift+R)
2. Clear browser cache
3. Check browser console for errors
4. Verify useEffect hooks are running

### Validation errors:
1. Copy exact JSON from page
2. Use https://jsonlint.com/ to check JSON syntax
3. Then use https://validator.schema.org/
4. Fix any typos in schema structure

### Visual design broken:
1. Check CSS file loaded: Network tab → leistung-detail.css
2. Verify dl/dt/dd styles applied
3. Test responsive breakpoints (resize browser)
4. Check for conflicting CSS

---

**Last Updated:** 2026-06-02
**Testing Status:** Ready for validation
**Expected Time:** 2-3 hours for complete testing
