"use client";
import { useEffect, useState } from "react";

export default function StationsPage() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stations")
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching stations:", error));
  }, []);

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
            <div key={station._id} className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-[#00aaff]">{station.name}</h3>
              <p className="text-gray-300">📍 {station.location}</p>
              <p className="text-gray-300">🔋 Max EVs: {station.maxEVs}</p>
              <p className="text-gray-300">🟢 Available Slots: {station.availableSlots}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
