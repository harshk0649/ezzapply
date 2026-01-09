import { motion } from "framer-motion";
import HeroScene from "../components/three/HeroScene";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* LEFT: TEXT */}
        <div className="flex flex-col justify-center px-10 md:px-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Swipe.
            <br />
            Match.
            <br />
            Get Hired.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-gray-300 max-w-md"
          >
            A modern job platform where talent meets opportunity —
            faster, smarter, and without friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex gap-4"
          >
            <a
              href="/signup"
              className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-500 transition"
            >
              Get Started
            </a>

            <a
              href="/login"
              className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </a>
          </motion.div>
        </div>

        {/* RIGHT: 3D */}
        <div className="hidden md:block">
          <HeroScene />
        </div>
      </div>
    </div>
  );
}
