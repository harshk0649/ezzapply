import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Briefcase,
  Users,
  Building,
  Star,
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white text-gray-900">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-600">EzzApply</h1>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-green-600">Features</a>
            <a href="#how" className="hover:text-green-600">How it works</a>
            <a href="#testimonials" className="hover:text-green-600">Testimonials</a>
          </nav>

          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Find your next job <br />
              <span className="text-green-600">with a swipe</span>
            </h1>

            <p className="mt-6 text-gray-600 max-w-md">
              EzzApply makes job hunting fast, intuitive, and human.
              Swipe jobs, match with recruiters, and get hired faster.
            </p>

            <div className="mt-8 flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-green-500"
              />
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Get Started <ArrowRight size={18} />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-10">
              {[
                ["10K+", "Jobs"],
                ["5K+", "Companies"],
                ["50K+", "Users"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold">{num}</p>
                  <p className="text-sm text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Abstract motion visual */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-80 rounded-3xl bg-gradient-to-br from-green-500/20 via-green-400/10 to-emerald-500/20"
          />
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Why choose EzzApply?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              [Search, "Smart matching", "AI-powered job recommendations"],
              [Briefcase, "One-click apply", "No long forms, just swipe"],
              [Users, "Direct contact", "Chat with recruiters directly"],
              [Building, "Top companies", "Verified employers only"],
            ].map(([Icon, title, desc]) => (
              <motion.div
                key={title}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <Icon className="text-green-600 mb-4" size={28} />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-14">How it works</h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              "Create profile",
              "Browse jobs",
              "Swipe to apply",
              "Get hired",
            ].map((step, i) => (
              <div key={step}>
                <div className="w-10 h-10 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="mt-4 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonials" className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            What users say
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              ["Sarah Johnson", "Software Engineer"],
              ["Michael Chen", "HR Manager"],
            ].map(([name, role]) => (
              <div key={name} className="bg-white p-6 rounded-xl shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  “EzzApply completely changed how I apply for jobs. Fast and clean.”
                </p>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} EzzApply. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
