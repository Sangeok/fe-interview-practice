import { MultipleChoiceQuestion } from "../../../features/multipleChoiceInterview/model/type";

export const MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_REACT: MultipleChoiceQuestion[] = [
  {
    id: 1,
    question: "React의 Virtual DOM(가상 DOM)에 대한 설명으로 가장 올바른 것은?",
    options: [
      {
        id: 1,
        label:
          "실제 DOM의 복사본으로, 메모리에 저장되어 변경 사항을 한 번에 묶어 실제 DOM에 적용하여 성능을 최적화합니다.",
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
    answerString:
      "실제 DOM의 복사본으로, 메모리에 저장되어 변경 사항을 한 번에 묶어 실제 DOM에 적용하여 성능을 최적화합니다.",
  },
  {
    id: 2,
    question: "React의 state와 props에 대한 설명으로 올바른 것은?",
    options: [
      {
        id: 1,
        label:
          "props는 부모 컴포넌트에서 자식으로 전달되는 읽기 전용 데이터이고, state는 컴포넌트 내부에서 관리되는 변경 가능한 데이터입니다.",
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
    answerString:
      "props는 부모 컴포넌트에서 자식으로 전달되는 읽기 전용 데이터이고, state는 컴포넌트 내부에서 관리되는 변경 가능한 데이터입니다.",
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
    question:
      "useEffect Hook의 두 번째 인자인 의존성 배열(dependency array)이 빈 배열([])일 때, 이 Hook은 언제 실행됩니까?",
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
    question:
      "제어 컴포넌트(Controlled Component)와 비제어 컴포넌트(Uncontrolled Component)의 가장 큰 차이점은 무엇입니까?",
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
        label:
          "여러 레벨로 중첩된 컴포넌트들에게 props를 일일이 전달하지 않고 상태를 공유하기 위해 사용됩니다 (Prop Drilling 방지).",
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
    answerString:
      "여러 레벨로 중첩된 컴포넌트들에게 props를 일일이 전달하지 않고 상태를 공유하기 위해 사용됩니다 (Prop Drilling 방지).",
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
        label:
          "컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수로, 컴포넌트 간의 로직을 재사용하기 위해 사용됩니다.",
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
    answerString:
      "컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수로, 컴포넌트 간의 로직을 재사용하기 위해 사용됩니다.",
  },
  {
    id: 11,
    question: "함수형 컴포넌트와 클래스형 컴포넌트의 차이점으로 가장 올바른 것은?",
    options: [
      {
        id: 1,
        label:
          "클래스형 컴포넌트는 render() 메서드를 필수로 구현해야 하고, 함수형 컴포넌트는 return 문으로 JSX를 반환합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "함수형 컴포넌트는 state를 사용할 수 없고, 클래스형 컴포넌트만 state를 관리할 수 있습니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "클래스형 컴포넌트가 함수형 컴포넌트보다 항상 성능이 우수합니다.",
        answerBoolean: false,
      },
    ],
    answerString:
      "클래스형 컴포넌트는 render() 메서드를 필수로 구현해야 하고, 함수형 컴포넌트는 return 문으로 JSX를 반환합니다.",
  },
  {
    id: 12,
    question: "useState Hook에 대한 설명으로 가장 올바른 것은?",
    options: [
      {
        id: 1,
        label:
          "함수형 컴포넌트에서 상태를 관리할 수 있게 해주며, [현재 상태값, 상태 업데이트 함수] 형태의 배열을 반환합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "클래스형 컴포넌트의 this.setState()와 완전히 동일한 방식으로 동작합니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "상태 업데이트 시 이전 상태와 새로운 상태를 자동으로 병합(merge)합니다.",
        answerBoolean: false,
      },
    ],
    answerString:
      "함수형 컴포넌트에서 상태를 관리할 수 있게 해주며, [현재 상태값, 상태 업데이트 함수] 형태의 배열을 반환합니다.",
  },
  {
    id: 13,
    question: "useMemo와 useCallback의 차이점으로 올바른 것은?",
    options: [
      {
        id: 1,
        label: "useMemo는 계산된 값을 메모이제이션하고, useCallback은 함수를 메모이제이션합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "useMemo는 함수를 메모이제이션하고, useCallback은 계산된 값을 메모이제이션합니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "두 Hook 모두 동일한 기능을 하며, 사용법만 다릅니다.",
        answerBoolean: false,
      },
    ],
    answerString: "useMemo는 계산된 값을 메모이제이션하고, useCallback은 함수를 메모이제이션합니다.",
  },
  {
    id: 14,
    question: "useReducer Hook을 사용하는 주요 목적은 무엇입니까?",
    options: [
      {
        id: 1,
        label: "복잡한 상태 로직을 관리하고, 여러 하위 값들을 포함하는 상태 객체를 다룰 때 useState보다 적합합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "컴포넌트의 렌더링 횟수를 줄여 성능을 최적화하기 위해 사용합니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "비동기 작업을 처리하기 위한 전용 Hook입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "복잡한 상태 로직을 관리하고, 여러 하위 값들을 포함하는 상태 객체를 다룰 때 useState보다 적합합니다.",
  },
  {
    id: 15,
    question: "useRef Hook의 주요 사용 목적은 무엇입니까?",
    options: [
      {
        id: 1,
        label: "DOM 요소에 직접 접근하거나, 렌더링 사이에 변경되지 않는 값을 저장하기 위해 사용합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "컴포넌트의 상태를 관리하고, 상태 변경 시 리렌더링을 트리거하기 위해 사용합니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "다른 컴포넌트의 props에 접근하기 위해 사용하는 참조 Hook입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "DOM 요소에 직접 접근하거나, 렌더링 사이에 변경되지 않는 값을 저장하기 위해 사용합니다.",
  },
  {
    id: 16,
    question: "React.Fragment를 사용하는 주요 이유는 무엇입니까?",
    options: [
      {
        id: 1,
        label: "여러 JSX 요소를 하나의 부모 요소로 감쌀 때, 불필요한 DOM 노드를 추가하지 않기 위해 사용합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "컴포넌트의 성능을 최적화하고 렌더링 속도를 높이기 위해 사용합니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "컴포넌트 간의 데이터를 공유하기 위한 특별한 컨테이너입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "여러 JSX 요소를 하나의 부모 요소로 감쌀 때, 불필요한 DOM 노드를 추가하지 않기 위해 사용합니다.",
  },
  {
    id: 17,
    question: "Error Boundary에 대한 설명으로 가장 올바른 것은?",
    options: [
      {
        id: 1,
        label: "하위 컴포넌트 트리에서 발생한 JavaScript 에러를 잡아내고, 대체 UI를 보여주는 React 컴포넌트입니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "현재 함수형 컴포넌트와 Hook을 사용하여 구현할 수 있습니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "이벤트 핸들러와 비동기 코드에서 발생하는 모든 에러를 처리할 수 있습니다.",
        answerBoolean: false,
      },
    ],
    answerString: "하위 컴포넌트 트리에서 발생한 JavaScript 에러를 잡아내고, 대체 UI를 보여주는 React 컴포넌트입니다.",
  },
  {
    id: 18,
    question: "React.lazy()와 Suspense의 조합에 대한 설명으로 올바른 것은?",
    options: [
      {
        id: 1,
        label:
          "코드 분할(Code Splitting)을 통해 컴포넌트를 동적으로 import하고, 로딩 중에 fallback UI를 보여주기 위해 사용합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "컴포넌트의 상태 업데이트를 지연시켜 성능을 최적화하는 기능입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "서버 사이드 렌더링(SSR)을 위한 전용 기능입니다.",
        answerBoolean: false,
      },
    ],
    answerString:
      "코드 분할(Code Splitting)을 통해 컴포넌트를 동적으로 import하고, 로딩 중에 fallback UI를 보여주기 위해 사용합니다.",
  },
  {
    id: 19,
    question: "Custom Hook에 대한 설명으로 가장 올바른 것은?",
    options: [
      {
        id: 1,
        label: "컴포넌트 로직을 재사용 가능한 함수로 추출한 것으로, 함수명이 'use'로 시작해야 합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "React에서 기본 제공하는 Built-in Hook의 또 다른 이름입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "클래스형 컴포넌트에서만 사용할 수 있는 특별한 메서드입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "컴포넌트 로직을 재사용 가능한 함수로 추출한 것으로, 함수명이 'use'로 시작해야 합니다.",
  },
  {
    id: 20,
    question: "React Portal에 대한 설명으로 올바른 것은?",
    options: [
      {
        id: 1,
        label: "부모 컴포넌트의 DOM 계층 구조 밖에 있는 DOM 노드로 자식을 렌더링할 수 있게 해주는 기능입니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "컴포넌트 간의 데이터를 전달하기 위한 통신 채널입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "서버와 클라이언트 간의 데이터 동기화를 위한 React 기능입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "부모 컴포넌트의 DOM 계층 구조 밖에 있는 DOM 노드로 자식을 렌더링할 수 있게 해주는 기능입니다.",
  },
  {
    id: 21,
    question: "React의 SyntheticEvent에 대한 설명으로 가장 올바른 것은?",
    options: [
      {
        id: 1,
        label: "브라우저의 네이티브 이벤트를 감싸서 크로스 브라우저 호환성을 제공하는 React의 이벤트 시스템입니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "사용자가 직접 생성할 수 있는 커스텀 이벤트 객체입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "비동기 작업을 처리하기 위한 특별한 이벤트 타입입니다.",
        answerBoolean: false,
      },
    ],
    answerString: "브라우저의 네이티브 이벤트를 감싸서 크로스 브라우저 호환성을 제공하는 React의 이벤트 시스템입니다.",
  },
  {
    id: 22,
    question: "React StrictMode의 주요 목적은 무엇입니까?",
    options: [
      {
        id: 1,
        label: "개발 모드에서 안전하지 않은 생명주기 메서드나 잠재적 문제를 가진 코드를 감지하고 경고를 표시합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "프로덕션 빌드에서 성능을 최적화하고 번들 크기를 줄입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "TypeScript와의 호환성을 강화하고 타입 체킹을 엄격하게 수행합니다.",
        answerBoolean: false,
      },
    ],
    answerString: "개발 모드에서 안전하지 않은 생명주기 메서드나 잠재적 문제를 가진 코드를 감지하고 경고를 표시합니다.",
  },
  {
    id: 23,
    question: "React의 Concurrent Features(동시성 기능)에 대한 설명으로 올바른 것은?",
    options: [
      {
        id: 1,
        label:
          "렌더링 작업을 작은 단위로 나누어 브라우저가 다른 작업을 수행할 수 있도록 하여 사용자 경험을 개선합니다.",
        answerBoolean: true,
      },
      {
        id: 2,
        label: "여러 컴포넌트를 동시에 병렬로 렌더링하여 성능을 향상시키는 기능입니다.",
        answerBoolean: false,
      },
      {
        id: 3,
        label: "서버와 클라이언트에서 동시에 실행되는 코드를 작성할 수 있게 해주는 기능입니다.",
        answerBoolean: false,
      },
    ],
    answerString:
      "렌더링 작업을 작은 단위로 나누어 브라우저가 다른 작업을 수행할 수 있도록 하여 사용자 경험을 개선합니다.",
  },
] as const;
