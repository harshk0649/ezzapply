import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../auth/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      if (data.roles.includes("ROLE_RECRUITER")) {
        navigate("/recruiter/jobs/create");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
