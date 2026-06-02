#!/usr/bin/env python3
"""
Update llms.txt with auto-generated lists:
- Markdown mirror list
- Subpage (Leistungen) list
"""

import os
import re
import argparse
from pathlib import Path

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Error: Required packages not installed.")
    print("Please run: pip3 install beautifulsoup4")
    exit(1)

def find_markdown_mirrors(site_root):
    """Find all .md files"""
    site_root = Path(site_root)
    mirrors = []

    for md_file in sorted(site_root.rglob('*.md')):
        rel_path = md_file.relative_to(site_root)
        mirrors.append(str(rel_path))

    return mirrors

def find_leistung_pages(site_root):
    """Find all service detail pages from LeistungData.jsx"""
    # Leistungs-Seiten sind Hash-basiert: leistung.html#slug
    # Wir extrahieren die Slugs aus LeistungData.jsx

    leistung_data_path = Path(site_root).parent / 'components' / 'LeistungData.jsx'

    if not leistung_data_path.exists():
        print(f"⚠ LeistungData.jsx not found at {leistung_data_path}")
        return []

    with open(leistung_data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract all service entries - format is: "slug": { ... title: "Title", ... }
    # The data structure uses quoted keys in a JavaScript object
    service_pattern = r'"([a-z0-9-]+)":\s*\{[\s\S]*?title:\s*"([^"]+)"'
    matches = re.finditer(service_pattern, content)

    leistungen = []
    seen_slugs = set()  # Avoid duplicates
    for match in matches:
        slug = match.group(1)
        title = match.group(2)

        # Skip duplicates
        if slug not in seen_slugs:
            seen_slugs.add(slug)
            leistungen.append({
                'slug': slug,
                'title': title,
                'url': f'leistung.html#{slug}'
            })

    return leistungen

def update_llms_txt(llms_path, site_root, base_url):
    """Update llms.txt with auto-generated content"""
    llms_path = Path(llms_path)

    if not llms_path.exists():
        print(f"❌ llms.txt not found at {llms_path}")
        return False

    with open(llms_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Generate mirror list
    mirrors = find_markdown_mirrors(site_root)
    mirror_list_text = f"\nAlle Seiten als Markdown:\n"
    for mirror in mirrors:
        mirror_list_text += f"- {base_url}/{mirror}\n"

    # 2. Generate leistung list
    leistungen = find_leistung_pages(site_root)
    leistung_list_text = f"\n"
    for lst in leistungen:
        leistung_list_text += f"- {lst['title']}: {base_url}/{lst['url']}\n"

    # 3. Replace markers
    # MIRROR_LIST
    content = re.sub(
        r'<!-- BEGIN:AUTO_MIRROR_LIST -->.*?<!-- END:AUTO_MIRROR_LIST -->',
        f"<!-- BEGIN:AUTO_MIRROR_LIST -->{mirror_list_text}<!-- END:AUTO_MIRROR_LIST -->",
        content,
        flags=re.DOTALL
    )

    # SUBPAGE_LIST
    content = re.sub(
        r'<!-- BEGIN:AUTO_SUBPAGE_LIST -->.*?<!-- END:AUTO_SUBPAGE_LIST -->',
        f"<!-- BEGIN:AUTO_SUBPAGE_LIST -->{leistung_list_text}<!-- END:AUTO_SUBPAGE_LIST -->",
        content,
        flags=re.DOTALL
    )

    # Write back
    with open(llms_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ Updated llms.txt:")
    print(f"   - {len(mirrors)} Markdown mirrors")
    print(f"   - {len(leistungen)} Leistungs-Seiten")

    return True

def main():
    parser = argparse.ArgumentParser(description='Update llms.txt with auto-generated lists')
    parser.add_argument('--site-root', required=True, help='Site root (.output)')
    parser.add_argument('--llms-path', required=True, help='Path to llms.txt')
    parser.add_argument('--base-url', required=True, help='Base URL')

    args = parser.parse_args()

    print(f"Updating llms.txt...")
    print(f"Site root: {args.site_root}")
    print(f"llms.txt: {args.llms_path}")
    print()

    update_llms_txt(args.llms_path, args.site_root, args.base_url)

if __name__ == '__main__':
    main()
