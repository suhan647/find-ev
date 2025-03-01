"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaPlug, 
  FaTrashAlt, 
  FaBolt, 
  FaChargingStation,
  FaCheck,
  FaHistory
} from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("all"); // all, booked, past

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      const storedPastBookings = JSON.parse(localStorage.getItem("pastBookings")) || [];
      setBookings(storedBookings);
      setPastBookings(storedPastBookings);
      setIsLoading(false);
    }, 800);
  }, []);

  // Function to remove a booking
  const removeBooking = (index) => {
    const updatedBookings = [...bookings];
    const removedBooking = {...updatedBookings[index], removedAt: new Date().toISOString()};
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
    
    // Add to past bookings
    const updatedPastBookings = [...pastBookings, removedBooking];
    setPastBookings(updatedPastBookings);
    
    // Update localStorage
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    localStorage.setItem("pastBookings", JSON.stringify(updatedPastBookings));
  };

  // Function to mark booking as completed
  const completeBooking = (index) => {
    const updatedBookings = [...bookings];
    const completedBooking = {...updatedBookings[index], completedAt: new Date().toISOString()};
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
    
    // Add to past bookings
    const updatedPastBookings = [...pastBookings, completedBooking];
    setPastBookings(updatedPastBookings);
    
    // Update localStorage
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    localStorage.setItem("pastBookings", JSON.stringify(updatedPastBookings));
  };

  // Get the visible bookings based on view
  const getVisibleBookings = () => {
    if (view === "all") return bookings;
    if (view === "booked") return bookings;
    if (view === "past") return pastBookings;
    return bookings;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { 
      opacity: 0, 
      x: -100, 
      transition: { duration: 0.3 } 
    }
  };

  return (
    <div className="mt-10 text-white p-6">
      <div className="max-w-6xl mx-auto"> 
        {/* Page Title */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center"
        >
          <IoIosFlash className="text-3xl text-blue-400 mr-3" />
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            My Charging Sessions
          </h2>
        </motion.div>
        
        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-4"
        >
          <button
            onClick={() => setView("all")}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              view === "all" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setView("booked")}
            className={`px-5 py-2 rounded-lg font-medium transition-all flex items-center ${
              view === "booked" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <FaBolt className="mr-2" /> Booked
          </button>
          <button
            onClick={() => setView("past")}
            className={`px-5 py-2 rounded-lg font-medium transition-all flex items-center ${
              view === "past" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <FaHistory className="mr-2" /> Past
          </button>
          
          {/* Find Stations Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 ml-auto bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-all flex items-center"
          >
            <FaChargingStation className="mr-2" /> Find Stations
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-60 bg-gray-800/50 rounded-xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-blue-400"
            >
              <FaBolt className="text-4xl" />
            </motion.div>
          </div>
        ) : getVisibleBookings().length === 0 ? (
          // Empty State
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700"
          >
            <FaChargingStation className="text-5xl mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-xl mb-2">
              {view === "all" 
                ? "No charging sessions found." 
                : view === "booked" 
                  ? "No active bookings." 
                  : "No past charging sessions."}
            </p>
            <p className="text-gray-500 mb-6">
              {view === "booked" && "Book your first charging session today."}
            </p>
          </motion.div>
        ) : (
          // Bookings Grid
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {getVisibleBookings().map((booking, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  exit="exit"
                  layout
                  className="bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/30 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="bg-gray-700/50 p-4 flex justify-between items-center border-b border-gray-700">
                    <h3 className="text-lg font-bold text-blue-100 truncate">{booking.stationName}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 whitespace-nowrap">
                      {view === "past" ? 'Completed' : 'Active'}
                    </span>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4">
                    <p className="text-gray-400 flex items-center mb-3">
                      <FaMapMarkerAlt className="mr-2 text-blue-400 flex-shrink-0" /> 
                      <span className="truncate">{booking.location}</span>
                    </p>
                    <p className="text-gray-400 flex items-center mb-3">
                      <FaClock className="mr-2 text-blue-400 flex-shrink-0" /> 
                      <span>{new Date(booking.timestamp).toLocaleString()}</span>
                    </p>
                    <p className="flex items-center">
                      <FaPlug className="mr-2 text-green-400 flex-shrink-0" />
                      <span className="px-2 py-1 bg-blue-500/20 rounded-md text-blue-300 font-semibold">
                        {booking.slotsBooked} {booking.slotsBooked === 1 ? 'slot' : 'slots'} booked
                      </span>
                    </p>
                    
                    {/* Completion details for past bookings */}
                    {view === "past" && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-gray-400 text-sm">
                          {booking.completedAt ? 
                            `Completed on ${new Date(booking.completedAt).toLocaleDateString()}` : 
                            `Removed on ${new Date(booking.removedAt).toLocaleDateString()}`}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Card Footer - Only show action buttons for active bookings */}
                  {view !== "past" && (
                    <div className="bg-gray-700/30 p-3 flex justify-between border-t border-gray-700">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 rounded-lg bg-green-600/20 hover:bg-green-600/40 text-green-400 hover:text-green-300 transition-colors flex items-center"
                        onClick={() => completeBooking(index)}
                      >
                        <FaCheck className="mr-2" /> Completed
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                        onClick={() => removeBooking(index)}
                      >
                        <FaTrashAlt />
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}