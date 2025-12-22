// frontend/src/components/jobs/JobCard.jsx
export default function JobCard({ job, onLike, onDislike }) {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.jobType}</p>
      <p><strong>Experience:</strong> {job.experienceYears}+ years</p>
      <p><strong>Salary:</strong> ₹{job.salaryMin} - ₹{job.salaryMax}</p>

      <p>{job.description}</p>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => onDislike(job.id)}>❌ Skip</button>
        <button onClick={() => onLike(job.id)}>✅ Apply</button>
      </div>
    </div>
  );
}
