"use client";

// Removed Shadcn imports to use custom styling matching the theme
// import { Input } from "@/components/ui/input";

const inputClasses = "w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm bg-white hover:border-blue-200";

export default function TestForm({ testTitle, setTestTitle }) {
  // Removed internal fetching logic - data should be passed down

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 ml-1">
          Test Title
        </label>
        <input
          placeholder="Enter test title (e.g., GRE General Test 1)"
          value={testTitle}
          onChange={(e) => setTestTitle(e.target.value)}
          className={inputClasses}
        />
      </div>
    </div>
  );
}
