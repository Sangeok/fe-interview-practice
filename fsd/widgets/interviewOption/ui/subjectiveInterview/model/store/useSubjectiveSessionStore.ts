"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SubjectiveQuestion } from "../type";
import { arrayShuffle } from "@/fsd/shared/lib/array-shuffle";

type InitParams = {
  sessionId: string;
  rawQuestions: SubjectiveQuestion[];
};

type SubjectiveSessionState = {
  sessionId: string | null;
  orderedQuestions: SubjectiveQuestion[];
  currentIndex: number;
  score: number;
  initSession: (params: InitParams) => void;
  advance: (isCorrect: boolean) => void;
  addScore: (delta?: number) => void;
  resetSession: () => void;
};

export const useSubjectiveSessionStore = create<SubjectiveSessionState>()(
  persist(
    (set, get) => ({
      sessionId: null,
      orderedQuestions: [],
      currentIndex: 0,
      score: 0,

      initSession: ({ sessionId, rawQuestions }) => {
        const s = get();
        if (s.sessionId === sessionId && s.orderedQuestions.length > 0) return;
        if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
          if (s.sessionId === sessionId && s.orderedQuestions.length === 0 && s.currentIndex === 0 && s.score === 0) {
            return;
          }
          set({ sessionId, orderedQuestions: [], currentIndex: 0, score: 0 });
          return;
        }
        const ordered = arrayShuffle(rawQuestions);
        set({
          sessionId,
          orderedQuestions: ordered,
          currentIndex: 0,
          score: 0,
        });
      },

      advance: (isCorrect) => {
        set((state) => ({
          currentIndex: state.currentIndex + 1,
          score: isCorrect ? state.score + 1 : state.score,
        }));
      },

      addScore: (delta = 1) => {
        set((state) => ({ score: state.score + delta }));
      },

      resetSession: () => {
        set({
          sessionId: null,
          orderedQuestions: [],
          currentIndex: 0,
          score: 0,
        });
      },
    }),
    {
      name: "subj-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessionId: state.sessionId,
        orderedQuestions: state.orderedQuestions,
        currentIndex: state.currentIndex,
        score: state.score,
      }),
      version: 1,
    }
  )
);
