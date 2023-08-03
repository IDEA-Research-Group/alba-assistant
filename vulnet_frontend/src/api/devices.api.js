import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const devicesApi = axios.create({
  baseURL: `${URL}/vulnet/api/v1`,
});

export const getAllDevices = () => devicesApi.get("/devices/");

export const getDevice = (id) => devicesApi.get(`/devices/${id}`);

export const createDevice = (device) => devicesApi.post("/devices/", device);

export const updateDevice = (id, device) => devicesApi.put(`/devices/${id}/`, device);

export const deleteDevice = (id) => devicesApi.delete(`/devices/${id}`);

export const getNdevNvuln = () => devicesApi.get("/ndevnvuln/");

export const getNSeverity = () => devicesApi.get("/nseverity/");

export const getNSeveritySummary = () => devicesApi.get("/nseveritysummary/");

export const getNSeveritySummaryList = () => devicesApi.get("/nseveritysummarylist/");

export const getVulnerabilities = (id) => devicesApi.get(`/devicevulnerabilities/${id}`);

export const getVulnerability = (id) => devicesApi.get(`/vulnerability/${id}`);

export const getWeightedAverage = () => devicesApi.get(`/weightedaverage/`);

export const getDeviceWeightedAverage = (device) => devicesApi.get(`/deviceweightedaverage/${device}`);

export const getDeviceModels = () => devicesApi.get(`/devicemodels/`);

export const getDeviceTypes = () => devicesApi.get(`/devicetypes/`);

export const getDeviceCapabilities = () => devicesApi.get(`/devicapabilities/`);