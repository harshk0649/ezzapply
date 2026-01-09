import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await login(form.email, form.password);

      if (user?.role === "RECRUITER") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/applicant/dashboard");
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black">

      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:flex flex-col justify-center px-16 text-white
                   bg-gradient-to-br from-green-700 to-emerald-600"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
        <p className="opacity-90">
          Continue your journey with EzzApply
        </p>
      </motion.div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={submit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />

            <button className="w-full bg-green-600 text-white py-3 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
