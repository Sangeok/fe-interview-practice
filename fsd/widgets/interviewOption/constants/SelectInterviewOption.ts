import { InterviewOptionType } from "../model/type";

export const INTERVIEW_OPTIONS: InterviewOptionType[] = [
  { id: 1, label: "Subjective", value: "Subjective" },
  { id: 2, label: "Multiple Choice", value: "Multiple Choice" },
] as const;
