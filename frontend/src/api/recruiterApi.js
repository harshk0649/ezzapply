const BASE_URL = "http://localhost:8080";

export async function getApplicantsByJob(jobId) {
  const res = await fetch(
    `${BASE_URL}/api/recruiter/dashboard/applications/${jobId}`
  );
  return res.json();
}

export async function updateApplicationStatus(applicationId, status) {
  const res = await fetch(
    `${BASE_URL}/api/recruiter/dashboard/applications/${applicationId}/status?status=${status}`,
    { method: "PATCH" }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}
