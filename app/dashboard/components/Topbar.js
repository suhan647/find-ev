"use client";
import { useRouter } from "next/navigation";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { MdElectricBolt } from "react-icons/md";


const Topbar = () => {
  const router = useRouter();
  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
     
      {/* <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg py-2 pl-10 pr-4 w-80"
        />
        <FiSearch className="absolute left-3 top-3 text-gray-500" />
      </div> */}
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
      </div>
    </header>
  );
};

export default Topbar;
