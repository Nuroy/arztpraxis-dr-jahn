#!/usr/bin/env node
/**
 * Generate sitemap.xml from all HTML files
 * Node.js version - works on Vercel without Python
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Priority mapping
const PRIORITY_MAP = {
  'index.html': 1.0,
  'leistungen.html': 0.9,
  'leistung.html': 0.9,
  'team.html': 0.8,
  'neupatienten.html': 0.8,
  'praxistour.html': 0.7,
  'impressum.html': 0.3,
  'datenschutz.html': 0.3
};

// Changefreq mapping (only valid values: always, hourly, daily, weekly, monthly, yearly, never)
const CHANGEFREQ_MAP = {
  'index.html': 'weekly',
  'leistungen.html': 'monthly',
  'leistung.html': 'monthly',
  'team.html': 'monthly',
  'neupatienten.html': 'monthly',
  'praxistour.html': 'yearly',
  'impressum.html': 'yearly',
  'datenschutz.html': 'yearly'
};

function generateSitemap(siteRoot, baseUrl, outputPath) {
  const skipPaths = ['/api/', '/app/', '/dashboard/', '/login/'];
  const urls = [];

  function scanDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDir(filePath);
      } else if (file.endsWith('.html')) {
        const relPath = path.relative(siteRoot, filePath);

        // Skip paths
        if (skipPaths.some(skip => relPath.includes(skip))) {
          continue;
        }

        // Build URL
        let urlPath;
        if (file === 'index.html') {
          urlPath = '';
        } else {
          urlPath = relPath;
        }

        const pageUrl = urlPath ? `${baseUrl}/${urlPath}` : `${baseUrl}/`;

        // Get metadata
        const lastmod = new Date().toISOString().split('T')[0];
        const changefreq = CHANGEFREQ_MAP[file] || 'monthly';
        const priority = PRIORITY_MAP[file] || 0.5;

        urls.push({
          loc: pageUrl,
          lastmod,
          changefreq,
          priority
        });
      }
    }
  }

  scanDir(siteRoot);

  // Sort URLs for consistency
  urls.sort((a, b) => b.priority - a.priority);

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Write to file
  fs.writeFileSync(outputPath, xml, 'utf-8');

  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
}

function main() {
  const args = process.argv.slice(2);
  const siteRoot = args.find(a => a.startsWith('--site-root='))?.split('=')[1];
  const baseUrl = args.find(a => a.startsWith('--base-url='))?.split('=')[1];
  const output = args.find(a => a.startsWith('--output='))?.split('=')[1];

  if (!siteRoot || !baseUrl || !output) {
    console.error('Usage: node generate_sitemap.mjs --site-root=<path> --base-url=<url> --output=<path>');
    process.exit(1);
  }

  console.log('Generating sitemap.xml...');
  console.log(`Site root: ${siteRoot}`);
  console.log(`Output: ${output}`);
  console.log();

  generateSitemap(siteRoot, baseUrl, output);
}

main();
