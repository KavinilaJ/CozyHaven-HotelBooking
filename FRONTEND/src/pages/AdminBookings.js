import React, { useEffect, useState } from "react";
import {
  getAllReservations,
  cancelReservation,
} from "../api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  // ✅ Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await getAllReservations();
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  // ✅ Cancel booking
  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await cancelReservation(id);
      fetchBookings(); // refresh
    } catch (err) {
      console.error("Cancel failed", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📅 All Bookings</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b.reservationId}>
                  <td>{b.reservationId}</td>
                  <td>{b.userName}</td>
                  <td>{b.userEmail}</td>
                  <td>{b.propertyName}</td>
                  <td>{b.roomType}</td>

                  <td>
                    <span
                      className={`badge ${
                        b.status === "CANCELLED"
                          ? "bg-danger"
                          : "bg-success"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td>{b.checkInDate}</td>
                  <td>{b.checkOutDate}</td>

                  <td>
                    {b.status !== "CANCELLED" && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleCancel(b.reservationId)
                        }
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}