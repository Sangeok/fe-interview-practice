"use client";

import { useEffect } from "react";
import { useMCQSessionStore } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/store/useMCQSessionStore";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";

interface UseMCQSessionParams {
  tech: string;
  selectedOptions: string;
  canShowInterview: boolean;
  rawQuestions: MultipleChoiceQuestion[];
}

export function useMCQSession({ tech, selectedOptions, canShowInterview, rawQuestions }: UseMCQSessionParams) {
  const sessionId = `${tech}:Multiple Choice`;
  const initSession = useMCQSessionStore((s) => s.initSession);
  const questions = useMCQSessionStore((s) => s.shuffledQuestions);

  useEffect(() => {
    if (selectedOptions !== "Multiple Choice" || !canShowInterview) return;
    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) return;
    initSession({ sessionId, rawQuestions });
  }, [selectedOptions, canShowInterview, sessionId, rawQuestions, initSession]);

  return { questions, sessionId };
}
