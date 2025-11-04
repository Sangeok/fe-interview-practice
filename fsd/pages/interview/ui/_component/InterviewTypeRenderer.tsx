import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import SubjectiveInterview from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/ui";
import MultipleChoiceInterview from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";

interface InterviewTypeRendererProps {
  selectedOptions: InterviewOptionsValue;
  shuffledQuestions: (SubjectiveQuestion | MultipleChoiceQuestion)[];
  setOpenInterviewOptionsDialog: (open: boolean) => void;
}

export default function InterviewwTypeRenderer({
  selectedOptions,
  shuffledQuestions,
  setOpenInterviewOptionsDialog,
}: InterviewTypeRendererProps) {
  if (selectedOptions === "Subjective") {
    return <SubjectiveInterview questionAnswer={shuffledQuestions as SubjectiveQuestion[]} />;
  }

  if (selectedOptions === "Multiple Choice") {
    return (
      <MultipleChoiceInterview
        setOpenInterviewOptionsDialog={setOpenInterviewOptionsDialog}
        questionsOverride={shuffledQuestions as MultipleChoiceQuestion[]}
      />
    );
  }

  return null;
}
