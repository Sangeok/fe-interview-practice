"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MultipleChoiceQuestion } from "../type";
import { shuffleMultipleChoiceQuestions } from "@/fsd/shared/lib/array-shuffle";

type InitParams = {
  sessionId: string;
  rawQuestions: MultipleChoiceQuestion[];
};

type MCQSessionState = {
  sessionId: string | null;
  shuffledQuestions: MultipleChoiceQuestion[];
  currentIndex: number;
  score: number;
  initSession: (params: InitParams) => void;
  advance: (isCorrect: boolean) => void;
  resetSession: () => void;
};

export const useMCQSessionStore = create<MCQSessionState>()(
  persist(
    (set, get) => ({
      sessionId: null,
      shuffledQuestions: [],
      currentIndex: 0,
      score: 0,

      initSession: ({ sessionId, rawQuestions }) => {
        const sessionState = get();

        // 세션이 이미 존재하고 질문이 있는 경우 Return
        if (sessionState.sessionId === sessionId && sessionState.shuffledQuestions.length > 0) return;

        // 빈 입력일 경우에는 동일 상태로의 반복 set을 방지
        if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
          if (
            sessionState.sessionId === sessionId &&
            sessionState.shuffledQuestions.length === 0 &&
            sessionState.currentIndex === 0 &&
            sessionState.score === 0
          ) {
            return;
          }
          set({ sessionId, shuffledQuestions: [], currentIndex: 0, score: 0 });
          return;
        }
        const shuffled = shuffleMultipleChoiceQuestions(rawQuestions);
        set({
          sessionId,
          shuffledQuestions: shuffled,
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

      resetSession: () => {
        set({
          sessionId: null,
          shuffledQuestions: [],
          currentIndex: 0,
          score: 0,
        });
      },
    }),
    {
      name: "mcq-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessionId: state.sessionId,
        shuffledQuestions: state.shuffledQuestions,
        currentIndex: state.currentIndex,
        score: state.score,
      }),
      version: 1,
    }
  )
);
