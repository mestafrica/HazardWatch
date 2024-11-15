import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import PasswordRecovery from "./pages/passwordRecovery";
import MapPage from "./pages/mapPage";
import DashboardPage from "./pages/dashboard";
import HazardForm from "./components/HazardForm";

export default function App() {
  const onAddHazard = (hazardDate: { title: string; images: File[]; location: string; hazardType: string }) => {
    console.log( "New hazrd report:", hazardDate);
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/hazard-form" element={<HazardForm onAddHazard={onAddHazard} />} />
        </Routes>
      </div>
    </Router>
  );
}
