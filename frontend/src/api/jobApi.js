import api from "../utils/api";

export const fetchJobs = async () => {
  const res = await api.get("/api/jobs");
  return res.data;
};

export const applyJob = async (jobId) => {
  return api.post(`/api/swipe/apply/${jobId}`);
};

export const fetchCredits = async () => {
  const res = await api.get("/api/swipe/credits");
  return res.data;
};

export const fetchSwipeJobs = async () => {
  const res = await api.get("/api/swipe/jobs");
  return res.data;
};

