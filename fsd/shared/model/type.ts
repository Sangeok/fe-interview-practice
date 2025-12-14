export type MultipleChoiceInterpretType = {
  Question: string;
  summary: string;
  details: {
    theory: {
      title: string;
      description: string;
      rules: {
        title: string;
        explanation: string;
      }[];
    };
    analogy: {
      title: string;
      scenarios: {
        type: string;
        title: string;
        story: string;
      }[];
    };
  };
};

export interface FeedbackData {
  topic: string;
  evaluation: {
    score: number;
    maxScore: number;
    summary: string;
  };
  feedbackDetails: Array<{
    title: string;
    description: string;
    points?: string[];
  }>;
  modelAnswer: {
    introduction: string;
    usage: string;
    scenarios: Array<{
      condition: string;
      explanation: string;
    }>;
    example: {
      context: string;
      solution: string;
    };
  };
}

export interface DeepDiveFeedbackData {
  topic: string;
  evaluation: {
    score: number;
    maxScore: number;
    summary: string;
  };
  feedbackDetails: Array<{
    title: string;
    description: string;
    points?: string[];
  }>;
  deepDive: {
    title: string;
    description: string;
    topics: string[];
  };
}

export interface CustomQuestionType {
  id: string | number;
  question: string;
}

export type FeedbackResponse = FeedbackData | DeepDiveFeedbackData;

export type TechType = "JavaScript" | "NextJs" | "React" | "TypeScript" | "";
