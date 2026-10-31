# GitHub Pages website

Static presentation of the engineering portfolio, published at:

https://khaiminh0401.github.io/engineering-portfolio/

Canonical article content remains in the repository's Markdown files. The homepage is curated in `home.mjs`; update it when experience or project status changes. `render.mjs` converts document links and heading fragments for the project URL prefix. `build.mjs` copies the reviewed PDF and local diagram-rendering assets. No backend, analytics, external font service or runtime CDN is required.

## Build and verify

From the repository root, with Node 22+ and Python 3:

```sh
npm ci --prefix website
npm test --prefix website
npm run build --prefix website
python3 website/check.py
```

The output is `website/dist/`; it is ignored in the source branch. Mermaid is loaded only on pages with diagrams, and readable diagram source remains available if JavaScript fails. The mobile menu also leaves navigation available without JavaScript.

For local preview, serve a parent directory that maps `/engineering-portfolio/` to `website/dist/`. Serving `dist` directly at `/` will not match the configured GitHub project prefix. For example, create a temporary preview directory outside the checkout, link `engineering-portfolio` to the absolute `website/dist` path, then run `python3 -m http.server 4173 --directory <preview-directory>`.

## Deployment

GitHub Pages is configured to publish the root of `gh-pages`. This branch contains only verified build output and `.nojekyll`. Source changes use normal PRs; source PRs do not need to be automatically merged to publish an explicitly approved build.

To publish an update:

1. Review the source diff, build, run tests and check generated links.
2. Clone the existing `gh-pages` branch into a separate temporary checkout.
3. Synchronize `website/dist/` into that checkout, preserving `.git/` and removing obsolete generated files only.
4. Commit and push normally. Never force-push; if the remote advanced, fetch and inspect before retrying.
5. Check the `pages-build-deployment` workflow and the live homepage, a nested article, diagrams and PDF URL.

The initial website source is proposed in `feat/github-pages-portfolio`. Until its PR merges, use that source branch to rebuild the deployed website; rebuilding from an older `main` will omit the website files. No custom domain or repository visibility change is included.
