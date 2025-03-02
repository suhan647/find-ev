"use client";
import { useRouter } from "next/navigation";
import { FiBell, FiUser, FiLogOut } from "react-icons/fi"; // Import logout icon
import { MdElectricBolt } from "react-icons/md";
import { useAuth } from "@/context/AuthContext"; // Import AuthContext

const Topbar = () => {
  const router = useRouter();
  const { logout } = useAuth(); // Get logout function from AuthContext

  const handleLogout = async () => {
    await logout(); // Call logout function
    router.push("/login"); // Redirect to login page
  };

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
      <button
        onClick={() => router.push("/user")}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg transition hover:bg-blue-700"
      >
        <MdElectricBolt size={20} />
        <span>Go To Users</span>
      </button>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <FiBell size={24} className="cursor-pointer" />
        <FiUser size={24} className="cursor-pointer" />
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
        >
          <FiLogOut size={24} />
          <span className="hidden md:inline-block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
