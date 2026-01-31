import { create } from "zustand";

export const useStudentTestStore = create((set) => ({
  testId: null,
  student: {
    name: "",
    email: "",
  },
  questions: [], // DB-shaped questions
  answers: {},   // { [question_id]: "A" | "B" | "C" | "D" }

  setTest: (testId) => set({ testId }),

  setStudent: (name, email) =>
    set({
      student: { name, email },
    }),

  setQuestions: (questions) => set({ questions }),

  setAnswer: (questionId, option) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: option,
      },
    })),

  resetTest: () =>
    set({
      testId: null,
      student: { name: "", email: "" },
      questions: [],
      answers: {},
    }),
}));
