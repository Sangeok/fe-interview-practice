import { useEffect, useState } from "react";
import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { arrayShuffle, shuffleMultipleChoiceQuestions } from "@/fsd/shared/lib/array-shuffle";

export function useReviewSession(
  selectedOptions: InterviewOptionsValue | "",
  openDialog: boolean,
  inCorrectMultipleChoiceQuestion: MultipleChoiceQuestion[] | null,
  inCorrectSubQuestion: SubjectiveQuestion[] | null
) {
  const [sessionQuestions, setSessionQuestions] = useState<(SubjectiveQuestion | MultipleChoiceQuestion)[] | null>(
    null
  );

  // 세션 시작 시 1회 스냅샷 생성
  useEffect(() => {
    if (!openDialog && selectedOptions !== "" && sessionQuestions === null) {
      const base =
        selectedOptions === "Multiple Choice" ? inCorrectMultipleChoiceQuestion || [] : inCorrectSubQuestion || [];
      const frozen =
        selectedOptions === "Multiple Choice"
          ? shuffleMultipleChoiceQuestions(base as MultipleChoiceQuestion[])
          : arrayShuffle(base as SubjectiveQuestion[]);
      setSessionQuestions(frozen);
    }
  }, [openDialog, selectedOptions, sessionQuestions, inCorrectMultipleChoiceQuestion, inCorrectSubQuestion]);

  return sessionQuestions;
}
