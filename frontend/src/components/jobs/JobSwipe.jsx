import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import api from "../../api/axios";
import TopBar from "../layout/TopBar"; // 👈 adjust path if needed

export default function JobSwipe() {
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get("/jobs/swipe")
      .then((res) => setJobs(res.data))
      .catch(console.error);
  }, []);

  const handleLike = async (jobId) => {
    try {
      await api.post(`/swipe/right/${jobId}`);
      setIndex((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to apply");
    }
  };

  const handleDislike = async (jobId) => {
    try {
      await api.post(`/swipe/left/${jobId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIndex((prev) => prev + 1);
    }
  };

  if (!jobs[index]) {
    return (
      <>
        <TopBar />
        <div className="min-h-screen flex items-center justify-center
                        bg-gradient-to-br from-gray-900 to-gray-800
                        text-white text-xl">
          No more jobs 🎉
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar />

      <div className="min-h-screen flex flex-col items-center justify-center
                      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                      relative overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute w-[600px] h-[600px] bg-green-500/20 rounded-full
                        blur-[140px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-emerald-400/20 rounded-full
                        blur-[140px] bottom-[-200px] right-[-200px]" />

        <h1 className="text-2xl font-semibold text-white/90 mb-8 z-10">
          Swipe Jobs
        </h1>

        {/* Card Stage */}
        <div className="relative w-[360px] h-[540px] z-10">
          <div className="absolute inset-0 rounded-2xl bg-white/5
                          scale-[0.96] translate-y-4 blur-sm" />

          <JobCard
            job={jobs[index]}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        </div>

        <p className="mt-6 text-xs text-white/50">
          Swipe → Apply &nbsp;&nbsp; Swipe ← Skip
        </p>
      </div>
    </>
  );
}
