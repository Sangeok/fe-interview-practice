import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";

export interface UserData {
  inCorrectSubQuestion: SubjectiveQuestion[];
  inCorrectMultipleChoiceQuestion: MultipleChoiceQuestion[];
}
