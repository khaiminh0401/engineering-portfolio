# Integrating LLM capabilities into application workflows

[Portfolio](../README.md) · [Evidence](../evidence.md) · [Traceability](../traceability.md)

**Draft.** Candidate-confirmed professional experience: LLM-powered content generation and context-aware application workflows at VNPT. No provider configuration, prompt version, source code, evaluation set or production architecture was supplied. The design below is proposed; it is not a description of an undisclosed employer system. RAG, LangChain4j, Vertex AI and structured output are declared skills, not confirmed components of this integration. FlowDesk has no LLM runtime at the audited commit.

## 1. Context

Content generation becomes useful when it fits the application's permissions, context and review workflow. My confirmed experience includes integrating these capabilities into enterprise applications. The brief does not establish whether outputs were suggestions, drafts or automatic writes; that decision remains a missing fact.

## 2. Problem Statement

An LLM call alone does not resolve which context a user may access, which workflow is permitted, how output is checked or how the application behaves when the provider fails. A useful integration must preserve deterministic application rules around probabilistic output. The proposed problem is reliable draft generation with authorized context; no specific incident or historical failure is invented.

## 3. Technical Constraints

For the proposed design, enforce user and workspace access before retrieving context, minimize data sent externally and treat retrieved text as untrusted input. Agree provider/data policy, response-time and cost budgets, output schema and review requirements. Missing facts include actual authorization rules, provider, retention controls, language mix, output use and ownership of the original implementation.

## 4. Investigation and Reasoning

Map the workflow first: user intent, authorized records, permissible operation, generated artifact and acceptance decision. Distinguish context selection from authorization; inferred intent must not broaden privileges. Determine whether direct record context is sufficient before adding retrieval infrastructure. If intent is ambiguous, return a bounded clarification rather than selecting a privileged route.

Identify output failure modes: invalid format, unsupported assertions, unsafe references, refusal, provider timeout and truncated responses. Define which can be retried, which require review and which must stop. No production frequency or impact is available for these categories.

## 5. Architecture / Design Options

| Option | Advantage | Cost or risk |
|---|---|---|
| Direct generation from explicitly selected records | Small, inspectable context path | Limited coverage; still needs validation |
| Authorized retrieval/RAG | Can use a larger relevant corpus | Index freshness, permission filters and retrieval evaluation |
| Tool-capable agent | Flexible multi-step workflows | Broader action surface and harder evaluation; every tool needs server-side authorization |
| Deterministic template | Predictable format and low latency | Less flexible language and content |

## 6. Selected Approach

For the proposed draft-generation example, use deterministic application routing, authorized context assembly, a versioned prompt and a model adapter behind an application service. Return a validated draft for user review. Keep persistence in the application's transactional path; model output cannot grant permissions or trigger unreviewed state changes. This is a design recommendation, not a claim that this exact approach was deployed at VNPT.

See the [proposed architecture diagram](../architecture/README.md#proposed-llm-workflow).

## 7. Implementation Details

Proposed request path: authenticate; authorize the operation and source records; assemble minimal context; invoke the provider within a deadline; validate the response; return a draft or a stable error/fallback state. Recheck authorization when applying an accepted draft, since permissions may change between generation and persistence.

Track prompt template version, provider/model configuration and validation version with each evaluation. Parse generated output at the boundary and validate required fields, lengths, enums, referenced IDs and business invariants. Syntactically valid JSON does not prove factual correctness. Treat model-provided IDs as untrusted and resolve them against allowed records. Structured-output provider features may help formatting but do not replace application validation.

Bound retries to transient failures within an end-to-end budget. Do not repeatedly send sensitive context on schema failures without a deliberate policy. Use idempotency for durable side effects if retries can repeat them. Fallback may preserve a manual editor or a deterministic template; it should not silently present fabricated “successful” content. Logs should contain safe correlation IDs, timing, usage and validation categories, not raw sensitive prompts by default.

No production prompt, credentials, customer document or internal topology is included. No public implementation is offered as proof of these proposed controls.

## 8. Trade-offs

Review before persistence adds friction but makes uncertainty visible. Direct context is simpler than RAG but may omit relevant information. Retrieval adds operational and permission complexity; a high retrieval score does not establish access rights. Strict validation rejects some otherwise useful responses but protects contracts. Retries improve availability for transient faults while increasing time and cost. An agent may help a complex workflow but is unjustified for a single bounded draft request without supporting evidence.

## 9. Validation and Evaluation

Proposed evaluation set: permitted requests, cross-workspace denials, empty/stale context, ambiguous intent, malicious instructions in retrieved text, malformed/truncated output, invalid record references, provider errors/timeouts, cancellation and duplicate submissions. Use synthetic or approved sanitized data and pin prompt/model settings.

Evaluate schema acceptance, factual support in provided context, task usefulness by a human rubric, denied-context leakage, fallback correctness, latency distribution and usage/cost per accepted draft. Compare with a deterministic template/manual baseline. Repeat stochastic evaluations and record sample count and reviewer disagreement. Validate that revoked permissions prevent applying a previously generated draft.

No results or target percentages were supplied. Missing evidence includes actual request lifecycle, authorization enforcement, prompt versioning, output validation, fallback behavior, evaluation cases and measured production reliability. Public FlowDesk CI is unrelated to LLM quality.

## 10. Lessons Learned

The design illustrates that application boundaries own authorization, workflow state and acceptance, while the model supplies a candidate output. This is a proposed engineering principle. A personal retrospective still needs the actual integration decision, an observed failure, what changed after evaluation and the remaining limits. The supported professional claim remains content-generation and context-aware workflow integration as stated by the candidate.
