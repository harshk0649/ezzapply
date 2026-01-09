import { motion } from "framer-motion";
import "./JobCard.css";

export default function JobCard({ job, onSwipe }) {
  return (
    <motion.div
      className="job-card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 120) {
          onSwipe("right"); // apply
        } else if (info.offset.x < -120) {
          onSwipe("left"); // skip
        }
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h2>{job.title}</h2>
      <p><b>Location:</b> {job.location}</p>
      <p>{job.description}</p>
      <p><b>Experience:</b> {job.experienceRequired ?? "Any"}</p>

      <div style={{ marginTop: 12, fontSize: 14, color: "#666" }}>
        👉 Swipe right to apply · 👈 Swipe left to skip
      </div>
    </motion.div>
  );
}
