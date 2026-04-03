# Day 7 Homework: Multi-Agent Orchestration Design

**Workflow:** Smart RSVP & Booking Validation
**Project:** NomadBridge
**Date:** 2026-03-26

---

## 1. Workflow Overview

### The Problem

When a nomad RSVPs to a university event or books a campus facility, multiple checks must happen in sequence: Is the event/facility available? Does the user meet trust requirements? Can we safely write to the database? Should we send a confirmation?

Doing all of this in a single API route creates a monolithic handler that's hard to test, debug, and extend. Instead, we decompose it into **4 specialized agents** in a pipeline.

### Agent Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Request                                │
│            "RSVP to AI Workshop" or "Book Library Room 3"       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │     1. ROUTER AGENT    │
              │                        │
              │  • Classify intent     │
              │    (RSVP vs Booking)   │
              │  • Extract parameters  │
              │  • Load user + target  │
              └───────────┬────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │  2. VALIDATION AGENT   │
              │                        │
              │  • Check availability  │
              │  • Verify trust score  │
              │  • Apply business rules│
              │  • Human-in-the-loop   │◄──── Admin review if
              │    checkpoint          │      trustScore < 20
              └───────────┬────────────┘
                          │
                     ┌────┴────┐
                     │ Valid?  │
                     └────┬────┘
                    yes   │   no
                   ┌──────┴──────┐
                   │             │
                   ▼             ▼
    ┌──────────────────┐   ┌──────────┐
    │  3. ACTION AGENT │   │  REJECT  │
    │                  │   │  Return  │
    │  • Prisma txn    │   │  reason  │
    │  • Create record │   └──────────┘
    │  • Generate QR   │
    │  • Update counts │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────────┐
    │ 4. NOTIFICATION AGENT│
    │                      │
    │  • Email confirmation│
    │  • Mock LINE message │
    │  • Include QR code   │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │   ✅ COMPLETED       │
    │   Return result to   │
    │   user with QR code  │
    └──────────────────────┘
```

### Why 4 Agents?

| Agent | Responsibility | Isolation Benefit |
|-------|---------------|-------------------|
| **Router** | Intent classification + parameter extraction | Can be tested independently with mock inputs |
| **Validation** | Business rules + trust checks | Rules change often; isolated agent = easy updates |
| **Action** | Database writes + QR generation | Transactional; retry logic contained here |
| **Notification** | Email + LINE messages | Can fail without rolling back the action |

**Key principle:** Each agent has a single responsibility. If the Notification Agent fails, the RSVP/Booking is still valid — the user just doesn't get a confirmation email. This **partial failure tolerance** is only possible because the agents are separated.

---

## 2. Orchestration Framework Choice

### Chosen: Claude Agent SDK (TypeScript)

**Why:**

| Criterion | Claude Agent SDK | LangGraph | CrewAI | OpenAI Agents SDK |
|-----------|:----------------:|:---------:|:------:|:-----------------:|
| Language | TypeScript ✅ | Python ❌ | Python ❌ | Python ❌ |
| Next.js integration | Native ✅ | Needs bridge | Needs bridge | Needs bridge |
| Tool use | Built-in ✅ | Built-in | Built-in | Built-in |
| Complexity | Lightweight ✅ | Heavy graph DSL | Opinionated roles | Medium |
| Provider lock-in | Anthropic (our choice) | OpenAI-biased | OpenAI-biased | OpenAI only |
| State management | Manual (flexible) ✅ | Graph-based | Implicit | Thread-based |

**Justification:**

1. **TypeScript-native.** Our entire stack is Next.js + TypeScript. Claude Agent SDK works directly in our API routes without a Python sidecar or bridge service. Zero additional infrastructure.

2. **Lightweight orchestration.** For a 4-agent linear pipeline with one conditional branch (validation pass/fail), we don't need LangGraph's graph DSL complexity. A simple sequential orchestrator with error handling is cleaner and easier to understand.

3. **Built-in tool use.** Each agent can be given specific tools (database queries, QR generation, email sending) through the SDK's tool system. This maps directly to our agent responsibilities.

4. **Course project scope.** CrewAI and LangGraph add significant dependency weight and learning curve. For a 3-week course project, Claude Agent SDK is the pragmatic choice — it demonstrates orchestration concepts without over-engineering.

### How It Works in Our Architecture

```
app/api/workflow/rsvp/route.ts    ← API entry point
  └── lib/agents/orchestrator.ts  ← Sequential pipeline runner
        ├── lib/agents/router.ts
        ├── lib/agents/validator.ts
        ├── lib/agents/action.ts
        └── lib/agents/notifier.ts
```

The orchestrator is a plain TypeScript function that runs agents in sequence, passing the `WorkflowState` through each stage. No framework magic — just functions calling functions with a shared state object.

---

## 3. State Model

### WorkflowState Interface

```typescript
// lib/agents/types.ts

interface WorkflowState {
  // ── Identity ──
  id: string;                     // Unique workflow run ID (cuid)
  startedAt: Date;
  completedAt?: Date;

  // ── Routing ──
  intent: "RSVP" | "BOOKING" | null;
  rawInput: {
    userId: string;
    targetId: string;             // eventId or facilityId
    metadata?: {                  // Extra params for booking
      date?: string;
      startTime?: string;
      endTime?: string;
    };
  };

  // ── Resolved Entities (loaded by Router) ──
  user?: {
    id: string;
    name: string;
    email: string;
    role: "NOMAD" | "UNIVERSITY" | "ADMIN";
    trustScore: number;
  };
  target?: {
    id: string;
    type: "EVENT" | "FACILITY";
    title: string;                // event.title or facility.name
    capacity: number;
    currentCount: number;         // rsvpCount or booking count
    date?: Date;                  // event date
    available?: boolean;          // facility.available
    university: string;
  };

  // ── Validation ──
  validation: {
    passed: boolean;
    checks: ValidationCheck[];
    requiresHumanReview: boolean;
    humanDecision?: "APPROVED" | "REJECTED";
  };

  // ── Action Result ──
  action: {
    executed: boolean;
    recordId?: string;            // EventRsvp.id or Booking.id
    qrCode?: string;              // Generated QR code string
    waitlisted: boolean;
  };

  // ── Notification ──
  notification: {
    emailSent: boolean;
    lineSent: boolean;
  };

  // ── Workflow Status ──
  status: WorkflowStatus;
  errors: WorkflowError[];
}

type WorkflowStatus =
  | "ROUTING"
  | "VALIDATING"
  | "AWAITING_REVIEW"    // Human-in-the-loop pause
  | "EXECUTING"
  | "NOTIFYING"
  | "COMPLETED"
  | "FAILED"
  | "REJECTED";

interface ValidationCheck {
  name: string;              // "capacity", "trust_score", "duplicate", "past_event"
  passed: boolean;
  message: string;
}

interface WorkflowError {
  agent: string;             // "router" | "validator" | "action" | "notifier"
  message: string;
  timestamp: Date;
  retryable: boolean;
}
```

### State Transition Diagram

```
ROUTING ──────► VALIDATING ──────► EXECUTING ──────► NOTIFYING ──────► COMPLETED
   │                │                  │                  │
   │                ├──► AWAITING      │                  │
   │                │    _REVIEW       │                  │
   │                │      │           │                  │
   │                │      ├──► VALIDATING (resumed)      │
   │                │      └──► REJECTED                  │
   │                │                  │                  │
   └──► FAILED      └──► REJECTED     └──► FAILED        └──► COMPLETED
   (bad input)      (rules failed)    (txn failed)       (notif failed but
                                                          action succeeded)
```

**Important:** The transition from NOTIFYING → COMPLETED happens even if notification fails. The RSVP/Booking is already committed at this point. Notification failure is logged but doesn't roll back the action.

### Orchestrator Implementation

```typescript
// lib/agents/orchestrator.ts

import { createId } from "@paralleldrive/cuid2";

export async function runWorkflow(
  input: WorkflowState["rawInput"]
): Promise<WorkflowState> {
  // Initialize state
  const state: WorkflowState = {
    id: createId(),
    startedAt: new Date(),
    rawInput: input,
    intent: null,
    validation: { passed: false, checks: [], requiresHumanReview: false },
    action: { executed: false, waitlisted: false },
    notification: { emailSent: false, lineSent: false },
    status: "ROUTING",
    errors: [],
  };

  try {
    // Stage 1: Route
    state.status = "ROUTING";
    await routerAgent(state);

    // Stage 2: Validate
    state.status = "VALIDATING";
    await validationAgent(state);

    if (state.validation.requiresHumanReview) {
      state.status = "AWAITING_REVIEW";
      // Pause here — workflow resumes via admin API endpoint
      return state;
    }

    if (!state.validation.passed) {
      state.status = "REJECTED";
      return state;
    }

    // Stage 3: Execute
    state.status = "EXECUTING";
    await actionAgent(state);

    // Stage 4: Notify (non-blocking — failure doesn't affect result)
    state.status = "NOTIFYING";
    try {
      await notificationAgent(state);
    } catch (err) {
      state.errors.push({
        agent: "notifier",
        message: err instanceof Error ? err.message : "Notification failed",
        timestamp: new Date(),
        retryable: true,
      });
    }

    state.status = "COMPLETED";
    state.completedAt = new Date();
    return state;
  } catch (err) {
    state.status = "FAILED";
    state.errors.push({
      agent: state.status.toLowerCase(),
      message: err instanceof Error ? err.message : "Unknown error",
      timestamp: new Date(),
      retryable: false,
    });
    return state;
  }
}
```

---

## 4. Agent Definitions

### Agent 1: Router Agent

**Purpose:** Classify intent and load entities from the database.

```typescript
// lib/agents/router.ts

import { prisma } from "@/lib/prisma";

export async function routerAgent(state: WorkflowState): Promise<void> {
  const { userId, targetId } = state.rawInput;

  // Load user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error(`User not found: ${userId}`);

  state.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    trustScore: user.trustScore,
  };

  // Try to find as Event first, then Facility
  const event = await prisma.event.findUnique({ where: { id: targetId } });
  if (event) {
    state.intent = "RSVP";
    state.target = {
      id: event.id,
      type: "EVENT",
      title: event.title,
      capacity: event.capacity,
      currentCount: event.rsvpCount,
      date: event.date,
      university: event.university,
    };
    return;
  }

  const facility = await prisma.facility.findUnique({ where: { id: targetId } });
  if (facility) {
    state.intent = "BOOKING";
    state.target = {
      id: facility.id,
      type: "FACILITY",
      title: facility.name,
      capacity: 1, // Single booking slot
      currentCount: 0,
      available: facility.available,
      university: facility.university,
    };
    return;
  }

  throw new Error(`Target not found: ${targetId}`);
}
```

**Tools:** Database read (Prisma queries)
**Can fail when:** User or target doesn't exist → workflow stops at ROUTING → FAILED

---

### Agent 2: Validation Agent

**Purpose:** Apply all business rules before allowing the action.

```typescript
// lib/agents/validator.ts

import { prisma } from "@/lib/prisma";

export async function validationAgent(state: WorkflowState): Promise<void> {
  const checks: ValidationCheck[] = [];

  if (state.intent === "RSVP") {
    checks.push(...await validateRsvp(state));
  } else if (state.intent === "BOOKING") {
    checks.push(...await validateBooking(state));
  }

  // Trust score check (applies to both)
  const trustCheck = validateTrustScore(state.user!.trustScore);
  checks.push(trustCheck);

  // If trust score is borderline, flag for human review
  if (state.user!.trustScore < 20 && state.user!.trustScore >= 0) {
    state.validation.requiresHumanReview = true;
  }

  state.validation.checks = checks;
  state.validation.passed = checks.every((c) => c.passed);
}

async function validateRsvp(state: WorkflowState): Promise<ValidationCheck[]> {
  const checks: ValidationCheck[] = [];
  const { user, target } = state;

  // 1. Past event check
  if (target!.date && target!.date < new Date()) {
    checks.push({
      name: "past_event",
      passed: false,
      message: "Cannot RSVP to past events",
    });
    return checks; // No point checking further
  }
  checks.push({ name: "past_event", passed: true, message: "Event is in the future" });

  // 2. Capacity check
  if (target!.currentCount >= target!.capacity) {
    checks.push({
      name: "capacity",
      passed: false,
      message: `Event is at full capacity (${target!.capacity}/${target!.capacity})`,
    });
  } else {
    const remaining = target!.capacity - target!.currentCount;
    checks.push({
      name: "capacity",
      passed: true,
      message: `${remaining} spots remaining`,
    });
  }

  // 3. Duplicate check
  const existing = await prisma.eventRsvp.findUnique({
    where: { userId_eventId: { userId: user!.id, eventId: target!.id } },
  });
  if (existing) {
    checks.push({
      name: "duplicate",
      passed: false,
      message: "Already registered for this event",
    });
  } else {
    checks.push({ name: "duplicate", passed: true, message: "No existing RSVP" });
  }

  return checks;
}

async function validateBooking(state: WorkflowState): Promise<ValidationCheck[]> {
  const checks: ValidationCheck[] = [];

  // 1. Facility availability
  if (!state.target!.available) {
    checks.push({
      name: "availability",
      passed: false,
      message: "Facility is not available",
    });
    return checks;
  }
  checks.push({ name: "availability", passed: true, message: "Facility is available" });

  // 2. Time slot conflict check
  const { date, startTime, endTime } = state.rawInput.metadata || {};
  if (!date || !startTime || !endTime) {
    checks.push({
      name: "time_slot",
      passed: false,
      message: "Missing booking date or time",
    });
    return checks;
  }

  const conflict = await prisma.booking.findFirst({
    where: {
      facilityId: state.target!.id,
      date: new Date(date),
      startTime: { lte: endTime },
      endTime: { gte: startTime },
      status: { not: "CANCELLED" },
    },
  });

  if (conflict) {
    checks.push({
      name: "time_slot",
      passed: false,
      message: `Time slot conflicts with existing booking`,
    });
  } else {
    checks.push({ name: "time_slot", passed: true, message: "Time slot available" });
  }

  return checks;
}

function validateTrustScore(score: number): ValidationCheck {
  if (score < 0) {
    return { name: "trust_score", passed: false, message: "Trust score is negative — account restricted" };
  }
  if (score < 20) {
    return { name: "trust_score", passed: true, message: "Low trust score — flagged for review" };
  }
  return { name: "trust_score", passed: true, message: `Trust score OK (${score})` };
}
```

**Tools:** Database read (duplicate check, time slot conflict check)
**Can fail when:** Validation rules not met → workflow transitions to REJECTED
**Human checkpoint:** Triggered when trustScore < 20 (see Section 5)

---

### Agent 3: Action Agent

**Purpose:** Execute the database write atomically and generate QR code.

```typescript
// lib/agents/action.ts

import { prisma } from "@/lib/prisma";
import { createId } from "@paralleldrive/cuid2";

const MAX_RETRIES = 2;

export async function actionAgent(state: WorkflowState): Promise<void> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (state.intent === "RSVP") {
        await executeRsvp(state);
      } else {
        await executeBooking(state);
      }
      return; // Success — exit retry loop
    } catch (err) {
      lastError = err instanceof Error ? err : new Error("Unknown error");
      state.errors.push({
        agent: "action",
        message: `Attempt ${attempt + 1} failed: ${lastError.message}`,
        timestamp: new Date(),
        retryable: attempt < MAX_RETRIES,
      });

      if (attempt < MAX_RETRIES) {
        // Exponential backoff: 100ms, 300ms
        await new Promise((r) => setTimeout(r, 100 * (attempt + 1) * 2));
      }
    }
  }

  throw lastError ?? new Error("Action failed after retries");
}

async function executeRsvp(state: WorkflowState): Promise<void> {
  // Atomic transaction: create RSVP + increment count
  const [rsvp] = await prisma.$transaction([
    prisma.eventRsvp.create({
      data: {
        userId: state.user!.id,
        eventId: state.target!.id,
      },
    }),
    prisma.event.update({
      where: { id: state.target!.id },
      data: { rsvpCount: { increment: 1 } },
    }),
  ]);

  state.action.executed = true;
  state.action.recordId = rsvp.id;
  state.action.qrCode = `RSVP-${state.target!.id}-${state.user!.id}-${Date.now()}`;
}

async function executeBooking(state: WorkflowState): Promise<void> {
  const { date, startTime, endTime } = state.rawInput.metadata!;
  const qrCode = `BOOK-${state.target!.id}-${state.user!.id}-${Date.now()}`;

  const booking = await prisma.booking.create({
    data: {
      userId: state.user!.id,
      facilityId: state.target!.id,
      date: new Date(date!),
      startTime: startTime!,
      endTime: endTime!,
      status: "CONFIRMED",
      qrCode,
    },
  });

  state.action.executed = true;
  state.action.recordId = booking.id;
  state.action.qrCode = qrCode;
}
```

**Tools:** Database write (Prisma $transaction), QR code generation
**Retry logic:** Up to 2 retries with exponential backoff for transient DB errors
**Can fail when:** Transaction fails after retries → workflow transitions to FAILED

---

### Agent 4: Notification Agent

**Purpose:** Send confirmation messages. Non-critical — failure doesn't affect the action.

```typescript
// lib/agents/notifier.ts

import { formatDateBangkok } from "@/lib/utils";

export async function notificationAgent(state: WorkflowState): Promise<void> {
  const { user, target, action, intent } = state;

  const subject = intent === "RSVP"
    ? `Confirmed: ${target!.title}`
    : `Booking Confirmed: ${target!.title}`;

  const body = intent === "RSVP"
    ? buildRsvpEmail(user!, target!, action.qrCode!)
    : buildBookingEmail(user!, target!, state.rawInput.metadata!, action.qrCode!);

  // Send email (mock implementation for MVP)
  try {
    await sendEmail(user!.email, subject, body);
    state.notification.emailSent = true;
  } catch (err) {
    console.error("Email failed:", err);
  }

  // Send mock LINE notification
  try {
    await sendLineNotification(user!.id, `✅ ${subject}. Show QR code at entry.`);
    state.notification.lineSent = true;
  } catch (err) {
    console.error("LINE notification failed:", err);
  }
}

function buildRsvpEmail(
  user: WorkflowState["user"] & {},
  target: WorkflowState["target"] & {},
  qrCode: string
): string {
  return `
    Hi ${user.name},

    You're registered for "${target.title}" at ${target.university}.
    Date: ${target.date ? formatDateBangkok(target.date) : "TBD"}
    Venue: Check event details for location.

    Your QR Code: ${qrCode}
    Show this at the entrance for check-in.

    See you there!
    — NomadBridge
  `.trim();
}

function buildBookingEmail(
  user: WorkflowState["user"] & {},
  target: WorkflowState["target"] & {},
  metadata: NonNullable<WorkflowState["rawInput"]["metadata"]>,
  qrCode: string
): string {
  return `
    Hi ${user.name},

    Your booking at "${target.title}" (${target.university}) is confirmed.
    Date: ${metadata.date}
    Time: ${metadata.startTime} — ${metadata.endTime}

    Your QR Code: ${qrCode}
    Show this at the facility entrance.

    Enjoy your workspace!
    — NomadBridge
  `.trim();
}

// ── Mock implementations (replace with real services later) ──

async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  console.log(`[EMAIL] To: ${to} | Subject: ${subject}`);
  console.log(`[EMAIL] Body: ${body.substring(0, 100)}...`);
  // In production: integrate with SendGrid, Resend, etc.
}

async function sendLineNotification(userId: string, message: string): Promise<void> {
  console.log(`[LINE] User: ${userId} | Message: ${message}`);
  // In production: integrate with LINE Messaging API
}
```

**Tools:** Email service (mock), LINE API (mock)
**Can fail when:** External service is down → logged as warning, workflow still completes

---

## 5. Human-in-the-Loop Checkpoint

### When It Triggers

The Validation Agent checks `User.trustScore`. If the score is below 20 (but not negative), the workflow **pauses** and flags the request for admin review.

**Why 20?** New users start at `trustScore: 0`. A score below 20 indicates either a brand-new user with no history or a user who has received penalties (e.g., no-shows, late cancellations). Both warrant a quick human check before granting access to university resources.

### How It Works

```
User clicks "RSVP" ──► Router ──► Validator detects trustScore = 15
                                        │
                                        ▼
                              ┌─────────────────────┐
                              │  AWAITING_REVIEW     │
                              │                      │
                              │  Workflow paused.     │
                              │  State saved to DB.   │
                              │  Admin notified.      │
                              └──────────┬────────────┘
                                         │
                              ┌──────────┴────────────┐
                              │  Admin Dashboard       │
                              │                        │
                              │  "User 'Alex' (trust   │
                              │   score: 15) wants to   │
                              │   RSVP for AI Workshop  │
                              │   at Chulalongkorn"     │
                              │                        │
                              │  [✅ Approve] [❌ Reject]│
                              └──────────┬────────────┘
                                         │
                              ┌──────────┴────────────┐
                              │                        │
                         Approved                  Rejected
                              │                        │
                              ▼                        ▼
                    Resume workflow           State → REJECTED
                    (Action → Notify)        Return reason to user
```

### Implementation

```typescript
// app/api/workflow/review/[workflowId]/route.ts

import { prisma } from "@/lib/prisma";
import { runWorkflowFromState } from "@/lib/agents/orchestrator";

export async function POST(
  request: Request,
  { params }: { params: { workflowId: string } }
) {
  const { decision } = await request.json(); // "APPROVED" or "REJECTED"
  const { workflowId } = params;

  // Load saved workflow state
  const savedState = await loadWorkflowState(workflowId);

  if (savedState.status !== "AWAITING_REVIEW") {
    return Response.json(
      { error: "Workflow is not awaiting review" },
      { status: 400 }
    );
  }

  savedState.validation.humanDecision = decision;

  if (decision === "REJECTED") {
    savedState.status = "REJECTED";
    await saveWorkflowState(savedState);
    return Response.json({ data: { status: "REJECTED" } });
  }

  // Resume workflow from EXECUTING stage
  savedState.validation.passed = true;
  const result = await runWorkflowFromState(savedState, "EXECUTING");
  return Response.json({ data: result });
}
```

### What the Admin Sees

The admin dashboard shows pending reviews with:
- **Who:** User name, email, role, trust score, account age
- **What:** RSVP or Booking request details
- **Context:** Trust score history (why is it low?)
- **Actions:** Approve (resumes workflow) or Reject (returns reason to user)

This checkpoint prevents abuse while keeping the experience smooth for legitimate users. Most workflows (trustScore ≥ 20) skip this step entirely.

---

## 6. Failure Scenario & Recovery

### Scenario: "Validation Passes but Database Transaction Fails"

**Setup:**
1. A nomad with trustScore 45 clicks "RSVP" for an event with 3 spots remaining
2. Router Agent loads user and event successfully ✅
3. Validation Agent confirms: not past, has capacity, no duplicate, trust OK ✅
4. Action Agent begins Prisma `$transaction`...
5. **SQLite database is locked** (another concurrent write is in progress)
6. Transaction throws `SQLITE_BUSY` error ❌

### Why This Happens

SQLite uses file-level locking. In development (and our course project), concurrent requests can cause brief lock contention. This is a **transient error** — it will succeed if retried after a short delay.

### Recovery Plan

```
Action Agent: attempt 1
  └── $transaction → SQLITE_BUSY error
  └── Log error, wait 200ms

Action Agent: attempt 2
  └── $transaction → SQLITE_BUSY error (still locked)
  └── Log error, wait 600ms

Action Agent: attempt 3
  └── $transaction → Success ✅
  └── Continue to Notification Agent
```

**If all 3 attempts fail:**

```
Action Agent: all retries exhausted
  └── state.status = "FAILED"
  └── state.errors = [
        { agent: "action", message: "SQLITE_BUSY after 3 attempts", retryable: false }
      ]
  └── Return state to API route

API Route:
  └── Return 503 Service Unavailable
  └── Response: { error: "Service temporarily busy. Please try again.", retryable: true }

User sees:
  └── "Something went wrong. Please try again in a moment."
  └── RSVP button re-enabled (not grayed out)
```

### Why This Is Safe

**No partial writes.** The Prisma `$transaction` is atomic — either both the `EventRsvp.create` AND `Event.update` succeed, or neither does. If the transaction fails, the database is in the same state as before the attempt. There's nothing to roll back.

**State captures the full history.** The `errors` array in `WorkflowState` records every failed attempt with timestamps. This makes debugging straightforward:

```typescript
// Example error state after failure
{
  status: "FAILED",
  errors: [
    { agent: "action", message: "Attempt 1: SQLITE_BUSY", timestamp: "...", retryable: true },
    { agent: "action", message: "Attempt 2: SQLITE_BUSY", timestamp: "...", retryable: true },
    { agent: "action", message: "Attempt 3: SQLITE_BUSY", timestamp: "...", retryable: false },
  ]
}
```

### Other Failure Scenarios (Brief)

| Scenario | Recovery | Impact |
|----------|----------|--------|
| Router: User not found | Fail immediately, return 404 | No state mutation |
| Validator: Event in past | Reject, return 400 with reason | Clean rejection |
| Action: Duplicate key (race condition) | Catch unique constraint violation, return 409 | No partial write |
| Notifier: Email service down | Log warning, complete workflow anyway | User misses email but RSVP is valid |
| Notifier: LINE API timeout | Log warning, complete workflow anyway | User misses LINE but RSVP is valid |

---

## Summary

| Homework Requirement | Section | Key Design Decision |
|---------------------|---------|-------------------|
| 3+ agents | §1, §4 | 4 agents: Router → Validator → Action → Notifier |
| Framework choice + justification | §2 | Claude Agent SDK — TypeScript-native, lightweight, fits Next.js |
| State model | §3 | `WorkflowState` interface with typed status transitions |
| Failure scenario + recovery | §6 | SQLite lock contention with retry + exponential backoff |
| Human-in-the-loop | §5 | Low trust score triggers admin review pause |
| Professional documentation | All | Diagrams, code, tables, clear structure |

### Architecture Principle

> **Each agent is a function, not a service.** In a course project, agents don't need to be microservices or separate processes. They're TypeScript functions that accept and modify a shared `WorkflowState` object, run in sequence by a simple orchestrator. This gives us the **conceptual benefits** of multi-agent design (separation of concerns, isolated testing, partial failure tolerance) without the **operational complexity** of distributed systems.
