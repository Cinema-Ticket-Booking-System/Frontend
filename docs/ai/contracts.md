# Data and Service Contracts

Source: `src/data/*.json` and `src/services/cinemaService.js`. Update every consumer when a shape changes.

## Shared types

```ts
type Role = "customer" | "scanner" | "admin";
type SeatStatus = "AVAILABLE" | "SELECTED" | "HELD" | "SOLD" | "BLOCKED";
type MovieStatus = "NOW_SHOWING" | "COMING_SOON";
type Tier = "STANDARD" | "SWEET_SPOT" | "VIP_RECLINER" | "ADA_ACCESSIBLE";
interface Matrix {
  rows: string[];
  columns: number;
  aisleAfterColumn: number;
}
interface TierPrice {
  label: string;
  price: number;
}
```

## src/data/movies.json — Movie[]

```ts
interface Movie {
  id: string;
  title: string;
  slug: string;
  posterUrl: string;
  durationMinutes: number;
  director: string;
  rating: string;
  rottenTomatoesScore: number;
  genres: string[];
  formats: string[];
  status: MovieStatus;
  releaseDate: string;
  grossVelocity: number;
  avgOccupancyRate: number;
  synopsis: string;
}
```

## src/data/seats.json — SeatMap

```ts
interface Seat {
  id: string;
  row: string;
  col: number;
  tier: Tier;
  price: number;
  status: SeatStatus;
  accessible: boolean;
}
interface SeatMap {
  showtimeId: string;
  hallId: string;
  hallName: string;
  showtimeLabel: string;
  holdDurationSeconds: number;
  matrix: Matrix;
  pricingTiers: Record<string, TierPrice>;
  seats: Seat[];
}
```

## src/data/bookings.json — Booking[]

```ts
interface Booking {
  orderId: string;
  holdCode: string;
  ticketCode: string;
  source: string;
  status: string;
  seats: string[];
  customer: { name: string; email: string; phone: string };
  movieTitle: string;
  format: string;
  hall: string;
  showtime: string;
  pricingBreakdown: {
    subtotal: number;
    imaxSurcharge: number;
    serviceFee: number;
    tax: number;
    total: number;
  };
  payment: { method: string; transactionId: string; gateway: string };
  gateValidation: { validated: boolean; timestamp: string; turnstile: string };
}
```

## src/data/users.json — User[]

```ts
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  token: string;
  phone?: string;
  avatarUrl?: string;
  cinePassBalance?: number;
  assignedGate?: string;
  title?: string;
  badge?: string;
}
```

## src/data/halls.json — Hall[]

```ts
interface Hall {
  id: string;
  name: string;
  code: string;
  status: string;
  utilization: number;
  totalSeats: number;
  bookableSeats: number;
  features: string[];
  curvedScreenLabel: string;
  specs: { spacing: string; aisle: string; incline: string };
  pricingTiers: Record<string, TierPrice>;
  matrix: Matrix;
  calculatedMaxGross: number;
}
```

## src/data/showtimes.json — ShowtimeDay

```ts
interface Session {
  id: string;
  movieId: string;
  movieTitle: string;
  startTime: string;
  endTime: string;
  basePrice: number;
  occupancyPercent: number;
  status: string;
  grossRevenue?: number;
  foodAndBeverageYield?: number;
  vipPodReserve?: number;
  cleaningBufferMinutes?: number;
}
interface ShowtimeDay {
  date: string;
  timelineWindow: { startHour: number; endHour: number; stepMinutes: number };
  kpis: {
    scheduledShows: number;
    collisionStatus: string;
    occupancyPercent: number;
    dayGross: number;
    sanitizationPercent: number;
  };
  halls: {
    hallId: string;
    hallName: string;
    tag: string;
    capacity: number;
    sessions: Session[];
  }[];
}
```

## src/data/dashboard.json — Dashboard

```ts
interface Dashboard {
  systemStatus: {
    online: boolean;
    node: string;
    activeHalls: number;
    mode: string;
    date: string;
  };
  kpis: {
    totalBookings: { value: number; deltaPercent: number; subtext: string };
    confirmedSales: {
      value: number;
      currency: string;
      deltaAmount: number;
      subtext: string;
    };
    occupancyRate: { ratePercent: number; capacity: number; peakTime: string };
  };
  turnoverAlert: {
    movieId: string;
    movieTitle: string;
    hall: string;
    status: string;
    subtext: string;
    countdownText: string;
    turnstileFlow: { totalEntries: number; flowDistribution: number[] };
  };
  showtimesOccupancy: {
    id: string;
    movieTitle: string;
    format: string;
    posterUrl: string;
    hall: string;
    time: string;
    price: number;
    status: string;
    occupancy: { booked: number; total: number; percentage: number };
  }[];
}
```

## cinemaService methods

`USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false"` — mock by default; only literal `"false"` calls REST. Sole export is `cinemaService`. Mock promises resolve after 150 ms; REST uses `apiClient` (`VITE_API_BASE_URL`, Bearer `cinelux_token`).

| Method (exact params)                        | Return                                                                                           | Mock behavior                                                                                             | REST endpoint                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `getUsers()`                                 | `Promise<User[]>`                                                                                | users.json plus session-registered users, passwords included                                              | `GET /users`                                        |
| `login({ email, password })`                 | `Promise<{ user: User without password; token: string }>`                                        | email case-insensitive; password checked when supplied; rejects Invalid email or password                 | `POST /auth/login`                                  |
| `register({ name, email, password, phone })` | `Promise<{ user: User without password; token: string }>`                                        | requires name/email/password, rejects duplicate email, role customer, cinePassBalance 25, in-memory only  | `POST /auth/register`                               |
| `getMovies({ status, search } = {})`         | `Promise<Movie[]>`                                                                               | filters status unless ALL and title/genre contains search                                                 | `GET /movies` with params                           |
| `getMovieById(id)`                           | `Promise<Movie \| null>`                                                                         | returns match or null                                                                                     | `GET /movies/:id`                                   |
| `getDashboardMetrics({ date } = {})`         | `Promise<Dashboard>`                                                                             | dashboard.json with date overriding systemStatus.date                                                     | `GET /admin/dashboard/metrics`                      |
| `getHalls()`                                 | `Promise<Hall[]>`                                                                                | cloned halls.json                                                                                         | `GET /admin/auditoriums`                            |
| `updateHallLayout(hallId, layoutPayload)`    | `Promise<Hall>`                                                                                  | merges hall or builds new object; not persisted                                                           | `PUT /admin/auditoriums/:hallId/layout`             |
| `getShowtimes({ date } = {})`                | `Promise<ShowtimeDay>`                                                                           | showtimes.json with date override                                                                         | `GET /admin/showtimes`                              |
| `createShowtime(payload)`                    | `Promise<{ id: string } & typeof payload>`                                                       | returns id sess_timestamp plus payload                                                                    | `POST /admin/showtimes`                             |
| `getSeatMap(showtimeId)`                     | `Promise<SeatMap>`                                                                               | seats.json with showtimeId override                                                                       | `GET /showtimes/:showtimeId/seats`                  |
| `holdSeats(showtimeId, seatIds)`             | `Promise<{ holdCode: string; showtimeId: string; seatIds: string[]; expiresInSeconds: number }>` | fixed holdCode #HLD-84920 and 300 seconds                                                                 | `POST /showtimes/:showtimeId/hold` body { seatIds } |
| `getBookings(params = {})`                   | `Promise<Booking[]>`                                                                             | cloned bookings.json; params ignored                                                                      | `GET /bookings` with params                         |
| `createBooking(payload)`                     | `Promise<Booking>`                                                                               | generates orderId, ticketCode, source POS-WEB-01, status CONFIRMED; payload spread last and overrides all | `POST /bookings`                                    |
