import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserReservations, cancelReservation } from '../api';
import { useAuth } from '../context/AuthContext';

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const fetchBookings = () => {
    setLoading(true);
    getUserReservations(user.userId)
      .then((res) => {
        const d = res.data;
        setBookings(Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : []);
      })
      .catch(() => setError('Failed to load bookings.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      const res = await cancelReservation(id);
      setMsg(res.data || 'Booking cancelled.');
      fetchBookings();
    } catch {
      setMsg('Cancellation failed.');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">📋 My Bookings</h4>
        <button className="btn btn-outline-warning btn-sm" onClick={() => navigate('/feedback')}>
          ⭐ Leave Feedback
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {msg && (
        <div className="alert alert-info alert-dismissible">
          {msg}
          <button type="button" className="btn-close" onClick={() => setMsg('')} />
        </div>
      )}
      {loading && <div className="text-center py-5"><div className="spinner-border text-primary" /></div>}

      {!loading && bookings.length === 0 && (
        <div className="text-center py-5 text-muted">
          <div style={{ fontSize: 48 }}>🏨</div>
          <p className="fs-5 mt-3">No bookings yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Hotels</button>
        </div>
      )}

      <div className="row g-4">
        {bookings.map((b) => (
          <div className="col-md-6" key={b.reservationId}>
            <div className={`card h-100 shadow-sm border-0 border-start border-4 ${b.status === 'CONFIRMED' ? 'border-success' : 'border-danger'}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-bold mb-0">Booking #{b.reservationId}</h6>
                  <span className={`badge ${b.status === 'CONFIRMED' ? 'bg-success' : 'bg-danger'}`}>{b.status}</span>
                </div>
                <ul className="list-unstyled small mb-3">
                  <li>🛏️ <strong>{b.room?.bedType}</strong> – {b.room?.roomSize}</li>
                  <li>📅 Check-in: <strong>{b.checkIn}</strong></li>
                  <li>📅 Check-out: <strong>{b.checkOut}</strong></li>
                  <li>👥 Adults: {b.adults} | Children: {b.children}</li>
                  <li className="mt-1 text-success fw-semibold">💰 Total: ₹{b.totalPrice}</li>
                </ul>
                {b.status === 'CONFIRMED' && (
                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => navigate('/payment', { state: { reservation: b } })}
                    >
                      💳 Pay Now
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleCancel(b.reservationId)}
                    >
                      ✖ Cancel
                    </button>
                  </div>
                )}
                {b.status === 'CANCELLED' && (
                  <span className="text-muted small">This booking has been cancelled.</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
