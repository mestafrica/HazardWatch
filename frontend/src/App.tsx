import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import PasswordRecovery from "./pages/passwordRecovery";
import MapPage from "./pages/mapPage";
import DashboardPage from "./pages/dashboard";
import HazardForm from "./components/HazardForm";
import FrontEndLayout from "./layouts/FrontEndLayout";
import Overview from "./components/Overview";
import Settings from "./components/Settings";
import Map from "./components/Map";




export default function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/hazardreport" element={<HazardReport/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<MapPage />} />
          <Route
            path="/hazard-form" element={<HazardForm />} />
          <Route path="/dashboard" element={<FrontEndLayout />}>
            <Route path="home" element={<DashboardPage/>} />
            <Route path="map" element={<Map/>} />
            <Route path="overview" element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="settings" element={<Settings />} />
           
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
