# CineLux React.js Frontend — Task Tracker

- **Google Sheet:** [CineLux React.js Frontend Task Tracker](https://docs.google.com/spreadsheets/d/1n_91on4gb-CKNwX8X_k8Yg1P_7hSlfo8hfW_f7Uqisk/edit)
- **Spreadsheet ID:** `1n_91on4gb-CKNwX8X_k8Yg1P_7hSlfo8hfW_f7Uqisk`
- **Figma File:** [Cinema-Page](https://www.figma.com/design/my4V8oncIa4rgg2yYUEXD8/Cinema-Page?node-id=0-1) (`fileKey`: `my4V8oncIa4rgg2yYUEXD8`)
- **Last Synced:** 2026-11-26
- **Stack:** Vite • Tailwind CSS • React Router • Axios • TanStack Query • Lucide • `qrcode.react`

---

## 1. Overview & Progress Snapshot

| Metric | Value | Notes |
| --- | --- | --- |
| Total Tasks | 30 | Master Tasks (`T-01`–`T-30`) |
| Completed | 3 | `T-01`, `T-02`, `T-03` |
| In Progress | 0 | — |
| Overall Progress | 10.0% | 3 / 30 |
| Total Screens | 11 | 11 Mapped Routes |
| Roadmap Duration | 6 Weeks | 6-Week Sprint Cycle |
| Figma Fixes Open | 5 | `FIX-01`–`FIX-05` |
| Team Capacity | 3 Engineers | Ra Vattra, Yanpich, Sam Visal |

### Teammate Progress Breakdown

| Teammate | Role & Track Assignment | Total Tasks | Completed | In Progress | Not Started | Completion % | Work Status |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| Ra Vattra | Core Setup & Customer Flow | 11 | 3 | 0 | 8 | 27.3% | In Progress |
| Yanpich | Admin Core Management | 9 | 0 | 0 | 9 | 0.0% | Not Started |
| Sam Visal | Movie Discovery & Admin Ops | 10 | 0 | 0 | 10 | 0.0% | Not Started |
| **Total / Overall** | **All Frontend Tracks** | **30** | **3** | **0** | **27** | **10.0%** | **In Progress** |

---

## 2. 6-Week Sprint & Git Workflow Roadmap

| Sprint Week | Milestone & Focus | Git Branch | Assigned Teammate(s) | Architecture & Scope | Key Deliverables | Dependencies & PR Rules | Target Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Week 1 | Setup, Architecture & Design Primitives | `main`, `feat/admin-layout`, `feat/customer-nav` | Ra Vattra, Yanpich, Sam Visal | Vite + Tailwind CSS dark tokens (`#0B0E14`, `#F59E0B`), React Router RBAC skeleton, `AdminLayout` & shared UI primitives, `CustomerNavbar` | T-01, T-02, T-03, T-12, T-13, T-21 | Scaffold baseline to `main`; PR `feat/admin-layout` & `feat/customer-nav` to `main` after review | Ready to Start |
| Week 2 | Authentication & Movie Discovery | `feat/auth-customer-flow`, `feat/admin-management`, `feat/catalog-scheduler-ops` | Ra Vattra, Yanpich, Sam Visal | Dual Sign In/Register tabs with fast roles (`FIX-01`), Public Movie Discovery catalog (`/`), Movie Details & format cards (`/movies/:id`), Sales & Occupancy Dashboard (`FIX-03`) | T-04, T-14, T-22, T-23 | Isolate feature branches; establish movie schema contracts; verify high-contrast dark tokens | Ready to Start |
| Week 3 | Interactive Seat Matrix & Layout Builder | `feat/auth-customer-flow`, `feat/admin-management`, `feat/catalog-scheduler-ops` | Ra Vattra, Yanpich, Sam Visal | Reusable `SeatGrid` engine (booking/editor mode), Customer Seat Selection (`/showtimes/:id/seats`), Movie CRUD management modals, Hall cards & Auditorium Seating Builder (`/admin/auditoriums`) | T-05, T-06, T-15, T-24, T-25 | Ra Vattra exports `SeatGrid` interface; Sam Visal imports into Auditorium Editor; align tier pricing | Ready to Start |
| Week 4 | Checkout, Schedule & QR Verification | `feat/auth-customer-flow`, `feat/admin-management`, `feat/catalog-scheduler-ops` | Ra Vattra, Yanpich, Sam Visal | 4-step Checkout with 5-min hold timer (`FIX-02`), My Tickets & QR boarding pass (`/my-tickets`), Bookings ledger with Ticket Inspector (`FIX-04`) & camera scanner modal, Horizontal Gantt Scheduler (`FIX-05`) | T-07, T-08, T-16, T-17, T-26, T-27 | Unify `calculateOrderTotals()` across checkout & tickets; PR feature branches to staging preview | Ready to Start |
| Week 5 | REST API Integration & Data Sync | `integration/api-endpoints` | Ra Vattra, Yanpich, Sam Visal | Axios JWT interceptors & seat lock API (`POST /showtimes/:id/hold`), Admin metrics & movie CRUD mutations, Bookings & refund API, Discovery & Auditorium layout persistence (`PUT /auditoriums/:id/layout`) | T-09, T-10, T-18, T-19, T-28, T-29 | Cut over from mock JSON to live REST endpoints via TanStack Query; resolve API payload schemas | Ready to Start |
| Week 6 | Edge Cases, Concurrency, QA & Production Deploy | `fix/figma-glitches`, `main` (Release) | Ra Vattra, Yanpich, Sam Visal | Seat concurrency & race condition testing, React Query caching & Vite chunk optimization, cross-browser responsiveness, Gantt snap fine-tuning, Figma glitch sign-off (`FIX-01` to `FIX-05`), prod deployment | T-11, T-20, T-30, Release v1.0.0 | Full regression & cross-browser audit; sign off all 5 Figma fixes; merge to `main`; tag release v1.0.0 | Ready to Start |

---

## 3. Master Task Tracker (`T-01`–`T-30`)

| Task ID | Teammate | Track | Phase | Week | Screen / Route | Task Title | Details & Acceptance Criteria | Priority | Git Branch | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T-01 | Ra Vattra | Core & Customer Booking | W1: Foundation | Week 1 | Global | Vite + React + Tailwind Dark System | Scaffold Vite, React, Tailwind dark tokens (`#0B0E14`, `#111622`, `#F59E0B`), Inter & JetBrains Mono fonts | High | `main` | Done | Core repository baseline & theme tokens |
| T-02 | Ra Vattra | Core & Customer Booking | W1: Foundation | Week 1 | Global | Router & AuthContext (RBAC) | Configure `react-router-dom` layouts, AuthContext (Customer, Scanner, Admin), and `ProtectedRoute` | High | `main` | Done | Role-based access routing skeleton |
| T-03 | Ra Vattra | Core & Customer Booking | W1: Foundation | Week 1 | Global | Mock JSON Schemas & Service Layer | Define `movie.json`, `seats.json`, `bookings.json` contracts and `VITE_USE_MOCK_API` service switcher | High | `main` | Done | Addresses FIX-02 shared pricing baseline |
| T-04 | Ra Vattra | Core & Customer Booking | W2: Mock UI | Week 2 | `/login` | Sign In & Auth Screen | Dual Sign In/Register tabs, password toggle, Remember me, 3 Demo Fast Roles auto-fill; fix white logo contrast | High | `feat/auth-customer-flow` | In Review | Addresses FIX-01 dark contrast bug |
| T-05 | Ra Vattra | Core & Customer Booking | W3: Mock UI | Week 3 | Shared | Reusable SeatGrid Engine | Build 2D seat matrix supporting `mode="booking" \| "editor"`, center aisle, pricing tiers, and 5 seat states | High | `feat/auth-customer-flow` | Not Started | Shared component reused in T-24 |
| T-06 | Ra Vattra | Core & Customer Booking | W3: Mock UI | Week 3 | `/showtimes/:id/seats` | Customer Seat Selection Screen | Integrate `SeatGrid` (booking mode), curved IMAX screen header, tier legend, sticky bar & `calculateOrderTotals()` | High | `feat/auth-customer-flow` | Not Started | Addresses FIX-02 Seat Selection total |
| T-07 | Ra Vattra | Core & Customer Booking | W4: Mock UI | Week 4 | `/checkout` | Checkout & Payment Screen | 4-step progress header, live 5-min hold timer bar, delivery form, Card/Wallet/CinePass mock payment, order summary | High | `feat/auth-customer-flow` | Not Started | Addresses FIX-02 checkout pricing sync |
| T-08 | Ra Vattra | Core & Customer Booking | W4: Mock UI | Week 4 | `/my-tickets` | My Tickets & Digital QR Pass | Upcoming/past tickets list, QR boarding pass render, gate status badge, Wallet pass download button | Medium | `feat/auth-customer-flow` | Not Started | Customer ticket wallet & verification |
| T-09 | Ra Vattra | Core & Customer Booking | W5: API Integration | Week 5 | Global / Auth | Axios Client & Auth API Wiring | Configure Axios JWT interceptors (401 refresh), TanStack Query provider, and live login/register endpoints | High | `integration/api-endpoints` | Not Started | Mock-to-REST auth cutover |
| T-10 | Ra Vattra | Core & Customer Booking | W5: API Integration | Week 5 | `/showtimes/:id/seats` & `/checkout` | Seat Hold & Checkout API Wiring | Connect `POST /showtimes/:id/hold` with server expiration sync, `POST /checkout`, and `GET /my-tickets` | High | `integration/api-endpoints` | Not Started | Real-time seat reservation & payment APIs |
| T-11 | Ra Vattra | Core & Customer Booking | W6: QA & Deploy | Week 6 | Global | Concurrency Testing & Prod Build | Prevent seat-lock race conditions, tune React Query caching, optimize Vite chunks, and deploy production build | High | `main` | Not Started | Production release & performance sign-off |
| T-12 | Yanpich | Admin Core Management | W1: Foundation | Week 1 | `/admin/*` | AdminLayout Shell | Persistent collapsible sidebar (CineLux Operations Core nav + status badge) and topbar (search, live pill, profile) | High | `feat/admin-management` | Not Started | Shell container for operations dashboard |
| T-13 | Yanpich | Admin Core Management | W1: Foundation | Week 1 | Shared | Shared Admin UI Primitives | Build `KpiCard`, `StatusBadge`, `SearchFilterBar`, and `SplitInspectorLayout` (main left + ~360px right inspector) | High | `feat/admin-management` | Not Started | Design system atoms for admin suite |
| T-14 | Yanpich | Admin Core Management | W2: Mock UI | Week 2 | `/admin/dashboard` | Sales & Occupancy Dashboard | 3 KPI cards (fix overflowing blue bar), turnover alert + turnstile flow chart, status/hall filters, occupancy table | High | `feat/admin-management` | Not Started | Addresses FIX-03 KPI bar overflow |
| T-15 | Yanpich | Admin Core Management | W3: Mock UI | Week 3 | `/admin/movies` | Movie Catalog Management | 4 KPI cards, search/filters, grid/table toggle, movie CRUD modals, 3 bottom telemetry widgets (DCP, Genre, Terms) | High | `feat/admin-management` | Not Started | Admin movie management & storage telemetry |
| T-16 | Yanpich | Admin Core Management | W4: Mock UI | Week 4 | `/admin/bookings` | Bookings & Orders Ledger | 4 KPI cards, filterable orders table, and Live Ticket Inspector with `qrcode.react` (remove duplicate top customer block) | High | `feat/admin-management` | Not Started | Addresses FIX-04 duplicate inspector |
| T-17 | Yanpich | Admin Core Management | W4: Mock UI | Week 4 | `/admin/bookings` | Live Camera QR Scanner Modal | Add gate scanner modal in Bookings inspector for Scanner/Admin roles with validation feedback and audit trail | Medium | `feat/admin-management` | Not Started | Hardware QR gate scanning verification |
| T-18 | Yanpich | Admin Core Management | W5: API Integration | Week 5 | `/admin/dashboard` & `/admin/movies` | Dashboard & Movie CRUD API Wiring | Connect live occupancy metrics and `GET/POST/PUT/DELETE /admin/movies` endpoints via TanStack Query mutations | High | `integration/api-endpoints` | Not Started | Live operations telemetry & movie CRUD |
| T-19 | Yanpich | Admin Core Management | W5: API Integration | Week 5 | `/admin/bookings` | Bookings & Refund API Wiring | Connect `GET /admin/bookings`, `POST /admin/bookings/:id/refund`, resend pass, and QR ticket verification API | High | `integration/api-endpoints` | Not Started | Orders ledger & refund processing APIs |
| T-20 | Yanpich | Admin Core Management | W6: QA & Deploy | Week 6 | `/admin/*` | Admin Responsiveness & Figma QA | Audit dark-mode contrast, verify all 5 Figma fixes (`FIX-01` to `FIX-05`), and polish admin table responsiveness | Medium | `fix/figma-glitches` | Not Started | Admin responsiveness & bug sign-off |
| T-21 | Sam Visal | Discovery & Admin Ops | W1: Foundation | Week 1 | Global | CustomerNavbar & Page Containers | Build responsive `CustomerNavbar` (search, My Tickets badge, profile), `CustomerFooter`, and base movie card UI | Medium | `feat/catalog-scheduler-ops` | Not Started | Customer portal navigation & layout |
| T-22 | Sam Visal | Discovery & Admin Ops | W2: Mock UI | Week 2 | `/` & `/movies` | Movie Catalog / Discovery Screen | Build Now Showing vs Coming Soon tabs, header search, genre filter pills, and movie grid with format badges | High | `feat/catalog-scheduler-ops` | Not Started | Public movie discovery portal |
| T-23 | Sam Visal | Discovery & Admin Ops | W2: Mock UI | Week 2 | `/movies/:id` | Movie Details & Showtimes Screen | Synopsis, cast, trailer modal, date selector strip, and auditorium format cards linking to Seat Selection | High | `feat/catalog-scheduler-ops` | Not Started | Movie schedule & detail screen |
| T-24 | Sam Visal | Discovery & Admin Ops | W3: Mock UI | Week 3 | `/admin/auditoriums` | Hall Cards & Seat-Map Builder | 3 selectable hall cards + integrate Ra Vattra's `SeatGrid` (`mode="editor"`, 8x16) with zoom/reset & Grid Snapped toggle | High | `feat/catalog-scheduler-ops` | Not Started | Auditorium layout editor integration |
| T-25 | Sam Visal | Discovery & Admin Ops | W3: Mock UI | Week 3 | `/admin/auditoriums` | Seat Config & Row Batch Panels | Right-hand Seat Configuration form (tier, active/maint, hardware specs) + Row Batch Ops with live max gross calc | High | `feat/catalog-scheduler-ops` | Not Started | Batch row ops & auditorium tier pricing |
| T-26 | Sam Visal | Discovery & Admin Ops | W4: Mock UI | Week 4 | `/admin/showtimes` | Showtime Scheduler & Horizontal Gantt | Date switcher, Gantt/Weekly/List tabs, + Schedule Showtime modal, horizontal 10:00–00:00 timeline across 3 halls | High | `feat/catalog-scheduler-ops` | Not Started | Addresses FIX-05 horizontal timeline |
| T-27 | Sam Visal | Discovery & Admin Ops | W4: Mock UI | Week 4 | `/admin/showtimes` | Session Inspector Panel | Right-hand Session Inspector with occupancy/revenue, editable Base Price, VIP Pod & Cleaning Buffer toggles | Medium | `feat/catalog-scheduler-ops` | Not Started | Showtime session pricing & buffer controls |
| T-28 | Sam Visal | Discovery & Admin Ops | W5: API Integration | Week 5 | `/` & `/movies/:id` | Customer Movie Discovery API Wiring | Connect `GET /movies` and `GET /movies/:id/showtimes` with search/filter query params and loading skeletons | High | `integration/api-endpoints` | Not Started | Customer discovery REST endpoints |
| T-29 | Sam Visal | Discovery & Admin Ops | W5: API Integration | Week 5 | `/admin/auditoriums` & `/showtimes` | Auditorium & Showtime API Wiring | Connect `PUT /admin/auditoriums/:id/layout` and `GET/POST/PUT /admin/showtimes` with collision validation | High | `integration/api-endpoints` | Not Started | Auditorium & scheduler persistence APIs |
| T-30 | Sam Visal | Discovery & Admin Ops | W6: QA & Deploy | Week 6 | All Assigned Screens | Gantt Polish & Cross-Browser QA | Polish Gantt slot snapping, test tablet/mobile breakpoints across discovery & ops pages, run end-to-end QA | Medium | `fix/figma-glitches` | Not Started | Scheduler polish & cross-browser QA |

---

## 4. Figma Mockup Fixes Checklist (`FIX-01`–`FIX-05`)

| Fix ID | Owner | Screen / Route | Issue Description | Required Fix & Technical Implementation | Status | Target Week & Notes |
| --- | --- | --- | --- | --- | --- | --- |
| FIX-01 | Ra Vattra | `/login` | White `'CINE'` text invisible on white outer background | Apply `#0B0E14` dark theme background across full viewport and ensure high-contrast gold/white brand typography | Fixed | Week 2 (`feat/auth-customer-flow`) |
| FIX-02 | Ra Vattra | `/showtimes/:id/seats` & `/checkout` | Total mismatch (`$34.40` on Seat Selection vs `$37.24` on Checkout) | Centralize calculation in shared `calculateOrderTotals()` utility; guarantee identical pricing across booking & payment | Open | Week 4 (`feat/auth-customer-flow`) |
| FIX-03 | Yanpich | `/admin/dashboard` | Blue bar overflows vertically over `'Cap: 360'` in Occupancy Rate KPI | Replace with contained horizontal progress bar with strict `overflow-hidden` and relative height bounds | Open | Week 2 (`feat/admin-management`) |
| FIX-04 | Yanpich | `/admin/bookings` | Live Ticket Inspector duplicates customer/payment block at top with broken spacing | Remove top duplicate customer block; keep clean bottom summary with `qrcode.react` and action buttons | Open | Week 4 (`feat/admin-management`) |
| FIX-05 | Sam Visal | `/admin/showtimes` | Gantt hours (`10:00–00:00`) stacked vertically; KPI values wrap mid-word (`'11 Sho ws'`) | Render hours horizontally across top axis using CSS grid/flex; add `whitespace-nowrap` to prevent mid-word wrapping | Open | Week 4 (`feat/catalog-scheduler-ops`) |

---

## 5. REST API & Mock Integration Tracker (`API-01`–`API-13`)

| Endpoint ID | Owner | Service File | Mock JSON File | Method & Endpoint | Target Week | Mock Ready | API Connected |
| --- | --- | --- | --- | --- | --- | --- | --- |
| API-01 | Ra Vattra | `authService.js` | `users.json` | `POST /api/v1/auth/login` & `/register` | Week 5 | Ready | Not Started |
| API-02 | Sam Visal | `movieService.js` | `movies.json` | `GET /api/v1/movies` (search, genre, status) | Week 5 | Ready | Not Started |
| API-03 | Sam Visal | `movieService.js` | `movies.json` | `GET /api/v1/movies/:id` & `/showtimes` | Week 5 | Pending | Not Started |
| API-04 | Ra Vattra | `seatService.js` | `seats.json` | `GET /api/v1/showtimes/:id/seats` | Week 5 | Ready | Not Started |
| API-05 | Ra Vattra | `seatService.js` | `seats.json` | `POST /api/v1/showtimes/:id/hold` | Week 5 | Ready | Not Started |
| API-06 | Ra Vattra | `bookingService.js` | `bookings.json` | `POST /api/v1/checkout` (confirm & issue QR) | Week 5 | Ready | Not Started |
| API-07 | Ra Vattra | `bookingService.js` | `bookings.json` | `GET /api/v1/my-tickets` | Week 5 | Ready | Not Started |
| API-08 | Yanpich | `dashboardService.js` | `dashboard.json` | `GET /api/v1/admin/dashboard/metrics` | Week 5 | Pending | Not Started |
| API-09 | Yanpich | `movieService.js` | `movies.json` | `POST / PUT / DELETE /api/v1/admin/movies` | Week 5 | Pending | Not Started |
| API-10 | Sam Visal | `auditoriumService.js` | `halls.json` | `GET / PUT /api/v1/admin/auditoriums/:id/layout` | Week 5 | Pending | Not Started |
| API-11 | Sam Visal | `showtimeService.js` | `showtimes.json` | `GET / POST / PUT /api/v1/admin/showtimes` | Week 5 | Pending | Not Started |
| API-12 | Yanpich | `bookingService.js` | `bookings.json` | `GET /api/v1/admin/bookings` & `/verify-qr` | Week 5 | Ready | Not Started |
| API-13 | Yanpich | `bookingService.js` | `bookings.json` | `POST /api/v1/admin/bookings/:id/refund` | Week 5 | Pending | Not Started |

---

## 6. Codebase Audit Notes (vs. Tracker Snapshot)

Checked against the `develop` branch on `2026-11-26`:
- **Completed baseline (`T-01`–`T-03`):**
  - `T-01`: Vite + React 19 + Tailwind CSS v4 configured; dark layouts present (`#0B0E14`).
  - `T-02`: `src/App.jsx`, `src/layouts/CustomerLayout.jsx`, `src/layouts/AdminLayout.jsx`, `src/layouts/AuthLayout.jsx`, and `src/components/common/ProtectedRoute.jsx` are in place (pages currently render `Placeholder`). Note: full `AuthContext` state management is still pending.
  - `T-03`: `src/data/movies.json`, `src/data/seats.json`, `src/data/bookings.json`, `src/services/cinemaService.js`, `src/services/apiClient.js`, and `src/utils/pricingCalculator.js` (`calculateOrderTotals`) are implemented.
- **Dependencies to install before live API / QR work:**
  - `src/services/apiClient.js` already imports `axios`, but `axios`, `@tanstack/react-query`, and `qrcode.react` are not yet in `package.json`.
- **Layout shells already scaffolded:**
  - Baseline `AdminLayout.jsx` (`T-12`) and `CustomerLayout.jsx` (`T-21`) shells already exist in `src/layouts/`, ready for collapsible sidebar/footer/search enhancements.
- **Mock JSON readiness (`6 / 13` Ready):**
  - `API-02`, `API-04`, `API-05`, `API-06`, `API-07`, and `API-12` are backed by `movies.json`, `seats.json`, `bookings.json`, and `cinemaService.js` (`Mock Ready: Ready`). Remaining endpoints still need mock JSON files (`users.json`, `dashboard.json`, `halls.json`, `showtimes.json`) or mock service methods (`API-03`, `API-09`, `API-13`).

---

## 7. Figma Screen-to-Task Map (`Cinema-Page` / `my4V8oncIa4rgg2yYUEXD8`)

| Node ID | Figma Frame Name | Size | Route | Task(s) / Fix(es) |
| --- | --- | --- | --- | --- |
| `1:5767` | Html → Body (Movie Catalog / Discovery) | 1280×2092 | `/` & `/movies` | `T-21`, `T-22` |
| `1:5255` | Movie Details & Showtimes Matrix | 1280×2091 | `/movies/:id` | `T-23` |
| `1:4758` | Interactive Auditorium Seat Map | 1280×1332 | `/showtimes/:id/seats` | `T-05`, `T-06`, `FIX-02` |
| `1:4360` | Checkout & Simulated Payment | 1280×1516 | `/checkout` | `T-07`, `FIX-02` |
| `1:3895` | Digital QR E-Ticket & Booking History | 1280×1982 | `/my-tickets` | `T-08` |
| `1:3761` | Auth — Login & Registration | 1280×1116.75 | `/login` | `T-04`, `FIX-01` |
| `1:4` | Admin Dashboard & Showtime Scheduler | 1280×1128 | `/admin/dashboard` | `T-12`, `T-13`, `T-14`, `FIX-03` |
| `1:486` | Admin — Movie Management | 1280×1539 | `/admin/movies` | `T-15` |
| `1:1187` | Admin — Auditoriums & Seats | 1280×1214 | `/admin/auditoriums` | `T-24`, `T-25` |
| `1:1926` | Admin — Bookings Ledger | 1280×1689.5 | `/admin/bookings` | `T-16`, `FIX-04` |
| `1:2639` | Admin — Showtimes Matrix | 1280×1182 | `/admin/showtimes` | `T-26`, `T-27`, `FIX-05` |
| `1:3165` | Admin — System Settings | 1280×1734 | `/admin/settings` | Admin Settings route |
| `1:3636` | Staff Gate Check-In Scanner | 390×884 | `/admin/bookings` (modal / mobile) | `T-17` |
