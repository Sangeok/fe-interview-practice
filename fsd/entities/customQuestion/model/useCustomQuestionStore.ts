import { create } from "zustand";
import { CustomSubjectiveQuestion, Technology } from "./type";
import { customQuestionDB } from "../lib/customQuestionDB";

interface CustomQuestionStore {
  questions: CustomSubjectiveQuestion[];

  // CRUD
  addQuestion: (data: Omit<CustomSubjectiveQuestion, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  removeQuestion: (id: string) => Promise<void>;
  updateQuestion: (
    id: string,
    updates: Partial<Pick<CustomSubjectiveQuestion, "question" | "modelAnswer">>
  ) => Promise<void>;

  // Query
  getQuestionsByTech: (tech: Technology) => CustomSubjectiveQuestion[];

  // Persistence
  hydrateFromDB: () => Promise<void>;
  persistToDB: () => Promise<void>;
}

export const useCustomQuestionStore = create<CustomQuestionStore>((set, get) => ({
  questions: [],

  addQuestion: async (data) => {
    const newQuestion: CustomSubjectiveQuestion = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    set((state) => ({
      questions: [...state.questions, newQuestion],
    }));

    await customQuestionDB.saveQuestion(newQuestion);
  },

  removeQuestion: async (id) => {
    set((state) => ({
      questions: state.questions.filter((question) => question.id !== id),
    }));

    await customQuestionDB.deleteQuestion(id);
  },

  updateQuestion: async (id, updates) => {
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === id ? { ...question, ...updates, updatedAt: Date.now() } : question
      ),
    }));

    await customQuestionDB.updateQuestion(id, updates);
  },

  getQuestionsByTech: (tech) => {
    const { questions } = get();
    return questions.filter((question) => question.technology === tech);
  },

  hydrateFromDB: async () => {
    const questions = await customQuestionDB.loadQuestions();
    set({ questions });
  },

  persistToDB: async () => {
    const { questions } = get();
    await Promise.all(questions.map((question) => customQuestionDB.saveQuestion(question)));
  },
}));
