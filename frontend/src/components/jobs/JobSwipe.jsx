import { useEffect, useState } from "react";
import JobCard from "./JobCard"; // ✅ FIXED
import api from "../../api/axios";

export default function JobSwipe() {
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get("/jobs/swipe")
      .then((res) => setJobs(res.data))
      .catch(console.error);
  }, []);

  const handleLike = (jobId) => {
    console.log("Applied to job:", jobId);
    setIndex((prev) => prev + 1);
  };

  const handleDislike = (jobId) => {
    console.log("Skipped job:", jobId);
    setIndex((prev) => prev + 1);
  };

  if (!jobs[index]) {
    return <h2>No more jobs 🎉</h2>;
  }

  return (
    <div>
      <h1>Swipe Jobs</h1>
      <JobCard
        job={jobs[index]}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </div>
  );
}
