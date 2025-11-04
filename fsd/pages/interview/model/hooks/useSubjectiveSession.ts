"use client";

import { useEffect } from "react";
import { useSubjectiveSessionStore } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/store/useSubjectiveSessionStore";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";

interface UseSubjectiveSessionParams {
  tech: string;
  selectedOptions: string;
  canShowInterview: boolean;
  rawQuestions: SubjectiveQuestion[];
}

export function useSubjectiveSession({
  tech,
  selectedOptions,
  canShowInterview,
  rawQuestions,
}: UseSubjectiveSessionParams) {
  const sessionId = `${tech}:Subjective`;
  const initSession = useSubjectiveSessionStore((s) => s.initSession);
  const questions = useSubjectiveSessionStore((s) => s.orderedQuestions);

  useEffect(() => {
    if (selectedOptions !== "Subjective" || !canShowInterview) return;
    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) return;
    initSession({ sessionId, rawQuestions });
  }, [selectedOptions, canShowInterview, sessionId, rawQuestions, initSession]);

  return { questions, sessionId };
}
