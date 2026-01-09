export default function AppliedJobCard({ job }) {
  const statusColor = {
    APPLIED: "#777",
    SHORTLISTED: "#0a66c2",
    REJECTED: "#d93025",
    HIRED: "#188038"
  }[job.status];

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: 16,
      borderRadius: 10,
      marginBottom: 12,
      background: "#fff"
    }}>
      <h3>{job.jobTitle}</h3>
      <p>{job.jobLocation}</p>

      <p style={{
        fontWeight: "bold",
        color: statusColor
      }}>
        Status: {job.status}
      </p>
    </div>
  );
}
