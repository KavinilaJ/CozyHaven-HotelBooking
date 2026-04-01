import React, { useEffect, useState } from "react";
import { getOwnerBookings } from "../api";
import {
  cancelReservation,
} from "../api";

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await getOwnerBookings();
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };
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
      <h2>🏨 My Hotel Bookings</h2>

      <table className="table mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.reservationId}>
              <td>{b.reservationId}</td>
              <td>{b.userName}</td>
              <td>{b.propertyName}</td>
              <td>{b.roomType}</td>
              <td>{b.status}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}