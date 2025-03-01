import Footer from "./components/Footer";
import Header from "./components/Header";

export default function UserLayout({ children }) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
        <Header />
        <main className="flex-1 p-4 flex items-center justify-center">{children}</main>
        <Footer />
      </div>
    );
  }
  