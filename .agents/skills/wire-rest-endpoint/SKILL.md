---
name: wire-rest-endpoint
description: Adds a mock JSON contract and connects a service method in src/services/ so VITE_USE_MOCK_API can toggle between mock data and REST endpoints.
---

# Wire REST Endpoint Workflow

1. **Define Mock Schema:** Add or update the corresponding JSON file under `src/data/` (`users.json`, `movies.json`, `seats.json`, `bookings.json`, `dashboard.json`, `halls.json`, `showtimes.json`).
2. **Expose Service Method:** Add or update the method in `src/services/` checking `import.meta.env.VITE_USE_MOCK_API !== 'false'` to return mock data during local development and call `apiClient` (`src/services/apiClient.js`) when switched to live API mode.
3. **Handle Errors Cleanly:** Ensure non-2xx responses and missing tokens surface clear error states without crashing layout shells.
4. **Update API Tracker:** Mark the endpoint (`API-01`..`API-13`) as `Mock Ready: Ready` or `API Connected` in `TASK_TRACKER.md`.
