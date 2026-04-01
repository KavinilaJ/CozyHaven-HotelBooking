import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', gender: '', phone: '', address: '', role: 'ADMIN'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const res = await register(form);
      setSuccess(res.data || 'Registered successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '85vh', background: '#f0f4ff' }}>
      <div className="card shadow p-4" style={{ width: 480 }}>
        <h4 className="text-center fw-bold mb-1">🏨 Create Account</h4>
        <p className="text-center text-muted small mb-4">Join CozyHaven Stay</p>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold">Full Name</label>
              <input className="form-control" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Password <small className="text-muted">(min 6 chars)</small></label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required minLength={6} />
            </div>
            <div className="col-6">
              <label className="form-label fw-semibold">Gender</label>
              <select className="form-select" name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label fw-semibold">Phone <small className="text-muted">(10 digits)</small></label>
              <input className="form-control" name="phone" value={form.phone} onChange={handleChange} required pattern="^[0-9]{10}$" placeholder="9876543210" />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Address</label>
              <input className="form-control" name="address" value={form.address} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Register As</label>
              <select className="form-select" name="role" value={form.role} onChange={handleChange}>
                <option value="USER">Guest (User)</option>
                <option value="OWNER">Property Owner</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary w-100 mt-4" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-3 mb-0 small">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
