import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import JobSwipePage from "./pages/JobSwipePage";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<JobSwipePage />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
