"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiZap, FiMapPin, FiClock, FiChevronRight } from "react-icons/fi";

export default function UserHome() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleGetStarted = () => {
    router.push("/user/stations");
  };

  return (
    <div className=" w-screen mt-10 h-[90vh] overflow-hidden text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 h-screen flex items-center">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-12 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          {/* Left Content */}
          <div className="flex-1 text-left">
            <div className={`inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-6 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <FiZap className="mr-2" />
              <span>Smart EV Charging Network</span>
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <span className="text-white">Power Your Journey with </span>
              <span className="text-[#00aaff] relative">
                Smart Charging
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#00aaff]/30 rounded-full"></span>
              </span>
            </h1>
            
            <p className={`text-xl text-gray-300 mb-8 max-w-lg transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              Find and book available charging stations near you in seconds. 
              Seamless, reliable, and always ready when you need it.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button 
                onClick={handleGetStarted} 
                className="px-8 py-4 bg-[#00aaff] text-white font-bold rounded-xl shadow-lg hover:bg-[#0088cc] transition-all duration-300 transform hover:scale-105 hover:translate-y-[-2px] flex items-center justify-center group"
              >
                Get Started
                <FiChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
              </button>
              
              <button className="px-8 py-4 bg-transparent border-2 border-gray-600 text-gray-300 font-bold rounded-xl hover:border-gray-400 hover:text-white transition-all duration-300 hover:bg-gray-800/30">
                Learn More
              </button>
            </div>
            
            {/* Features */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-start space-x-3 p-3 hover:bg-blue-900/10 rounded-lg transition-all duration-300">
                <div className="p-2 bg-blue-900/20 rounded-lg text-[#00aaff]">
                  <FiMapPin size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Easy Location</h3>
                  <p className="text-gray-400 text-sm">Find stations nearby</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 hover:bg-blue-900/10 rounded-lg transition-all duration-300">
                <div className="p-2 bg-blue-900/20 rounded-lg text-[#00aaff]">
                  <FiClock size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Quick Booking</h3>
                  <p className="text-gray-400 text-sm">Reserve in seconds</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 hover:bg-blue-900/10 rounded-lg transition-all duration-300">
                <div className="p-2 bg-blue-900/20 rounded-lg text-[#00aaff]">
                  <FiZap size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Fast Charging</h3>
                  <p className="text-gray-400 text-sm">Multiple power options</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className={`flex-1 relative h-64 md:h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}>
            <div className="absolute inset-0 bg-blue-900/10 z-10 rounded-2xl"></div>
            <div className="h-full w-full relative">
              <img 
                src="https://img.freepik.com/free-photo/electric-vehicle-charger-plug-with-digital-display_35913-3356.jpg?ga=GA1.1.2078598945.1734341813&semt=ais_hybrid" 
                alt="EV Charging" 
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(0, 170, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(0, 170, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 170, 255, 0); }
        }
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </div>
  );
}