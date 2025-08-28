export interface SubjectiveQuestion {
  id: number;
  question: string;
}

// 면접 관련 메시지 타입 확장
export interface InterviewMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}
