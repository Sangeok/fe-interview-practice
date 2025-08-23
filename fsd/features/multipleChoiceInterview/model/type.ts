export interface Option {
  id: number;
  label: string;
  value: string;
}

export interface MultipleChoiceQuestion {
  id: number;
  question: string;
  options: Option[];
  answer: string;
}