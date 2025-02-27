"use client";
import { useEffect, useState } from "react";
import AddStationForm from "./AddStationForm";
import StationList from "./StationList";
import { fetchStations, addStation } from "./api";
import { FiPlus, FiX, FiBattery, FiZap } from "react-icons/fi";

export default function StationsPage() {
  const [stations, setStations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStations();
  }, []);

  console.log('suhan', process.env.NEXT_PUBLIC_API_URL);

  async function loadStations() {
    setIsLoading(true);
    try {
      const data = await fetchStations();
      setStations(data);
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStationAdded(newStation) {
    // ✅ Update state immediately
    setStations((prevStations) => [...prevStations, newStation]);

    // ✅ Fetch latest data from API (optional)
    await loadStations();
    setIsModalOpen(false); // Close modal after adding
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <FiZap className="text-green-600 mr-2" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">EV Charging Stations</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Charging Network</h2>
            <p className="text-gray-600 mt-1">Manage EV charging stations and their locations</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 shadow-sm"
          >
            <FiPlus size={18} />
            <span>Add Charging Station</span>
          </button>
        </div>

        {/* Station List Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-1 sm:p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <StationList stations={stations} />
            )}
          </div>
        </div>
      </main>

      {/* Modal - Animated */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Add New Charging Station</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <AddStationForm onStationAdded={handleStationAdded} />
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}