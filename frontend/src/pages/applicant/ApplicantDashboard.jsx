import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApplicantDashboard } from "../../api/dashboardApi";

const USER_ID = 10; // temp (JWT later)

export default function ApplicantDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const dashboard = await getApplicantDashboard(USER_ID);
      setData(dashboard);
    }
    load();
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Welcome 👋</h2>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20
      }}>
        <div style={cardStyle}>
          <h3>{data.applicationsCount}</h3>
          <p>Applications</p>
        </div>

        <div style={cardStyle}>
          <h3>{data.creditsLeft}</h3>
          <p>Swipes left today</p>
        </div>
      </div>

      <button
        style={ctaStyle}
        onClick={() => navigate("/applicant/swipe")}
      >
        Swipe Jobs →
      </button>
    </div>
  );
}

const cardStyle = {
  flex: 1,
  margin: "0 8px",
  padding: 20,
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const ctaStyle = {
  marginTop: 30,
  width: "100%",
  padding: 14,
  fontSize: 16,
  borderRadius: 10,
  background: "#0a66c2",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};
