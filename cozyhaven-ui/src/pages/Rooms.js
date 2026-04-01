import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomsByProperty } from "../api";

export default function Rooms() {
  const { propertyId } = useParams();
  const [rooms, setRooms] = useState([]);

  // ✅ Fetch rooms for selected hotel
  const fetchRooms = async () => {
    try {
      const res = await getRoomsByProperty(propertyId);
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [propertyId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛏 Available Rooms</h2>

      <div className="row">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-4 mb-4" key={room.roomId}>
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {room.bedType} Room
                  </h5>

                  <p className="card-text">
                    👥 Max People: {room.maxPeople}
                  </p>

                  <p className="card-text">
                    💰 Price: ₹{room.baseFare}
                  </p>

                  <button className="btn btn-success w-100">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No rooms available</p>
        )}
      </div>
    </div>
  );
}