export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
      <div className="w-full max-w-md p-8 rounded-xl border border-[var(--border-subtle)] bg-black/40">
        <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}
