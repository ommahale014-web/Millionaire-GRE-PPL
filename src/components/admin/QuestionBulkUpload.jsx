"use client";

import { useState, useTransition } from "react";
import { UploadCloud, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { parseQuestionsExcel } from "@/utils/parseQuestionsExcel";
import { createBulkQuestions } from "@/actions/admin_B/questions"; // ✅ server action

export default function QuestionBulkUpload({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setCount(0);

    startTransition(async () => {
      try {
        // 1️⃣ Parse Excel / CSV on client
        const rows = await parseQuestionsExcel(file);

        if (!rows.length) throw new Error("No valid questions found");

        // 2️⃣ Call server action directly (no fetch!)
        const result = await createBulkQuestions(rows);

        setCount(rows.length);
        onSuccess?.();
      } catch (err) {
        setError(err.message || "Upload failed");
      } finally {
        setLoading(false);
        e.target.value = "";
      }
    });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-indigo-50 rounded-md text-indigo-600">
            <UploadCloud className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">Bulk Upload</h3>
          </div>
        </div>

        {loading && (
          <span className="text-[10px] text-blue-600 flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded">
            <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Uploading...
          </span>
        )}

        {count > 0 && !loading && (
          <span className="text-[10px] text-emerald-600 flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded">
            <CheckCircle className="w-2.5 h-2.5" /> {count} Added
          </span>
        )}

        {error && (
          <span className="text-[10px] text-red-600 flex items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded">
            <AlertCircle className="w-2.5 h-2.5" /> Error
          </span>
        )}
      </div>

      <div className="relative group">
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFile}
          disabled={loading}
          className="w-full text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-dashed border-slate-300 hover:border-indigo-400 rounded-md p-1.5 transition-all bg-slate-50/50 h-8"
        />
      </div>
    </div>
  );
}
