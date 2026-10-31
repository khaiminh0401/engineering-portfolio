import path from 'node:path';
import { Marked } from 'marked';

export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const slug = value => value.toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu, '').replace(/ /g, '-');

export function pagePath(source) {
  return source.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html');
}

export function siteLink(source, href, basePath) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return href;
  const match = href.match(/^([^?#]*)(.*)$/);
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(source), match[1]));
  if (resolved.startsWith('../')) throw new Error(`Link leaves portfolio: ${source}: ${href}`);
  const route = pagePath(resolved).replace(/index\.html$/, '');
  return encodeURI(basePath + route) + match[2];
}

export function renderMarkdown(sourcePath, markdown, basePath = '/engineering-portfolio/') {
  const ids = new Map();
  const parser = new Marked({ gfm: true, renderer: {
    link({ href, title, tokens }) {
      const target = siteLink(sourcePath, href, basePath);
      return `<a href="${escapeHtml(target)}"${title ? ` title="${escapeHtml(title)}"` : ''}>${this.parser.parseInline(tokens)}</a>`;
    },
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const key = slug(text.replace(/<[^>]+>/g, ''));
      const duplicate = ids.get(key) || 0;
      ids.set(key, duplicate + 1);
      const id = key + (duplicate ? `-${duplicate}` : '');
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
    code({ text, lang }) {
      if (lang === 'mermaid') return `<pre class="mermaid" aria-label="Architecture diagram">${escapeHtml(text)}</pre>\n`;
      return `<pre><code${lang ? ` class="language-${escapeHtml(lang)}"` : ''}>${escapeHtml(text)}</code></pre>\n`;
    },
    table({ header, rows }) {
      const cell = (c, tag) => `<${tag}>${this.parser.parseInline(c.tokens)}</${tag}>`;
      return `<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable table"><table><thead><tr>${header.map(c => cell(c, 'th')).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(c => cell(c, 'td')).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
  }});
  return parser.parse(markdown);
}
