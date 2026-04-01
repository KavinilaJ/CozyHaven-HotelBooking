import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      
      {/* Logo */}
      <Link className="navbar-brand fw-bold" to="/">
        🏨 CozyHaven
      </Link>

      {/* Right Side */}
      <div className="ms-auto d-flex align-items-center gap-3">

        {/* ================= GUEST ================= */}
        {!user && (
          <>
            <Link className="btn btn-outline-light btn-sm" to="/login">
              Login
            </Link>
            <Link className="btn btn-light btn-sm text-primary fw-semibold" to="/register">
              Register
            </Link>
          </>
        )}

        {/* ================= USER ================= */}
        {user && user.role === "USER" && (
          <>
            <span className="text-white-50 small">
              {user.email}
              <span className="badge bg-warning text-dark ms-2">USER</span>
            </span>

            {/* Use Cases */}
            <Link className="btn btn-outline-light btn-sm" to="/">
              Search Hotels
            </Link>

            <Link className="btn btn-outline-light btn-sm" to="/my-bookings">
              My Reservations
            </Link>

          
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* ================= OWNER ================= */}
        {user && user.role === "OWNER" && (
          <>
            <span className="text-white-50 small">
              {user.email}
              <span className="badge bg-info text-dark ms-2">OWNER</span>
            </span>

            {/* Use Cases */}
            <Link className="btn btn-outline-light btn-sm" to="/owner">
              Manage Rooms
            </Link>

            <Link className="btn btn-outline-light btn-sm" to="/owner/bookings">
              Manage Bookings
            </Link>

            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {user && user.role === "ADMIN" && (
          <>
            <span className="text-white-50 small">
              {user.email}
              <span className="badge bg-danger ms-2">ADMIN</span>
            </span>

            {/* Use Cases */}
            <Link className="btn btn-outline-light btn-sm" to="/admin/users">
              Users
            </Link>

            <Link className="btn btn-outline-light btn-sm" to="/admin/hotels">
              Hotels
            </Link>

            <Link className="btn btn-outline-light btn-sm" to="/admin/bookings">
              All Bookings
            </Link>

            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}