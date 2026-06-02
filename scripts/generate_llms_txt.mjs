#!/usr/bin/env node
/**
 * Update llms.txt with auto-generated lists
 * Node.js version - works on Vercel without Python
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findMarkdownMirrors(siteRoot) {
  const mirrors = [];

  function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDir(filePath);
      } else if (file.endsWith('.md')) {
        const relPath = path.relative(siteRoot, filePath);
        mirrors.push(relPath);
      }
    }
  }

  scanDir(siteRoot);
  return mirrors.sort();
}

function findLeistungPages(siteRoot) {
  const leistungDataPath = path.join(path.dirname(siteRoot), 'components', 'LeistungData.jsx');

  if (!fs.existsSync(leistungDataPath)) {
    console.warn(`⚠ LeistungData.jsx not found at ${leistungDataPath}`);
    return [];
  }

  const content = fs.readFileSync(leistungDataPath, 'utf-8');

  // Extract all service entries - format: "slug": { ... title: "Title", ... }
  const servicePattern = /"([a-z0-9-]+)":\s*\{[\s\S]*?title:\s*"([^"]+)"/g;
  const matches = [...content.matchAll(servicePattern)];

  const leistungen = [];
  const seen = new Set();

  for (const match of matches) {
    const slug = match[1];
    const title = match[2];

    if (!seen.has(slug)) {
      seen.add(slug);
      leistungen.push({
        slug,
        title,
        url: `leistung.html#${slug}`
      });
    }
  }

  return leistungen;
}

function updateLlmsTxt(llmsPath, siteRoot, baseUrl) {
  if (!fs.existsSync(llmsPath)) {
    console.error(`❌ llms.txt not found at ${llmsPath}`);
    return false;
  }

  let content = fs.readFileSync(llmsPath, 'utf-8');

  // 1. Generate mirror list
  const mirrors = findMarkdownMirrors(siteRoot);
  let mirrorListText = '\nAlle Seiten als Markdown:\n';
  for (const mirror of mirrors) {
    mirrorListText += `- ${baseUrl}/${mirror}\n`;
  }

  // 2. Generate leistung list
  const leistungen = findLeistungPages(siteRoot);
  let leistungListText = '\n';
  for (const lst of leistungen) {
    leistungListText += `- ${lst.title}: ${baseUrl}/${lst.url}\n`;
  }

  // 3. Replace markers
  content = content.replace(
    /<!-- BEGIN:AUTO_MIRROR_LIST -->[\s\S]*?<!-- END:AUTO_MIRROR_LIST -->/,
    `<!-- BEGIN:AUTO_MIRROR_LIST -->${mirrorListText}<!-- END:AUTO_MIRROR_LIST -->`
  );

  content = content.replace(
    /<!-- BEGIN:AUTO_SUBPAGE_LIST -->[\s\S]*?<!-- END:AUTO_SUBPAGE_LIST -->/,
    `<!-- BEGIN:AUTO_SUBPAGE_LIST -->${leistungListText}<!-- END:AUTO_SUBPAGE_LIST -->`
  );

  // Write back
  fs.writeFileSync(llmsPath, content, 'utf-8');

  console.log(`✅ Updated llms.txt:`);
  console.log(`   - ${mirrors.length} Markdown mirrors`);
  console.log(`   - ${leistungen.length} Leistungs-Seiten`);

  return true;
}

function main() {
  const args = process.argv.slice(2);
  const siteRoot = args.find(a => a.startsWith('--site-root='))?.split('=')[1];
  const llmsPath = args.find(a => a.startsWith('--llms-path='))?.split('=')[1];
  const baseUrl = args.find(a => a.startsWith('--base-url='))?.split('=')[1];

  if (!siteRoot || !llmsPath || !baseUrl) {
    console.error('Usage: node generate_llms_txt.mjs --site-root=<path> --llms-path=<path> --base-url=<url>');
    process.exit(1);
  }

  console.log('Updating llms.txt...');
  console.log(`Site root: ${siteRoot}`);
  console.log(`llms.txt: ${llmsPath}`);
  console.log();

  updateLlmsTxt(llmsPath, siteRoot, baseUrl);
}

main();
