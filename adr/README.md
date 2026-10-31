# Architecture decision index

[Portfolio](../README.md) · [Architecture](../architecture/README.md)

## Existing FlowDesk decisions

| Decision | Status in audited source | Reasoning and portfolio use |
|---|---|---|
| [ADR-0001: modular monolith](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/adr/0001-modular-monolith.md) | Accepted for initial architecture | Keep deployment, debugging and transactions simple at MVP scope. Review if measured scaling or ownership constraints justify extraction. Business module implementation is still future work. |
| [ADR-0002: identity/session lifecycle](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/docs/adr/0002-identity-session-lifecycle.md) | Proposed | Security-policy design and trade-offs; no runtime identity and no policy acceptance inferred from a merged document. |

## Portfolio editorial decision

**Status:** selected for this local documentation draft, 31 October 2026.

Use a concise profile entry point and a separate engineering evidence repository. Keep professional responsibilities candidate-confirmed, public code claims commit-pinned, and hypothetical techniques explicitly proposed. A single oversized profile would obscure the 60-second overview; publishing detailed employer claims without supporting material would mislead reviewers.

Consequence: some case studies remain incomplete and are labeled drafts. This is preferable to invented outcomes. The profile has a local case-study index and resume link; add the portfolio repository URL only after publication and access verification. Keep one canonical extended study per topic in this repository.

## Future ADR convention

Before adding a technical decision, record context, constraints, options, decision owner/status, consequences, evidence and a review trigger. Do not assign Accepted to a proposed application policy on the candidate's behalf. Link implementation and tests separately from the ADR.
