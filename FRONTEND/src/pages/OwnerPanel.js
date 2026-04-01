import React, { useState } from 'react';
import { addProperty, addRoom, getRoomsByProperty, getUserReservations } from '../api';
import { useAuth } from '../context/AuthContext';

export default function OwnerPanel() {
  const { user } = useAuth();
  const [tab, setTab] = useState('addProperty');

  // Add Property
  const [propForm, setPropForm] = useState({ name: '', location: '', amenities: '' });
  const [propMsg, setPropMsg] = useState('');
  const [propErr, setPropErr] = useState('');

  // Add Room
  const [roomForm, setRoomForm] = useState({ propertyId: '', roomSize: '', bedType: 'SINGLE', maxPeople: 1, baseFare: '', ac: false });
  const [roomMsg, setRoomMsg] = useState('');
  const [roomErr, setRoomErr] = useState('');

  // View Rooms
  const [viewPropId, setViewPropId] = useState('');
  const [rooms, setRooms] = useState([]);
  const [roomsErr, setRoomsErr] = useState('');

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setPropErr(''); setPropMsg('');
    try {
      await addProperty({ ...propForm, ownerId: user.userId });
      setPropMsg('✅ Property added successfully!');
      setPropForm({ name: '', location: '', amenities: '' });
    } catch (err) {
      setPropErr(err.response?.data || 'Failed to add property.');
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setRoomErr(''); setRoomMsg('');
    try {
      await addRoom({ ...roomForm, propertyId: parseInt(roomForm.propertyId), maxPeople: parseInt(roomForm.maxPeople), baseFare: parseFloat(roomForm.baseFare) });
      setRoomMsg('✅ Room added successfully!');
    } catch (err) {
      setRoomErr(err.response?.data || 'Failed to add room.');
    }
  };

  const handleViewRooms = async (e) => {
    e.preventDefault();
    setRoomsErr(''); setRooms([]);
    try {
      const res = await getRoomsByProperty(viewPropId);
      const d = res.data;
      setRooms(Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : []);
    } catch {
      setRoomsErr('Failed to load rooms.');
    }
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">🏠 Owner Panel</h4>
      <ul className="nav nav-tabs mb-4">
        {['addProperty', 'addRoom', 'viewRooms'].map((t) => (
          <li className="nav-item" key={t}>
            <button className={`nav-link ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'addProperty' ? '+ Add Property' : t === 'addRoom' ? '+ Add Room' : '📋 View Rooms'}
            </button>
          </li>
        ))}
      </ul>

      {/* Add Property */}
      {tab === 'addProperty' && (
        <div style={{ maxWidth: 480 }}>
          <h6 className="fw-bold mb-3">Add New Property</h6>
          {propMsg && <div className="alert alert-success py-2">{propMsg}</div>}
          {propErr && <div className="alert alert-danger py-2">{propErr}</div>}
          <form onSubmit={handleAddProperty}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Property Name</label>
              <input className="form-control" value={propForm.name} onChange={(e) => setPropForm({ ...propForm, name: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Location</label>
              <input className="form-control" value={propForm.location} onChange={(e) => setPropForm({ ...propForm, location: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Amenities</label>
              <input className="form-control" value={propForm.amenities} onChange={(e) => setPropForm({ ...propForm, amenities: e.target.value })} placeholder="WiFi, Pool, Breakfast" required />
            </div>
            <button className="btn btn-primary">Add Property</button>
          </form>
        </div>
      )}

      {/* Add Room */}
      {tab === 'addRoom' && (
        <div style={{ maxWidth: 480 }}>
          <h6 className="fw-bold mb-3">Add Room to Property</h6>
          {roomMsg && <div className="alert alert-success py-2">{roomMsg}</div>}
          {roomErr && <div className="alert alert-danger py-2">{roomErr}</div>}
          <form onSubmit={handleAddRoom}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Property ID</label>
              <input type="number" className="form-control" value={roomForm.propertyId} onChange={(e) => setRoomForm({ ...roomForm, propertyId: e.target.value })} required placeholder="Enter property ID" />
            </div>
            <div className="row g-3 mb-3">
              <div className="col-6">
                <label className="form-label fw-semibold">Room Size</label>
                <select className="form-select" value={roomForm.roomSize} onChange={(e) => setRoomForm({ ...roomForm, roomSize: e.target.value })} required>
                  <option value="">Select</option>
                  <option>SMALL</option><option>MEDIUM</option><option>LARGE</option><option>SUITE</option>
                </select>
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">Bed Type</label>
                <select className="form-select" value={roomForm.bedType} onChange={(e) => setRoomForm({ ...roomForm, bedType: e.target.value })}>
                  <option>SINGLE</option><option>DOUBLE</option><option>KING</option>
                </select>
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">Max People</label>
                <input type="number" className="form-control" min={1} value={roomForm.maxPeople} onChange={(e) => setRoomForm({ ...roomForm, maxPeople: e.target.value })} required />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">Base Fare (₹/night)</label>
                <input type="number" className="form-control" min={1} step="0.01" value={roomForm.baseFare} onChange={(e) => setRoomForm({ ...roomForm, baseFare: e.target.value })} required />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={roomForm.ac} onChange={(e) => setRoomForm({ ...roomForm, ac: e.target.checked })} id="acCheck" />
                  <label className="form-check-label" htmlFor="acCheck">Air Conditioned</label>
                </div>
              </div>
            </div>
            <button className="btn btn-primary">Add Room</button>
          </form>
        </div>
      )}

      {/* View Rooms */}
      {tab === 'viewRooms' && (
        <div>
          <h6 className="fw-bold mb-3">View Rooms by Property</h6>
          {roomsErr && <div className="alert alert-danger">{roomsErr}</div>}
          <form className="d-flex gap-2 mb-4" onSubmit={handleViewRooms} style={{ maxWidth: 400 }}>
            <input type="number" className="form-control" placeholder="Enter Property ID" value={viewPropId} onChange={(e) => setViewPropId(e.target.value)} required />
            <button className="btn btn-primary">Load</button>
          </form>
          {rooms.length === 0 && viewPropId && <p className="text-muted">No rooms found.</p>}
          <div className="row g-3">
            {rooms.map((r) => (
              <div className="col-md-4" key={r.roomId}>
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="fw-bold">{r.bedType} – {r.roomSize}</h6>
                    <ul className="list-unstyled small text-muted mb-0">
                      <li>👥 Max: {r.maxPeople}</li>
                      <li>❄️ AC: {r.ac ? 'Yes' : 'No'}</li>
                      <li>💰 ₹{r.baseFare}/night</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
