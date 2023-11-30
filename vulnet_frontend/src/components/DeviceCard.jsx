import { useNavigate } from "react-router-dom";

export function DeviceCard({ device }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate(`/devices/${device.id}`);
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg">
        {device.model}
      </h1>
      <p className="text-slate-400">{device.type}</p>
    </div>
  );
}