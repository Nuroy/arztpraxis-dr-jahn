#!/usr/bin/env python3
"""
Generate Markdown mirrors (.md) for all HTML pages
Optimized for AI crawler readability
"""

import os
import re
import argparse
from pathlib import Path
from datetime import datetime

try:
    from bs4 import BeautifulSoup
    from markdownify import markdownify as md
except ImportError:
    print("Error: Required packages not installed.")
    print("Please run: pip3 install beautifulsoup4 markdownify")
    exit(1)

# Strip-Regeln: Elemente die entfernt werden
STRIP_TAGS = ['nav', 'footer', 'script', 'style', 'noscript', 'iframe', 'svg', 'form', 'button']

# Class-Muster die entfernt werden (Navigation, Widgets, etc.)
STRIP_CLASS_PATTERNS = [
    r'nav', r'footer', r'header', r'menu',
    r'cta-split', r'cookie', r'consent',
    r'chat', r'widget', r'intercom', r'crisp', r'drift',
    r'tally', r'hubspot', r'ghl',
    r'sticky', r'announcement', r'newsletter',
    r'booking-modal'  # Zahnarztpraxis-spezifisch
]

def should_strip_element(element):
    """Check if element should be removed"""
    # Tag-basiert
    if element.name in STRIP_TAGS:
        return True

    # Class-basiert
    if element.get('class'):
        classes = ' '.join(element.get('class'))
        for pattern in STRIP_CLASS_PATTERNS:
            if re.search(pattern, classes, re.IGNORECASE):
                return True

    # ID-basiert (zusätzlich)
    if element.get('id'):
        element_id = element.get('id')
        for pattern in STRIP_CLASS_PATTERNS:
            if re.search(pattern, element_id, re.IGNORECASE):
                return True

    return False

def clean_html(html_content):
    """Remove navigation, footer, scripts, etc."""
    soup = BeautifulSoup(html_content, 'html.parser')

    # Remove elements
    for element in soup.find_all():
        if should_strip_element(element):
            element.decompose()

    return str(soup)

def html_to_markdown(html_content, page_url, title=""):
    """Convert HTML to clean Markdown"""
    # Clean HTML first
    cleaned = clean_html(html_content)

    # Convert to Markdown
    markdown = md(cleaned, heading_style="ATX", bullets="-")

    # Clean up excessive newlines
    markdown = re.sub(r'\n{3,}', '\n\n', markdown)

    # Add frontmatter
    frontmatter = f"""---
title: {title}
url: {page_url}
last_updated: {datetime.now().strftime('%Y-%m-%d')}
---

"""

    return frontmatter + markdown.strip()

def generate_mirrors(site_root, base_url, skip_paths=None):
    """Generate .md mirrors for all .html files"""
    if skip_paths is None:
        skip_paths = ['/api/', '/app/', '/dashboard/', '/login/']

    site_root = Path(site_root)
    generated = []

    for html_file in site_root.rglob('*.html'):
        # Skip paths
        rel_path = str(html_file.relative_to(site_root))
        if any(skip in rel_path for skip in skip_paths):
            print(f"⊘ Skipping {rel_path} (in skip_paths)")
            continue

        # Read HTML
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Extract title
        soup = BeautifulSoup(html_content, 'html.parser')
        title_tag = soup.find('title')
        title = title_tag.get_text() if title_tag else html_file.stem

        # Generate URL
        page_url = base_url + '/' + rel_path

        # Convert to Markdown
        markdown_content = html_to_markdown(html_content, page_url, title)

        # Write .md file (same directory as .html)
        md_file = html_file.with_suffix('.md')
        with open(md_file, 'w', encoding='utf-8') as f:
            f.write(markdown_content)

        generated.append(str(md_file.relative_to(site_root)))
        print(f"✓ {rel_path} → {md_file.name}")

    return generated

def main():
    parser = argparse.ArgumentParser(description='Generate Markdown mirrors for HTML pages')
    parser.add_argument('--site-root', required=True, help='Site root directory (e.g., .output)')
    parser.add_argument('--base-url', required=True, help='Base URL (e.g., https://zahnarztpraxis-schwabing.de)')

    args = parser.parse_args()

    print(f"Generating Markdown mirrors...")
    print(f"Site root: {args.site_root}")
    print(f"Base URL: {args.base_url}")
    print()

    generated = generate_mirrors(args.site_root, args.base_url)

    print()
    print(f"✅ Generated {len(generated)} Markdown mirrors:")
    for md_file in generated:
        print(f"   - {md_file}")

if __name__ == '__main__':
    main()
