import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import SubjectiveInterview from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/ui";
import MultipleChoiceInterview from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";

interface InterviewTypeRendererProps {
  selectedOptions: InterviewOptionsValue;
  shuffledQuestions: (SubjectiveQuestion | MultipleChoiceQuestion)[];
  setOpenDialog: (open: boolean) => void;
  mcqQuestionsOverride?: MultipleChoiceQuestion[];
}

export default function InterviewwTypeRenderer({
  selectedOptions,
  shuffledQuestions,
  setOpenDialog,
  mcqQuestionsOverride,
}: InterviewTypeRendererProps) {
  if (selectedOptions === "Subjective") {
    return <SubjectiveInterview questionAnswer={shuffledQuestions as SubjectiveQuestion[]} />;
  }

  if (selectedOptions === "Multiple Choice") {
    return <MultipleChoiceInterview setOpenDialog={setOpenDialog} questionsOverride={mcqQuestionsOverride} />;
  }

  return null;
}
