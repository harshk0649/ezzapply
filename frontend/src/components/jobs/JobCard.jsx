import { motion, useMotionValue, useTransform } from "framer-motion";
import { MapPin, Briefcase, Clock } from "lucide-react";

export default function JobCard({ job, onLike, onDislike }) {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 150], [-10, 10]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 120) {
      onLike(job.id);
    } else if (info.offset.x < -120) {
      onDislike(job.id);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      whileTap={{ scale: 1.04 }}
      className="absolute w-full h-full rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing
                 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden"
    >
      {/* APPLY / SKIP OVERLAYS */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-6 left-6 z-20 text-green-600 border-4 border-green-600
                   px-4 py-1 text-xl font-bold rounded-lg rotate-[-12deg]"
      >
        APPLY
      </motion.div>

      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-6 right-6 z-20 text-red-600 border-4 border-red-600
                   px-4 py-1 text-xl font-bold rounded-lg rotate-[12deg]"
      >
        SKIP
      </motion.div>

      {/* CARD CONTENT */}
      <div className="flex flex-col h-full p-6">

        {/* HEADER */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            {/* Fake company logo */}
            <div className="w-12 h-12 rounded-lg bg-green-600 text-white
                            flex items-center justify-center font-bold text-lg">
              {job.companyName?.[0] || "E"}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 leading-tight">
                {job.title}
              </h2>
              <p className="text-sm text-gray-500">
                {job.companyName || "Confidential Company"}
              </p>
            </div>
          </div>

          {/* META */}
          <div className="flex flex-wrap gap-2 text-xs mt-2">
            <span className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              <MapPin size={12} /> {job.location}
            </span>
            <span className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              <Briefcase size={12} /> {job.jobType}
            </span>
            {job.experienceYears !== null && (
              <span className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                <Clock size={12} /> {job.experienceYears}+ yrs
              </span>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="flex-1 mt-2">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">
            {job.description}
          </p>

          {/* SKILLS */}
          {job.skills && (
            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.split(",").slice(0, 6).map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Swipe right to apply • left to skip
        </div>
      </div>
    </motion.div>
  );
}
