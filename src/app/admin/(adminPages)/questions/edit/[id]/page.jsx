"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Questionform from "@/components/admin/Questionform";
import { getQuestions, updateQuestion } from "@/actions/admin_B/questions"; // ✅ server actions
import { PencilLine, FileSignature, ArrowLeft } from "lucide-react";

export default function EditQuestionPage() {
  const { id } = useParams(); // full question UUID from URL
  const router = useRouter();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  // Fetch the question by ID from server action
  useEffect(() => {
    if (!id) {
      setError("Question ID is missing from URL");
      setLoading(false);
      return;
    }

    startTransition(async () => {
      try {
        const allQuestions = await getQuestions(); // fetch all questions via server action
        const q = allQuestions.find((q) => q.id === id);
        if (!q) throw new Error("Question not found");
        setQuestion(q);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });
  }, [id]);

  // Update question using server action
  const handleUpdate = (updatedData) => {
    if (!id) return setError("Question ID is missing");

    startTransition(async () => {
      try {
        const updated = await updateQuestion({ id, ...updatedData }); // call server action
        setQuestion(updated);
        router.push("/admin/questions"); // back to list
      } catch (err) {
        setError(err.message);
      }
    });
  };

  if (loading)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500 gap-3">
        <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-sm font-medium">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600 mb-4">
          <span className="text-xl font-bold">!</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800">Error Loading Question</h3>
        <p className="text-sm text-red-600 mt-2">{error}</p>
        <button
          onClick={() => router.push('/admin/questions')}
          className="mt-6 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50"
        >
          Back to Questions
        </button>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/admin/questions')}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Edit Question</h1>
          <p className="text-xs text-slate-500">Update question details and answers</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-xl border border-blue-100 shadow-md shadow-blue-50/50 p-5 relative overflow-hidden">
        {/* Decorative Blur */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="flex items-center gap-2 mb-4 border-b border-blue-100 pb-3 relative z-10">
          <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
            <FileSignature className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800">Modify Details</h2>
        </div>

        <div className="relative z-10">
          <Questionform
            initialData={question}
            submitLabel="Update Question"
            onSubmit={handleUpdate}
            disabled={isPending}
          />
        </div>
      </div>

    </div>
  );
}
