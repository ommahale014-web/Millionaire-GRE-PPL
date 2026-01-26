"use client";

import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import Questionform from "@/components/admin/Questionform";
import { useQuestionsStore } from "@/store/questionsStore";

export default function CreateQuestionPage() {
  const router = useRouter();
  const addQuestion = useQuestionsStore((s) => s.addQuestion);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Create Question
      </h1>

      <Questionform
        submitLabel="Create Question"
        onSubmit={(data) => {
          addQuestion({
            id: uuid(),
            ...data,
            created_at: new Date().toISOString(),
          });

          router.push("/admin/questions");
        }}
      />
    </div>
  );
}
