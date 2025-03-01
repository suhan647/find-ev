"use client";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBatteryThreeQuarters, FaBolt, FaTimes, FaExclamationCircle } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

export default function StationsPage() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [slotsToBook, setSlotsToBook] = useState("1");
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState(null);
  const [refreshRotation, setRefreshRotation] = useState(0);

  // Function to fetch stations
  const fetchStations = async () => {
    setLoading(true);
    setError(null);
    setRefreshRotation(refreshRotation + 360);
    
    try {
      const res = await fetch("/api/stations");
      const data = await res.json();
      setStations(data);
    } catch (error) {
      console.error("Error fetching stations:", error);
      setError("Failed to load stations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to book slots
  const confirmBooking = async () => {
    const slots = parseInt(slotsToBook);
    if (!slots || slots < 1 || slots > selectedStation.availableSlots) {
      setError(`Please enter a valid number between 1 and ${selectedStation.availableSlots}.`);
      return;
    }
  
    setBooking(true);
    setError(null);
  
    try {
      const response = await fetch(`/api/stations/${selectedStation._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          availableSlots: selectedStation.availableSlots - slots,
          booked: true,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error booking slots");
      }
  
      // Save booking data in local storage
      const newBooking = {
        stationId: selectedStation._id,
        stationName: selectedStation.name,
        location: selectedStation.location,
        slotsBooked: slots,
        timestamp: new Date().toISOString(),
      };
  
      const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      existingBookings.push(newBooking);
      localStorage.setItem("bookings", JSON.stringify(existingBookings));
  
      // Refresh stations
      fetchStations();
      setSelectedStation(null);
      setSlotsToBook("1");
    } catch (error) {
      console.error("Error booking slots:", error);
      setError("Failed to book slots. Please try again.");
    } finally {
      setBooking(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full mt-10 bg-gradient-to-br from-blue-900 to-black p-4 overflow-x-hidden mt-10">
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .card-enter {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        
        .modal-animation {
          animation: slideUp 0.3s ease-out forwards;
        }
        
        .bounce-animation {
          animation: bounce 1s ease-in-out infinite;
        }
        
        .staggered-animation:nth-child(1) { animation-delay: 0.1s; }
        .staggered-animation:nth-child(2) { animation-delay: 0.2s; }
        .staggered-animation:nth-child(3) { animation-delay: 0.3s; }
        .staggered-animation:nth-child(4) { animation-delay: 0.4s; }
        .staggered-animation:nth-child(5) { animation-delay: 0.5s; }
        .staggered-animation:nth-child(6) { animation-delay: 0.6s; }
      `}</style>

      <div className="max-w-6xl mx-auto py-6">
        <div className="flex items-center justify-center mb-8 hover:animate-pulse">
          <FaBolt className="text-yellow-400 w-10 h-10 mr-3" />
          <h2 className="text-4xl font-bold text-white">
            <span className="text-blue-400">Charging</span> Stations
          </h2>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-90 text-white p-4 rounded-lg flex items-center mb-6 max-w-lg mx-auto animate-fadeIn">
            <FaExclamationCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
            <button onClick={() => setError(null)} className="ml-auto">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="mb-6 flex justify-end">
          <button 
            onClick={fetchStations}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all shadow-lg hover:shadow-blue-500/50"
          >
            <BiRefresh 
              className="mr-2" 
              style={{ 
                transform: `rotate(${refreshRotation}deg)`,
                transition: 'transform 0.5s ease-in-out'
              }} 
            />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="spin-animation text-blue-400 mb-4">
              <BiRefresh size={48} />
            </div>
            <p className="text-lg text-blue-200">Loading charging stations...</p>
          </div>
        ) : (
          <>
            {stations?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-blue-200">No charging stations available at the moment.</p>
                <button 
                  onClick={fetchStations}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all shadow-lg"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stations.map((station, index) => (
                  <div
                    key={station._id}
                    className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-blue-500/20 transition-all duration-300 border border-blue-500/30 card-enter staggered-animation h-full flex flex-col"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                    }}
                  >
  <div className="flex-grow">
    <div className="flex justify-between items-start">
      <h3 className="text-2xl font-bold text-white">{station.name}</h3>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        station.availableSlots > 0 
          ? 'bg-green-500 text-green-100' 
          : 'bg-red-500 text-red-100'
      } ${station.availableSlots > 0 && station.availableSlots <= 3 ? 'pulse-animation' : ''}`}>
        {station.availableSlots > 0 
          ? station.availableSlots <= 3 
            ? 'Limited Slots' 
            : 'Available' 
          : 'Full'}
      </div>
    </div>
    
    <div className="mt-4 space-y-3">
      <div className="flex items-center text-blue-200">
        <FaMapMarkerAlt className="w-4 h-4 mr-2" />
        <Link href={`https://www.google.com/maps?q=${station.latitude},${station.longitude}`}>
        <p>{station.location}</p>
        </Link>
      </div>
      
      <div className="flex items-center text-blue-200">
        <FaBatteryThreeQuarters className="w-4 h-4 mr-2" />
        <p>Total Capacity: {station.maxEVs} EVs</p>
      </div>
      
      <div className="mt-2">
        <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-blue-400 h-2.5 rounded-full transition-all duration-1000"
            style={{ width: `${(station.availableSlots / station.maxEVs) * 100}%` }}
          ></div>
        </div>
        <p className="text-white text-sm mt-1">
          {station.availableSlots} of {station.maxEVs} slots available
        </p>
      </div>
    </div>
  </div>

  <button
    className={`mt-6 w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
      station.availableSlots > 0 
        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105' 
        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
    }`}
    onClick={() => station.availableSlots > 0 && setSelectedStation(station)}
    disabled={station.availableSlots === 0}
  >
    {station.availableSlots > 0 ? (
      <>
        <FaBolt className="mr-2" /> Book Now
      </>
    ) : (
      'No Slots Available'
    )}
  </button>
</div>

                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for booking */}
      {selectedStation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 animate-fadeIn">
          <div 
            className="bg-gray-900 border border-blue-500/30 p-8 rounded-2xl shadow-2xl max-w-md w-full text-white relative modal-animation"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStation(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            
            <div className="flex items-center mb-6">
              <FaBolt className="text-yellow-400 w-8 h-8 mr-3 bounce-animation" />
              <h3 className="text-2xl font-bold">{selectedStation.name}</h3>
            </div>
            
            <div className="bg-blue-900/30 p-4 rounded-lg mb-6 hover:bg-blue-800/30 transition-colors duration-300">
              <p className="mb-2 text-blue-200">
                <FaMapMarkerAlt className="inline mr-2" />
                {selectedStation.location}
              </p>
              <p className="text-xl font-semibold text-white">
                {selectedStation.availableSlots} {selectedStation.availableSlots === 1 ? 'slot' : 'slots'} available
              </p>
            </div>
            
            <label className="block mb-2 text-blue-200">Number of slots to book:</label>
            <div className="flex mb-6">
              <button 
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-l-lg transition-colors duration-200"
                onClick={() => setSlotsToBook(Math.max(1, parseInt(slotsToBook || "1") - 1).toString())}
              >
                <AiOutlineMinus />
              </button>
              <input
                type="number"
                className="w-full bg-gray-800 text-center text-white text-xl py-2 border-y border-gray-700 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                min="1"
                max={selectedStation.availableSlots}
                value={slotsToBook}
                onChange={(e) => setSlotsToBook(e.target.value)}
              />
              <button 
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-r-lg transition-colors duration-200"
                onClick={() => setSlotsToBook(Math.min(selectedStation.availableSlots, parseInt(slotsToBook || "1") + 1).toString())}
              >
                <AiOutlinePlus />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  booking 
                    ? 'bg-blue-700 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-500/50 hover:scale-105'
                }`}
                onClick={confirmBooking}
                disabled={booking}
              >
                {booking ? (
                  <div className="flex items-center justify-center">
                    <BiRefresh className="w-5 h-5 mr-2 spin-animation" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <span className="flex items-center justify-center">
                      <FaBolt className="mr-2" />
                      Book {slotsToBook || 1} {parseInt(slotsToBook || "1") === 1 ? 'Slot' : 'Slots'}
                    </span>
                  </>
                )}
              </button>
              
              <button
                className="w-full py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition-all hover:text-white"
                onClick={() => setSelectedStation(null)}
                disabled={booking}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}