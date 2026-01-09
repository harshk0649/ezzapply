import { NavLink, Outlet } from "react-router-dom";

export default function RecruiterLayout() {
  return (
    <div style={container}>
      {/* Sidebar */}
      <aside style={sidebar}>
        <h2 style={{ marginBottom: 30 }}>EzzApply</h2>

        <NavLink to="/recruiter/dashboard" style={link}>
          Dashboard
        </NavLink>

        <NavLink to="/recruiter/jobs" style={link}>
          My Jobs
        </NavLink>

        <NavLink to="/recruiter/applicants" style={link}>
          Applicants
        </NavLink>
      </aside>

      {/* Content */}
      <main style={content}>
        <Outlet />
      </main>
    </div>
  );
}

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "#f3f6f9"
};

const sidebar = {
  width: 220,
  padding: 20,
  background: "#ffffff",
  boxShadow: "2px 0 10px rgba(0,0,0,0.05)"
};

const link = {
  display: "block",
  marginBottom: 15,
  color: "#0a66c2",
  textDecoration: "none",
  fontWeight: 500
};

const content = {
  flex: 1,
  padding: 30
};
