export type Technology = "JavaScript" | "React" | "TypeScript";

export interface CustomSubjectiveQuestion {
  id: string; // UUID
  technology: Technology;
  question: string;
  createdAt: number;
  updatedAt: number;
}
