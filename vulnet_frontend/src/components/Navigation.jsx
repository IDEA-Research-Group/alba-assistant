import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex justify-between py-3 items-center">
      <Link to="/devices">
        <h1 className="font-bold text-3xl mb-4">ALBA-ASSINTANT</h1>
      </Link>
      <button className="bg-gray-500 p-3 rounded-lg dash_button">
        <Link to="/dashboard">Dashboard</Link>
      </button>
      <button className="bg-gray-500 p-3 rounded-lg">
        <Link to="/device-create">Create Device</Link>
      </button>
    </div>
  );
}