import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import PasswordRecovery from "./pages/passwordRecovery";
import MapPage from "./pages/mapPage";
import Sidebar from "./components/SideBar";
import Home from "./components/Home";
import Events from "./components/Events";
import Inbox from "./components/Inbox";
import Settings from "./components/Settings";
import DashboardLayout from "./layouts/dashBoardLayout";
import Broadcasts from "./components/Broadcasts";

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
          <Route element={<DashboardLayout />}>
            <Route path="admin-dashboard" element={<Home/>} />
            <Route path="admin-dashboard/events" element={<Events />} />
            <Route path="admin-dashboard/inbox" element={<Inbox />} />
            <Route path="admin-dashboard/broadcasts" element={<Broadcasts />} />
            <Route path="admin-dashboard/settings" element={<Settings />} />
          </Route>
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </div>
    </Router>
  );
}
