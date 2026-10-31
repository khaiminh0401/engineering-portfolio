import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderMarkdown, pagePath, slug } from './render.mjs';
import { articlePage, layout, BASE } from './layout.mjs';
import { homepage } from './home.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const dist = path.join(here, 'dist');
await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(path.join(dist, 'assets'), { recursive: true });
await fs.cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
const vendor = path.join(dist, 'assets/vendor/mermaid');
await fs.mkdir(vendor, { recursive: true });
await fs.copyFile(path.join(here, 'node_modules/mermaid/dist/mermaid.esm.min.mjs'), path.join(vendor, 'mermaid.esm.min.mjs'));
await fs.cp(path.join(here, 'node_modules/mermaid/dist/chunks/mermaid.esm.min'), path.join(vendor, 'chunks/mermaid.esm.min'), {
  recursive: true,
  filter: async source => (await fs.stat(source)).isDirectory() || source.endsWith('.mjs')
});
await fs.copyFile(path.join(here, 'node_modules/mermaid/LICENSE'), path.join(vendor, 'LICENSE'));
for (const [source, target] of [['style.css', 'style.css'], ['site.js', 'site.js'], ['diagrams.js', 'diagrams.js']]) {
  await fs.copyFile(path.join(here, source), path.join(dist, 'assets', target));
}
await fs.writeFile(path.join(dist, 'assets/favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#153d37"/><text x="32" y="38" text-anchor="middle" fill="#f8f7f2" font-family="monospace" font-size="20">DKM</text><path d="M54 54h10v10H54z" fill="#acc482"/></svg>');
await fs.writeFile(path.join(dist, 'index.html'), homepage());
const routes = [''];

async function walk(dir = root) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (['.git', 'website'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(full); continue; }
    if (!entry.name.endsWith('.md') || full === path.join(root, 'README.md')) continue;
    const source = path.relative(root, full).split(path.sep).join('/');
    const markdown = await fs.readFile(full, 'utf8');
    const title = markdown.match(/^# (.+)$/m)?.[1] || source;
    const content = markdown.replace(/^# .+\n/, '');
    const toc = [...content.matchAll(/^## (.+)$/gm)].map(match => ({ text: match[1], id: slug(match[1]) }));
    const output = pagePath(source);
    const route = output.replace(/index\.html$/, '');
    const html = articlePage({ title, html: renderMarkdown(source, content), toc, source, route });
    await fs.mkdir(path.dirname(path.join(dist, output)), { recursive: true });
    await fs.writeFile(path.join(dist, output), html);
    routes.push(route);
  }
}
await walk();
await fs.writeFile(path.join(dist, '404.html'), layout({ title: 'Page not found', description: 'Return to Dao Khai Minh’s engineering portfolio.', body: `<main id="main" class="wrap section"><p class="eyebrow">404 / PAGE NOT FOUND</p><h1 style="font:48px Georgia,serif;margin-bottom:25px">Let's get you back to the work.</h1><a class="button primary" href="${BASE}">Back to portfolio ↗</a></main>` }));
await fs.writeFile(path.join(dist, '.nojekyll'), '');
await fs.writeFile(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://khaiminh0401.github.io/engineering-portfolio/sitemap.xml\n');
await fs.writeFile(path.join(dist, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + routes.map(route => `<url><loc>https://khaiminh0401.github.io${BASE}${route}</loc></url>`).join('') + '</urlset>');
console.log(`Built ${routes.length} pages and 404.html in website/dist`);
