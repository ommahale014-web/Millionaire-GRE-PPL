import { create } from "zustand";

export const useQuestionsStore = create((set) => ({
  questions: [],

  addQuestion: (question) =>
    set((state) => ({
      questions: [...state.questions, question],
    })),

  deleteQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),

  updateQuestion: (updated) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === updated.id ? updated : q
      ),
    })),
}));
