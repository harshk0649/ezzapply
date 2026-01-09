const BASE_URL = "http://localhost:8080";

export async function applyJob(userId, jobId) {
  const res = await fetch(
    `${BASE_URL}/api/swipe/apply/${userId}/${jobId}`,
    { method: "POST" }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  return res.json();
}

export async function getCredits(userId) {
  const res = await fetch(
    `${BASE_URL}/api/swipe/credits/${userId}`
  );
  return res.json();
}
