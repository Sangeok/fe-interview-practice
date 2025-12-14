import type { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import type { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";

export function isMultipleChoiceQuestions(
  questions: unknown,
  selectedOptions: string
): questions is MultipleChoiceQuestion[] {
  return selectedOptions === "Multiple Choice" && Array.isArray(questions);
}

export function isSubjectiveQuestions(
  questions: unknown,
  selectedOptions: string
): questions is SubjectiveQuestion[] {
  return selectedOptions === "Subjective" && Array.isArray(questions);
}
