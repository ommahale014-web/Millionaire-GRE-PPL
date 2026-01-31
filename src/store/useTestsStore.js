import { create } from "zustand";
// for admin tests :-
export const useTestsStore = create((set, get) => ({
  tests: [],

  addTest: (test) =>
    set((state) => ({ tests: [...state.tests, test] })),

  updateTest: (updated) =>
    set((state) => ({
      tests: state.tests.map((t) => (t.id === updated.id ? updated : t)),
    })),

  deleteTest: (id) =>
    set((state) => ({
      tests: state.tests.filter((t) => t.id !== id),
    })),

  getTestById: (id) => get().tests.find((t) => t.id === id),
}));
