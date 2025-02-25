export default function UserHome() {
    return (
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-[#00aaff] drop-shadow-lg">
          Welcome to EV Charging
        </h2>
        <p className="mt-3 text-lg text-gray-200">
          Find nearby EV charging stations and book slots easily.
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 bg-[#00aaff] text-white font-bold rounded-xl shadow-lg hover:bg-[#0088cc] transition">
            Get Started
          </button>
        </div>
      </div>
    );
  }
  