export type InterviewOptionsValue = "Subjective" | "Multiple Choice" | "Custom Questions";

export interface InterviewOptionType {
  id: number;
  label: string;
  value: InterviewOptionsValue;
}
