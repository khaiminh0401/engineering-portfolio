# Final portfolio audit

[Portfolio](README.md) · [Evidence registry](evidence.md) · [Traceability](traceability.md) · [Backlog](BACKLOG.md)

Prepared 31 October 2026 for DAO KHAI MINH, targeting Middle Full-Stack Software Engineer roles with Java, Spring Boot and Angular.

## Outcome and scope

Prepared the profile README, a separate engineering portfolio, three ten-section case-study drafts, an audited FlowDesk description, three architecture diagrams, a resume-to-evidence matrix, a reusable template and an improvement backlog. Professional details unavailable in the brief remain explicitly unverified or missing. No FlowDesk application code or documentation was modified. At the initial documentation-delivery checkpoint, no remote repository had been changed and nothing had been pushed, merged, published or made public. The candidate subsequently authorized pushing the portfolio to GitHub; that follow-up publishes the portfolio and opens the profile update for review without merging it.

## Files created or modified

The existing profile repository was cloned into the delivery directory. Only its README was replaced after reviewing the original; the original remains available in local Git history at base `b3df7d8242c1aa8ba1842dfb8e7d5aa924e9e1c4`.

```text
khaiminh0401/
  README.md                         modified: concise professional profile
  case-studies.md                    created: case-study index and evidence limits
  resume.md                          created: candidate-brief-based resume draft

engineering-portfolio/
  README.md                         created: 60-second navigation and positioning
  resume.md                          created: same resume draft for standalone use
  evidence.md                        created: source ledger and evidence labels
  traceability.md                    created: resume claim mapping
  BACKLOG.md                         created: prioritized evidence/publication work
  AUDIT.md                           created: this report
  PUBLISHING.md                      created: local review and publication sequence
  case-studies/
    backend-api-performance.md       created: ten-section draft
    angular-rendering-performance.md created: ten-section draft
    llm-application-integration.md   created: ten-section draft
  projects/
    flowdesk.md                      created: commit-pinned implementation audit
  architecture/
    README.md                        created: three Mermaid architecture views
  adr/
    README.md                        created: decision index and editorial rationale
  assets/diagrams/
    README.md                        created: diagram index
    flowdesk-foundation.mmd          created: implemented local foundation
    performance-investigation.mmd   created: proposed observation map
    llm-workflow.mmd                 created: proposed workflow
  templates/
    case-study-template.md           created: reusable structure/evidence checklist
```

Delivery-level files include the bundle README, publication notes, validation results, checksum manifest and ZIP snapshot. Git internals are excluded from the ZIP. Scratch evidence, source snapshots, scripts and the implementation plan are kept outside the deliverable repositories.

## Discovery and evidence used

- Reviewed the supplied master brief for candidate facts, responsibilities and requirements. No original resume/PDF was supplied at initial discovery; see the CV follow-up below.
- Inspected the initially empty working directory and searched conventional Documents, Projects, Developer and Code locations for local Git repositories. Inventoried other repositories' remotes/status without modifying them or using their internal source.
- Reviewed prior local profile material and the current public profile README; inspected the profile's remote branches and cloned the existing repository for a local documentation branch.
- Read FlowDesk repository metadata, all paths in the recursive main tree, branch metadata, build/configuration, runtime API and Angular source, migration, tests, CI definition, architecture, ADRs, current-state notes and roadmap.
- Checked live PR #19 and main-commit metadata. PR #19 merged on 30 October 2026 into `d4b7895e4722e565c32b62d2ee162f610e5bc59e`. Handoff notes describing it as unmerged are stale. The identity/session design remains Proposed and no runtime authentication is present.
- Checked GitHub workflow metadata: run 41016120486 completed successfully on the audited main commit. No current local application test run, independent numerical test-count verification or benchmark is claimed.
- `engineering-portfolio` returned 404 through the GitHub connector. It may be absent or inaccessible; the local repository has no remote.

The [source ledger](evidence.md) provides immutable citations and limitations for each evidence category.

## Assumptions

- The supplied candidate facts and broad responsibilities are accurate statements by the candidate; independent verification was outside this task.
- “Present” means current as of 31 October 2026, including VNPT employment and university study.
- A Markdown resume based on the brief is useful until an approved original/PDF is provided. Birth year was not included in public positioning because it is unnecessary to establish engineering competence; it was not changed or inferred.
- Skills not explicitly tied to a demonstrated implementation are described as declared skills/exploration. Named infrastructure tools are not presented as proof of deployment ownership.
- Missing professional specifics are better represented as draft gaps than reconstructed accomplishments.

## Unsupported claims avoided

No invented traffic volumes, latency/throughput gains, rendering improvements, Core Web Vitals results, business outcomes or production incidents. No claim that FlowDesk implements authentication, RBAC, workflow modules, a cache/broker, RAG/LLM integration, microservice deployment, Kubernetes hosting or production observability. No suggestion that merged security documentation means runtime enforcement, policy approval or successful security acceptance. Configured bundle budgets and timeouts are labeled settings, not observed performance results. Existing CI metadata is distinct from fresh local application verification.

## Quality review

| Perspective | Review outcome | Remaining limit |
|---|---|---|
| Technical recruiter | Headline, specialization, employment context, featured project, resume and contact are immediately visible | Exact personal impact needs stronger evidence |
| Middle/senior engineer | Source-backed behavior is linked; case studies address constraints, alternatives, trade-offs and validation | Studies are proposed technical drafts where professional details are missing |
| Software architect | Modular-monolith scope, module maturity and security proposal status are explicit; diagrams separate current and proposed views | Planned boundaries have no implemented business-domain enforcement yet |
| Hiring manager | Production experience is separated from personal code; evidence matrix shows strengths and gaps | No independently verified production outcome or quantified impact is available |

These are editorial review perspectives applied in this task, not claims of independent human or multi-agent review.

## Verification record

- Local Markdown destinations and heading fragments are checked, including independent navigation inside each repository.
- FlowDesk source citations are checked against the live recursive tree at the pinned commit. Repository, commit, PR and CI destinations were checked through the GitHub connector. Profile source history is also present in the local clone. Link validation uses resource metadata/path existence rather than a blanket browser crawl of every repeated URL.
- Contact email identity and syntax are checked; delivery was not tested. Phone, employer dates, education and role wording were compared to the supplied brief.
- All three case studies contain the required ten sections and explicit draft/evidence boundaries. Resume copies are checked for equality.
- Code fences, whitespace and credential-like patterns are checked. Manual review found no confidential employer source, customer data, infrastructure topology or local filesystem paths in the deliverables.
- Mermaid diagrams are checked separately with the Mermaid parser. Rendering depends on the destination viewer; no visual layout guarantee is inferred from parsing.
- Git review confirms a documentation branch for the existing profile and a new local portfolio repository. Application source changes and remote writes are outside the performed scope.

Exact final counts and parser results are recorded in the delivery-level validation report. Application suites were not rerun because this task changes documentation only; recorded upstream CI is cited with that limitation.

## Missing information and remaining TODOs

1. Backend follow-up now confirms the operation and investigation approach. Remaining gaps: precise failure mechanism, deployed async mechanism, safe implementation artifacts, baseline/candidate evidence and recovery verification.
2. One Angular optimization: user journey, original implementation, actual technique, trace, device/network and before/after observations.
3. Actual LLM workflow and responsibilities: safe provider/framework details, context authorization, output checks, fallback and evaluation evidence. Do not infer RAG or a particular framework.
4. A concrete AI-assisted engineering example with task boundaries, reviewed diff and verification record.
5. Original CV was subsequently supplied and reviewed; the corrected derivative is attached. Exact production ownership for skills listed without an experience example remains to be confirmed.
6. Publication was subsequently authorized by the candidate. Recheck repository access and validate the live portfolio URLs during that follow-up; profile changes remain subject to PR review.
7. Separate FlowDesk follow-up to reconcile stale handoff/roadmap merge status; no changes made in that repository.

## Recommended next actions

Review the generated profile and resume first. Supply safe facts for the three P0 evidence items in the [backlog](BACKLOG.md), then convert only the supported sections into retrospectives. Publication was subsequently authorized. Publish the portfolio and update the profile to its verified live links through a feature-branch review; do not merge the profile automatically. Keep proposed security and future application work separate from portfolio publication.

## Backend case-study follow-up — 31 October 2026

The candidate supplied and approved a more concrete account of multi-layer data synchronization/initialization across microservices. Updated the backend case study, portfolio index, source ledger, traceability and backlog to reflect confirmed caching, trace analysis, index-usage checks, lifecycle review and the direction of asynchronous decoupling. Background jobs versus message brokers are selection criteria based on infrastructure, workload and operational requirements; neither is asserted as the specific deployed mechanism. Section 7 explicitly labels its execution responsibilities as proposed. No metric, specific broker/cache technology, recovery guarantee or production outcome was invented. The other case studies and FlowDesk remain unchanged.

## Reviewed CV follow-up — 31 October 2026

The candidate supplied a reviewed one-page PDF and authorized correcting the FlowDesk wording and adding the PDF to the portfolio. Added `assets/resume/Dao_Khai_Minh_Resume_2026.pdf` and linked it from the portfolio and resume overview. The only visible CV change is the FlowDesk paragraph: API connectivity, PostgreSQL/Flyway groundwork and automated tests are implemented; authentication and workspace RBAC are planned at the audited commit. Added a link from the FlowDesk heading to its public repository. The original file remains unchanged.

Aligned the resume overview, Angular case-study evidence boundary, traceability and source ledger with the CV's professional Angular SSR/client optimization, .NET APIs and infrastructure-support responsibilities. Kafka, Redis, Spring Security and other skills listed without a specific professional example remain declared skills; none is inferred as the mechanism used in the backend case study.

PDF verification: one page, matching body font, visual render inspected for clipping/overlap, revised paragraph extractable as text, all text outside that paragraph unchanged, and source SHA-256 unchanged (`16a00e4e8677d0b21f2d48f75597de21a967c717d069aaa12628d9dda1c2ed15`). The embedded subset font could not encode replacement text; the full matching Noto Serif font was used for the replacement. No website or GitHub Pages configuration is included in this CV update.

## GitHub Pages follow-up — 31 October 2026

Added a static website generated from canonical Markdown, a curated English homepage, article contents/navigation, reviewed PDF download, responsive menu, local Mermaid rendering, custom 404, sitemap and robots metadata. Source lives in `website/` on a feature branch; verified build output is published on `gh-pages`, with no source-PR auto-merge. GitHub Actions checks source PRs and main builds.

The site preserves candidate-confirmed/proposed/implemented evidence boundaries and does not introduce metrics, testimonials or additional project capabilities. Desktop and mobile browser inspection found no body overflow; mobile navigation and all three architecture diagrams were checked. Renderer tests cover nested project-prefix links, README index routes, anchors/static resources and heading fragments. The generated-link checker checks all HTML pages, assets and fragments. The reviewed PDF is copied byte-for-byte into the site.

Dependency audit reported zero known vulnerabilities at implementation time; this is not a permanent security guarantee. Mermaid browser modules are self-hosted and loaded only on diagram pages. No analytics, form backend, tracking service, custom domain or external font dependency is included.
