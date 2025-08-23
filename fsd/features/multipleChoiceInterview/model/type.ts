export interface Option {
  id: number;
  label: string;
  answerBoolean: boolean;
}

export interface MultipleChoiceQuestion {
  id: number;
  question: string;
  options: Option[];
  answerString: string;
}
