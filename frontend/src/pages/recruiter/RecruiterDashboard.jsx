import { useEffect, useState } from "react";
import { getMyJobsApi, toggleJobStatusApi } from "../../api/job.api";
import CreateJob from "./CreateJob";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  // 🔁 Load recruiter jobs
  const loadJobs = async () => {
    try {
      const res = await getMyJobsApi();
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load jobs");
    }
  };

  // 🔄 Activate / Deactivate job
  const toggleStatus = async (jobId) => {
    try {
      await toggleJobStatusApi(jobId);
      loadJobs(); // refresh after toggle
    } catch (err) {
      console.error(err);
      alert("Failed to update job");
    }
  };

  // Load once on page load
  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Recruiter Dashboard</h1>

      <button onClick={() => setShowCreate(!showCreate)}>
        {showCreate ? "Close Job Form" : "Post New Job"}
      </button>

      {/* 🔥 PASS CALLBACK */}
      {showCreate && <CreateJob onJobCreated={loadJobs} />}

      <h2>Your Jobs</h2>

      {jobs.length === 0 && <p>No jobs posted yet.</p>}

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ccc",
            marginTop: 10,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <h3>{job.title}</h3>
          <p>
            {job.location} • {job.jobType}
          </p>
          <p>
            Status:{" "}
            <strong>{job.active ? "Active" : "Inactive"}</strong>
          </p>

          <button onClick={() => toggleStatus(job.id)}>
            {job.active ? "Deactivate" : "Activate"}
          </button>
        </div>
      ))}
    </div>
  );
}
