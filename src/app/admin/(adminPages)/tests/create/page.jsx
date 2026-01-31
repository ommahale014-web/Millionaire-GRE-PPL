"use client";

import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useParams } from "next/navigation";
import TestForm from "@/components/admin/TestForm";
import PublishToggle from "@/components/admin/PublishToggle";
import { useQuestionsStore } from "@/store/questionsStore";
import { useTestQuestionStore } from "@/store/testQuestionStore";
import { useTestsStore } from "@/store/useTestsStore";

export default function CreateTestPage() {
  const { questions } = useQuestionsStore();
  const [testTitle, setTestTitle] = useState("");
  const router = useRouter();
  const [published, setPublished] = useState(false);
  const { testQuestions, addTestQuestion, deleteTestQuestion, clearQuestions, isQuestionAdded } = useTestQuestionStore();
  const { addTest } = useTestsStore();

  useEffect(() => {
  clearQuestions(); // reset previous questions
  setTestTitle("");  // reset previous title
  setPublished(false); // reset published toggle
}, []);

  const handleCreateTest = () => {
    if (!testTitle) return alert("Enter a test title");
    if (testQuestions.length === 0) return alert("Add at least one question");

    const newTest = {
      id: crypto.randomUUID(),
      title: testTitle,
      questions: testQuestions,
      published,
    };

    addTest(newTest);
    clearQuestions();
    setTestTitle("");
    setPublished(false);
    router.push("/admin/tests");
  };



  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-8">

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-semibold text-blue-900">Create Test</h1>
          <p className="text-slate-600 mt-1">
            Manage test details, questions and publishing status
          </p>
        </div>

        {/* Test Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-slate-800 mb-4">
            Test Information
          </h2>
          <TestForm testTitle={testTitle} setTestTitle={setTestTitle} />
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-900">Questions</h2>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {testQuestions.length > 0 ? (
                testQuestions.map((q) => (
                  <TableRow key={q.id} className="hover:bg-slate-50">
                    <TableCell className="text-slate-900">
                      {q.question_text}
                    </TableCell>

                    <TableCell className="text-slate-900">
                      {q.section_type}
                    </TableCell>

                    <TableCell className="text-slate-900">
                      {q.marks}
                    </TableCell>

                    <TableCell className="text-right">
                      <button className="icon-btn text-red-600"
                        onClick={() => deleteTestQuestion(q.id)}>
                        <Trash2 size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-gray-500 py-8"
                  >
                    No questions added to this test yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Questions Bank */}
<div className="bg-white rounded-xl shadow-sm p-6">
  <h2 className="text-lg font-medium text-slate-900 mb-4">
    Questions Bank :-
  </h2>

  <div className="overflow-x-auto border rounded-xl">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Question</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Points</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {questions.length > 0 ? (
          questions.map((q) => (
            <TableRow key={q.id} className="hover:bg-gray-50">
              <TableCell className="px-6 py-4 text-sm text-gray-500 font-mono">
                {q.id.slice(0, 8)}
              </TableCell>

              <TableCell className="px-6 py-4 font-medium">
                {q.question_text}
              </TableCell>

              <TableCell className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                  {q.section_type}
                </span>
              </TableCell>

              <TableCell className="px-6 py-4">{q.points}</TableCell>

              <TableCell className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    className={`icon-btn text-blue-600 ${
                      isQuestionAdded(q.id) ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                    onClick={() => addTestQuestion(q.id)}
                    disabled={isQuestionAdded(q.id)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
              No questions added to this test yet
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
</div>

        {/* Publish Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-slate-800 mb-4">
            Publish Settings
          </h2>
          <PublishToggle published={published} setPublished={setPublished} />
        </div>

        {/* Create Test */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-200">
          <h2 className="text-lg font-semibold text-green-600 mb-2">
            Create Test
          </h2>

          <p className="text-sm text-slate-600 mb-4">
            Creating this test will save all the selected questions and publish settings.
          </p>

          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleCreateTest}
          >
            Create Test
          </Button>
        </div>


      </div>
    </div>
  );
}
