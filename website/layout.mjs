import { escapeHtml as esc } from './render.mjs';

export const BASE = '/engineering-portfolio/';
export const PDF = 'assets/resume/Dao_Khai_Minh_Resume_2026.pdf';
const repo = 'https://github.com/khaiminh0401/engineering-portfolio';

export function layout({ title, description, route = '', body, article = false, diagrams = false }) {
  const url = `https://khaiminh0401.github.io${BASE}${route}`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | Dao Khai Minh</title><meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#153d37"><meta property="og:title" content="${esc(title)} | Dao Khai Minh"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="${article ? 'article' : 'website'}"><meta property="og:url" content="${url}">
<link rel="canonical" href="${url}"><link rel="icon" href="${BASE}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${BASE}assets/style.css">
</head><body><a class="skip" href="#main">Skip to content</a>
<header class="site-header"><a class="brand" href="${BASE}" aria-label="Dao Khai Minh home"><span class="brand-mark">DKM<span></span></span><span>DAO KHAI MINH<small>SOFTWARE ENGINEER</small></span></a>
<button class="menu-toggle" type="button" aria-controls="navigation" aria-expanded="false">Menu <span aria-hidden="true">+</span></button>
<nav id="navigation" aria-label="Main navigation"><a href="${BASE}#work">Work</a><a href="${BASE}#writing">Case studies</a><a href="${BASE}#experience">Experience</a><a href="${BASE}#contact">Contact</a><a class="nav-resume" href="${BASE}${PDF}" download>Resume <span aria-hidden="true">↗</span></a></nav></header>
${body}
<footer class="site-footer"><a href="${BASE}">DAO KHAI MINH</a><span>Java · Spring Boot · Angular</span><a href="${repo}">View portfolio source <span aria-hidden="true">↗</span></a><span>© ${new Date().getUTCFullYear()}</span></footer>
<script type="module" src="${BASE}assets/site.js"></script>${diagrams ? `<script type="module" src="${BASE}assets/diagrams.js"></script>` : ''}
</body></html>`;
}

export function articlePage({ title, html, toc, source, route }) {
  const group = source.startsWith('case-studies/') ? 'ENGINEERING CASE STUDY' : source.startsWith('projects/') ? 'FEATURED PROJECT' : 'ENGINEERING NOTES';
  return layout({ title, description: `${title}. Engineering notes and evidence from Dao Khai Minh's Java, Spring Boot and Angular portfolio.`, route, article: true, diagrams: html.includes('class="mermaid"'), body: `
<main id="main"><div class="article-hero wrap"><a class="back-link" href="${BASE}#writing">← Back to portfolio</a><p class="eyebrow">${group}</p><h1>${esc(title)}</h1><div class="article-meta"><span>DAO KHAI MINH</span><span>Evidence and limitations included</span><a href="${repo}/blob/main/${source}">Read on GitHub ↗</a></div></div>
<div class="article-grid wrap"><aside class="article-toc"><p class="eyebrow">ON THIS PAGE</p><nav aria-label="Article contents">${toc.map(item => `<a href="#${item.id}">${esc(item.text)}</a>`).join('')}</nav><a class="toc-evidence" href="${BASE}evidence.html">Evidence registry ↗</a></aside><article class="prose">${html}</article></div>
<section class="article-next wrap"><p class="eyebrow">KEEP EXPLORING</p><a href="${BASE}#writing">More engineering case studies <span>↗</span></a><a href="${BASE}${PDF}" download>Download resume <span>↓</span></a></section></main>` });
}
