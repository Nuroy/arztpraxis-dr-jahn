#!/usr/bin/env node
/**
 * Generate Markdown mirrors (.md) for all HTML pages
 * Node.js version - works on Vercel without Python
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Elements to strip
const STRIP_TAGS = ['nav', 'footer', 'script', 'style', 'noscript', 'iframe', 'svg', 'form', 'button'];

// Class patterns to strip
const STRIP_CLASS_PATTERNS = [
  /nav/i, /footer/i, /header/i, /menu/i,
  /cta-split/i, /cookie/i, /consent/i,
  /chat/i, /widget/i, /intercom/i, /crisp/i, /drift/i,
  /tally/i, /hubspot/i, /ghl/i,
  /sticky/i, /announcement/i, /newsletter/i,
  /booking-modal/i
];

function shouldStripElement(element) {
  // Check tag name
  if (STRIP_TAGS.includes(element.tagName?.toLowerCase())) {
    return true;
  }

  // Check classes
  const classList = element.getAttribute('class');
  if (classList) {
    for (const pattern of STRIP_CLASS_PATTERNS) {
      if (pattern.test(classList)) {
        return true;
      }
    }
  }

  // Check ID
  const id = element.getAttribute('id');
  if (id) {
    for (const pattern of STRIP_CLASS_PATTERNS) {
      if (pattern.test(id)) {
        return true;
      }
    }
  }

  return false;
}

function cleanHTML(html) {
  const root = parse(html);

  // Remove unwanted elements
  const allElements = root.querySelectorAll('*');
  for (const element of allElements) {
    if (shouldStripElement(element)) {
      element.remove();
    }
  }

  return root.toString();
}

function htmlToMarkdown(htmlContent, pageUrl, title) {
  // Clean HTML first
  const cleaned = cleanHTML(htmlContent);

  // Convert to Markdown
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-'
  });

  const markdown = turndownService.turndown(cleaned);

  // Clean up excessive newlines
  const cleanedMd = markdown.replace(/\n{3,}/g, '\n\n');

  // Add frontmatter
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const frontmatter = `---
title: ${title}
url: ${pageUrl}
last_updated: ${dateStr}
---

`;

  return frontmatter + cleanedMd.trim();
}

function generateMirrors(siteRoot, baseUrl) {
  const generated = [];
  const skipPaths = ['/api/', '/app/', '/dashboard/', '/login/'];

  function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.html')) {
        const relPath = path.relative(siteRoot, filePath);

        // Skip paths
        if (skipPaths.some(skip => relPath.includes(skip))) {
          console.log(`⊘ Skipping ${relPath}`);
          continue;
        }

        // Read HTML
        const htmlContent = fs.readFileSync(filePath, 'utf-8');

        // Extract title
        const root = parse(htmlContent);
        const titleTag = root.querySelector('title');
        const title = titleTag?.text || path.basename(file, '.html');

        // Generate URL
        const pageUrl = baseUrl + '/' + relPath;

        // Convert to Markdown
        const markdown = htmlToMarkdown(htmlContent, pageUrl, title);

        // Write .md file
        const mdPath = filePath.replace('.html', '.md');
        fs.writeFileSync(mdPath, markdown, 'utf-8');

        generated.push(path.relative(siteRoot, mdPath));
        console.log(`✓ ${relPath} → ${path.basename(mdPath)}`);
      }
    }
  }

  processDirectory(siteRoot);
  return generated;
}

function main() {
  const args = process.argv.slice(2);
  const siteRoot = args.find(a => a.startsWith('--site-root='))?.split('=')[1];
  const baseUrl = args.find(a => a.startsWith('--base-url='))?.split('=')[1];

  if (!siteRoot || !baseUrl) {
    console.error('Usage: node generate_markdown_mirrors.mjs --site-root=<path> --base-url=<url>');
    process.exit(1);
  }

  console.log('Generating Markdown mirrors...');
  console.log(`Site root: ${siteRoot}`);
  console.log(`Base URL: ${baseUrl}`);
  console.log();

  const generated = generateMirrors(siteRoot, baseUrl);

  console.log();
  console.log(`✅ Generated ${generated.length} Markdown mirrors:`);
  for (const file of generated) {
    console.log(`   - ${file}`);
  }
}

main();
