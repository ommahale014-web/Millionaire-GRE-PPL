"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Questionform from "@/components/admin/Questionform";
import { useQuestionsStore } from "@/store/questionsStore";
import {
  createQuestion,
  createBulkQuestions,
  getQuestions
} from "@/actions/admin_B/questions"; // ✅ import here
import { UploadCloud, FileText, Sparkles, ArrowRight } from "lucide-react";

export default function CreateQuestionPage() {
  const router = useRouter();
  const addQuestion = useQuestionsStore((s) => s.addQuestion);
  const setQuestions = useQuestionsStore((s) => s.setQuestions);
  const [isPending, startTransition] = useTransition();

  // -----------------------------
  // Single question submission
  // -----------------------------
  const handleSubmit = (payload) => {
    startTransition(async () => {
      try {
        const inserted = await createQuestion(payload); // ✅ use here
        addQuestion(inserted);
        router.push("/admin/questions");
      } catch (err) {
        alert(err.message);
      }
    });
  };

  // -----------------------------
  // Bulk upload submission
  // -----------------------------
  const handleBulkUpload = (questionsArray) => {
    startTransition(async () => {
      try {
        const result = await createBulkQuestions(questionsArray); // ✅ use here
        alert(`${result.inserted} questions added!`);
        const refreshed = await getQuestions(); // refresh list
        setQuestions(refreshed);
      } catch (err) {
        alert(err.message);
      }
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create New Question</h1>
        <p className="text-xs text-slate-500 mt-0.5">Add a single question or import via bulk upload</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Main Form Column - Bluish Theme Wrapper */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-xl border border-blue-100 shadow-md shadow-blue-50/50 p-5 relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-4 border-b border-blue-100 pb-3 relative z-10">
              <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">Question Details</h2>
            </div>

            <div className="relative z-10">
              <Questionform onSubmit={handleSubmit} disabled={isPending} />
            </div>
          </div>
        </div>

        {/* Sidebar / Tools Column */}
        <div className="space-y-4">

          {/* Bulk Upload Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sticky top-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                <UploadCloud className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">Bulk Upload</h2>
            </div>

            <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">
              Upload your .xlsx, .csv, or .json files containing multiple questions.
            </p>

            <div className="relative group">
              <input
                type="file"
                accept=".xlsx,.csv,.json"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  let data = [];
                  if (file.name.endsWith(".json")) {
                    const text = await file.text();
                    data = JSON.parse(text);
                  } else {
                    const XLSX = await import("xlsx");
                    const arrayBuffer = await file.arrayBuffer();
                    const workbook = XLSX.read(arrayBuffer);
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    data = XLSX.utils.sheet_to_json(sheet);
                  }

                  handleBulkUpload(data);
                }}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-dashed border-slate-200 hover:border-indigo-300 rounded-lg p-3 transition-all"
              />
            </div>
          </div>

          {/* AI Generation Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-blue-100 shadow-sm p-4 relative overflow-hidden group">
            {/* Decorative sparkle */}
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-blue-200/50 rounded-full blur-2xl group-hover:bg-blue-300/50 transition-colors"></div>

            <div className="flex items-center gap-2 mb-2 relative z-10">
              <div className="p-1.5 bg-white rounded-lg text-indigo-600 shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-indigo-900">Need Help?</h2>
            </div>

            <p className="text-[10px] text-indigo-700/80 mb-3 leading-relaxed relative z-10">
              Use our AI Agent to generate high-quality questions instantly.
            </p>

            <button
              onClick={() => router.push('/admin/questions/ai-generate')}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-lg transition-all shadow-sm hover:shadow-md relative z-10 group-hover:scale-[1.02]"
            >
              Generate with AI
              <ArrowRight className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
