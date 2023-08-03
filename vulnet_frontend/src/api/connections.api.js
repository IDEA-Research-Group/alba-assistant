import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const connectionsApi = axios.create({
  baseURL: `${URL}/vulnet/api/v1`,
});

export const getAllConnections = () => connectionsApi.get("/connections/");

export const getConnection = (id) => connectionsApi.get(`/connections/${id}/`);

export const createConnection = (connection) => connectionsApi.post("/createconnection/", connection);

export const updateConnection = (id, connection) => connectionsApi.put(`/updateconnection/${id}/`, connection);

export const deleteConnection = (id) => connectionsApi.delete(`/connections/${id}`);

export const getConnectionProtocols = () => connectionsApi.get("/connectionprotocols/");

export const getConnectionGraph = () => connectionsApi.get("/connectiongraph/");
