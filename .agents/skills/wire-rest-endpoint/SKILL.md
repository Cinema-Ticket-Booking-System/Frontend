---
name: wire-rest-endpoint
description: Add a mock JSON contract and service method toggled by VITE_USE_MOCK_API.
---

# Wire REST Endpoint

1. Update `docs/ai/contracts.md`, then the JSON in `src/data/`.
2. Add the method in `src/services/cinemaService.js`: mock when `VITE_USE_MOCK_API !== "false"`, else `apiClient`.
3. Reject with plain `Error`; never crash shells. Report `Mock Ready`/`API Connected` deltas, never Status.
