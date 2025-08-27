export type InterviewOptionsValue = "Subjective" | "Multiple Choice";

export interface InterviewOptionType {
  id: number;
  label: string;
  value: InterviewOptionsValue;
}
