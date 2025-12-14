import { InterviewOptionsValue } from "../model/type";

export const isValidInterviewOption = (value: string): value is InterviewOptionsValue => {
  return value === "Subjective" || value === "Multiple Choice";
};
