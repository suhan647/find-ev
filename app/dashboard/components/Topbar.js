"use client";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Topbar = () => {
  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg py-2 pl-10 pr-4 w-80"
        />
        <FiSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <FiBell size={24} className="cursor-pointer" />
        <FiUser size={24} className="cursor-pointer" />
      </div>
    </header>
  );
};

export default Topbar;
