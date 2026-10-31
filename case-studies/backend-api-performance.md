# Improving Data Synchronization Across Microservices

[Portfolio](../README.md) · [Evidence](../evidence.md) · [Traceability](../traceability.md)

**Focus:** Backend performance investigation, service decoupling and asynchronous processing.

**Draft.** Based on candidate-confirmed professional experience at VNPT. The candidate confirmed the workflow, caching, trace analysis, index-usage checks, lifecycle review and the direction of decoupling/asynchronous processing. Production measurements and the exact deployed execution mechanism are not included. Section 7 describes proposed design responsibilities, not individually verified implementation claims.

## 1. Context

At VNPT Information Technology Center, I worked on APIs responsible for synchronizing or initializing multiple layers of application data in a microservices environment.

These workflows involved service-to-service communication and database operations. As traffic increased, the execution path encountered problems involving transaction handling, downstream rate limits and query behavior.

My responsibility was to investigate the bottlenecks, address implementation-level issues and determine whether the workflow required an architectural change.

## 2. Problem Statement

The challenge was to improve the behavior of a multi-service workflow under increased traffic.

Optimizing an individual API or query could address part of the problem, but the investigation also needed to consider how services depended on one another and how work was coordinated across the complete operation.

The architectural question was whether the workflow could continue within the existing interaction model or needed decoupling and asynchronous execution. The precise transaction failure mode and query-related root cause are not specified in this public account.

## 3. Technical Constraints

The solution needed to account for:

- Existing infrastructure and the team's ability to operate it.
- Downstream service capacity and rate limits.
- Dependencies between the data layers being initialized or synchronized.
- Transaction behavior and recovery from incomplete operations.
- The implementation and operational cost of introducing another processing mechanism.

Workload size influenced the decision, alongside reliability requirements and service ownership.

## 4. Investigation and Reasoning

I approached the problem incrementally.

First, I applied caching where appropriate. I then analyzed traces to locate bottlenecks across the execution path and prioritize corrective work.

At the database layer, I checked whether relevant indexes were actually being used. The existence of an index alone was insufficient to establish that it benefited the affected query.

I also reviewed the relevant code and its lifecycle behavior. This helped assess whether targeted implementation changes could address the problem before considering a broader redesign.

The investigation led to a focus on decoupling and asynchronous processing as the architectural direction.

## 5. Architecture / Design Options

| Option | Purpose | Main consideration |
|---|---|---|
| Caching and targeted query/code improvements | Address repeated work and localized bottlenecks | May leave service coordination constraints unresolved |
| Background jobs | Move suitable work outside the request path with lower infrastructure overhead | Requires appropriate persistence, concurrency and recovery behavior |
| Message broker | Separate producers and consumers across service boundaries | Adds messaging infrastructure and delivery-management responsibilities |

These options addressed different layers of the problem. Caching and query improvements could remain useful alongside an asynchronous workflow.

## 6. Selected Approach

I selected decoupling and asynchronous processing as the direction for reducing dependencies in the execution path.

The processing mechanism depended on the system's infrastructure and operational requirements. For moderate workloads, a background-job approach could provide sufficient separation without introducing a new messaging platform.

For larger workloads, or where services needed independent processing and scaling, a message broker became an option worth the additional operational cost.

The decision principle was to use the simplest mechanism that satisfied the workflow's requirements. Traffic volume alone did not determine the choice. This account describes the selection criteria; it does not claim that both mechanisms were deployed.

## 7. Implementation Details

### Solution design

The architectural direction separated request handling from longer-running synchronization or initialization work.

The following responsibilities define the proposed execution model; they should not be interpreted as individually verified implementation claims:

- **Work acceptance:** validate the operation and establish when it has been safely accepted.
- **Execution control:** bound concurrency according to downstream capacity.
- **Dependency management:** preserve ordering between dependent data layers while allowing independent work to run concurrently where appropriate.
- **Transaction ownership:** define local transaction boundaries and handle cross-service partial completion explicitly.
- **Recovery:** distinguish retryable failures from permanent failures and prevent unintended duplicate effects.
- **Visibility:** expose operation status and correlate request handling with background execution.

Moving work to an asynchronous path changes where requests wait. It still requires explicit capacity and failure management.

No employer code, private topology or production configuration is included. FlowDesk is a separate personal project and is not evidence of this production implementation.

## 8. Trade-offs

Background jobs can reduce infrastructure overhead, but their reliability depends on the job mechanism's persistence and recovery capabilities.

A message broker can support stronger operational separation between services, while introducing concerns such as acknowledgement, redelivery, duplicate processing and consumer monitoring.

Both approaches introduce a distinction between accepting an operation and completing it. Callers may need progress reporting and clear failure states.

Caching also introduces freshness and invalidation considerations. Its role must remain compatible with the correctness requirements of synchronization and initialization.

## 9. Validation and Evaluation

Trace analysis and index-usage checks were part of my investigation. No quantitative before-and-after results are available for this public case study.

A complete evaluation should compare equivalent workloads and distinguish API response time from end-to-end operation completion time.

Relevant observations include:

- Completed operations and pending-work age.
- Downstream rate-limit responses and transaction-related failures.
- Database query duration and connection contention.
- Retry volume and duplicate processing.
- Recovery after interruption or a traffic spike.
- Correctness of partially completed and repeated operations.

An improvement in request response time alone would not establish that the overall workflow had become faster or more reliable. These are evaluation requirements, not reported production results.

## 10. Lessons Learned

The experience reinforced an incremental approach to architectural decisions: apply suitable caching, inspect traces, verify query and index behavior, and review code lifecycle before determining the scope of change.

Decoupling and asynchronous processing became the architectural direction after examining those layers.

The key judgment was selecting an execution model that matched the existing infrastructure, workload and recovery requirements. Background jobs and message brokers represented different operational choices, with different costs and responsibilities.
