"use client";

import { useParams, useRouter } from "next/navigation";
import Questionform from "@/components/admin/Questionform";
import { useQuestionsStore } from "@/store/questionsStore";

export default function EditQuestionPage() {
  const { id } = useParams();
  const router = useRouter();

  const { questions, updateQuestion } = useQuestionsStore();

  const existingQuestion = questions.find((q) => q.id === id);

  if (!existingQuestion) {
    return (
      <div className="p-8 text-gray-500">
        Question not found
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Edit Question
      </h1>

      <Questionform
        initialData={existingQuestion}
        submitLabel="Update Question"
        onSubmit={(data) => {
          updateQuestion({
            ...existingQuestion,
            ...data,
          });

          router.push("/admin/questions");
        }}
      />
    </div>
  );
}
