import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomsByProperty, createReservation } from '../api';
import { useAuth } from '../context/AuthContext';

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking modal state
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [booking, setBooking] = useState({ checkIn: '', checkOut: '', adults: 1, children: 0 });
  const [bookingMsg, setBookingMsg] = useState('');
  const [bookingErr, setBookingErr] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    getRoomsByProperty(propertyId)
      .then((res) => {
        const d = res.data;
        setRooms(Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : []);
      })
      .catch(() => setError('Failed to load rooms.'))
      .finally(() => setLoading(false));
  }, [propertyId]);

  const openBooking = (room) => {
    if (!user) { navigate('/login'); return; }
    setSelectedRoom(room);
    setBookingMsg(''); setBookingErr('');
    setBooking({ checkIn: '', checkOut: '', adults: 1, children: 0 });
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setBookingErr(''); setBookingMsg('');
    setBookingLoading(true);
    try {
      await createReservation({
        userId: user.userId,
        roomId: selectedRoom.roomId,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        adults: parseInt(booking.adults),
        children: parseInt(booking.children),
      });
      setBookingMsg('✅ Booking confirmed!');
      setTimeout(() => { setSelectedRoom(null); navigate('/my-bookings'); }, 1500);
    } catch (err) {
      setBookingErr(err.response?.data || 'Booking failed.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <button className="btn btn-outline-secondary btn-sm mb-4" onClick={() => navigate(-1)}>← Back</button>
      <h4 className="fw-bold mb-1">Available Rooms</h4>
      <p className="text-muted mb-4">Property ID: {propertyId}</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-center py-5"><div className="spinner-border text-primary" /></div>}

      {!loading && rooms.length === 0 && (
        <div className="alert alert-info">No rooms available for this property.</div>
      )}

      <div className="row g-4">
        {rooms.map((room) => (
          <div className="col-md-4" key={room.roomId}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title fw-bold mb-0">{room.bedType} Bed</h5>
                  <span className="badge bg-primary">{room.roomSize}</span>
                </div>
                <ul className="list-unstyled small text-muted mb-3">
                  <li>👥 Max Guests: {room.maxPeople}</li>
                  <li>❄️ AC: {room.ac ? 'Yes' : 'No'}</li>
                </ul>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-success fs-5">₹{room.baseFare}/night</span>
                  <button className="btn btn-primary btn-sm" onClick={() => openBooking(room)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Book: {selectedRoom.bedType} Bed</h5>
                <button className="btn-close" onClick={() => setSelectedRoom(null)} />
              </div>
              <form onSubmit={handleBook}>
                <div className="modal-body">
                  {bookingMsg && <div className="alert alert-success py-2">{bookingMsg}</div>}
                  {bookingErr && <div className="alert alert-danger py-2">{bookingErr}</div>}
                  <div className="row g-3">
                    <div className="col-6">
                      <label className="form-label fw-semibold">Check-In</label>
                      <input type="date" className="form-control" value={booking.checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })} required />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold">Check-Out</label>
                      <input type="date" className="form-control" value={booking.checkOut}
                        min={booking.checkIn || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })} required />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold">Adults</label>
                      <input type="number" className="form-control" min={1} max={selectedRoom.maxPeople}
                        value={booking.adults} onChange={(e) => setBooking({ ...booking, adults: e.target.value })} required />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold">Children</label>
                      <input type="number" className="form-control" min={0}
                        value={booking.children} onChange={(e) => setBooking({ ...booking, children: e.target.value })} />
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-light rounded">
                    <strong>Base Fare:</strong> ₹{selectedRoom.baseFare}/night
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedRoom(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={bookingLoading}>
                    {bookingLoading ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
