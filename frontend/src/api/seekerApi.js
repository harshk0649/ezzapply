import api from "../utils/api";

export const getAppliedJobs = async () => {
  const res = await api.get("/api/seeker/dashboard/applications");
  return res.data;
};
