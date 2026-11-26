import apiClient from "./apiClient";
import moviesData from "../data/movies.json";
import seatsData from "../data/seats.json";
import bookingsData from "../data/bookings.json";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

const delay = (result, ms = 150) =>
  new Promise((resolve) => setTimeout(() => resolve(result), ms));

export const cinemaService = {
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
