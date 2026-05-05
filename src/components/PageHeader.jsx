export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

      {/* LEFT */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          {title}
        </h1>

        <p className="text-slate-400 mt-1 text-sm">
          {subtitle}
        </p>
      </div>

      {/* RIGHT (BUTTON / ACTION) */}
      <div>
        {children}
      </div>

    </div>
  );
}