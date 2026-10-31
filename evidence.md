# Evidence registry

[Portfolio](README.md) · [Traceability](traceability.md)

Audit date: 31 October 2026, Asia/Ho_Chi_Minh. Repository evidence is pinned to a commit so later changes cannot silently change the basis of a claim.

## Evidence labels

- **Candidate-confirmed professional experience:** stated in the supplied master brief. This is the confirmed account available for writing, not independent employment verification or public source proof.
- **Repository-supported implementation:** source/configuration/tests inspected at the pinned commit. Test presence is distinct from execution evidence.
- **Recorded CI result:** GitHub reports a completed successful workflow on that commit; not a fresh local rerun.
- **Reconstructed example:** a synthetic teaching example; not production code. No production incident is reconstructed here.
- **Proposed architecture / validation:** recommended design or experiment, not evidence of implementation or measured results.
- **Future improvement / missing evidence:** work still required before a stronger claim can be made.

## Source ledger

| ID | Source | Supported scope | Limits |
|---|---|---|---|
| P1 | Candidate's supplied master brief | Name, contact, employers, dates, education, broad responsibilities and declared skills | No original resume, incident timeline, code, dashboards or benchmark artifacts supplied |
| R1 | [FlowDesk tree](https://github.com/khaiminh0401/flowdesk/tree/d4b7895e4722e565c32b62d2ee162f610e5bc59e) | Complete inspected tree; Java/Angular foundation, docs and tooling | Personal project; no employer implementation evidence |
| R2 | [API build](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/api/pom.xml) | Java 21, Spring Boot 3.5.7, PostgreSQL/Flyway, test setup | Dependencies do not prove deployed behavior |
| R3 | [Info controller](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/api/src/main/java/io/flowdesk/shared/api/InfoController.java) and [implemented API contract](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/api/openapi.yaml) | Info endpoint and documented health contract | No application authentication or business APIs |
| R4 | [V1 migration](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/api/src/main/resources/db/migration/V1__create_identity_schema.sql) and [database integration test](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/api/src/test/java/io/flowdesk/FoundationIT.java) | User table groundwork and constraint/HTTP tests | No password/session schema or JPA entity mappings |
| R5 | [Angular bootstrap](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/src/main.ts) and [routes](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/src/app/app.routes.ts) | Explicit zoneless providers and lazy dashboard | No SSR/hydration implementation evidenced |
| R6 | [connection service](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/src/app/features/dashboard/system-status.service.ts) and [component](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/src/app/features/dashboard/system-status.component.ts) | Unknown-payload validation, health check, timeout, signals, cancellation and bounded error/retry UX | No benchmark or rendering improvement measurement |
| R7 | [Angular build configuration](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/angular.json) and [package manifest](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/package.json) | Angular 20, production optimization and bundle budgets | Configured thresholds are not observed bundle size |
| R8 | [Playwright scenarios](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/e2e/connectivity.spec.ts) and [CI workflow](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/.github/workflows/ci.yml) | Connectivity/failure/mobile checks and defined CI gates | No load, tenant isolation or product-authentication proof |
| R9 | [ADR-0001](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/adr/0001-modular-monolith.md) | Accepted initial modular-monolith choice and trade-offs | Intended business boundaries are not implemented domains |
| R10 | [ADR-0002](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/adr/0002-identity-session-lifecycle.md) | Proposed identity/session security policy | Merged documentation does not prove policy approval or runtime implementation |
| G1 | [PR #19](https://github.com/khaiminh0401/flowdesk/pull/19) | Closed and merged on 30 October 2026 into `d4b7895e4722e565c32b62d2ee162f610e5bc59e` | Supersedes stale unmerged language in handoff documents |
| G2 | [CI run 41016120486](https://github.com/khaiminh0401/flowdesk/actions/runs/41016120486) | GitHub API reports completed / success on `d4b7895e4722e565c32b62d2ee162f610e5bc59e` | Job logs and numerical test totals not independently audited here; no local application test rerun |
| H1 | [Existing profile README](https://github.com/khaiminh0401/khaiminh0401/blob/b3df7d8242c1aa8ba1842dfb8e7d5aa924e9e1c4/README.md) | Reusable positioning and prior project references | Prior claims were not adopted as fresh evidence without rechecking |

## Reconciliation

FlowDesk `main` is `d4b7895e4722e565c32b62d2ee162f610e5bc59e`. PR #19 is merged. Its CURRENT-STATE and roadmap still describe an earlier unmerged state; live API metadata takes precedence for merge status. ADR-0002 still says Proposed, and the source tree has no identity runtime. A merge is not evidence of implemented authentication or recorded security-policy approval.

The profile repository exists on `master` at `b3df7d8242c1aa8ba1842dfb8e7d5aa924e9e1c4`; remote branches include `docs/full-stack-profile-rebrand`. FlowDesk branches inspected: `main`, `docs/FD-009-identity-session-design`, `feat/FD-008-project-brain-api-connectivity`, `fix/FD-005-sprint0-audit-hardening`. Non-main branches were inventoried, not audited as shipping features.

`engineering-portfolio` returned GitHub 404. Treat it as absent or inaccessible, not definitively nonexistent. Owner-filtered connector repository listing returned no entries despite successful direct reads; it is not an authoritative inventory. No local FlowDesk/profile/portfolio checkout was found in the inspected Documents, Projects, Developer and Code locations. Other local repositories were inventoried only for remotes/status and left unchanged; internal source was not used for public content.

## Maintenance rule

For each new claim, record source, commit/date, inspected behavior, validation result and limits. Before describing a planned feature as implemented, inspect its runtime code and relevant tests. Keep proposed designs labeled even after their documents merge. Re-audit moving refs before release.
