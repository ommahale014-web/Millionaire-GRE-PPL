"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useStudentTestStore } from "@/store/studentTestStore";
import { getAttemptInfo, registerTestAttempt } from "@/actions/student/test.actions";

export default function StartTestPage() {
  const { testsId } = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const setAttemptNo = useStudentTestStore((s) => s.setAttemptNo);
  const setStudent = useStudentTestStore((s) => s.setStudent);
  const setTest = useStudentTestStore((s) => s.setTest);


  const handleStartTest = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (!name || !email) {
        alert("Please enter your name and email");
        return;
      }

      const res = await getAttemptInfo(testsId, email);
      if (!res.success) {
        alert("Something went wrong. Please try again.");
        router.push(`/`);
        return;
      }
      if (res.attemptNo >= 2) {
        alert("Free trial ended. You have used all your attempts.");
        router.push(`/`);
        return;
      }

      // Register attempt in DB (Preserving existing functionality)
      await registerTestAttempt({
        student_name: name,
        email,
        test_id: testsId,
        attempt_no: res.attemptNo + 1,
      });

      // allowed
      setStudent(name, email);
      setTest(testsId);
      setAttemptNo(res.attemptNo + 1);
      router.push(`/tests/${testsId}/attempt`);
    } catch (error) {
      console.error("Start test error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-white px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 mix-blend-multiply"></div>

      <Card className="w-full max-w-md rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-xl shadow-xl relative z-10">

        {/* Header */}
        <CardHeader className="text-center space-y-3 pb-2">
          <span className="mx-auto w-fit rounded-full bg-blue-100 px-4 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider">
            Millionaire GRE · Mock Test
          </span>

          <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
            Start Test
          </CardTitle>

          <p className="text-sm text-slate-500">
            Enter your details to begin the assessment
          </p>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-5 pt-4">
          <div className="space-y-3">
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <p className="text-xs text-slate-400 text-center">
              Your email is used only for test identification.
            </p>
          </div>

          {/* Guidelines */}
          <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-3 text-xs text-slate-700 space-y-1.5">
            <h3 className="font-bold text-blue-800 mb-1">GRE General Test Guidelines</h3>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
              <p>Section Adaptive: Performance affects difficulty.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
              <p>Verbal & Quant Reasoning sections included.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
              <p>No penalty for incorrect answers. Guess if needed!</p>
            </div>
          </div>

          {/* Button */}
          <Button
            onClick={handleStartTest}
            disabled={loading}
            className="h-11 w-full rounded-full bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300 shadow-md shadow-blue-200"
          >
            {loading ? "Starting..." : "Start Test"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}