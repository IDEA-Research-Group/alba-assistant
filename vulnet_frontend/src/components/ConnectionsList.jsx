import { useEffect, useState } from "react";
import { getAllConnections } from "../api/connections.api";
import { ConnectionCard } from "./ConnectionCard";


export function ConnectionsList() {
    const [connections, setConnections] = useState([]);
  
    useEffect(() => {
      async function loadConnections() {
        const res = await getAllConnections();
        setConnections(res.data);
      }
      loadConnections();
    }, []);
  
    return (
      <div className="grid grid-cols-3 gap-3">
        {connections.map((connection) => (
          <ConnectionCard key={connection.id} connection={connection} />
        ))}
      </div>
    );
  }