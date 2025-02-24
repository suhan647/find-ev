"use client";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Dynamic Content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
