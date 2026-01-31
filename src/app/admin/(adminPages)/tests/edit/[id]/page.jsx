"use client";
import { useEffect, useState } from "react";
import { useTestQuestionStore } from "@/store/testQuestionStore";
import { useTestsStore } from "@/store/useTestsStore";
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
import { useParams, useRouter } from "next/navigation";
import TestForm from "@/components/admin/TestForm";
import PublishToggle from "@/components/admin/PublishToggle";
import { useQuestionsStore } from "@/store/questionsStore";

export default function EditTestPage() {
  const { id } = useParams();
  const router = useRouter();
  const { questions } = useQuestionsStore();
  const { testQuestions, addTestQuestion, deleteTestQuestion, setTestQuestions,clearQuestions, isQuestionAdded } = useTestQuestionStore();
  const [testTitle, setTestTitle] = useState("");
  const [published, setPublished] = useState(false);

  const { getTestById, updateTest, deleteTest } = useTestsStore();
  const existingTest = getTestById(id);
  const handleUpdateTest = () => {
    if (!testTitle) return alert("Enter test title");
    if (testQuestions.length === 0) return alert("Add at least one question");

    updateTest({
      id,
      title: testTitle,
      questions: testQuestions,
      published,
    });
    clearQuestions();
    setTestTitle("");
    setPublished(false);
    router.push("/admin/tests");
  };


  useEffect(() => {
    if (existingTest) {
      setTestTitle(existingTest.title);
      setPublished(existingTest.published);
      setTestQuestions(existingTest.questions);
    }
  }, [existingTest, id]);



  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-8">

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-semibold text-blue-900">Edit Test</h1>
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

        {/* Save Changes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Save Changes
          </h2>

          <p className="text-sm text-slate-600 mb-4">
            Update test details, questions and publish status.
          </p>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleUpdateTest}
          >
            Save Changes
          </Button>
        </div>


        {/* 🔴 Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Delete Test
          </h2>

          <p className="text-sm text-slate-600 mb-4">
            Deleting this test is permanent. All questions and attempts
            associated with this test will be lost.
          </p>

          <Button className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              if (!window.confirm("Are you sure you want to delete this test?")) return;
              deleteTest(id); // delete from store
              router.push("/admin/tests"); // go back to all tests
            }}>
            Delete Test
          </Button>
        </div>

      </div>
    </div>
  );
}
