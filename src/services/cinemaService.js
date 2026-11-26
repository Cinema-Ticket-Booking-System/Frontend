import apiClient from "./apiClient";
import usersData from "../data/users.json";
import moviesData from "../data/movies.json";
import seatsData from "../data/seats.json";
import bookingsData from "../data/bookings.json";
import dashboardData from "../data/dashboard.json";
import hallsData from "../data/halls.json";
import showtimesData from "../data/showtimes.json";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

const delay = (result, ms = 150) =>
  new Promise((resolve) => setTimeout(() => resolve(result), ms));

// In-memory store for users created via mock registration during the session
const registeredMockUsers = [];

function sanitizeUser(user) {
  const safeUser = { ...user };
  delete safeUser.password;
  return safeUser;
}

export const cinemaService = {
  // --- Users & Auth ---
  async getUsers() {
    if (USE_MOCK_API) {
      return delay([...usersData, ...registeredMockUsers]);
    }
    const { data } = await apiClient.get("/users");
    return data;
  },

  async login(credentials = {}) {
    if (USE_MOCK_API) {
      const { email, password } = credentials;
      const allUsers = [...usersData, ...registeredMockUsers];
      const matched = allUsers.find(
        (u) =>
          u.email.toLowerCase() ===
            String(email || "")
              .trim()
              .toLowerCase() &&
          (!password || u.password === password),
      );
      if (!matched) {
        return Promise.reject(new Error("Invalid email or password"));
      }
      return delay({ user: sanitizeUser(matched), token: matched.token });
    }
    const { data } = await apiClient.post("/auth/login", credentials);
    return data;
  },

  async register(payload = {}) {
    if (USE_MOCK_API) {
      const name = String(payload.name || "").trim();
      const email = String(payload.email || "")
        .trim()
        .toLowerCase();
      const password = String(payload.password || "");

      if (!name || !email || !password) {
        return Promise.reject(
          new Error("Full name, email, and password are required."),
        );
      }

      const allUsers = [...usersData, ...registeredMockUsers];
      const exists = allUsers.some((u) => u.email.toLowerCase() === email);
      if (exists) {
        return Promise.reject(
          new Error("An account with this email already exists."),
        );
      }

      const newUser = {
        id: `usr_customer_${Date.now()}`,
        name,
        email,
        password,
        role: "customer",
        phone: payload.phone || "",
        cinePassBalance: 25.0,
        token: `mock-jwt-customer-${Date.now()}`,
      };
      registeredMockUsers.push(newUser);
      return delay({ user: sanitizeUser(newUser), token: newUser.token });
    }
    const { data } = await apiClient.post("/auth/register", payload);
    return data;
  },

  // --- Movies ---
  async getMovies(params = {}) {
    if (USE_MOCK_API) {
      const { status, search } = params;
      let list = [...moviesData];
      if (status && status !== "ALL") {
        list = list.filter((m) => m.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.genres.some((g) => g.toLowerCase().includes(q)),
        );
      }
      return delay(list);
    }
    const { data } = await apiClient.get("/movies", { params });
    return data;
  },

  async getMovieById(id) {
    if (USE_MOCK_API) {
      return delay(moviesData.find((m) => m.id === id) || null);
    }
    const { data } = await apiClient.get(`/movies/${id}`);
    return data;
  },

  // --- Admin Dashboard ---
  async getDashboardMetrics(params = {}) {
    if (USE_MOCK_API) {
      return delay({
        ...dashboardData,
        date: params.date || dashboardData.systemStatus.date,
      });
    }
    const { data } = await apiClient.get("/admin/dashboard/metrics", {
      params,
    });
    return data;
  },

  // --- Auditoriums & Halls ---
  async getHalls() {
    if (USE_MOCK_API) {
      return delay([...hallsData]);
    }
    const { data } = await apiClient.get("/admin/auditoriums");
    return data;
  },

  async updateHallLayout(hallId, layoutPayload) {
    if (USE_MOCK_API) {
      const target = hallsData.find((h) => h.id === hallId);
      const updated = target
        ? { ...target, ...layoutPayload }
        : { id: hallId, ...layoutPayload };
      return delay(updated);
    }
    const { data } = await apiClient.put(
      `/admin/auditoriums/${hallId}/layout`,
      layoutPayload,
    );
    return data;
  },

  // --- Showtimes & Gantt Scheduler ---
  async getShowtimes(params = {}) {
    if (USE_MOCK_API) {
      return delay({
        ...showtimesData,
        date: params.date || showtimesData.date,
      });
    }
    const { data } = await apiClient.get("/admin/showtimes", { params });
    return data;
  },

  async createShowtime(payload) {
    if (USE_MOCK_API) {
      return delay({
        id: `sess_${Date.now()}`,
        ...payload,
      });
    }
    const { data } = await apiClient.post("/admin/showtimes", payload);
    return data;
  },

  // --- Seats & Holds ---
  async getSeatMap(showtimeId) {
    if (USE_MOCK_API) {
      return delay({
        ...seatsData,
        showtimeId: showtimeId || seatsData.showtimeId,
      });
    }
    const { data } = await apiClient.get(`/showtimes/${showtimeId}/seats`);
    return data;
  },

  async holdSeats(showtimeId, seatIds) {
    if (USE_MOCK_API) {
      return delay({
        holdCode: "#HLD-84920",
        showtimeId,
        seatIds,
        expiresInSeconds: 300,
      });
    }
    const { data } = await apiClient.post(`/showtimes/${showtimeId}/hold`, {
      seatIds,
    });
    return data;
  },

  // --- Bookings & Checkout ---
  async getBookings(params = {}) {
    if (USE_MOCK_API) {
      return delay([...bookingsData]);
    }
    const { data } = await apiClient.get("/bookings", { params });
    return data;
  },

  async createBooking(payload) {
    if (USE_MOCK_API) {
      const newOrder = {
        orderId: `BK-${Math.floor(88500 + Math.random() * 900)}`,
        holdCode: payload.holdCode || "#HLD-84920",
        ticketCode: `TCK-${Math.floor(88500 + Math.random() * 900)}-IMX`,
        source: "POS-WEB-01",
        status: "CONFIRMED",
        ...payload,
      };
      return delay(newOrder);
    }
    const { data } = await apiClient.post("/bookings", payload);
    return data;
  },
};
