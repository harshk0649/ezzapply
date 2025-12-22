import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import JobSwipePage from "./pages/JobSwipePage";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import ApplicantDashboard from "./pages/applicant/ApplicantDashboard";
import ApplicantProfile from "./pages/applicant/ApplicantProfile";
import AppliedJobs from "./pages/applicant/AppliedJobs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<JobSwipePage />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
        <Route path="/applicant/profile" element={<ApplicantProfile />} />
        <Route path="/applicant/applied-jobs" element={<AppliedJobs />} />

      </Routes>
    </Router>
  );
}

export default App;
