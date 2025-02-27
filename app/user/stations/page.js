"use client";
import { useEffect, useState } from "react";

export default function StationsPage() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [slotsToBook, setSlotsToBook] = useState("");
  const [booking, setBooking] = useState(false);

  // Function to fetch stations
  const fetchStations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stations");
      const data = await res.json();
      setStations(data);
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  // Function to book slots
  const confirmBooking = async () => {
    if (!slotsToBook || slotsToBook < 1 || slotsToBook > selectedStation.availableSlots) {
      alert("Please enter a valid number of slots.");
      return;
    }

    setBooking(true);

    try {
      const response = await fetch(`/api/stations/${selectedStation._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          availableSlots: selectedStation.availableSlots - slotsToBook,
          booked: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error booking slots");
      }

      alert("Slots booked successfully!");

      // Refresh station list
      fetchStations();
      setSelectedStation(null);
      setSlotsToBook("");
    } catch (error) {
      console.error("Error booking slots:", error);
      alert("Failed to book slots. Try again.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-extrabold text-center text-[#00aaff] drop-shadow-lg">
        Charging Stations
      </h2>

      {loading ? (
        <p className="text-center text-white mt-4">Loading stations...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {stations.map((station) => (
            <div
              key={station._id}
              className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold text-[#00aaff]">{station.name}</h3>
              <p className="text-gray-300">📍 {station.location}</p>
              <p className="text-gray-300">🔋 Max EVs: {station.maxEVs}</p>
              <p className="text-gray-300">🟢 Available Slots: {station.availableSlots}</p>
              <button
                className="mt-4 bg-[#00aaff] text-white px-4 py-2 rounded-lg hover:bg-[#0088cc]"
                onClick={() => setSelectedStation(station)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedStation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-black">
            <h3 className="text-2xl font-bold mb-4">{selectedStation.name}</h3>
            <p className="mb-2">Available Slots: {selectedStation.availableSlots}</p>
            <input
              type="number"
              className="w-full border p-2 mb-4"
              placeholder="Enter number of slots"
              value={slotsToBook}
              onChange={(e) => setSlotsToBook(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
              onClick={confirmBooking}
              disabled={booking}
            >
              {booking ? "Booking..." : "Confirm Booking"}
            </button>
            <button
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 w-full"
              onClick={() => setSelectedStation(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
