import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import PasswordRecovery from "./pages/passwordRecovery";
import MapPage from "./pages/mapPage";
import DashboardPage from "./pages/dashboard";
import CoordinatesAndLocation from "./components/CoordinatesAndLocation";
import PostHazzardReportUi from "./components/PostHazzardReportUi";


export default function App() {
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
          <Route path="/post-hazzard" element={<PostHazzardReportUi />} />
          <Route
            path="/co-ordinates-location"
            element={<CoordinatesAndLocation />}
          />
        </Routes>
      </div>
    </Router>
  );
}
