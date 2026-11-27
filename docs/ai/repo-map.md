# CineLux Repo Map

⚠ = shared contract: check all importers, props and mock/API schema before editing

## Pages / Screens

- `src/App.jsx` — Route table: `/login`, customer routes, protected `/admin/*`, `/dev/seat-grid`, 404 redirect; default export `App`; most routes still render `Placeholder`.
- `src/pages/auth/LoginPage.jsx` — Sign-in/register tabs, 3 demo role shortcuts, role-to-route redirect; uses `useAuth().login/register`; no props.
- `src/pages/customer/SeatGridPreview.jsx` — Dev demo of SeatGrid with booking/editor toggle and live totals; no props; route `/dev/seat-grid`.
- `src/pages/Placeholder.jsx` — Stub screen showing task title and owner; props `title`, `owner`.
- `src/layouts/CustomerLayout.jsx` — Public dark navbar with search, My Tickets link and `Outlet`; no props.
- `src/layouts/AdminLayout.jsx` — Admin sidebar from `ADMIN_NAV`, telemetry card and `Outlet`; no props.
- `src/layouts/AuthLayout.jsx` — Bare full-screen dark wrapper with `Outlet`; no props.

## Reusable Components

- `src/components/seats/SeatGrid.jsx` — ⚠ 2D seat matrix engine; props `seats`, `matrix`, `pricingTiers`, `rowBands`, `mode` (`booking|editor`), `selectedSeatIds`, `onSeatClick`, `screenLabel`, `showScreen`, `showRowLabels`, `showTierLegend`, `showStateLegend`, `className`.
- `src/components/seats/seatStates.js` — ⚠ State and tier design tokens; exports `SEAT_STATES`, `SEAT_STATE_META`, `DEFAULT_ROW_BANDS`, `TIER_CHIP_STYLES`, `DEFAULT_TIER_CHIP`, `SEAT_TIER_BORDER`, `DEFAULT_SEAT_TIER_BORDER`.
- `src/components/common/ProtectedRoute.jsx` — RBAC route guard; props `allowedRoles`, `currentRole`; redirects to `/login` with `state.from`.
- `src/context/AuthContext.jsx` — Session provider; exports `AuthProvider`; context value `user`, `token`, `role`, `isAuthenticated`, `remembered`, `login`, `register`, `logout`; storage keys `cinelux_token` and `cinelux_user`.
- `src/context/useAuth.js` — Auth context and hook; exports `AuthContext`, `useAuth`; throws outside `AuthProvider`.
- `src/assets/auth/*.svg` — Nine login icons used by `LoginPage` (brand-clapper, at-icon, lock-icon, eye-icon, arrow-right, shield-lock, role-applied, footer-shield, masks-badge).

## Services / API

- `src/services/apiClient.js` — ⚠ Axios instance; default export with baseURL `VITE_API_BASE_URL` and Bearer token from `cinelux_token` localStorage/sessionStorage.
- `src/services/cinemaService.js` — ⚠ Single mock/live service object toggled by `VITE_USE_MOCK_API`; exports `cinemaService` with `getUsers`, `login`, `register`, `getMovies`, `getMovieById`, `getDashboardMetrics`, `getHalls`, `updateHallLayout`, `getShowtimes`, `createShowtime`, `getSeatMap`, `holdSeats`, `getBookings`, `createBooking`.
- `src/utils/pricingCalculator.js` — ⚠ Shared pricing contract for seats/checkout; exports `calculateOrderTotals(seats, options)` returning `ticketCount`, `subtotal`, `imaxSurcharge`, `serviceFee`, `tax`, `total`; defaults surcharge 1.00, service fee 0.20, tax 8.25%.

## Mock Data

- `src/data/movies.json` — ⚠ Array; `id`, `title`, `slug`, `posterUrl`, `durationMinutes`, `director`, `rating`, `rottenTomatoesScore`, `genres`, `formats`, `status` (`NOW_SHOWING|COMING_SOON`), `releaseDate`, `grossVelocity`, `avgOccupancyRate`, `synopsis`.
- `src/data/seats.json` — ⚠ Single showtime map; `showtimeId`, `hallId`, `hallName`, `showtimeLabel`, `holdDurationSeconds`, `matrix{rows,columns,aisleAfterColumn}`, `pricingTiers`, `seats[]{id,row,col,tier,price,status,accessible}`; 8 rows x 12 columns.
- `src/data/bookings.json` — ⚠ Array; `orderId`, `holdCode`, `ticketCode`, `source`, `status`, `customer`, `movieTitle`, `format`, `hall`, `showtime`, `seats[]`, `pricingBreakdown`, `payment`, `gateValidation`.
- `src/data/users.json` — ⚠ Array of demo accounts; `id`, `name`, `email`, `password`, `role` (`customer|scanner|admin`), `phone`, `avatarUrl`, `cinePassBalance`, `token`.
- `src/data/halls.json` — Array; `id`, `name`, `code`, `status`, `utilization`, `totalSeats`, `bookableSeats`, `features`, `curvedScreenLabel`, `specs`, `pricingTiers`, `matrix`.
- `src/data/showtimes.json` — Object; `date`, `timelineWindow{startHour,endHour,stepMinutes}`, `kpis`, `halls[]{hallId,hallName,tag,capacity,sessions[]{id,movieId,movieTitle,startTime,endTime,occupancyPercent,status,basePrice}}`.
- `src/data/dashboard.json` — Object; `systemStatus`, `kpis{totalBookings,confirmedSales,occupancyRate}`, `turnoverAlert`, `showtimesOccupancy[]` and telemetry widgets.

## Config / Env

- `.env.example` — ⚠ Mock/live switch; `VITE_USE_MOCK_API=true` (mock unless value is `"false"`), `VITE_API_BASE_URL=http://localhost:8000/api/v1`.
- `package.json` — Scripts `dev`, `build`, `lint`, `preview`; React 19, Vite 8, Tailwind 4, React Router 7, axios, lucide-react.
- `vite.config.js` — Vite plugins `react()` and `tailwindcss()`; no aliases or proxies.
- `index.html` — Vite HTML entry mounting `#root`.
- `src/main.jsx` — Client entry; imports `index.css` and `App`, renders under `StrictMode`.
- `src/index.css` — `@import "tailwindcss"` plus dark tokens (`#0B0E14`, `#111622`, `#F59E0B`) and Inter/JetBrains Mono font vars.
- `src/App.css` — Unused Vite scaffold styles; not imported anywhere.
- `eslint.config.js` — Flat ESLint config with React hooks and refresh plugins.
- `AGENTS.md` — ⚠ Agent rules: tracker Sheet sync, Figma key `my4V8oncIa4rgg2yYUEXD8`, status human-only, Self-Update Rule.
- `docs/TASK_TRACKER.md` — Task source mirror: `T-01`–`T-30`, `FIX-01`–`FIX-05`, `API-01`–`API-13`, owners, routes, Figma node IDs.
- `docs/AGENT_CONTEXT_BRIEF.md` — One-line pointer to tracker, repo map, contracts, handoffs, lessons.
- `docs/ai/contracts.md` — ⚠ Data shapes plus `cinemaService` signatures and mock toggle behavior.
- `docs/ai/handoff-protocol.md` — Agent ownership table, handoff templates, Token Discipline.
- `docs/ai/lessons.md` — Capped 30-line ledger for repeated fixes and missing context.
- `.agents/rules/cinelux-codebase-guardrails.md` — Always-on theme, ownership, data, Figma invariants, anti-loop rules.
- `.agents/skills/implement-cine-task/SKILL.md` — Workflow for `T-xx`/`FIX-xx`/`API-xx` implementation and tracker deltas.
- `.agents/skills/wire-rest-endpoint/SKILL.md` — Workflow for mock JSON contract plus `src/services/` wiring behind `VITE_USE_MOCK_API`.
