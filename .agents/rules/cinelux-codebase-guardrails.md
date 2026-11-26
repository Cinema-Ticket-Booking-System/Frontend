---
trigger: always_on
description: Enforces CineLux frontend architecture, team boundaries, theme tokens, and mockup glitch fixes.
---

# CineLux Codebase Guardrails

1. **Theme & Typography:** Use `#0B0E14` primary background, `#111622` / `#161B26` surfaces, `#F59E0B` amber accents, `Inter` for UI copy, and `JetBrains Mono` for prices, timers, seat codes, and order IDs.
2. **Team File Ownership (Prevent Merge Conflicts):**
   - **Ra Vattra:** `src/pages/auth/`, `src/pages/customer/SeatSelection*`, `src/pages/customer/Checkout*`, `src/pages/customer/MyTickets*`, `src/context/`, `src/services/apiClient.js`, `src/services/cinemaService.js`, `src/utils/pricingCalculator.js`.
   - **Yanpich:** `src/layouts/AdminLayout.jsx`, `src/components/admin/` (`KpiCard`, `StatusBadge`, `SearchFilterBar`, `SplitInspectorLayout`), `src/pages/admin/Dashboard*`, `src/pages/admin/Movies*`, `src/pages/admin/Bookings*`, `src/pages/admin/Settings*`.
   - **Sam Visal:** `src/layouts/CustomerLayout.jsx`, `src/pages/customer/Catalog*`, `src/pages/customer/MovieDetails*`, `src/pages/admin/Auditoriums*`, `src/pages/admin/Showtimes*`.
3. **Mock-First Data Layer:** Read/write through service modules (`src/services/`) and `src/utils/pricingCalculator.js` rather than hardcoding totals or mock arrays inside page components.
4. **Known Figma Glitches to Avoid:**
   - Never render white logo text (`CINE`) against a light background on `/login` (`FIX-01`).
   - Always compute booking/checkout totals via `calculateOrderTotals()` (`FIX-02`).
   - Keep KPI progress bars strictly bounded inside cards (`FIX-03`).
   - Never duplicate customer/payment summary blocks inside the Bookings Ticket Inspector (`FIX-04`).
   - Render Gantt hours (`10:00`–`00:00`) horizontally and keep KPI figures on a single line (`FIX-05`).
