import { useEffect, useState } from "react";
import {
  getApplicantsByJob,
  updateApplicationStatus
} from "../../api/recruiterApi";

// TEMP until recruiter-job mapping UI
const JOB_ID = 4;

export default function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadApplicants() {
    setLoading(true);
    const data = await getApplicantsByJob(JOB_ID);
    setApplications(data);
    setLoading(false);
  }

  useEffect(() => {
    loadApplicants();
  }, []);

  async function handleStatusChange(appId, status) {
    try {
      await updateApplicationStatus(appId, status);
      await loadApplicants(); // 🔥 refresh dynamically
    } catch (e) {
      setError(e.message);
    }
  }

  if (loading) return <p>Loading recruiter dashboard...</p>;

  return (
    <div style={{ maxWidth: 800 }}>
      <h2>Recruiter Dashboard</h2>

      <p>Total Applicants: <b>{applications.length}</b></p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {applications.length === 0 && <p>No applicants yet.</p>}

      {applications.map(app => (
        <div key={app.id} style={card}>
          <p><b>{app.applicant.fullName}</b></p>
          <p>Status: <b>{app.status}</b></p>

          <div style={{ marginTop: 10 }}>
            <button
              disabled={app.status === "SHORTLISTED"}
              onClick={() =>
                handleStatusChange(app.id, "SHORTLISTED")
              }
              style={approveBtn}
            >
              Shortlist
            </button>

            <button
              disabled={app.status === "REJECTED"}
              onClick={() =>
                handleStatusChange(app.id, "REJECTED")
              }
              style={rejectBtn}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const card = {
  padding: 18,
  borderRadius: 12,
  background: "#fff",
  marginTop: 15,
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
};

const approveBtn = {
  marginRight: 10,
  padding: "8px 14px",
  background: "#188038",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};

const rejectBtn = {
  padding: "8px 14px",
  background: "#d93025",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};
