import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { InterviewOptionsValue } from "../model/type";
import { JAVASCRIPT_SUBJECTIVE_QUESTIONS } from "../constants/JavascriptQA_Subjective";
import { REACT_SUBJECTIVE_QUESTIONS } from "../constants/ReactQA_Subjective";
import { TYPESCRIPT_SUBJECTIVE_QUESTIONS } from "../constants/TypeScriptQA_Subjective";
import {
  JAVASCRIPT_MULTIPLE_CHOICE_QUESTIONS,
  REACT_MULTIPLE_CHOICE_QUESTIONS,
  TYPESCRIPT_MULTIPLE_CHOICE_QUESTIONS,
} from "../constants";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { TechType } from "@/fsd/shared/model/type";

export const getQuestionAnswer = (
  tech: TechType,
  interviewType: InterviewOptionsValue
): MultipleChoiceQuestion[] | SubjectiveQuestion[] => {
  let question_answer: MultipleChoiceQuestion[] | SubjectiveQuestion[] = [];

  const INTERVIEW_QUESTIONS_SUBJECTIVE = {
    JavaScript: JAVASCRIPT_SUBJECTIVE_QUESTIONS,
    React: REACT_SUBJECTIVE_QUESTIONS,
    TypeScript: TYPESCRIPT_SUBJECTIVE_QUESTIONS,
  };

  const INTERVIEW_QUESTIONS_MULTIPLE_CHOICE = {
    JavaScript: JAVASCRIPT_MULTIPLE_CHOICE_QUESTIONS,
    React: REACT_MULTIPLE_CHOICE_QUESTIONS,
    TypeScript: TYPESCRIPT_MULTIPLE_CHOICE_QUESTIONS,
  };

  if (interviewType === "Subjective") {
    question_answer = INTERVIEW_QUESTIONS_SUBJECTIVE[tech as keyof typeof INTERVIEW_QUESTIONS_SUBJECTIVE] || [];
  } else if (interviewType === "Multiple Choice") {
    question_answer =
      INTERVIEW_QUESTIONS_MULTIPLE_CHOICE[tech as keyof typeof INTERVIEW_QUESTIONS_MULTIPLE_CHOICE] || [];
  }

  return question_answer;
};
