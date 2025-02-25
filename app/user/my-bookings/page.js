"use client";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user ID from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setUserId(storedUser.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/bookings?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto py-10 text-white">
      <h2 className="text-3xl font-extrabold text-center text-[#00aaff] drop-shadow-lg">
        My Bookings
      </h2>

      {loading ? (
        <p className="text-center text-white mt-4">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">No bookings found.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white bg-opacity-10 p-5 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#00aaff]">{booking.station.name}</h3>
              <p className="text-gray-300">📍 {booking.station.location}</p>
              <p className="text-gray-300">🔋 Max EVs: {booking.station.maxEVs}</p>
              <p className="text-gray-300">📅 Date: {new Date(booking.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
