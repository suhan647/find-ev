"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user } = useAuth();
  const isAdmin = user === "suhan@hbits.co"; // Check if the logged-in user is admin

  return (
    <header className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg p-5 rounded-b-2xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-[#00aaff]">EV Charging</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/user/home" className="hover:text-[#00aaff] transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/user/stations" className="hover:text-[#00aaff] transition duration-300">
                Stations
              </Link>
            </li>
            <li>
              <Link href="/user/booking" className="hover:text-[#00aaff] transition duration-300">
                Book Slot
              </Link>
            </li>
            <li>
              <Link href="/user/my-bookings" className="hover:text-[#00aaff] transition duration-300">
                My Bookings
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link href="/dashboard" className="hover:text-[#ff5733] font-bold transition duration-300">
                  Go to Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
