# C.4: Facility Booking — Test Map

## Unit Tests (`__tests__/unit/booking-logic.test.ts`)

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| 1 | Can create request: trust OK | trust=-4 | allowed |
| 2 | Cannot create request: low trust | trust=-6 | rejected, "trust score too low" |
| 3 | Interest threshold not met | 5 interested, threshold=10 | not met |
| 4 | Interest threshold met | 10 interested, threshold=10 | met, trigger review |
| 5 | Cancel penalty: before approval | status=OPEN | penalty=0 |
| 6 | Cancel penalty: after approval 48h before | status=APPROVED, 48h | penalty=-2 |
| 7 | Cancel penalty: no-show | status=APPROVED, past event | penalty=-3 |
| 8 | Validate date: past | date in past | invalid |
| 9 | Validate date: within hours | date in operating hours | valid |

## Integration Tests (`__tests__/integration/booking-api.test.ts`)

| # | Test Case | Method | Expected |
|---|-----------|--------|----------|
| 1 | List facilities | GET /api/facilities | 200, paginated |
| 2 | Filter by type | GET /api/facilities?type=LIBRARY | 200, filtered |
| 3 | Get facility detail | GET /api/facilities/[id] | 200, includes manager |
| 4 | Create booking request | POST /api/booking-requests | 201, status=OPEN |
| 5 | Create request low trust | POST (trust < -5) | 403 |
| 6 | Toggle interest ON | POST /api/booking-requests/[id]/interest | 200, count+1 |
| 7 | Toggle interest OFF | POST again | 200, count-1 |
| 8 | Threshold triggers review | interest reaches threshold | status=UNDER_REVIEW |
| 9 | Approve request | POST /api/booking-requests/[id]/approve | 200, QR generated |
| 10 | Reject request | POST /api/booking-requests/[id]/reject | 200, reason stored |
| 11 | Cancel before approval | POST /api/booking-requests/[id]/cancel | 200, trust unchanged |
| 12 | Cancel after approval | POST cancel (approved) | 200, trust -2 |
| 13 | Manager dashboard | GET /api/booking-requests/managed | 200, manager's venues |
| 14 | Non-manager access | GET /api/booking-requests/managed (nomad) | 403 |
| 15 | List user requests | GET /api/booking-requests/mine | 200, user's requests |
