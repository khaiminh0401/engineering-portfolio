# Resume-to-portfolio traceability

[Portfolio](README.md) · [Evidence labels](evidence.md) · [Resume](resume.md)

Professional claims below come from the candidate's supplied brief. “Candidate-confirmed” is not independent code or employment verification. Proposed documentation demonstrates reasoning, not proof that its design was implemented.

| Resume claim | Portfolio evidence | Repository/file | Evidence status | Missing information |
|---|---|---|---|---|
| Backend API optimization | [Backend study](case-studies/backend-api-performance.md) | engineering-portfolio/case-studies/backend-api-performance.md | Candidate-confirmed scope; proposed method | Actual operation, intervention, baseline and result |
| Performance troubleshooting | [Investigation and reasoning](case-studies/backend-api-performance.md#4-investigation-and-reasoning) | Same study, section 4 | Candidate-confirmed scope; no incident evidence | Sanitized traces, hypotheses, root cause, personal ownership |
| Handling high-traffic workloads | [Validation protocol](case-studies/backend-api-performance.md#9-validation-and-evaluation) | Same study, section 9 | Candidate-confirmed scope; workload unquantified | Offered/completed rates, workload mix, tail latency, recovery |
| Frontend rendering optimization | [Angular study](case-studies/angular-rendering-performance.md) | engineering-portfolio/case-studies/angular-rendering-performance.md; FlowDesk routes/component cited there | Candidate-confirmed scope; lazy routes/state handling source-backed separately | Production change, profiles, device/network and before/after results |
| Enterprise application development | [Resume](resume.md#professional-experience) | engineering-portfolio/resume.md | Candidate-confirmed employment/responsibilities | Sanitized system scope, delivery ownership and examples |
| Software architecture | [FlowDesk audit](projects/flowdesk.md), [ADR index](adr/README.md) | FlowDesk docs/adr/0001-modular-monolith.md; engineering-portfolio/projects/flowdesk.md | Public accepted initial decision; actual runtime foundation inspected | Implemented business modules and enforcement of boundaries |
| Distributed systems | [Professional scope](resume.md#technical-scope) | engineering-portfolio/resume.md | Candidate-confirmed broad microservice/messaging context; FlowDesk is one API deployable | Owned service boundary, delivery semantics, failure/recovery example |
| LLM integration | [LLM study](case-studies/llm-application-integration.md) | engineering-portfolio/case-studies/llm-application-integration.md | Candidate-confirmed content/context integration; proposed controls | Actual provider/workflow, validation, authorization, fallback and eval evidence |
| AI-assisted software engineering | [Declared exploration](resume.md#technical-scope) | engineering-portfolio/resume.md | Declared skill/exploration; this documentation task is not proof of production practice | Sanitized task, agent boundaries, accepted diff, human review and verification record |
| Database correctness and API contracts | [FlowDesk tests and contract](projects/flowdesk.md#testing-strategy-and-verification-limits) | FlowDesk FoundationIT.java, InfoControllerTest.java, docs/api/openapi.yaml | Repository-supported tests; recorded successful CI | Independent rerun if needed; business transaction tests are future work |
| Kubernetes/RKE2 and observability | [Technical scope](resume.md#technical-scope) | engineering-portfolio/resume.md | Declared tools within broad candidate-confirmed infrastructure context | Exact ownership, sanitized configuration and monitoring example |
| RAG, LangChain4j, Vertex AI, structured output | [LLM evidence boundary](case-studies/llm-application-integration.md) | engineering-portfolio/case-studies/llm-application-integration.md | Declared skills/exploration; not verified implementation | Reproducible personal example or confirmed professional detail |

## Wording rule

Keep “optimized APIs” as candidate-confirmed responsibility, without invented percentages or traffic figures. Do not replace it with a specific query/pool/cache intervention until confirmed. Describe FlowDesk's source-backed foundation precisely; do not use it as evidence of production scale, microservice operation, LLM quality or delivered authentication.
