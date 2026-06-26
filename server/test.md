# Media Kit API Testing Guide

This guide covers all the testing steps required to verify the endpoints against the database. You can either use the `curl` commands below in your terminal, or import the `Media-kit.postman_collection.json` file into Postman.

Make sure your server is running (`npm run dev`) before executing these tests.

---

### Test 1: Save Kit (Initial Insert)
**Goal:** Verify the debounced autosave endpoint inserts a new row correctly.

**Endpoint:** `POST /api/kit/save`

**Payload:**
```json
{
  "username": "jane-doe-123",
  "full_name": "Jane Doe",
  "bio": "Tech Creator",
  "metrics": [
    {
      "id": "m1", 
      "platform": "youtube", 
      "handle": "janedoe", 
      "followers": 100000, 
      "engagement": 5.2
    }
  ],
  "rate_cards": [
    {
      "id": "r1", 
      "name": "Dedicated Video", 
      "description": "10 min video", 
      "price": 2500, 
      "turnaround": "2 weeks"
    }
  ]
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:3000/api/kit/save \
  -H "Content-Type: application/json" \
  -d '{"username": "jane-doe-123","full_name": "Jane Doe","bio": "Tech Creator","metrics": [{"id": "m1", "platform": "youtube", "handle": "janedoe", "followers": 100000, "engagement": 5.2}],"rate_cards": [{"id": "r1", "name": "Dedicated Video", "description": "10 min video", "price": 2500, "turnaround": "2 weeks"}]}'
```
**Expected:** 200 OK with the saved row, including the `id`, `created_at`, and `updated_at`.

---

### Test 2: Save Kit (Idempotent Update)
**Goal:** Verify the endpoint updates the row instead of creating a duplicate if the username already exists.

**Endpoint:** `POST /api/kit/save`

**Payload:**
```json
{
  "username": "jane-doe-123",
  "full_name": "Jane Doe Updated",
  "bio": "Tech Creator Updated"
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:3000/api/kit/save \
  -H "Content-Type: application/json" \
  -d '{"username": "jane-doe-123","full_name": "Jane Doe Updated","bio": "Tech Creator Updated"}'
```
**Expected:** 200 OK. The `id` remains the same as Test 1, but `updated_at` has a newer timestamp.

---

### Test 3: Invalid Username (Zod Validation)
**Goal:** Verify the strict alphanumeric constraint validation on the username.

**Endpoint:** `POST /api/kit/save`

**Payload:**
```json
{
  "username": "Bad Slug!"
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:3000/api/kit/save \
  -H "Content-Type: application/json" \
  -d '{"username": "Bad Slug!"}'
```
**Expected:** 400 Bad Request indicating the username regex constraint failed.

---

### Test 4: Get Kit by Username (Public Route)
**Goal:** Fetch the profile anonymously.

**Endpoint:** `GET /api/kit/jane-doe-123`

**Curl Command:**
```bash
curl http://localhost:3000/api/kit/jane-doe-123
```
**Expected:** 200 OK. It returns the exact same data shape as Test 2.

---

### Test 5: Get Kit (Not Found)
**Goal:** Fetch a non-existent kit.

**Endpoint:** `GET /api/kit/does-not-exist`

**Curl Command:**
```bash
curl http://localhost:3000/api/kit/does-not-exist
```
**Expected:** 404 Not Found with structured JSON error (`{"error":"Kit not found","username":"does-not-exist"}`).

---

### Test 6: PDF Export Extension
**Goal:** Export a PDF without mutating the database state.

**Endpoint:** `POST /api/kit/jane-doe-123/export-pdf`

**Curl Command:**
```bash
curl -X POST http://localhost:3000/api/kit/jane-doe-123/export-pdf --output media-kit.pdf
```
**Expected:** A file named `media-kit.pdf` will be created locally. You can re-run Test 4 and confirm the database row's `updated_at` hasn't changed.

---

### Test 7: Currency Conversion Extension & Caching
**Goal:** Convert currency securely on the backend, verify the cache.

**Endpoint:** `GET /api/currency/convert?amount=100&from=USD&to=INR`

**Curl Command:**
```bash
curl "http://localhost:3000/api/currency/convert?amount=100&from=USD&to=INR"
```
**Expected:** First run will hit the external API. Look at your server terminal for `"Cache miss..., fetching from upstream"`. 
Run it a second time. The response should be near-instant, and the server terminal will log `"Cache hit for USD_INR"`.

---

### Test 8: Unknown Route
**Goal:** Verify the centralized error handler intercepts unmapped routes.

**Endpoint:** `GET /api/something-fake`

**Curl Command:**
```bash
curl http://localhost:3000/api/something-fake
```
**Expected:** 404 with structured JSON (`{"error":"Internal server error"}` or similar), instead of the default HTML Express page.
