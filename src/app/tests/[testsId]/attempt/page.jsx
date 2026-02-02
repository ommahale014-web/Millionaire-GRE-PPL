"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useStudentTestStore } from "@/store/studentTestStore";
import { getTestQuestions } from "@/actions/student/test.actions";

export default function TestAttemptPage() {
  const { testsId } = useParams();
  const router = useRouter();
  const sections = ["VERBAL", "QUANT"];
  const questions = useStudentTestStore((s) => s.questions);
  const setQuestions = useStudentTestStore((s) => s.setQuestions);
  const [section, setSection] = useState("VERBAL");
  const [activeQ, setActiveQ] = useState(1);
  const answers = useStudentTestStore((s) => s.answers);
  const setAnswer = useStudentTestStore((s) => s.setAnswer);
  const filteredQuestions = questions.filter(
    (q) => q.section_type === section
  );

  const currentQuestion = filteredQuestions[activeQ - 1];

  const selectOption = (optionKey) => {
    setAnswer(currentQuestion.id, optionKey);
  };



  const handleNext = () => {
    if (activeQ < filteredQuestions.length) {
      setActiveQ(activeQ + 1);
    } else if (section === "VERBAL") {
      setSection("QUANT");
      setActiveQ(1);
    }
  };


  const handleSubmit = () => {
    router.push(`/tests/${testsId}/result`);
  };

  useEffect(() => {
    setActiveQ(1);
  }, [section]);

  useEffect(() => {
    async function loadQuestions() {
      const res = await getTestQuestions(testsId);
      if (!res.success) {
        alert("Failed to load questions");
        return;
      }
      setQuestions(res.data);
    }

    loadQuestions();
  }, [testsId]);


  return (
    <div className="h-screen p-3 bg-blue-50/50 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto h-full flex flex-col">

        {/* Section Tabs */}
        <div className="flex space-x-3 mb-3 flex-shrink-0">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => {
                setSection(sec);
                setActiveQ(1);
              }}
              className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${section === sec ? "bg-blue-600 text-white shadow" : "bg-white text-slate-500 hover:bg-blue-50 border border-slate-200"}`}>
              {sec}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="flex flex-1 gap-4 overflow-hidden">

          {/* LEFT: QUESTION CARD */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden relative">
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Question {activeQ} <span className="text-slate-400 text-base font-normal">({section})</span>
              </h2>
              <p className="text-slate-800 mb-6 text-base leading-relaxed font-medium">
                {currentQuestion?.question_text}
              </p>

              <div className="space-y-3">
                {currentQuestion &&
                  [
                    { key: "A", text: currentQuestion.option_a },
                    { key: "B", text: currentQuestion.option_b },
                    { key: "C", text: currentQuestion.option_c },
                    { key: "D", text: currentQuestion.option_d },
                  ].map((opt) => {
                    const selected = answers[currentQuestion.id] === opt.key;

                    return (
                      <button
                        key={opt.key}
                        onClick={() => selectOption(opt.key)}
                        className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-left transition-all duration-200 border group text-sm
                        ${selected
                            ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                            : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-600"
                          }`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border flex-shrink-0 ${selected ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-400 border-slate-200 group-hover:border-blue-400 group-hover:text-blue-500"}`}>
                            {opt.key}
                          </span>
                          <span className="font-medium">{opt.text}</span>
                        </div>
                        {selected && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    );
                  })}

              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-4 pt-4 border-t border-slate-100 flex-shrink-0">
              <button
                disabled={activeQ === 1}
                onClick={() => setActiveQ(activeQ - 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-medium text-sm text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                Previous
              </button>

              {section === "QUANT" && activeQ === filteredQuestions.length ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold text-sm shadow hover:bg-green-700 transition-all"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm shadow hover:bg-blue-700 transition-all"
                >
                  Next
                </button>
              )}

            </div>

          </div>

          {/* RIGHT: QUESTION NAV + STATUS PANEL */}
          <div className="flex-shrink-0 w-64 flex flex-col gap-4 h-full">

            {/* QUESTION NAV */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col flex-1 overflow-hidden">
              <div className="grid grid-cols-4 gap-2 overflow-y-auto pr-1 custom-scrollbar content-start">
                {filteredQuestions.map((q, idx) => {
                  const attempted = answers[q.id];
                  const isActive = activeQ === idx + 1;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQ(idx + 1)}
                      className={`
                    w-9 h-9 flex items-center justify-center rounded-md font-bold transition-all duration-200 text-xs
                    ${isActive
                          ? "bg-blue-600 text-white shadow ring-2 ring-blue-200"
                          : attempted
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100"
                        }
                  `}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STATUS PANEL */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-xs flex-shrink-0">
              <p className="font-bold mb-3 text-slate-700 border-b border-slate-100 pb-2">
                Legend
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></span>
                  <span className="text-slate-600">Answered</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-blue-600"></span>
                  <span className="text-slate-600">Current</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-slate-50 border border-slate-200"></span>
                  <span className="text-slate-600">Unanswered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
