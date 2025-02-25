"use client";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/stations")
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching stations:", error));
  }, []);

  const handleBooking = async () => {
    if (!selectedStation) return;

    const response = await fetch(`/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stationId: selectedStation._id }),
    });

    const data = await response.json();
    if (response.ok) {
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 3000);
    } else {
      alert(data.message || "Booking failed!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 text-white">
      <h2 className="text-3xl font-extrabold text-center text-[#00aaff] drop-shadow-lg">
        Book a Charging Slot
      </h2>

      {loading ? (
        <p className="text-center text-white mt-4">Loading stations...</p>
      ) : (
        <div className="mt-6">
          <label className="block text-lg font-semibold mb-2">Select a Station:</label>
          <select
            className="w-full p-3 bg-gray-900 text-white rounded-lg shadow-md"
            onChange={(e) => {
              const station = stations.find((s) => s._id === e.target.value);
              setSelectedStation(station);
            }}
          >
            <option value="">-- Choose a Station --</option>
            {stations.map((station) => (
              <option key={station._id} value={station._id}>
                {station.name} ({station.availableSlots} slots available)
              </option>
            ))}
          </select>

          {selectedStation && (
            <div className="mt-6 bg-white bg-opacity-10 p-5 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#00aaff]">{selectedStation.name}</h3>
              <p className="text-gray-300">📍 {selectedStation.location}</p>
              <p className="text-gray-300">🔋 Max EVs: {selectedStation.maxEVs}</p>
              <p className="text-gray-300">🟢 Available Slots: {selectedStation.availableSlots}</p>

              <button
                onClick={handleBooking}
                className="mt-4 px-6 py-3 bg-[#00aaff] text-white font-bold rounded-xl shadow-lg hover:bg-[#0088cc] transition"
              >
                Confirm Booking
              </button>

              {bookingSuccess && (
                <p className="mt-4 text-green-400 font-bold">✅ Slot booked successfully!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
