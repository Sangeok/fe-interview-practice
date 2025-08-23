import { MultipleChoiceQuestion } from "../model/type";

export const MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_JAVASCRIPT: MultipleChoiceQuestion[] = [
  {
    id: 1,
    question: "다음 중 Promise.all()에 대한 설명으로 올바른 것은?",
    options: [
      {
        id: 1,
        label: "모든 Promise가 fulfilled 상태가 되면 결과를 반환하고, 하나라도 rejected되면 즉시 rejected된다",
        value: "all_fulfilled_or_immediate_reject",
      },
      {
        id: 2,
        label: "Promise들이 순차적으로 실행되며, 이전 Promise가 완료되어야 다음이 실행된다",
        value: "sequential_execution",
      },
      {
        id: 3,
        label: "하나라도 fulfilled되면 즉시 결과를 반환한다",
        value: "race_behavior",
      },
    ],
    answer: "all_fulfilled_or_immediate_reject",
  },
  {
    id: 2,
    question: "다음 중 JavaScript의 스코프에 대한 설명으로 올바른 것은?",
    options: [
      {
        id: 1,
        label: "var는 블록 스코프를 가지며, let과 const는 함수 스코프를 가진다",
        value: "var_block_let_function",
      },
      {
        id: 2,
        label: "var는 함수 스코프를 가지며, let과 const는 블록 스코프를 가진다",
        value: "var_function_let_block",
      },
      {
        id: 3,
        label: "var, let, const 모두 블록 스코프를 가진다",
        value: "all_block_scope",
      },
    ],
    answer: "var_function_let_block",
  },
] as const;
