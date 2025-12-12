export type Technology = 'javascript' | 'react' | 'typescript';

export interface CustomSubjectiveQuestion {
  id: string; // UUID
  technology: Technology;
  question: string;
  modelAnswer?: string; // optional 모범답안
  createdAt: number;
  updatedAt: number;
}
