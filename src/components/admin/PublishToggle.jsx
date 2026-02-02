"use client";

import { Switch } from "@/components/ui/switch";

export default function PublishToggle({ published, setPublished }) {
  // Removed internal fetching logic

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
      <div className="flex flex-col">
        <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">Status</p>
        <p className="text-[10px] text-slate-500 mt-0.5">
          {published ? "Visible to students" : "Hidden from students"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${published
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-slate-50 text-slate-500 border-slate-100"
            }`}
        >
          {published ? "Published" : "Draft"}
        </span>
        <Switch
          checked={published}
          onCheckedChange={setPublished}
          className="data-[state=checked]:bg-emerald-600"
        />
      </div>
    </div>
  );
}
