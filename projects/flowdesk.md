# FlowDesk — source-backed project description

[Portfolio](../README.md) · [Evidence registry](../evidence.md)

**Personal project, in development.** Audited `main` at `d4b7895e4722e565c32b62d2ee162f610e5bc59e` on 31 October 2026.

## Overview and stack

FlowDesk aims to become a workspace and workflow management application. The current implementation establishes engineering foundations and a live connection view; it does not yet implement the advertised business workflows.

| Layer | Verified foundation | Source |
|---|---|---|
| Backend | Java 21, Spring Boot 3.5.7, Maven, Web/Actuator/JPA dependencies | [pom.xml](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/api/pom.xml) |
| Frontend | Angular 20.3 dependency range, TypeScript 5.9, standalone SPA, zoneless providers, lazy dashboard, signals/RxJS | [manifest](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/package.json), [bootstrap](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/src/main.ts), [routes](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/src/app/app.routes.ts) |
| Data | PostgreSQL 17, Flyway V1, SQL constraints | [Compose](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docker-compose.yml), [migration](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/api/src/main/resources/db/migration/V1__create_identity_schema.sql) |
| Checks | JUnit/Spring MVC, PostgreSQL Testcontainers, Karma/Jasmine, Playwright, Python tooling tests, GitHub Actions | [workflow](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/.github/workflows/ci.yml) |

## Architecture and module boundaries

One Spring Boot API deployable, one Angular SPA and one PostgreSQL database form the starting modular-monolith architecture. Current backend runtime contains the application entry point and `shared.api` info endpoint. Business modules `identity`, `workspace`, `project`, `task`, `approval` and `audit` are proposed boundaries, not implemented packages. The frontend has a shell and `features/dashboard`. See [diagram and boundary notes](../architecture/README.md) and [ADR-0001](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/adr/0001-modular-monolith.md).

## Authentication and authorization

No application authentication, session lifecycle, refresh rotation, workspace RBAC or tenant isolation is implemented at this commit. [ADR-0002](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/adr/0002-identity-session-lifecycle.md), the [proposed identity contract](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/api/identity-session.proposed.json), [threat model](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/security/identity-threat-model.md) and [acceptance scenarios](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/security/identity-acceptance.md) are design artifacts. Their presence and merge do not prove runtime enforcement or human approval of all policy choices. Python probe mechanics are tooling, not application security tests.

## Database design

V1 creates `app_users`: UUID primary key, unique non-null `email` (255), non-null `display_name` (150), and non-null `created_at` timestamp with time zone defaulting to `NOW()`. There is no password column, session table, workspace schema, user API or JPA entity. Hibernate `ddl-auto=validate` is configured, but without entities it cannot validate this table against an ORM mapping. Integration tests exercise SQL constraints directly. Future schema changes need new migrations.

## API contracts and UI behavior

- `GET /api/v1/info` returns application `FlowDesk` and stage `sprint-0`; implemented by [InfoController](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/api/src/main/java/io/flowdesk/shared/api/InfoController.java).
- `GET /actuator/health` provides the health status; configuration exposes health/info. The dashboard requires health `UP` and valid non-empty info strings before showing connected.
- [openapi.yaml](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/api/openapi.yaml) describes the implemented API. The separate identity proposal is not a list of available endpoints.
- The connection service joins info and health requests with a five-second timeout. The component uses signal-based loading/ready/error states, cancels a preceding subscription, cleans up on destruction, disables the button while loading and provides a safe retry message.

No task/project API, pagination workflow, workload caching, message broker or LLM integration was found in the runtime tree.

## Testing strategy and verification limits

Controller tests isolate the info contract. `FoundationIT` starts a real PostgreSQL 17 Testcontainer and exercises Boot, HTTP, Flyway and SQL constraints. Angular tests cover the shell, routing and connection boundary. Playwright includes live proxy/API/database connectivity, safe error/retry, malformed response and mobile viewport scenarios; named failure cases intercept the network boundary.

The [test strategy](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/engineering/TEST-STRATEGY.md) separates these scopes. [CI run 41016120486](https://github.com/khaiminh0401/flowdesk/actions/runs/41016120486) reports success on the audited commit. This portfolio task inspected source and workflow status; it did not rerun the application suites or independently inspect all job logs. No coverage, load capacity, performance gain or security assurance is inferred.

## Development workflow

The [project README](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/README.md) documents Java 21/Maven 3.9+, Node 22.12+ within 22.x, Chrome and Docker requirements; trusted local environment configuration; Compose database startup; backend/frontend startup; Maven verify; frontend lint/unit/production build; and live Playwright checks. CI has API, web and E2E jobs. Compose is local database infrastructure, not evidence of containerized application deployment or Kubernetes hosting.

## Implementation status

| State | Scope |
|---|---|
| Implemented | Info/health foundation, Angular shell/lazy dashboard, validated connection UX, Flyway V1, tests and CI |
| Design-stage work | Identity/session proposal, threat model, acceptance scenarios and probe tooling merged through PR #19; runtime remains absent |
| Planned | Authentication, workspace RBAC/management, projects/tasks/Kanban, approvals/audit, measured performance, deployment and observability |

No currently active implementation branch is inferred from stale handoff notes. [PR #19](https://github.com/khaiminh0401/flowdesk/pull/19) merged on 30 October 2026; CURRENT-STATE and roadmap still describe an earlier state.

## Planned milestones and decisions

[The roadmap](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/engineering/PRODUCT-ROADMAP.md) orders M1 identity/workspace, M2 projects/tasks, M3 approval/concurrency/audit, M4 broader quality and measured performance, M5 deployment/observability, and M6 portfolio release. These are planned scopes, not delivery promises. Reconcile the stale status before using the roadmap operationally.

ADR-0001 accepts a modular monolith to reduce deployment and consistency complexity at the current scope. Independent service scaling is a trade-off; package boundaries need discipline as domains arrive. ADR-0002 remains Proposed. See the [decision index](../adr/README.md).

## Interview walkthrough

Start with the info contract, follow the Angular service's unknown-payload validation into explicit UI states, then inspect the PostgreSQL constraint tests. Explain why the architecture starts with a monolith and why identity design is not yet a delivered authentication feature. These are concrete reviewable examples; production traffic handling remains a separate candidate-confirmed experience claim.
