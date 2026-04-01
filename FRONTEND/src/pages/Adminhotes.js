import React, { useEffect, useState } from "react";
import {
  getAllProperties,
  searchProperties,
  getFeedbackByProperty,
} from "../api";
import { useNavigate } from "react-router-dom";

export default function Adminhotes() {
  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState("");

  // ✅ Feedback states
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch all hotels
  const fetchHotels = async () => {
    try {
      const res = await getAllProperties();
      setHotels(res.data);
    } catch (err) {
      console.error("Error fetching hotels", err);
    }
  };

  // ✅ Search hotels
  const handleSearch = async () => {
    try {
      const res = await searchProperties(location);
      setHotels(res.data);
    } catch (err) {
      console.error("Search error", err);
    }
  };

  // ✅ Fetch feedback
  const fetchFeedback = async (propertyId, hotelName) => {
    try {
      const res = await getFeedbackByProperty(propertyId);
      setFeedbacks(res.data);
      setSelectedHotel(hotelName);
    } catch (err) {
      console.error("Feedback error", err);
    }
  };
  console.log(feedbacks)

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🏨 Explore Hotels</h2>

      {/* 🔍 Search */}
      <div className="d-flex mb-4 gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter location (e.g., Chennai)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary" onClick={fetchHotels}>
          Reset
        </button>
      </div>

      {/* 🏨 Hotel Cards */}
      <div className="row">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div className="col-md-4 mb-4" key={hotel.propertyId}>
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>

                  <p className="card-text text-muted">
                    📍 {hotel.location}
                  </p>

                  <p className="card-text">
                    {hotel.description || "No description available"}
                  </p>

                  {/* 🔥 Buttons */}
                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-outline-primary w-50"
                      onClick={() =>
                        navigate(`/rooms/${hotel.propertyId}`)
                      }
                    >
                      View Rooms
                    </button>

                    <button
                      className="btn btn-outline-success w-50"
                      data-bs-toggle="modal"
                      data-bs-target="#feedbackModal"
                      onClick={() =>
                        fetchFeedback(hotel.propertyId, hotel.name)
                      }
                    >
                      Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hotels found</p>
        )}
      </div>

      {/* ⭐ Feedback Modal */}
      <div className="modal fade" id="feedbackModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                ⭐ Feedback - {selectedHotel}
              </h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {feedbacks.length > 0 ? (
                feedbacks.map((fb) => (
                  <div
                    key={fb.feedbackId}
                    className="border p-3 mb-3 rounded shadow-sm"
                  >
                    {/* 👤 USER INFO */}
                    <h6 className="mb-1">
                      👤 {fb.userName} ({fb.userEmail})
                    </h6>

                    {/* ⭐ RATING */}
                    <div className="mb-1">
                      {"⭐".repeat(fb.rating)} ({fb.rating}/5)
                    </div>

                    {/* 💬 COMMENT */}
                    <p className="mb-0">{fb.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-center">No feedback available</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}