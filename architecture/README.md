# Architecture views

[Portfolio](../README.md) · [FlowDesk audit](../projects/flowdesk.md) · [Decision index](../adr/README.md)

## Implemented FlowDesk foundation

Repository-supported at `d4b7895e4722e565c32b62d2ee162f610e5bc59e`. This view describes local development, not a production topology. The business module boundaries are planned.

```mermaid
flowchart LR
    User[Browser user] --> SPA[Angular SPA and lazy dashboard]
    SPA --> Proxy[Angular development proxy]
    Proxy --> Info[Spring Boot info endpoint]
    Proxy --> Health[Actuator health endpoint]
    Health --> DB[(PostgreSQL 17)]
    Migration[Flyway V1 at startup] --> DB
```

The info endpoint returns static application/stage information; it does not query `app_users`. The health check reflects datasource availability. Flyway creates schema groundwork. There is no implemented business service, authentication boundary or deployed microservice network in this diagram.

Sources: [connection service](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/web/src/app/features/dashboard/system-status.service.ts), [API configuration](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/api/src/main/resources/application.yml), [local database setup](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docker-compose.yml).

## Proposed performance investigation

This diagram is an observation map for a future sanitized performance study. It is not the VNPT architecture or the current FlowDesk request path.

```mermaid
flowchart LR
    Load[Controlled offered load] --> API[API request and queue timing]
    API --> Pool[Connection acquisition timing]
    Pool --> SQL[Query and lock timing]
    API --> Dependency[Downstream timing if present]
    API -.-> Metrics[Correlated traces and metrics]
    Pool -.-> Metrics
    SQL -.-> Metrics
    Dependency -.-> Metrics
```

Measure where requests wait before changing queries, concurrency, pool limits or caching. See [backend case study](../case-studies/backend-api-performance.md).

## Proposed LLM workflow

Proposed for the [LLM case study](../case-studies/llm-application-integration.md); no public runtime implementation is claimed.

```mermaid
sequenceDiagram
    actor User
    participant App as Application service
    participant Auth as Authorization
    participant Data as Approved context source
    participant Model as Model adapter
    participant Check as Output validation
    User->>App: Request a draft
    App->>Auth: Check operation and context permissions
    alt Access allowed
        App->>Data: Read permitted context
        Data-->>App: Minimal scoped context
        App->>Model: Versioned prompt within deadline
        Model-->>App: Candidate output or provider failure
        App->>Check: Check schema and business constraints
        Check-->>App: Validated draft or bounded failure
        App-->>User: Reviewable draft or fallback state
    else Access denied
        App-->>User: Deny without model invocation
    end
```

User acceptance and persistence are separate: re-authorize when applying a draft. Context content and model output cannot change access policy. The context source may be direct records; RAG is optional and must have explicit evidence before being described as implemented.

Editable standalone Mermaid sources live in [assets/diagrams](../assets/diagrams/README.md). The Markdown views are canonical; synchronize sources if changing a diagram.
