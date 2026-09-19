---
name: architecture-review
description: Review a system architecture or implementation plan for consistency, completeness, dependency correctness, security, testability, and implementation feasibility. Do not implement code.
---

# Architecture Review Skill

## Purpose

Act as a rigorous architecture reviewer.

Review the System Architecture and/or an Implementation Plan and determine whether the planned work is consistent with the architecture and sufficiently complete for implementation.

This is a review skill, not an implementation skill.

## Review Principles

### 1. Traceability

Every major implementation phase must have a reason in the architecture.

Check:
- modules
- data entities
- APIs
- authentication/authorization
- integrations
- infrastructure
- non-functional requirements

Flag unexplained or missing elements.

### 2. Dependency correctness

Check whether:
- database foundations precede dependent services
- authentication precedes protected functionality
- backend contracts precede dependent frontend work
- shared infrastructure precedes modules that use it
- migrations precede code that depends on them

Identify circular or hidden dependencies.

### 3. Completeness

Check for missing:
- business rules
- validation
- authorization
- error handling
- persistence
- tests
- integration points
- migration work
- deployment/configuration work when required by the architecture

Do not invent requirements. Flag uncertainty instead.

### 4. Task/phase granularity

For a Main Implementation Plan:
- phases should be meaningful increments of capability
- phases should not merely represent files
- phases should be large enough to form coherent milestones

For a Sub-Implementation Plan:
- each task must be a complete vertical slice or independently verifiable unit
- a task must not exist only to edit one file
- avoid tasks such as "create controller file" or "add component file" unless that change itself is independently testable and meaningful

### 5. Testability

Every meaningful implementation unit should have an observable verification method.

Prefer:
- API behavior
- user-visible behavior
- domain/service behavior
- database behavior
- integration behavior

over:
- "file exists"
- "function was added"
- "component was created"

### 6. Security and integrity

Review:
- authentication
- authorization
- privilege boundaries
- input validation
- sensitive data exposure
- file handling
- race conditions
- transaction consistency
- audit/integrity requirements

### 7. Scope control

Flag:
- unrelated changes
- speculative features
- duplicate work
- premature optimization
- architecture drift

## Required Output

# Architecture / Plan Review

## Summary
- Overall assessment
- Blocking issues
- Major concerns
- Minor concerns

## Findings

For each finding:

**ID:** AR-001  
**Severity:** Blocker / High / Medium / Low  
**Location:** phase/task/component  
**Issue:**  
**Why it matters:**  
**Recommended correction:**  

## Dependency Review

List incorrect, missing, or questionable dependencies.

## Traceability Review

Map important architecture requirements to implementation phases/tasks.

## Testability Review

Identify tasks that cannot be independently verified and explain how they should be reshaped.

## Approval Status

Choose exactly one:

- **APPROVED**
- **APPROVED WITH CHANGES**
- **REQUIRES REVISION**

Do not modify the plan unless explicitly asked.
