"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function AIGeneratePage() {
  const router = useRouter();

  return (
    <div className="p-8 text-center">
      <Sparkles size={60} className="mx-auto mb-4 text-purple-600" />
      <h1 className="text-2xl font-bold mb-4">AI Question Generator</h1>

      <button
        onClick={() => router.push("/admin/questions")}
        className="btn-purple"
      >
        Generate Questions
      </button>
    </div>
  );
}
