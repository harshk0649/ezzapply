import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login, getUser } from "../../auth/useAuth";
import { motion } from "framer-motion";


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
      await login(form.email, form.password);

      const user = getUser();

      if (user.roles.includes("ROLE_RECRUITER")) {
        navigate("/recruiter");
      } else {
        navigate("/applicant/profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

return (
  <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
    
<motion.div
 initial={{ opacity: 0, x: -40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  whileHover={{ rotateX: 6, rotateY: -6 }}
  style={{ transformStyle: "preserve-3d" }}
  className="relative hidden md:flex flex-col justify-center px-16 text-white overflow-hidden
             bg-gradient-to-br from-green-600 via-green-500 to-emerald-600"
>
  {/* Floating blurred orbs */}
  <motion.div
    animate={{ y: [0, -30, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className="absolute top-20 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"
  />

  <motion.div
    animate={{ y: [0, 40, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    className="absolute bottom-20 right-20 w-56 h-56 bg-emerald-300/20 rounded-full blur-3xl"
  />

  {/* Content */}
  <motion.div
    whileHover={{ rotateX: 3, rotateY: -3 }}
    transition={{ type: "spring", stiffness: 80 }}
    className="relative z-10"
  >
    <h1 className="text-4xl font-bold mb-4">EzzApply</h1>

    <p className="text-lg opacity-90 mb-10">
      Hire faster. Apply smarter.
    </p>

    <ul className="space-y-3 text-sm opacity-90">
      <li>✔ Smart job matching</li>
      <li>✔ One-click apply</li>
      <li>✔ Trusted by companies</li>
    </ul>
  </motion.div>
  {/* Floating job cards */}
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  className="absolute top-32 right-24 w-48 p-4 rounded-xl bg-white/20 backdrop-blur-xl shadow-xl"
  style={{ transform: "translateZ(40px)" }}
>
  <p className="text-sm font-semibold">Java Backend Dev</p>
  <p className="text-xs opacity-80">Spring Boot • MySQL</p>
</motion.div>

<motion.div
  animate={{ y: [0, 25, 0] }}
  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  className="absolute bottom-32 left-20 w-44 p-4 rounded-xl bg-white/15 backdrop-blur-xl shadow-xl"
  style={{ transform: "translateZ(30px)" }}
>
  <p className="text-sm font-semibold">Frontend Engineer</p>
  <p className="text-xs opacity-80">React • Tailwind</p>
</motion.div>

</motion.div>


    {/* RIGHT – SIGNUP CARD */}
    <div className="flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Join EzzApply and get hired faster
        </p>

        <form onSubmit={submit} className="space-y-4">
          
          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              I am a
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="applicant">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            className="text-green-600 font-medium cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  </div>
);

}
