# Publication and maintenance notes

The initial documentation bundle was prepared locally on 31 October 2026. The candidate subsequently authorized pushing it to GitHub.

## Repository layout

- **[Engineering portfolio](https://github.com/khaiminh0401/engineering-portfolio)**: documentation, case-study drafts, evidence ledger, architecture and resume. The initial publication uses `main`; subsequent changes should use focused documentation branches.
- **[GitHub profile](https://github.com/khaiminh0401/khaiminh0401)**: concise README, resume and a case-study index. This update is prepared on `docs/engineering-portfolio-2026-10-31` against `master`; review its PR before merging.
- **[FlowDesk](https://github.com/khaiminh0401/flowdesk)**: audited read-only. No application or documentation changes are part of this portfolio publication.

## Publication verification

Verify the remote branch head equals the local commit after each push. Check the portfolio README, all three case studies and resume URLs before adding them to the profile. Keep the profile PR unmerged until accepted. The GitHub Pages follow-up publishes the verified static website from `gh-pages`; no custom domain is configured. See the website source guide for build and update instructions.

## Content maintenance

Keep case studies labeled Draft until the missing professional facts and validation artifacts are supplied. Use immutable source citations and distinguish proposed controls from implemented behavior. Update the resume copies together. Before publishing personal contact information or further employer details, use only candidate-approved content.

The original audit records the preparation checkpoint. Its initial 404 and stale FlowDesk handoff findings are historical discovery facts, not a live repository status monitor. The ZIP is a content snapshot excluding Git internals; the local directories retain Git state.

## GitHub Pages follow-up

Website source is developed on `feat/github-pages-portfolio` and proposed through a PR. Reviewed build output is published separately to `gh-pages` without automatically merging source changes. The website presents the existing Markdown case studies and reviewed PDF at https://khaiminh0401.github.io/engineering-portfolio/.
