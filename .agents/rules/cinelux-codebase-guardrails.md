---
trigger: always_on
description: Enforces CineLux frontend architecture, team boundaries, theme tokens, and mockup glitch fixes.
---

# CineLux Codebase Guardrails

## Theme & Typography
1. Use `#0B0E14` primary background, `#111622` / `#161B26` surfaces, `#F59E0B` amber accents.
2. Use `Inter` for UI copy and `JetBrains Mono` for prices, timers, seat codes, and order IDs.

## Team File Ownership (Prevent Merge Conflicts)
- **Ra Vattra:** `src/pages/auth/`, `src/pages/customer/SeatSelection*`, `src/pages/customer/Checkout*`, `src/pages/customer/MyTickets*`, `src/context/`, `src/services/apiClient.js`, `src/services/cinemaService.js`, `src/utils/pricingCalculator.js`.
- **Yanpich:** `src/layouts/AdminLayout.jsx`, `src/components/admin/` (`KpiCard`, `StatusBadge`, `SearchFilterBar`, `SplitInspectorLayout`), `src/pages/admin/Dashboard*`, `src/pages/admin/Movies*`, `src/pages/admin/Bookings*`, `src/pages/admin/Settings*`.
- **Sam Visal:** `src/layouts/CustomerLayout.jsx`, `src/pages/customer/Catalog*`, `src/pages/customer/MovieDetails*`, `src/pages/admin/Auditoriums*`, `src/pages/admin/Showtimes*`.

## Mock-First Data Layer
Read/write through service modules (`src/services/`) and `src/utils/pricingCalculator.js`. Never hardcode totals or mock arrays inside page components.

## Known Figma Glitches to Avoid
- Never render white logo text (`CINE`) against a light background on `/login` (`FIX-01`).
- Always compute booking/checkout totals via `calculateOrderTotals()` (`FIX-02`).
- Keep KPI progress bars strictly bounded inside cards (`FIX-03`).
- Never duplicate customer/payment summary blocks inside the Bookings Ticket Inspector (`FIX-04`).
- Render Gantt hours (`10:00`–`00:00`) horizontally and keep KPI figures on a single line (`FIX-05`).

## Agent Discipline (Anti-Loop Rules) — MANDATORY
These rules override any instinct to "explore" or "verify." Violating them wastes tokens.

1. **Tool-call budget:** Maximum **25 tool calls per task turn**. If you hit 25, STOP, summarize what you did, and ask the user how to proceed.
2. **No repeats:** NEVER run the same terminal command, or logically equivalent commands, more than **2 times**. If a command returns nothing useful twice, it will never return anything useful — change approach or ask.
3. **Never read `node_modules/`.** No `Get-Content`, `Select-String`, `grep`, or globbing inside `node_modules/`. If you need to know whether an icon/export exists:
   - Use your built-in knowledge first, OR
   - Read the project's `package.json` version and consult the official docs URL, OR
   - Ask the user.
4. **Icon/constant resolution:** If you are unsure whether an icon exists in `lucide-react` (or similar), pick a **safe, widely-known default** (`Circle`, `Square`, `Check`, `X`, `Armchair`, `Accessibility`) and proceed. Do NOT search the filesystem to verify. The build will tell us if it's wrong.
5. **No speculation loops:** If two consecutive attempts to accomplish the same sub-goal fail, STOP. Report: "I tried X and Y, both failed, here's why — how should I proceed?"
6. **Targeted reads only:** Prefer `view_range` (max 200 lines) over full-file reads. Only read a whole file if it is < 300 lines.
7. **No full-file rewrites** of files you have not read in this session.
8. **One deliverable per turn:** For feature tasks, produce ONE file per turn unless the user explicitly asks for a multi-file scaffold. Do not "prepare" by reading 15 files first.
9. **When blocked, write output — don't search.** If a detail is missing (icon name, color token, prop shape), choose a reasonable value, note it with a `// TODO:` comment, and continue. The user will correct it.
10. **Token-awareness:** If your context is growing large (many file reads / long terminal output), summarize and drop details rather than re-reading. Do not re-paste large file contents into reasoning.

## Task Completion Protocol
Before declaring a task complete, verify:
- [ ] The requested file(s) were actually created/modified (state the paths).
- [ ] `npm run build` (or `vite build`) passes, or you explain why you skipped it.
- [ ] No `// TODO:` markers remain unless explicitly intentional.
- [ ] If you hit the tool-call budget, clearly say: "INCOMPLETE — stopped at rule 1."