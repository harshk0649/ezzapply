import { Link } from "react-router-dom";

export default function ApplicantDashboard() {
  return (
    <div>
      <h1>Applicant Dashboard</h1>

      <ul>
        <li><Link to="/applicant/profile">Edit Profile</Link></li>
        <li><Link to="/jobs">Browse Jobs</Link></li>
        <li><Link to="/applicant/applied-jobs">Applied Jobs</Link></li>
      </ul>
    </div>
  );
}
