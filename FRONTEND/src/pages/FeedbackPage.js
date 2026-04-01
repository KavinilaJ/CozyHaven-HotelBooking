import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFeedback } from '../api';
import { useAuth } from '../context/AuthContext';

export default function FeedbackPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ propertyId: '', rating: 5, comment: '' });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(''); setMsg('');
    setLoading(true);
    try {
      await addFeedback({
        userId: user.userId,
        propertyId: parseInt(form.propertyId),
        rating: parseInt(form.rating),
        comment: form.comment,
      });
      setMsg('✅ Thank you for your feedback!');
      setForm({ propertyId: '', rating: 5, comment: '' });
    } catch (err) {
      setErr(err.response?.data || 'Failed to submit feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '80vh', background: '#f0f4ff' }}>
      <div className="card shadow p-4" style={{ width: 460 }}>
        <h4 className="fw-bold mb-1 text-center">⭐ Leave Feedback</h4>
        <p className="text-center text-muted small mb-4">Share your experience</p>

        {msg && <div className="alert alert-success py-2">{msg}</div>}
        {err && <div className="alert alert-danger py-2">{err}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Property ID</label>
            <input
              type="number"
              className="form-control"
              value={form.propertyId}
              onChange={(e) => setForm({ ...form, propertyId: e.target.value })}
              required
              placeholder="Enter the property ID"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Rating</label>
            <div className="d-flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`btn btn-sm ${form.rating >= star ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => setForm({ ...form, rating: star })}
                  style={{ fontSize: 20 }}
                >
                  ★
                </button>
              ))}
              <span className="ms-2 align-self-center text-muted">{form.rating}/5</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Comment</label>
            <textarea
              className="form-control"
              rows={4}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              required
              placeholder="Describe your stay..."
            />
          </div>
          <button className="btn btn-warning w-100 fw-bold" disabled={loading}>
            {loading ? 'Submitting...' : '⭐ Submit Feedback'}
          </button>
        </form>
        <button className="btn btn-link w-100 mt-2 text-muted" onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    </div>
  );
}
