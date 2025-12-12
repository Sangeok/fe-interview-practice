import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { FeedbackData, DeepDiveFeedbackData } from "@/fsd/shared/model/type";

export interface InCorrectCustomQuestion {
  customQuestionId: string;
  userAnswer: string;
  feedback: FeedbackData | DeepDiveFeedbackData;
  attemptedAt: number;
}

export interface UserData {
  inCorrectSubQuestion: SubjectiveQuestion[];
  inCorrectMultipleChoiceQuestion: MultipleChoiceQuestion[];
  inCorrectCustomQuestion: InCorrectCustomQuestion[];
}
