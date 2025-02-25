// "use client";
// import { useEffect, useState } from "react";
// import AddStationForm from "./AddStationForm";
// import StationList from "./StationList";
// import { fetchStations, addStation } from "./api";

// export default function StationsPage() {
//   const [stations, setStations] = useState([]);

//   useEffect(() => {
//     loadStations();
//   }, []);

//   async function loadStations() {
//     try {
//       const data = await fetchStations();
//       setStations(data);
//     } catch (error) {
//       console.error("Error fetching stations:", error);
//     }
//   }

//   async function handleStationAdded(newStation) {
//     // ✅ Update state immediately
//     setStations((prevStations) => [...prevStations, newStation]);

//     // ✅ Fetch latest data from API (optional)
//     await loadStations();
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Stations</h1>
      
//       {/* Pass the function properly */}
//       <AddStationForm onStationAdded={handleStationAdded} />
      
//       <StationList stations={stations} />
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import AddStationForm from "./AddStationForm";
import StationList from "./StationList";
import { fetchStations, addStation } from "./api";
import { FiPlus } from "react-icons/fi";

export default function StationsPage() {
  const [stations, setStations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadStations();
  }, []);

  console.log('suhan',process.env.NEXT_PUBLIC_API_URL);

  async function loadStations() {
    try {
      const data = await fetchStations();
      setStations(data);
    } catch (error) {
      console.error("Error fetching stations:", error);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stations</h1>
      
      {/* Button to open modal */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
      >
        <FiPlus size={20} />
        <span>Add Station</span>
      </button>
      
      {/* Modal for AddStationForm */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <AddStationForm onStationAdded={handleStationAdded} />
          </div>
        </div>
      )}

      <StationList stations={stations} />
    </div>
  );
}
