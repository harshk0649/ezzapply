import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { motion } from "framer-motion";

export default function Signup() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.role
      );

      await login(form.email, form.password);

      if (form.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/applicant/profile");
      }
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black">
      
      {/* LEFT – BRAND */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex flex-col justify-center px-16 text-white
                   bg-gradient-to-br from-green-700 via-green-600 to-emerald-600"
      >
        <h1 className="text-4xl font-bold mb-4">EzzApply</h1>
        <p className="opacity-90 mb-8">
          Swipe jobs. Hire faster.
        </p>
        <ul className="space-y-2 text-sm">
          <li>✔ One swipe apply</li>
          <li>✔ Smart matching</li>
          <li>✔ Recruiter verified</li>
        </ul>
      </motion.div>

      {/* RIGHT – FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Create account
          </h2>

          <form onSubmit={submit} className="space-y-4">
            <input
              name="name"
              placeholder="Full name"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />

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

            <select
              name="role"
              onChange={handleChange}
              className="w-full p-3 border rounded"
            >
              <option value="applicant">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>

            <button className="w-full bg-green-600 text-white py-3 rounded">
              Create Account
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
