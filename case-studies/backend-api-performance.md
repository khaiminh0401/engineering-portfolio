# Backend API performance under variable load

[Portfolio](../README.md) · [Evidence](../evidence.md) · [Traceability](../traceability.md)

**Draft.** Candidate-confirmed scope: backend API optimization, production bottleneck investigation and unexpected traffic spikes at VNPT. No sanitized incident, exact intervention, workload or measured result was supplied. Sections 3–9 describe a proposed investigation and validation method, not a claim that every technique was used professionally. FlowDesk supports only the narrow implementation references in section 7.

## 1. Context

Enterprise APIs must remain usable as traffic varies. My confirmed experience includes optimizing APIs against traffic behavior and throughput requirements. A publishable incident account still needs the affected operation, my ownership, approximate system boundaries and a safe timeline.

## 2. Problem Statement

The investigation question is where request time and capacity are consumed during a spike. High latency alone cannot identify whether the limiting resource is SQL execution, connection acquisition, CPU, locks, downstream calls or a growing queue. The brief confirms troubleshooting work, but does not identify a specific root cause or reliability incident.

## 3. Technical Constraints

For a proposed investigation, preserve correctness, authorization and transaction boundaries; agree on available database capacity, upstream request budgets and permitted rollout risk. Production data and internal topology must remain private. Missing constraints include workload mix, deployment count, database limits and service objectives. No pool size or cache policy should be recommended as a universal value.

## 4. Investigation and Reasoning

Start with request rate, successful completion rate, error rate, p50/p95/p99 latency and in-flight work, segmented by endpoint and time window. Compare client, server and downstream timing to locate queueing. Correlate traces with CPU, memory/GC, thread usage, database query duration, lock waits and connection acquisition time. Distinguish slow SQL from time waiting to acquire a connection.

Inspect representative query plans on safe data and check query counts per request. Confirm whether saturation is sustained or follows a burst. A larger pool can amplify contention when the database is already saturated; a cache cannot repair incorrect access scoping. The output should be a falsifiable hypothesis, such as “connection wait dominates tail latency,” with evidence that could disprove it. No such hypothesis is asserted as the actual VNPT diagnosis.

## 5. Architecture / Design Options

| Option | Appropriate signal | Cost or risk |
|---|---|---|
| Query/index or pagination change | Expensive scan, excess rows or repeated queries | Write overhead, migration risk, contract changes |
| Pool/concurrency bounds and request budgets | Queueing and contention exceed useful work | More explicit rejection; capacity must be measured |
| Cache with scoped keys and invalidation | Repeated cacheable reads dominate | Staleness, stampedes, invalidation and data isolation |
| Asynchronous processing | Work need not complete in the request | New state model, retries, idempotency and operational complexity |
| Horizontal scaling | API instances are the constrained tier | Can increase aggregate load on an already saturated database |

## 6. Selected Approach

For this draft, select a measurement-first process: reproduce the workload safely, isolate one constraint, change one variable, and compare at equal offered load and environment. This is a proposed method, not a retrospective selected production solution. Prefer the smallest change supported by evidence; document a rollback condition before rollout. Add caching or asynchronous behavior only when correctness and workload evidence justify the cost.

## 7. Implementation Details

No employer code or exact configuration is included. Record the eventual intervention as a sanitized before/after query, bounded concurrency decision or cache lifecycle with the reason it addresses the measured constraint. Include aggregate connection capacity across all API replicas rather than treating one instance in isolation.

Public, limited supporting evidence: FlowDesk's [FoundationIT](https://github.com/khaiminh0401/flowdesk/blob/d4b7895e4722e565c32b62d2ee162f610e5bc59e/apps/api/src/test/java/io/flowdesk/FoundationIT.java) exercises a real PostgreSQL database and schema constraints. It is a correctness test, not a performance benchmark. The info endpoint is static; it cannot demonstrate business-query throughput. No cache, broker, load harness or tuned pool is claimed for FlowDesk.

## 8. Trade-offs

More concurrency can improve utilization until it increases contention and tail latency. Caching trades freshness for repeated-read cost and requires scoped keys, expiry and invalidation. Tight deadlines limit resource occupation but can increase visible failures. Async workflows trade request time for eventual completion semantics. The correct balance depends on agreed reliability requirements and observed capacity.

## 9. Validation and Evaluation

Proposed protocol: version the scenario and dataset; record hardware, replica counts, database settings and dependency behavior; establish warm-up; run steady, ramp, spike and recovery phases; repeat baseline and candidate runs under equal offered load. Use an arrival-rate model that exposes queueing rather than allowing slower responses to silently reduce offered load. Track offered versus completed work and load-generator saturation.

Capture latency distributions, throughput, errors/timeouts, database query and lock time, active/idle/pending connections, CPU/GC and recovery time. Include correctness checks and cache-hit/staleness observations if relevant. Agree acceptance thresholds before the comparison. No measurements are available, so there is no outcome claim.

| Required artifact | Current state |
|---|---|
| Sanitized operation, personal ownership and constraints | Missing |
| Baseline/candidate traces and equal-load results | Missing |
| Exact intervention, rollback and correctness checks | Missing |
| Production verification window and regression check | Missing |

## 10. Lessons Learned

The engineering principle illustrated here is to identify where work waits before increasing resources. It is a methodological conclusion, not a fabricated personal retrospective. Complete the actual lesson after attaching a sanitized investigation: what hypothesis was wrong, what evidence changed the decision, and what remained unresolved. Until then, the supported personal claim remains the broad troubleshooting scope confirmed in the brief.
