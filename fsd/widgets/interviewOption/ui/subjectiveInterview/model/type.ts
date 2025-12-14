import { CustomSubjectiveQuestion } from "@/fsd/entities/customQuestion/model/type";

export interface SubjectiveQuestion {
  id: string | number;
  question: string;
}

// SubjectiveQuestion과 CustomSubjectiveQuestion을 모두 수용하는 유니온 타입
export type AnySubjectiveQuestion = SubjectiveQuestion | CustomSubjectiveQuestion;

// 면접 관련 메시지 타입 확장
export interface InterviewMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}
