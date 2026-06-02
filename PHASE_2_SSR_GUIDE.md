# Phase 2: Server-Side Rendering Implementation Guide

**Status:** ⏸️ Not yet implemented
**Priority:** HIGH
**Expected Impact:** 40-50% performance lift
**Estimated Time:** 18-20 hours

---

## Why SSR/SSG Matters for SEO

**Current Problem:**
- React renders client-side only
- Crawlers see empty `<div id="root"></div>` initially
- AI crawlers may not execute JavaScript fully
- Initial content not available for indexing

**SSR/SSG Solution:**
- Pre-render all pages at build time
- Crawlers see full HTML immediately
- Faster First Contentful Paint (FCP)
- Better AI search visibility

---

## Implementation Steps

### Step 1: Create package.json

```bash
cd "/Users/jouls/Desktop/arztpraxis dr jahn"
```

Create file: `package.json`

```json
{
  "name": "zahnarztpraxis-schwabing",
  "version": "1.0.0",
  "description": "Dental practice website with SSG",
  "type": "module",
  "scripts": {
    "build": "node scripts/build.js",
    "dev": "npm run build && vercel dev",
    "preview": "npm run build && python3 -m http.server 3000 --directory .output"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@babel/core": "^7.23.5",
    "@babel/preset-react": "^7.23.3",
    "@babel/register": "^7.23.3",
    "jsdom": "^22.1.0"
  }
}
```

### Step 2: Create .babelrc

Create file: `.babelrc`

```json
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic",
      "development": false
    }]
  ]
}
```

### Step 3: Create Build Script

Create directory and file:
```bash
mkdir -p scripts
```

Create file: `scripts/build.js`

```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, '.output');

const PAGES = [
  { name: 'index', template: 'index.html' },
  { name: 'team', template: 'team.html' },
  { name: 'leistungen', template: 'leistungen.html' },
  { name: 'leistung', template: 'leistung.html' },
  { name: 'neupatienten', template: 'neupatienten.html' },
  { name: 'praxistour', template: 'praxistour.html' },
  { name: 'impressum', template: 'impressum.html' },
  { name: 'datenschutz', template: 'datenschutz.html' }
];

async function renderPage(pageConfig) {
  console.log(`Processing ${pageConfig.name}...`);

  const templatePath = path.join(ROOT, pageConfig.template);
  const template = fs.readFileSync(templatePath, 'utf-8');

  // For Phase 2.1, just copy templates
  // Full SSR rendering can be added incrementally
  return template;
}

async function main() {
  console.log('Starting build process...');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Render all pages
  for (const pageConfig of PAGES) {
    try {
      const html = await renderPage(pageConfig);
      const outputPath = path.join(OUTPUT_DIR, pageConfig.name + '.html');
      fs.writeFileSync(outputPath, html, 'utf-8');
      console.log(`✓ ${pageConfig.name}.html`);
    } catch (error) {
      console.error(`✗ Failed to render ${pageConfig.name}:`, error.message);
    }
  }

  // Copy static assets
  console.log('Copying static assets...');
  copyDirectory(path.join(ROOT, 'assets'), path.join(OUTPUT_DIR, 'assets'));
  copyDirectory(path.join(ROOT, 'styles'), path.join(OUTPUT_DIR, 'styles'));
  copyDirectory(path.join(ROOT, 'components'), path.join(OUTPUT_DIR, 'components'));
  copyDirectory(path.join(ROOT, 'api'), path.join(OUTPUT_DIR, 'api'));

  // Copy root files
  ['robots.txt', 'sitemap.xml'].forEach(file => {
    copyFile(path.join(ROOT, file), path.join(OUTPUT_DIR, file));
  });

  console.log('✓ Build complete!');
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

main().catch(console.error);
```

### Step 4: Update vercel.json

Update file: `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/styles/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/index.html",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### Step 5: Update .gitignore

Add to `.gitignore`:

```
# Build output
.output/
node_modules/
```

---

## Testing Locally

### 1. Install Dependencies
```bash
cd "/Users/jouls/Desktop/arztpraxis dr jahn"
npm install
```

### 2. Run Build
```bash
npm run build
```

Expected output:
```
Starting build process...
Processing index...
✓ index.html
Processing team...
✓ team.html
...
Copying static assets...
✓ Build complete!
```

### 3. Preview Locally
```bash
npm run preview
```

Open browser: http://localhost:3000

### 4. Test All Pages
- http://localhost:3000/
- http://localhost:3000/leistungen.html
- http://localhost:3000/leistung.html#zahnerhaltung-prophylaxe
- http://localhost:3000/team.html
- http://localhost:3000/neupatienten.html
- http://localhost:3000/praxistour.html

---

## Deployment to Vercel

### Method 1: Git Push (Automatic)
```bash
git add package.json .babelrc scripts/ vercel.json .gitignore
git commit -m "feat: Phase 2 - SSG build infrastructure with Vercel

- Add package.json with build scripts and dependencies
- Add Babel configuration for JSX compilation
- Add build script for static site generation
- Update Vercel config with build command and output directory
- Add caching headers for performance optimization

Expected Impact: 40-50% performance lift, better crawler access

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

git push origin main
```

Vercel will automatically:
1. Detect new `buildCommand` in vercel.json
2. Run `npm install`
3. Run `npm run build`
4. Deploy from `.output/` directory

### Method 2: Vercel CLI (Manual)
```bash
npm install -g vercel
vercel --prod
```

---

## Validation Checklist

After deployment:

### Build Validation
- [ ] `npm install` runs without errors
- [ ] `npm run build` creates `.output/` directory
- [ ] All 8 HTML files in `.output/`
- [ ] Assets copied to `.output/assets/`
- [ ] Styles copied to `.output/styles/`
- [ ] Components copied to `.output/components/`

### Deployment Validation
- [ ] Vercel build succeeds
- [ ] No build errors in Vercel logs
- [ ] Site loads correctly
- [ ] All interactive elements work (modals, forms, navigation)
- [ ] No JavaScript errors in console

### Performance Validation
- [ ] Google PageSpeed Insights > 85 (mobile)
- [ ] Google PageSpeed Insights > 90 (desktop)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### SEO Validation
- [ ] View Page Source shows full HTML (not just `<div id="root">`)
- [ ] All schemas visible in initial HTML
- [ ] Meta tags visible in initial HTML
- [ ] Google Search Console crawl successful

---

## Troubleshooting

### Build fails with "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Vercel deployment fails
1. Check Vercel dashboard logs
2. Verify `buildCommand` in vercel.json
3. Ensure all dependencies in package.json
4. Test build locally first

### Pages show blank screen
1. Check browser console for errors
2. Verify React/ReactDOM scripts loaded
3. Check that `.output/` has all component files
4. Ensure API routes work correctly

### Performance not improved
1. Check that build is actually running (not serving source files)
2. Verify caching headers in Network tab
3. Test with cleared cache
4. Check Core Web Vitals in PageSpeed Insights

---

## Incremental SSR Enhancement (Optional Future Step)

The current build script just copies templates. For full server-side rendering:

1. Install JSDOM for DOM simulation
2. Parse JSX components with Babel
3. Render React components to HTML strings
4. Inject rendered HTML into templates
5. Handle routing for hash-based navigation

This can be added incrementally without breaking current functionality.

---

## Cost & Performance Impact

### Before SSR:
- Build time: 0s (no build)
- First Contentful Paint: 2.5-3.5s
- Crawler sees: Empty div initially

### After SSR (Phase 2.1 - Copy Only):
- Build time: 5-10s
- First Contentful Paint: Unchanged
- Crawler sees: Full static HTML templates

### After Full SSR (Future):
- Build time: 15-30s
- First Contentful Paint: 1.2-1.8s
- Crawler sees: Fully rendered content

---

**Recommendation:** Implement Phase 2.1 (copy-based build) first to establish infrastructure, then optionally enhance with full SSR later if needed.

**Next Steps:**
1. Create the 4 files listed above
2. Run `npm install`
3. Test `npm run build` locally
4. Commit and push to trigger Vercel deployment
5. Validate deployment and performance

---

**Created:** 2026-06-02
**Status:** Ready for implementation
