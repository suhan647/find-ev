"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiHome, FiUsers, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`bg-blue-800 text-white h-screen p-4 transition-all ${open ? "w-64" : "w-16"}`}>
      {/* Toggle Button */}
      <button onClick={() => setOpen(!open)} className="text-white mb-6">
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Navigation Links */}
      <nav className="space-y-4">
        <Link href="/dashboard">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded">
            <FiHome size={20} />
            {open && <span>Dashboard</span>}
          </div>
        </Link>

        <Link href="/dashboard/stations">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded">
            <FiSettings size={20} />
            {open && <span>Stations</span>}
          </div>
        </Link>

        <Link href="/dashboard/users">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded">
            <FiUsers size={20} />
            {open && <span>Users</span>}
          </div>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
