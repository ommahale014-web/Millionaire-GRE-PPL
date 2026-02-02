"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trash2, Plus, ArrowLeft, Save, Sparkles, CheckCircle2, Search } from "lucide-react";
import TestForm from "@/components/admin/TestForm";
import PublishToggle from "@/components/admin/PublishToggle";
import { gettTestById, updateTest } from "@/actions/admin_B/tests.actions";
import { getQuestions } from "@/actions/admin_B/questions";

// Custom compact table row
const QuestionRow = ({ q, actionIcon: Icon, actionColor, onAction, disabled }) => (
  <div className={`flex items-start gap-3 p-3 rounded-lg border transition-all group bg-white ${disabled ? "border-slate-100 opacity-60" : "border-slate-200 hover:border-blue-300 hover:shadow-sm"
    }`}>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-slate-800 font-medium line-clamp-2 leading-relaxed">{q.question_text}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200">{q.id.slice(0, 6)}</span>
        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${q.section_type === 'QUANT' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
          }`}>
          {q.section_type}
        </span>
      </div>
    </div>
    <button
      onClick={() => onAction(q.id)}
      disabled={disabled}
      className={`p-1.5 rounded-md border shadow-sm transition-all mt-0.5 ${disabled
        ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed hidden"
        : `${actionColor} bg-white opacity-100`
        }`}
    >
      <Icon size={14} strokeWidth={2.5} />
    </button>
  </div>
);

export default function EditTestPage() {
  const { id } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [testTitle, setTestTitle] = useState("");
  const [published, setPublished] = useState(false);
  const [testQuestions, setTestQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      const testRes = await gettTestById(id);
      if (testRes.success) {
        const test = testRes.data;
        setTestTitle(test.title);
        setPublished(test.is_published);

        const questionBank = await getQuestions();
        setQuestions(questionBank);

        const fullQuestions = test.questions.map((q) =>
          questionBank.find((bankQ) => bankQ.id === q.id) || q
        );
        setTestQuestions(fullQuestions);
      } else {
        alert(testRes.error);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const addTestQuestion = (qId) => {
    if (testQuestions.find((q) => q.id === qId)) return;
    const question = questions.find((q) => q.id === qId);
    if (!question) return;
    setTestQuestions([...testQuestions, question]);
  };

  const deleteTestQuestion = (qId) => {
    setTestQuestions(testQuestions.filter((q) => q.id !== qId));
  };

  const isQuestionAdded = (qId) => testQuestions.some((q) => q.id === qId);

  const handleUpdateTest = async () => {
    if (!testTitle) return alert("Enter test title");
    if (testQuestions.length === 0) return alert("Add at least one question");

    const res = await updateTest(id, {
      title: testTitle,
      is_published: published,
      question_ids: testQuestions.map((q) => q.id),
    });

    if (res.success) {
      alert("Test updated successfully");
      router.push("/admin/tests");
    } else {
      alert(res.error);
    }
  };

  const filteredQuestions = questions.filter(q =>
    q.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500 gap-3">
      <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-sm font-medium">Loading test...</p>
    </div>
  );

  return (
    <div className="min-h-screen pb-12 px-6 bg-slate-50 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between shrink-0 pt-6 sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm py-4 border-b border-slate-200 -mx-6 px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/tests')}
            className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Edit Test</h1>
            <p className="text-xs text-slate-500 mt-0.5">Modify content for {testTitle}</p>
          </div>
        </div>

        <button
          onClick={handleUpdateTest}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-sm hover:shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all font-bold text-xs border border-blue-500/20"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6">

        {/* 1. Test Details Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="p-1.5 bg-blue-50 rounded-md text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-800">Test Details</h2>
          </div>

          <div className="space-y-4">
            <TestForm testTitle={testTitle} setTestTitle={setTestTitle} />
            <PublishToggle published={published} setPublished={setPublished} />
          </div>
        </div>

        {/* 2. Selected Questions List */}
        <div className="bg-white rounded-lg border border-blue-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-blue-50/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-blue-900">Selected Questions</h2>
            </div>
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">
              {testQuestions.length} Selected
            </span>
          </div>

          <div className="p-3 bg-slate-50/30 min-h-[100px] max-h-[400px] overflow-y-auto custom-scrollbar">
            {testQuestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {testQuestions.map(q => (
                  <QuestionRow
                    key={q.id}
                    q={q}
                    actionIcon={Trash2}
                    actionColor="text-red-600 border-red-100 hover:border-red-200 hover:bg-red-50"
                    onAction={deleteTestQuestion}
                  />
                ))}
              </div>
            ) : (
              <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 m-2">
                <p className="text-xs font-medium">No questions selected yet</p>
                <p className="text-[10px] opacity-70 mt-1">Select questions from the bank below ↓</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. Question Bank */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden scroll-mt-24" id="question-bank">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <Plus className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">Question Bank</h2>
            </div>

            <div className="flex items-center gap-3 flex-1 justify-end max-w-md">
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap hidden sm:block">
                {filteredQuestions.length} Available
              </span>
              <div className="relative w-full max-w-[200px]">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 bg-slate-50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* RESTRICTED HEIGHT SCROLLABLE AREA */}
          <div className="h-[400px] overflow-y-auto custom-scrollbar p-4 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredQuestions.map(q => (
                <QuestionRow
                  key={q.id}
                  q={q}
                  actionIcon={Plus}
                  actionColor="text-blue-600 border-blue-100 hover:border-blue-200 hover:bg-blue-50"
                  onAction={addTestQuestion}
                  disabled={isQuestionAdded(q.id)}
                />
              ))}
              {filteredQuestions.length === 0 && (
                <div className="col-span-full h-full flex items-center justify-center text-slate-400">
                  <p className="text-xs">{searchTerm ? "No matches found" : "Loading questions..."}</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
