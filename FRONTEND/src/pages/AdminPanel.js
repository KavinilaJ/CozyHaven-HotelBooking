import React, { useState } from 'react';
import { getAllProperties, searchProperties, getRoomsByProperty, addProperty } from '../api';

export default function AdminPanel() {
  const [tab, setTab] = useState('properties');

  // Properties
  const [properties, setProperties] = useState([]);
  const [propLoading, setPropLoading] = useState(false);
  const [propErr, setPropErr] = useState('');
  const [propLoaded, setPropLoaded] = useState(false);

  // Rooms inspect
  const [inspectId, setInspectId] = useState('');
  const [rooms, setRooms] = useState([]);
  const [roomsErr, setRoomsErr] = useState('');

  const loadProperties = async () => {
    setPropLoading(true); setPropErr('');
    try {
      const res = await getAllProperties();
      const d = res.data;
      setProperties(Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : []);
      setPropLoaded(true);
    } catch {
      setPropErr('Failed to load properties.');
    } finally {
      setPropLoading(false);
    }
  };

  const handleInspectRooms = async (e) => {
    e.preventDefault();
    setRoomsErr(''); setRooms([]);
    try {
      const res = await getRoomsByProperty(inspectId);
      const d = res.data;
      setRooms(Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : []);
    } catch {
      setRoomsErr('Failed to load rooms.');
    }
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">🔧 Admin Panel</h4>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${tab === 'properties' ? 'active' : ''}`} onClick={() => setTab('properties')}>🏨 All Properties</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === 'rooms' ? 'active' : ''}`} onClick={() => setTab('rooms')}>🛏️ Inspect Rooms</button>
        </li>
      </ul>

      {/* All Properties */}
      {tab === 'properties' && (
        <div>
          <button className="btn btn-primary mb-4" onClick={loadProperties} disabled={propLoading}>
            {propLoading ? 'Loading...' : propLoaded ? '🔄 Refresh' : '📋 Load All Properties'}
          </button>
          {propErr && <div className="alert alert-danger">{propErr}</div>}
          {properties.length === 0 && propLoaded && <p className="text-muted">No properties found.</p>}
          <div className="table-responsive">
            {properties.length > 0 && (
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Amenities</th>
                    <th>Rooms</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.propertyId}>
                      <td>{p.propertyId}</td>
                      <td className="fw-semibold">{p.name}</td>
                      <td>{p.location}</td>
                      <td><small>{p.amenities}</small></td>
                      <td>{p.rooms?.length ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Inspect Rooms */}
      {tab === 'rooms' && (
        <div>
          <form className="d-flex gap-2 mb-4" onSubmit={handleInspectRooms} style={{ maxWidth: 400 }}>
            <input type="number" className="form-control" placeholder="Property ID" value={inspectId} onChange={(e) => setInspectId(e.target.value)} required />
            <button className="btn btn-primary">Inspect</button>
          </form>
          {roomsErr && <div className="alert alert-danger">{roomsErr}</div>}
          {rooms.length === 0 && inspectId && <p className="text-muted">No rooms found.</p>}
          {rooms.length > 0 && (
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Room ID</th>
                  <th>Size</th>
                  <th>Bed</th>
                  <th>Max People</th>
                  <th>AC</th>
                  <th>Fare/Night</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r.roomId}>
                    <td>{r.roomId}</td>
                    <td>{r.roomSize}</td>
                    <td>{r.bedType}</td>
                    <td>{r.maxPeople}</td>
                    <td>{r.ac ? '✅' : '❌'}</td>
                    <td>₹{r.baseFare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
