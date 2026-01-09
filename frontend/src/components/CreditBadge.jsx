export default function CreditBadge({ credits }) {
  return (
    <div className="fixed top-6 right-6 bg-black/60 backdrop-blur
                    border border-[var(--border-subtle)]
                    px-4 py-2 rounded-full text-sm">
      <span className="text-green-400 font-semibold">
        {credits}
      </span>{" "}
      swipes left
    </div>
  );
}
