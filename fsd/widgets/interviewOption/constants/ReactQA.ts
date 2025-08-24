import { MultipleChoiceQuestion } from "../../../features/multipleChoiceInterview/model/type";

export const MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_REACT: MultipleChoiceQuestion[] = [
  {
    id: 1,
    question: "React의 Virtual DOM(가상 DOM)에 대한 설명으로 가장 올바른 것은?",
    options: [
      {
        id: 1,
        label: "실제 DOM의 복사본으로, 메모리에 저장되어 변경 사항을 한 번에 묶어 실제 DOM에 적용하여 성능을 최적화합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "브라우저가 기본적으로 제공하는 DOM의 또 다른 이름입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "React에서만 사용되는 특별한 종류의 Shadow DOM입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "실제 DOM의 복사본으로, 메모리에 저장되어 변경 사항을 한 번에 묶어 실제 DOM에 적용하여 성능을 최적화합니다.",
  },
  {
    id: 2,
    question: "React의 state와 props에 대한 설명으로 올바른 것은?",
    options: [
      {
        id: 1,
        label: "props는 부모 컴포넌트에서 자식으로 전달되는 읽기 전용 데이터이고, state는 컴포넌트 내부에서 관리되는 변경 가능한 데이터입니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "state는 부모 컴포넌트에서 자식으로 전달되고, props는 컴포넌트 내부에서 자체적으로 관리됩니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "state와 props는 모두 컴포넌트 내부에서 자유롭게 수정할 수 있는 데이터입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "props는 부모 컴포넌트에서 자식으로 전달되는 읽기 전용 데이터이고, state는 컴포넌트 내부에서 관리되는 변경 가능한 데이터입니다.",
  },
  {
    id: 3,
    question: "React Hooks에 대한 설명으로 가장 올바르지 않은 것은?",
    options: [
      {
        id: 1,
        label: "클래스 컴포넌트의 생명주기 메서드와 동일한 기능을 제공하기 위해 만들어졌습니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "함수형 컴포넌트에서 state와 생명주기 기능을 사용할 수 있게 해주는 함수입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "반복문이나 조건문 안에서 호출될 수 없으며, 항상 컴포넌트의 최상위 레벨에서 호출되어야 합니다.",
        answerBoolean: false,
      },
    ],
    answerString: "클래스 컴포넌트의 생명주기 메서드와 동일한 기능을 제공하기 위해 만들어졌습니다.",
  },
  {
    id: 4,
    question: "React에서 배열을 렌더링할 때 'key' prop을 사용하는 주된 이유는 무엇입니까?",
    options: [
      {
        id: 1,
        label: "Virtual DOM이 변경된 요소를 효율적으로 식별하고 업데이트하기 위함입니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "배열의 각 요소를 정렬하는 기준을 제공하기 위함입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "각 요소에 고유한 CSS 스타일을 적용하기 위함입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "Virtual DOM이 변경된 요소를 효율적으로 식별하고 업데이트하기 위함입니다.",
  },
  {
    id: 5,
    question: "useEffect Hook의 두 번째 인자인 의존성 배열(dependency array)이 빈 배열([])일 때, 이 Hook은 언제 실행됩니까?",
    options: [
      {
        id: 1,
        label: "컴포넌트가 처음 마운트될 때 한 번만 실행됩니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "컴포넌트가 렌더링될 때마다 항상 실행됩니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "컴포넌트가 언마운트될 때 한 번만 실행됩니다.",
        answerBoolean: false,
      },
    ],
    answerString: "컴포넌트가 처음 마운트될 때 한 번만 실행됩니다.",
  },
  {
    id: 6,
    question: "제어 컴포넌트(Controlled Component)와 비제어 컴포넌트(Uncontrolled Component)의 가장 큰 차이점은 무엇입니까?",
    options: [
      {
        id: 1,
        label: "폼(Form) 데이터의 상태 관리 주체가 React인지, 아니면 DOM 자신인지의 차이입니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "제어 컴포넌트는 함수형에서, 비제어 컴포넌트는 클래스형에서만 사용됩니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "성능 면에서 비제어 컴포넌트가 항상 제어 컴포넌트보다 우수합니다.",
        answerBoolean: false,
      },
    ],
    answerString: "폼(Form) 데이터의 상태 관리 주체가 React인지, 아니면 DOM 자신인지의 차이입니다.",
  },
  {
    id: 7,
    question: "JSX(JavaScript XML)에 대한 설명으로 가장 올바른 것은?",
    options: [
      {
        id: 1,
        label: "React.createElement()를 호출하는 코드로 변환되는 JavaScript의 구문 확장입니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "브라우저가 직접 해석할 수 있는 HTML의 새로운 버전입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "JavaScript와 XML을 혼용해서 사용하기 위한 공식적인 웹 표준입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "React.createElement()를 호출하는 코드로 변환되는 JavaScript의 구문 확장입니다.",
  },
  {
    id: 8,
    question: "React의 Context API는 주로 어떤 문제를 해결하기 위해 사용됩니까?",
    options: [
      {
        id: 1,
        label: "여러 레벨로 중첩된 컴포넌트들에게 props를 일일이 전달하지 않고 상태를 공유하기 위해 사용됩니다 (Prop Drilling 방지).",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "컴포넌트의 렌더링 성능을 최적화하기 위해 사용됩니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "모든 종류의 비동기 통신을 관리하기 위해 사용됩니다.",
        answerBoolean: false,
      },
    ],
    answerString: "여러 레벨로 중첩된 컴포넌트들에게 props를 일일이 전달하지 않고 상태를 공유하기 위해 사용됩니다 (Prop Drilling 방지).",
  },
  {
    id: 9,
    question: "React.memo를 사용하는 주된 목적은 무엇입니까?",
    options: [
      {
        id: 1,
        label: "컴포넌트의 props가 변경되지 않았을 때 불필요한 리렌더링을 방지하여 성능을 최적화합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "컴포넌트의 상태(state)를 메모리에 영구적으로 저장합니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "클래스형 컴포넌트를 함수형 컴포넌트처럼 사용할 수 있게 변환합니다.",
        answerBoolean: false,
      },
    ],
    answerString: "컴포넌트의 props가 변경되지 않았을 때 불필요한 리렌더링을 방지하여 성능을 최적화합니다.",
  },
  {
    id: 10,
    question: "React의 고차 컴포넌트(Higher-Order Component, HOC)에 대한 설명으로 올바른 것은?",
    options: [
      {
        id: 1,
        label: "컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수로, 컴포넌트 간의 로직을 재사용하기 위해 사용됩니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "React Hooks를 대체하는 최신 기능으로, 더 이상 사용되지 않습니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "컴포넌트의 렌더링 순서를 결정하는 특별한 종류의 컴포넌트입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수로, 컴포넌트 간의 로직을 재사용하기 위해 사용됩니다.",
  },
] as const;