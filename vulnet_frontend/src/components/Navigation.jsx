import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex py-3 items-center">
      <Link to="/devices">
        <h1 className="font-bold text-3xl mb-4">ALBA-ASSINTANT</h1>
      </Link>
      <button className="bg-gray-500 p-3 rounded-lg devices_button">
        <Link to="/devices">Devices</Link>
      </button>
      <button className="bg-gray-500 p-3 rounded-lg connections_button">
        <Link to="/connections">Connections</Link>
      </button>
      <button className="bg-gray-500 p-3 rounded-lg graph_button">
        <Link to="/graph">Graph</Link>
      </button>
      <button className="bg-gray-500 p-3 rounded-lg dashboard_button">
        <Link to="/dashboard">Dashboard</Link>
      </button>
      <button className="bg-gray-500 p-3 rounded-lg create_device_button">
        <Link to="/device-create">Create Device</Link>
      </button>
      <button className="bg-gray-500 p-3 rounded-lg create_connection_button">
        <Link to="/connection-create">Create Connection</Link>
      </button>
    </div>
  );
}