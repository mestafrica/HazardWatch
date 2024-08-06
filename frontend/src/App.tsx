import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Landing from "./pages/landing";
import PasswordRecovery from "./pages/passwordRecovery";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
         <Route path="signup" element={<SignUp />} />
          <Route path="/" element={<Landing />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
