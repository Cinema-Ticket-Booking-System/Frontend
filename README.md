# CineLux — Cinema Ticket Booking System (React.js Frontend)

Frontend web application for **CineLux Multiplex Theatres**, covering public movie discovery, interactive seat selection, checkout & digital QR passes, and an admin operations console.

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** React Router v7 (`react-router-dom`)
- **Icons:** `lucide-react`
- **Planned Integrations:** `axios`, `@tanstack/react-query`, `qrcode.react`

## Getting Started

```bash
npm install
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env` to configure mock vs. live REST API mode:

```env
VITE_USE_MOCK_API=true
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

## Project Structure

- `src/layouts/` — `CustomerLayout`, `AdminLayout`, `AuthLayout`
- `src/components/common/` — `ProtectedRoute` and shared components
- `src/pages/` — Customer, Auth, and Admin screens (currently routed via `Placeholder.jsx`)
- `src/services/` — `apiClient.js` and `cinemaService.js` (`VITE_USE_MOCK_API` switcher)
- `src/data/` — Mock JSON contracts (`movies.json`, `seats.json`, `bookings.json`)
- `src/utils/` — `pricingCalculator.js` (`calculateOrderTotals`)

## Task Tracking

Project progress, sprint roadmap, Figma fixes, and REST API endpoints are tracked in Google Sheets and mirrored in [`docs/TASK_TRACKER.md`](./docs/TASK_TRACKER.md):

- **Google Sheet:** [CineLux React.js Frontend Task Tracker](https://docs.google.com/spreadsheets/d/1n_91on4gb-CKNwX8X_k8Yg1P_7hSlfo8hfW_f7Uqisk/edit)
- **Spreadsheet ID:** `1n_91on4gb-CKNwX8X_k8Yg1P_7hSlfo8hfW_f7Uqisk`
