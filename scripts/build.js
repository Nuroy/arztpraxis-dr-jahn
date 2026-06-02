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
  console.log(`Rendering ${pageConfig.name}...`);
  const templatePath = path.join(ROOT, pageConfig.template);
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Phase 1: Just copy templates (preserves all functionality)
  // Future: Full SSR rendering can be added incrementally

  return template;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Starting build process...');

  for (const pageConfig of PAGES) {
    try {
      const html = await renderPage(pageConfig);
      const outputPath = path.join(OUTPUT_DIR, pageConfig.name + '.html');
      fs.writeFileSync(outputPath, html, 'utf-8');
      console.log(`✓ ${pageConfig.name}.html`);
    } catch (error) {
      console.error(`✗ Failed to render ${pageConfig.name}:`, error.message);
      process.exit(1);
    }
  }

  // Copy static assets
  console.log('Copying static assets...');
  copyDirectory(path.join(ROOT, 'assets'), path.join(OUTPUT_DIR, 'assets'));
  copyDirectory(path.join(ROOT, 'styles'), path.join(OUTPUT_DIR, 'styles'));
  copyDirectory(path.join(ROOT, 'components'), path.join(OUTPUT_DIR, 'components'));
  copyDirectory(path.join(ROOT, 'api'), path.join(OUTPUT_DIR, 'api'));

  // Copy SEO files
  copyFile(path.join(ROOT, 'robots.txt'), path.join(OUTPUT_DIR, 'robots.txt'));
  copyFile(path.join(ROOT, 'sitemap.xml'), path.join(OUTPUT_DIR, 'sitemap.xml'));
  copyFile(path.join(ROOT, 'llms.txt'), path.join(OUTPUT_DIR, 'llms.txt'));

  // Copy IndexNow key file (find .txt file that matches key pattern)
  const files = fs.readdirSync(ROOT);
  const keyFile = files.find(f => f.match(/^[a-f0-9]{64}\.txt$/));
  if (keyFile) {
    copyFile(path.join(ROOT, keyFile), path.join(OUTPUT_DIR, keyFile));
    console.log(`Copied IndexNow key: ${keyFile}`);
  }

  console.log('Build complete!');
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
