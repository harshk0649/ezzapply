import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/applications/my").then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Applied Jobs</h2>

      {jobs.map(app => (
        <div key={app.id}>
          <h3>{app.job.title}</h3>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}
