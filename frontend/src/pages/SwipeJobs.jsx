import { useEffect, useState } from "react";
import JobSwipeCard from "../components/JobSwipeCard";
import { fetchSwipeJobs, fetchJobs, applyJob, fetchCredits } from "../api/jobApi";

export default function SwipeJobs() {
  const [jobs, setJobs] = useState([]);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  const jobsData = await fetchSwipeJobs();
  const creditData = await fetchCredits();

    setJobs(jobsData.reverse());
    setCredits(creditData);
  };

  const handleLike = async (job) => {
    if (!job?.jobId) {
      console.error("Invalid job data", job);
      return;
    }

    try {
      console.log("Applying job:", job);

      await applyJob(job.jobId);
      setCredits((c) => c - 1);

      setJobs((prev) => prev.slice(0, -1));
    } catch (err) {
      console.error("Apply failed", err);
      alert("Failed to apply");
    }
  };

  const handleReject = () => {
    setJobs((prev) => prev.slice(0, -1));
  };

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {jobs.length === 0 && (
        <p className="text-gray-500">No more jobs</p>
      )}

      {jobs.map((job, index) => (
        <JobSwipeCard
          key={job.jobId}
          job={job}
          onLike={handleLike}
          onReject={handleReject}
          style={{ zIndex: index }}
        />
      ))}
    </div>
  );
}
