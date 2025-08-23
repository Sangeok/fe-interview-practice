export type InterviewOption = "Subjective" | "Multiple Choice";

export interface InterviewOptionType {
  id: number;
  label: string;
  value: InterviewOption;
}
