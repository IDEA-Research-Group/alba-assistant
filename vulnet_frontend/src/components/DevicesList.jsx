import { useEffect, useState } from "react";
import { getAllDevices } from "../api/devices.api";
import { DeviceCard } from "./DeviceCard";

export function DevicesList() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function loadDevices() {
      const res = await getAllDevices();
      setDevices(res.data);
    }
    loadDevices();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  );
}