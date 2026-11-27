---
trigger: always_on
description: CineLux theme, ownership, data, Figma invariants, and anti-loop rules.
---

# CineLux Guardrails

## Theme and data

`#0B0E14` bg · `#111622`/`#161B26` surface · `#F59E0B` accent · Inter UI · JetBrains Mono for prices/timers/seat codes/IDs. Tokens: `src/index.css`. Pages call `src/services/` only; totals via `calculateOrderTotals()`.

## Ownership

- Ra Vattra: `src/pages/auth/`, customer `SeatSelection*`/`Checkout*`/`MyTickets*`, `src/context/`, `src/services/*`, `src/utils/pricingCalculator.js`.
- Yanpich: `AdminLayout`, `src/components/admin/*`, admin `Dashboard*`/`Movies*`/`Bookings*`/`Settings*`.
- Sam Visal: `CustomerLayout`, customer `Catalog*`/`MovieDetails*`, admin `Auditoriums*`/`Showtimes*`.
- Shared: `SeatGrid`, `seatStates`, `cinemaService`, `apiClient`, mock JSON, `.env`; check `docs/ai/contracts.md`.

## Figma invariants and anti-loop

- `FIX-01` no white logo on light bg · `FIX-02` shared pricing · `FIX-03` bounded KPI bar · `FIX-04` no duplicate inspector · `FIX-05` horizontal Gantt hours.
- Max 2 attempts or duplicate commands per sub-goal; then report failure and ask.
- Never read `node_modules/`; unknown icon -> known Lucide icon; missing contract detail: one `BLOCK:` line, no guessing; cosmetic gap: `// TODO:` and continue.
- Follow `docs/ai/handoff-protocol.md` Token Discipline; log lessons per `AGENTS.md`; done = changed paths stated, `npm run build` run or skip explained.
