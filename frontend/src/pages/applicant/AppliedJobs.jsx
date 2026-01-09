import { useEffect, useState } from "react";
import { getAppliedJobs } from "../../api/seekerApi";
import AppliedJobCard from "../../components/AppliedJobCard";


export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAppliedJobs();
      setJobs(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading applied jobs...</p>;
  if (!jobs.length) return <p>No applications yet.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>My Applications</h2>

      {jobs.map(job => (
        <AppliedJobCard
          key={job.applicationId}
          job={job}
        />
      ))}
    </div>
  );
}
