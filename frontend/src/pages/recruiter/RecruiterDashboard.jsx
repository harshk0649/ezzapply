import { useEffect, useState } from "react";
import { getMyJobsApi, toggleJobStatusApi } from "../../api/job.api";
import CreateJob from "./CreateJob";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔁 Load recruiter jobs
  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await getMyJobsApi();
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Activate / Deactivate job
  const toggleStatus = async (jobId) => {
    try {
      await toggleJobStatusApi(jobId);
      loadJobs();
    } catch (err) {
      console.error(err);
      alert("Failed to update job");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Recruiter Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage your job postings and hiring activity
            </p>
          </div>

          <button
            onClick={() => setShowCreate(!showCreate)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            {showCreate ? "Close Job Form" : "+ Post New Job"}
          </button>
        </div>

        {/* CREATE JOB FORM */}
        {showCreate && (
          <div className="mb-10">
            <CreateJob onJobCreated={loadJobs} />
          </div>
        )}

        {/* JOB LIST */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Your Jobs
        </h2>

        {loading && (
          <p className="text-gray-500">Loading jobs...</p>
        )}

        {!loading && jobs.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            No jobs posted yet.
          </div>
        )}

        {/* JOB CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {job.location} • {job.jobType}
                  </p>
                </div>

                {/* STATUS BADGE */}
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full
                    ${job.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {job.active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-400">
                  Job ID: {job.id}
                </p>

                <button
                  onClick={() => toggleStatus(job.id)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition
                    ${job.active
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                    }`}
                >
                  {job.active ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
