import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function IndustrialCore() {
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.5}>
      <mesh>
        <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
        <meshStandardMaterial
          color="#22c55e"
          metalness={0.8}
          roughness={0.25}
          emissive="#16a34a"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

export default function Home3D() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePrimaryCTA = () => {
    if (!user) navigate("/login");
    else if (user.role === "JOB_SEEKER") navigate("/applicant/dashboard");
    else if (user.role === "RECRUITER") navigate("/recruiter/dashboard");
  };

  return (
    <div className="relative h-screen w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 3]} intensity={1.3} />
        <IndustrialCore />
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold">
            Swipe Jobs. Hire Faster.
          </h1>

          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            A modern hiring platform built for speed, clarity, and real matches.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={handlePrimaryCTA}
              className="px-6 py-3 rounded-lg bg-[var(--green-primary)] text-black hover:opacity-90 transition"
            >
              {user ? "Go to Dashboard" : "Login"}
            </button>

            {!user && (
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 rounded-lg border border-[var(--border-subtle)] hover:bg-white/5 transition"
              >
                Get Started
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
