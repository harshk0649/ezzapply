import { getAppliedJobs } from "./seekerApi";
import { getCredits } from "./swipeApi";

export async function getApplicantDashboard(userId) {
  const [applications, credits] = await Promise.all([
    getAppliedJobs(userId),
    getCredits(userId),
  ]);

  return {
    applicationsCount: applications.length,
    creditsLeft: credits,
  };
}
