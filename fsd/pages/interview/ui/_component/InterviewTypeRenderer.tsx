import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import SubjectiveInterview from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/ui";
import MultipleChoiceInterview from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";

interface InterviewTypeRendererProps {
  selectedOptions: InterviewOptionsValue;
  shuffledQuestions: (SubjectiveQuestion | MultipleChoiceQuestion)[];
  isReviewMode?: boolean;
}

export default function InterviewwTypeRenderer({
  selectedOptions,
  shuffledQuestions,
  isReviewMode = false,
}: InterviewTypeRendererProps) {
  if (selectedOptions === "Subjective") {
    return (
      <SubjectiveInterview
        questionAnswer={shuffledQuestions as SubjectiveQuestion[]}
        isReviewMode={isReviewMode}
      />
    );
  }

  if (selectedOptions === "Multiple Choice") {
    return (
      <MultipleChoiceInterview
        questionsOverride={isReviewMode ? (shuffledQuestions as MultipleChoiceQuestion[]) : undefined}
        isReviewMode={isReviewMode}
      />
    );
  }

  return null;
}
