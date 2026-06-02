#!/usr/bin/env python3
"""
Generate sitemap.xml from all HTML files
"""

import os
import argparse
from pathlib import Path
from datetime import datetime
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom

# Priority-Mapping
PRIORITY_MAP = {
    'index.html': 1.0,
    'leistungen.html': 0.9,
    'leistung.html': 0.9,
    'team.html': 0.8,
    'neupatienten.html': 0.8,
    'praxistour.html': 0.7,
    'impressum.html': 0.3,
    'datenschutz.html': 0.3
}

# Changefreq-Mapping
CHANGEFREQ_MAP = {
    'index.html': 'weekly',
    'leistungen.html': 'monthly',
    'leistung.html': 'monthly',
    'team.html': 'quarterly',
    'neupatienten.html': 'monthly',
    'praxistour.html': 'yearly',
    'impressum.html': 'yearly',
    'datenschutz.html': 'yearly'
}

def generate_sitemap(site_root, base_url, output_path, skip_paths=None):
    """Generate sitemap.xml"""
    if skip_paths is None:
        skip_paths = ['/api/', '/app/', '/dashboard/', '/login/']

    site_root = Path(site_root)
    urlset = Element('urlset', xmlns='http://www.sitemaps.org/schemas/sitemap/0.9')

    for html_file in sorted(site_root.rglob('*.html')):
        rel_path = str(html_file.relative_to(site_root))

        # Skip paths
        if any(skip in rel_path for skip in skip_paths):
            continue

        # Build URL
        if rel_path == 'index.html':
            url_path = ''
        else:
            url_path = rel_path

        page_url = base_url + '/' + url_path if url_path else base_url + '/'

        # Create <url> element
        url_elem = SubElement(urlset, 'url')

        loc = SubElement(url_elem, 'loc')
        loc.text = page_url

        lastmod = SubElement(url_elem, 'lastmod')
        lastmod.text = datetime.now().strftime('%Y-%m-%d')

        changefreq = SubElement(url_elem, 'changefreq')
        changefreq.text = CHANGEFREQ_MAP.get(html_file.name, 'monthly')

        priority = SubElement(url_elem, 'priority')
        priority.text = str(PRIORITY_MAP.get(html_file.name, 0.5))

    # Pretty-print XML
    xml_str = minidom.parseString(tostring(urlset)).toprettyxml(indent='  ')

    # Remove empty lines
    xml_str = '\n'.join([line for line in xml_str.split('\n') if line.strip()])

    # Write to file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(xml_str)

    print(f"✅ Generated sitemap.xml with {len(urlset)} URLs")

def main():
    parser = argparse.ArgumentParser(description='Generate sitemap.xml')
    parser.add_argument('--site-root', required=True, help='Site root (.output)')
    parser.add_argument('--base-url', required=True, help='Base URL')
    parser.add_argument('--output', required=True, help='Output path (sitemap.xml)')

    args = parser.parse_args()

    print(f"Generating sitemap.xml...")
    print(f"Site root: {args.site_root}")
    print(f"Output: {args.output}")
    print()

    generate_sitemap(args.site_root, args.base_url, args.output)

if __name__ == '__main__':
    main()
