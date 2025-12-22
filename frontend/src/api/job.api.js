import api from "./axios";

export const createJobApi = (jobData) => {
  return api.post("/jobs", jobData);
};

export const getMyJobsApi = () => {
  return api.get("/jobs/my");
};

export const toggleJobStatusApi = (jobId) => {
  return api.put(`/jobs/${jobId}/toggle`);
};

export const getSwipeJobsApi = () => api.get("/jobs/swipe");
