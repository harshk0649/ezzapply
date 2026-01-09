import { motion } from "framer-motion";

export default function JobSwipeCard({ job, onLike, onReject }) {
  return (
    <motion.div
      className="absolute w-[360px] h-[480px] bg-[#0f1413]
                 border border-[var(--border-subtle)]
                 rounded-2xl p-6 shadow-xl"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 120) onLike(job);
        else if (info.offset.x < -120) onReject(job);
      }}
      whileTap={{ scale: 1.03 }}
    >
      <h2 className="text-xl font-semibold mb-2">
        {job.title}
      </h2>

      <p className="text-sm text-gray-400 mb-4">
        {job.location}
      </p>

      <p className="text-sm leading-relaxed text-gray-300">
        {job.description}
      </p>

      <div className="mt-6 text-xs text-green-400">
        {job.recruiterName}
      </div>
    </motion.div>
  );
}
