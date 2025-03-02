"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname for dynamic updates
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaBatteryThreeQuarters, FaHome, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight, FaSignOutAlt } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useAuth();
  const isAdmin = user === "suhan@hbits.co";
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 shadow-lg backdrop-blur-lg py-3" : "bg-gradient-to-r from-blue-900/60 to-blue-600/60 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-5">
        <div className="flex items-center space-x-2">
          <div className={`relative flex items-center justify-center ${scrolled ? "w-8 h-8" : "w-10 h-10"} transition-all duration-500`}>
            <FaBatteryThreeQuarters className={`text-[#00aaff] ${scrolled ? "text-2xl" : "text-3xl"} transition-all duration-500 animate-pulse`} />
          </div>
          <h1 className={`font-extrabold transition-all duration-500 ${scrolled ? "text-xl text-[#0077CC]" : "text-2xl text-[#00aaff]"}`}>
            EV Charging
            <span className="ml-1 text-xs font-light tracking-wider bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              NETWORK
            </span>
          </h1>
        </div>

        <nav className={`transition-all duration-500 ${scrolled ? "text-gray-800" : "text-white"}`}>
          <ul className="flex items-center space-x-1 md:space-x-4">
            <NavItem href="/user" label="Home" icon={<FaHome />} isActive={pathname === "/user"} scrolled={scrolled} />
            <NavItem href="/user/stations" label="Stations" icon={<FaMapMarkerAlt />} isActive={pathname.includes("/user/stations")} scrolled={scrolled} />
            <NavItem href="/user/my-bookings" label="My Bookings" icon={<FaCalendarAlt />} isActive={pathname.includes("/user/my-bookings")} scrolled={scrolled} />

            {isAdmin && (
              <li className="ml-2">
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    scrolled ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : "bg-orange-500/90 text-white hover:bg-orange-400"
                  }`}
                >
                  <span className="hidden md:inline-block font-medium text-sm">Dashboard</span>
                  <FaChevronRight className="text-sm animate-pulse" />
                </Link>
              </li>
            )}

            {/* Logout Button */}
            <li className="ml-2">
              <button
                onClick={logout}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  scrolled ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-red-500/90 text-white hover:bg-red-400"
                }`}
              >
                <span className="hidden md:inline-block font-medium text-sm">Logout</span>
                <FaSignOutAlt className="text-sm" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ href, label, icon, isActive, scrolled }) {
  return (
    <li>
      <Link
        href={href}
        className={`relative flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 group hover:bg-white/10 ${
          isActive ? (scrolled ? "text-[#00aaff] font-medium" : "text-white font-medium") : scrolled ? "text-gray-700" : "text-gray-200"
        }`}
      >
        <span className="transition-all duration-300 group-hover:scale-110 text-lg">{icon}</span>
        <span className="hidden md:inline-block text-sm">{label}</span>
        {isActive && <span className="absolute bottom-0 left-0 h-0.5 bg-[#00aaff] transition-all duration-500 animate-growWidth w-full opacity-100" />}
      </Link>
    </li>
  );
}
