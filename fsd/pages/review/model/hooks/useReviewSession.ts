import { useEffect, useState } from "react";
import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { arrayShuffle, shuffleMultipleChoiceQuestions } from "@/fsd/shared/lib/array-shuffle";
import { CustomQuestionType } from "@/fsd/shared/model/type";

export function useReviewSession(
  selectedOptions: InterviewOptionsValue | "",
  openDialog: boolean,
  inCorrectMultipleChoiceQuestion: MultipleChoiceQuestion[] | null,
  inCorrectSubQuestion: SubjectiveQuestion[] | null,
  inCorrectCustomQuestion: CustomQuestionType[] | null
) {
  const [sessionQuestions, setSessionQuestions] = useState<(SubjectiveQuestion | MultipleChoiceQuestion)[] | null>(
    null
  );

  // 세션 시작 시 1회 스냅샷 생성
  useEffect(() => {
    if (!openDialog && selectedOptions !== "" && sessionQuestions === null) {
      let base = [];
      let frozen = [];

      switch (selectedOptions) {
        case "Multiple Choice":
          base = inCorrectMultipleChoiceQuestion || [];
          break;
        case "Subjective":
          base = inCorrectSubQuestion || [];
          break;
        case "Custom Questions":
          base = inCorrectCustomQuestion || [];
          break;
      }

      switch (selectedOptions) {
        case "Multiple Choice":
          frozen = shuffleMultipleChoiceQuestions(base as MultipleChoiceQuestion[]);
          break;
        case "Subjective":
          frozen = arrayShuffle(base as SubjectiveQuestion[]);
          break;
        case "Custom Questions":
          frozen = arrayShuffle(base as CustomQuestionType[]);
          break;
      }

      setSessionQuestions(frozen);
    }
  }, [openDialog, selectedOptions, sessionQuestions, inCorrectMultipleChoiceQuestion, inCorrectSubQuestion]);

  return sessionQuestions;
}
