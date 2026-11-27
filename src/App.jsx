import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Placeholder from "./pages/Placeholder";
import LoginPage from "./pages/auth/LoginPage";
import SeatGridPreview from "./pages/customer/SeatGridPreview";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Route */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Customer Facing Routes */}
          <Route element={<CustomerLayout />}>
            <Route
              path="/"
              element={
                <Placeholder
                  title="Movie Catalog Discovery"
                  owner="Sam Visal"
                />
              }
            />
            <Route
              path="now-showing"
              element={
                <Placeholder
                  title="Movie Catalog Discovery"
                  owner="Sam Visal"
                />
              }
            />
            <Route
              path="coming-soon"
              element={
                <Placeholder
                  title="Movie Catalog Discovery"
                  owner="Sam Visal"
                />
              }
            />
            <Route
              path="/movies/:id"
              element={
                <Placeholder
                  title="Movie Details & Showtimes"
                  owner="Sam Visal"
                />
              }
            />
            <Route
              path="/showtimes/:id/seats"
              element={
                <Placeholder title="Seat Selection Grid" owner="Ra Vattra" />
              }
            />
            <Route path="/dev/seat-grid" element={<SeatGridPreview />} />
            <Route
              path="/checkout"
              element={
                <Placeholder title="Checkout & Payment" owner="Ra Vattra" />
              }
            />
            <Route
              path="/my-tickets"
              element={
                <Placeholder title="My Tickets & QR Pass" owner="Ra Vattra" />
              }
            />
          </Route>

          {/* Admin Operations Core (Protected) */}
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "scanner"]} />}
          >
            <Route element={<AdminLayout />}>
              <Route
                path="/admin"
                element={<Navigate to="/admin/dashboard" replace />}
              />
              <Route
                path="/admin/dashboard"
                element={
                  <Placeholder
                    title="Sales & Occupancy Dashboard"
                    owner="Yanpich"
                  />
                }
              />
              <Route
                path="/admin/movies"
                element={
                  <Placeholder
                    title="Movie Catalog Management"
                    owner="Yanpich"
                  />
                }
              />
              <Route
                path="/admin/auditoriums"
                element={
                  <Placeholder
                    title="Auditoriums & Seating Builder"
                    owner="Sam Visal"
                  />
                }
              />
              <Route
                path="/admin/showtimes"
                element={
                  <Placeholder
                    title="Showtime Master Scheduler"
                    owner="Sam Visal"
                  />
                }
              />
              <Route
                path="/admin/bookings"
                element={
                  <Placeholder
                    title="Bookings & Orders (QR Inspector)"
                    owner="Yanpich"
                  />
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <Placeholder
                    title="Settings & Access Control"
                    owner="Yanpich"
                  />
                }
              />
            </Route>
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
