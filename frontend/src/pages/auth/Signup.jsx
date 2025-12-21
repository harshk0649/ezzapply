import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../auth/useAuth";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await register(form.name, form.email, form.password, form.role);
      await login(form.email, form.password); // auto-login
      navigate("/jobs");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <select name="role" onChange={handleChange}>
        <option value="applicant">Job Seeker</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <button type="submit">Create Account</button>
    </form>
  );
}
