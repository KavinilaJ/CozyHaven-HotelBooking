import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { processPayment } from '../api';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation || null;

  const [amount, setAmount] = useState(reservation?.totalPrice || '');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    setErr(''); setMsg('');
    setLoading(true);
    try {
      await processPayment({ reservationId: reservation.reservationId, amount: parseFloat(amount) });
      setMsg('✅ Payment successful!');
      setTimeout(() => navigate('/my-bookings'), 1800);
    } catch (err) {
      setErr(err.response?.data || 'Payment failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!reservation) return (
    <div className="container py-5 text-center">
      <p className="text-muted">No reservation selected.</p>
      <button className="btn btn-primary" onClick={() => navigate('/my-bookings')}>Go to My Bookings</button>
    </div>
  );

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', background: '#f0f4ff' }}>
      <div className="card shadow p-4" style={{ width: 420 }}>
        <h4 className="fw-bold mb-1 text-center">💳 Complete Payment</h4>
        <p className="text-center text-muted small mb-4">Booking #{reservation.reservationId}</p>

        {msg && <div className="alert alert-success py-2">{msg}</div>}
        {err && <div className="alert alert-danger py-2">{err}</div>}

        <div className="bg-light rounded p-3 mb-4">
          <div className="d-flex justify-content-between mb-1">
            <span className="text-muted">Room</span>
            <span className="fw-semibold">{reservation.room?.bedType} – {reservation.room?.roomSize}</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-muted">Check-in</span>
            <span>{reservation.checkIn}</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-muted">Check-out</span>
            <span>{reservation.checkOut}</span>
          </div>
          <hr className="my-2" />
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Total Amount</span>
            <span className="fw-bold text-success fs-5">₹{reservation.totalPrice}</span>
          </div>
        </div>

        <form onSubmit={handlePay}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Amount to Pay (₹)</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1}
              step="0.01"
              required
            />
          </div>
          <button className="btn btn-success w-100 fw-bold" disabled={loading}>
            {loading ? 'Processing...' : '💳 Pay Now'}
          </button>
        </form>
        <button className="btn btn-link w-100 mt-2 text-muted" onClick={() => navigate('/my-bookings')}>
          Back to My Bookings
        </button>
      </div>
    </div>
  );
}
