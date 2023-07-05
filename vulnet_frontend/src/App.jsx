
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { DevicesFormPage } from "./pages/DevicesFormPage";
import { DevicesPage } from "./pages/DevicesPage";
import { DevicesDashboard } from "./pages/DevicesDashboard";
import { DeviceVulnerabilitiesDashboard } from "./pages/DeviceVulnerabilitiesDashboard";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          {/* redirect to tasks */}
          <Route path="/" element={<Navigate to="/devices" />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/devices/:id" element={<DevicesFormPage />} />
          <Route path="/device-create" element={<DevicesFormPage />} />
          <Route path="/dashboard" element={<DevicesDashboard />}/>
          <Route path="/dashboard/:id/:vuln_id?" element={<DeviceVulnerabilitiesDashboard />}/>

        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;