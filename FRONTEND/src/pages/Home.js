import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProperties,
  searchProperties,
  getFeedbackByProperty,
} from "../api";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ⭐ Feedback states
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.content)) return data.content;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getAllProperties();
      setProperties(toArray(res.data));
    } catch {
      setError("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = search.trim()
        ? await searchProperties(search.trim())
        : await getAllProperties();
      setProperties(toArray(res.data));
    } catch {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Fetch feedback
  const fetchFeedback = async (propertyId, name) => {
    try {
      const res = await getFeedbackByProperty(propertyId);
      setFeedbacks(res.data);
      setSelectedHotel(name);
    } catch (err) {
      console.error("Feedback error", err);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary text-white py-5 text-center">
        <h1 className="fw-bold display-5">Find Your Perfect Stay</h1>
        <p className="lead mb-4">Discover cozy hotels across India</p>

        <form
          onSubmit={handleSearch}
          className="d-flex justify-content-center gap-2 flex-wrap px-3"
        >
          <input
            className="form-control"
            style={{ maxWidth: 320 }}
            placeholder="Search by location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-warning fw-bold px-4">
            🔍 Search
          </button>

          {search && (
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={() => {
                setSearch("");
                fetchAll();
              }}
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Results */}
      <div className="container py-4">
        {error && <div className="alert alert-danger">{error}</div>}

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center text-muted py-5">
            <p>No properties found</p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="row g-4">
            {properties.map((p) => (
              <div className="col-md-4" key={p.propertyId}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold">{p.name}</h5>

                    <p className="text-muted">
                      📍 {p.location}
                    </p>

                    <p className="text-muted small">
                      ✨ {p.amenities}
                    </p>

                    {/* 🔥 Buttons */}
                    <div className="mt-auto d-flex gap-2">
                       <button
                        className="btn btn-outline-primary btn-sm w-50"
                        onClick={() =>
                          navigate(`/property/${p.propertyId}`)
                        }
                      >
                        Rooms
                      </button>

                      <button
                        className="btn btn-outline-success btn-sm w-50"
                        data-bs-toggle="modal"
                        data-bs-target="#feedbackModal"
                        onClick={() =>
                          fetchFeedback(p.propertyId, p.name)
                        }
                      >
                        ⭐ Reviews
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ⭐ Feedback Modal */}
      <div className="modal fade" id="feedbackModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                ⭐ Reviews - {selectedHotel}
              </h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {feedbacks.length > 0 ? (
                feedbacks.map((fb) => (
                  <div
                    key={fb.feedbackId}
                    className="border p-3 mb-3 rounded"
                  >
                    <h6>
                      👤 {fb.userName} ({fb.userEmail})
                    </h6>

                    <div>
                      {"⭐".repeat(fb.rating)} ({fb.rating}/5)
                    </div>

                    <p>{fb.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-center">No reviews available</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}