"use client";

import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStudentTestStore } from "@/store/studentTestStore";
export default function TestResultPage() {
  const router = useRouter();
  const { testsId } = useParams();
  const { testId, student, questions, answers, resetTest } = useStudentTestStore();

  let score = 0;
  questions.forEach((q) => {
    if (answers[q.id] === q.correct_option) score++;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 p-6">
      <Card className="max-w-4xl mx-auto rounded-3xl bg-white/80 shadow-xl">

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-semibold">
            Exam Completed
          </CardTitle>
          <p className="text-sm text-gray-500">
            {student.name} · {student.email}
          </p>

          <div className="text-6xl font-bold text-indigo-600">
            {score}/{questions.length}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {questions.map((q, idx) => {
            const correct = answers[q.id] === q.correct_option;

            return (
              <div
                key={q.id}
                className={`flex gap-4 p-4 rounded-xl border
                  ${correct ? "bg-green-50" : "bg-red-50"}`}
              >
                {correct ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <XCircle className="text-red-600" />
                )}

                <div>
                  <p className="font-semibold">
                    Q{idx + 1}. {q.question_text}
                  </p>
                  <p className="text-sm text-gray-600">
                    Your Answer: {answers[q.id] || "Not Answered"} | Correct:{" "}
                    {q.correct_option}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                resetTest();
                router.push(`/tests/${testId}/start`);
              }}
            >
              Retake Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {/*
        TODO (Supabase):
        1. Insert into test_results:
           {
             student_name,
             email,
             score,
             test_id,
             attempt_no
           }
        2. Later fetch by test_id + email
      */}
    </div>
  );
}
