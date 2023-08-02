import { useNavigate } from "react-router-dom";

export function ConnectionCard({ connection }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate(`/connections/${connection.id}`);
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg">
        {connection.type}
      </h1>
      <p className="text-slate-400">{connection.first_device.model}</p>
      <p className="text-slate-400">{connection.second_device.model}</p>
    </div>
  );
}