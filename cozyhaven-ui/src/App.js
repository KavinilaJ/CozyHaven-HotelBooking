import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute, RoleRoute } from "./routes/PrivateRoute";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetail from "./pages/PropertyDetail";
import MyBookings from "./pages/MyBookings";
import OwnerPanel from "./pages/OwnerPanel";
import AdminPanel from "./pages/AdminPanel";
import Payment from "./pages/Payment";
import FeedbackPage from "./pages/FeedbackPage";
import AdminUsers from "./pages/AdminUsers";

import Adminhotes from "./pages/Adminhotes";
import Rooms from "./pages/Rooms";
import AdminBookings from "./pages/AdminBookings";
import OwnerBookings from "./pages/OwnerBookings";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:propertyId" element={<PropertyDetail />} />

          {/* User (logged in) */}
          <Route
            path="/my-bookings"
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <PrivateRoute>
                <FeedbackPage />
              </PrivateRoute>
            }
          />

          {/* Owner */}
          <Route
            path="/owner"
            element={
              <RoleRoute role="OWNER">
                <OwnerPanel />
              </RoleRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <RoleRoute role="ADMIN">
                <AdminPanel />
              </RoleRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <div style={{ fontSize: 64 }}>🏨</div>
                <h2 className="mt-3">404 – Page Not Found</h2>
                <a href="/" className="btn btn-primary mt-3">
                  Go Home
                </a>
              </div>
            }
          />

          <Route path="/admin/users" element={<AdminUsers />} />
          
          <Route path="/admin/hotels" element={<Adminhotes />} />

          <Route path="/rooms/:propertyId" element={<Rooms />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />

          <Route path="/owner/bookings" element={<OwnerBookings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
