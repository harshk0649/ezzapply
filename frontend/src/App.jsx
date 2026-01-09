import { Routes, Route } from "react-router-dom";

import ApplicantLayout from "./layouts/ApplicantLayout";
import RecruiterLayout from "./layouts/RecruiterLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import ApplicantDashboard from "./pages/applicant/ApplicantDashboard";
import ApplicantProfile from "./pages/applicant/ApplicantProfile";
import AppliedJobs from "./pages/applicant/AppliedJobs";
import SwipeJobs from "./pages/SwipeJobs";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Applicant */}
      <Route path="/applicant" element={<ApplicantLayout />}>
        <Route path="dashboard" element={<ApplicantDashboard />} />
        <Route path="profile" element={<ApplicantProfile />} />
        <Route path="applied-jobs" element={<AppliedJobs />} />
        <Route path="swipe" element={<SwipeJobs />} />
      </Route>

      {/* Recruiter */}
      <Route path="/recruiter" element={<RecruiterLayout />}>
        <Route path="dashboard" element={<RecruiterDashboard />} />
      </Route>
    </Routes>
  );
}
