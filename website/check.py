"""Validate the built site's local links, fragments and static resources."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import json

root = Path(__file__).resolve().parent / 'dist'
base = '/engineering-portfolio/'

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.ids = set()
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if 'id' in values:
            self.ids.add(values['id'])
        for key in ('href', 'src'):
            if key in values:
                self.links.append(values[key])

pages = {p: Page(p.read_text()) for p in root.rglob('*.html')}
errors = []
checked = 0
for source, page in pages.items():
    source_url = base + source.relative_to(root).as_posix()
    for link in page.links:
        if urlsplit(link).scheme or link.startswith('//'):
            continue
        url = urlsplit(urljoin(source_url, link))
        if not url.path.startswith(base):
            errors.append(f'{source.name}: link outside project prefix: {link}')
            continue
        target = root / unquote(url.path[len(base):])
        if target.is_dir():
            target /= 'index.html'
        checked += 1
        if not target.is_file():
            errors.append(f'{source.name}: missing {link}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{source.name}: missing fragment {link}')
assert (root / 'assets/resume/Dao_Khai_Minh_Resume_2026.pdf').read_bytes().startswith(b'%PDF-')
print(json.dumps({'html_pages': len(pages), 'internal_links_and_assets': checked, 'errors': errors}, indent=2))
raise SystemExit(bool(errors))
