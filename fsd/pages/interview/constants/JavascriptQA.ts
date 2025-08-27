import { MultipleChoiceQuestion } from "../../../widgets/interviewOption/ui/multipleChoiceInterview/model/type";

export const MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_JAVASCRIPT: MultipleChoiceQuestion[] =
  [
    {
      id: 1,
      question: "다음 중 Promise.all()에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "모든 Promise가 fulfilled 상태가 되면 결과를 반환하고, 하나라도 rejected되면 즉시 rejected된다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "Promise들이 순차적으로 실행되며, 이전 Promise가 완료되어야 다음이 실행된다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "하나라도 fulfilled되면 즉시 결과를 반환한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "모든 Promise가 fulfilled 상태가 되면 결과를 반환하고, 하나라도 rejected되면 즉시 rejected된다",
    },
    {
      id: 2,
      question: "다음 중 JavaScript의 스코프에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "var는 블록 스코프를 가지며, let과 const는 함수 스코프를 가진다",
          answerBoolean: false,
        },
        {
          id: 2,
          label:
            "var는 함수 스코프를 가지며, let과 const는 블록 스코프를 가진다",
          answerBoolean: true,
        },
        {
          id: 3,
          label: "var, let, const 모두 블록 스코프를 가진다",
          answerBoolean: false,
        },
      ],
      answerString:
        "var는 함수 스코프를 가지며, let과 const는 블록 스코프를 가진다",
    },
    {
      id: 3,
      question:
        "다음 중 JavaScript의 호이스팅(Hoisting)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "var, let, const 모두 호이스팅되지만, let과 const는 TDZ(Temporal Dead Zone)로 인해 선언 전 접근 시 에러가 발생한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "var만 호이스팅되고, let과 const는 호이스팅되지 않는다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "var, let, const 모두 호이스팅되며, 선언 전에도 모두 undefined로 초기화되어 접근 가능하다",
          answerBoolean: false,
        },
      ],
      answerString:
        "var, let, const 모두 호이스팅되지만, let과 const는 TDZ(Temporal Dead Zone)로 인해 선언 전 접근 시 에러가 발생한다",
    },

    {
      id: 4,
      question:
        "다음 중 JavaScript의 클로저(Closure)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "함수가 선언될 때의 렉시컬 환경을 기억하여, 외부 함수가 종료된 후에도 외부 변수에 접근할 수 있게 하는 기능",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "함수가 실행될 때마다 새로운 스코프를 생성하여 변수의 충돌을 방지하는 기능",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "함수 내부에서 선언한 변수가 함수 외부에서도 접근 가능하도록 하는 기능",
          answerBoolean: false,
        },
      ],
      answerString:
        "함수가 선언될 때의 렉시컬 환경을 기억하여, 외부 함수가 종료된 후에도 외부 변수에 접근할 수 있게 하는 기능",
    },
    {
      id: 5,
      question:
        "다음 중 화살표 함수(Arrow Function)와 일반 함수의 차이점으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "화살표 함수는 자신만의 this를 갖지 않으며, 상위 스코프의 this를 상속받는다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "화살표 함수는 일반 함수보다 실행 속도가 빠르며, 메모리를 적게 사용한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "화살표 함수는 호이스팅되지 않지만, 일반 함수는 호이스팅된다",
          answerBoolean: false,
        },
      ],
      answerString:
        "화살표 함수는 자신만의 this를 갖지 않으며, 상위 스코프의 this를 상속받는다",
    },
    {
      id: 6,
      question:
        "다음 중 JavaScript의 이벤트 루프(Event Loop)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "콜스택이 비어있을 때 태스크 큐의 작업을 콜스택으로 이동시키는 역할을 한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "비동기 작업을 동기적으로 실행하기 위해 작업들을 순차적으로 처리하는 메커니즘이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "여러 개의 스레드를 관리하여 동시에 여러 작업을 병렬로 처리하는 시스템이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "콜스택이 비어있을 때 태스크 큐의 작업을 콜스택으로 이동시키는 역할을 한다",
    },
    {
      id: 7,
      question: "다음 중 `==`와 `===` 연산자의 차이점으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "`==`는 타입 변환 후 비교하고, `===`는 타입과 값을 모두 엄격하게 비교한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "`==`는 값만 비교하고, `===`는 참조(reference)까지 비교한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "`==`는 숫자 비교에만 사용하고, `===`는 문자열 비교에만 사용한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "`==`는 타입 변환 후 비교하고, `===`는 타입과 값을 모두 엄격하게 비교한다",
    },
    {
      id: 8,
      question:
        "다음 중 JavaScript의 프로토타입(Prototype)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "모든 객체는 __proto__ 프로퍼티를 통해 프로토타입 체인에 연결되며, 상위 프로토타입의 프로퍼티에 접근할 수 있다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "프로토타입은 클래스의 인스턴스가 생성될 때마다 새로 복사되어 각 객체마다 독립적으로 존재한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "프로토타입 체인은 최대 3단계까지만 연결 가능하며, 그 이상은 에러가 발생한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "모든 객체는 __proto__ 프로퍼티를 통해 프로토타입 체인에 연결되며, 상위 프로토타입의 프로퍼티에 접근할 수 있다",
    },

    {
      id: 9,
      question: "다음 중 `async/await`에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "await는 async 함수 내에서만 사용 가능하며, Promise가 resolve될 때까지 해당 함수의 실행을 일시 정지한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "await를 사용하면 비동기 작업이 동기적으로 변환되어 전체 프로그램의 실행이 멈춘다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "async 함수는 항상 undefined를 반환하며, 값을 반환하려면 별도의 콜백 함수를 사용해야 한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "await는 async 함수 내에서만 사용 가능하며, Promise가 resolve될 때까지 해당 함수의 실행을 일시 정지한다",
    },

    {
      id: 10,
      question: "다음 중 배열의 `map()` 메서드에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "원본 배열을 변경하지 않고, 각 요소에 함수를 적용한 결과로 새로운 배열을 반환한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "원본 배열의 각 요소를 직접 수정하며, 수정된 원본 배열을 반환한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "조건을 만족하는 요소들만 골라내어 새로운 배열을 만든다",
          answerBoolean: false,
        },
      ],
      answerString:
        "원본 배열을 변경하지 않고, 각 요소에 함수를 적용한 결과로 새로운 배열을 반환한다",
    },

    {
      id: 11,
      question: "다음 중 JavaScript의 데이터 타입에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "undefined와 null은 모두 falsy 값이며, typeof undefined는 'undefined', typeof null은 'object'를 반환한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "undefined는 값이 할당되지 않은 상태이고, null은 존재하지 않는 변수를 의미한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "undefined와 null은 === 연산자로 비교했을 때 true를 반환한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "undefined와 null은 모두 falsy 값이며, typeof undefined는 'undefined', typeof null은 'object'를 반환한다",
    },

    {
      id: 12,
      question:
        "다음 중 구조 분해 할당(Destructuring)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "배열이나 객체의 요소를 개별 변수로 추출할 수 있으며, 기본값을 설정할 수 있다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "객체에서만 사용 가능하며, 배열에는 적용할 수 없다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "원본 배열이나 객체를 수정하여 새로운 구조로 재배열하는 기능이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "배열이나 객체의 요소를 개별 변수로 추출할 수 있으며, 기본값을 설정할 수 있다",
    },

    {
      id: 13,
      question: "다음 중 Spread 연산자(...)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "배열이나 객체를 개별 요소로 펼치거나, 나머지 요소들을 수집할 때 사용한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "숫자를 문자열로 변환하거나, 문자열을 숫자로 변환할 때만 사용한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "함수의 매개변수에서만 사용 가능하며, 변수 선언에는 사용할 수 없다",
          answerBoolean: false,
        },
      ],
      answerString:
        "배열이나 객체를 개별 요소로 펼치거나, 나머지 요소들을 수집할 때 사용한다",
    },

    {
      id: 14,
      question:
        "다음 중 JavaScript의 `this` 키워드에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "함수가 호출되는 방식에 따라 동적으로 결정되며, 일반 함수 호출 시에는 전역 객체(또는 strict mode에서 undefined)를 가리킨다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "함수가 선언된 위치에 따라 정적으로 결정되며, 호출 방식과는 무관하다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "항상 함수를 소유한 객체를 가리키며, 전역 함수에서는 사용할 수 없다",
          answerBoolean: false,
        },
      ],
      answerString:
        "함수가 호출되는 방식에 따라 동적으로 결정되며, 일반 함수 호출 시에는 전역 객체(또는 strict mode에서 undefined)를 가리킨다",
    },

    {
      id: 15,
      question: "다음 중 JavaScript의 Set 객체에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "중복되지 않는 값들의 집합을 저장하며, NaN도 하나의 값으로 취급한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "키-값 쌍을 저장하며, 키는 문자열만 가능하다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "배열과 동일하지만 인덱스로 접근할 수 없고 forEach만 사용 가능하다",
          answerBoolean: false,
        },
      ],
      answerString:
        "중복되지 않는 값들의 집합을 저장하며, NaN도 하나의 값으로 취급한다",
    },

    {
      id: 16,
      question: "다음 중 JavaScript의 Map 객체에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label: "키로 모든 타입의 값을 사용할 수 있으며, 삽입 순서를 기억한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "키는 반드시 문자열이어야 하며, 순서는 보장되지 않는다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "일반 객체와 동일하지만 delete 연산자를 사용할 수 없다",
          answerBoolean: false,
        },
      ],
      answerString:
        "키로 모든 타입의 값을 사용할 수 있으며, 삽입 순서를 기억한다",
    },

    {
      id: 17,
      question: "다음 중 JavaScript의 Symbol에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "유일한 식별자를 생성하는 원시 데이터 타입이며, 객체의 은닉 프로퍼티 키로 사용할 수 있다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "문자열의 일종으로, 같은 설명을 가진 Symbol들은 동일하다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "숫자를 대체하는 새로운 데이터 타입으로, 수학 연산이 가능하다",
          answerBoolean: false,
        },
      ],
      answerString:
        "유일한 식별자를 생성하는 원시 데이터 타입이며, 객체의 은닉 프로퍼티 키로 사용할 수 있다",
    },

    {
      id: 18,
      question:
        "다음 중 JavaScript의 try-catch 문에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "try 블록에서 에러가 발생하면 catch 블록이 실행되고, finally 블록이 있다면 에러 발생 여부와 관계없이 항상 실행된다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "catch 블록은 특정 타입의 에러만 잡을 수 있으며, 여러 개의 catch 블록을 연결할 수 있다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "finally 블록은 에러가 발생했을 때만 실행되며, 정상적으로 실행되면 실행되지 않는다",
          answerBoolean: false,
        },
      ],
      answerString:
        "try 블록에서 에러가 발생하면 catch 블록이 실행되고, finally 블록이 있다면 에러 발생 여부와 관계없이 항상 실행된다",
    },

    {
      id: 19,
      question: "다음 중 JavaScript의 정규표현식에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "RegExp 객체나 리터럴 표기법으로 생성할 수 있으며, test(), exec(), match() 등의 메서드로 패턴 매칭을 수행한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "정규표현식은 숫자로만 구성된 문자열에서만 사용할 수 있다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "한 번 생성된 정규표현식은 수정할 수 없으며, 플래그를 변경하려면 새로 생성해야 한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "RegExp 객체나 리터럴 표기법으로 생성할 수 있으며, test(), exec(), match() 등의 메서드로 패턴 매칭을 수행한다",
    },

    {
      id: 20,
      question: "다음 중 JavaScript의 모듈 시스템에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "ES6 모듈에서는 export와 import 키워드를 사용하며, 정적으로 분석 가능한 구조를 가진다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "require()와 module.exports는 ES6의 표준 모듈 문법이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "하나의 파일에서는 반드시 하나의 export만 가능하다",
          answerBoolean: false,
        },
      ],
      answerString:
        "ES6 모듈에서는 export와 import 키워드를 사용하며, 정적으로 분석 가능한 구조를 가진다",
    },

    {
      id: 21,
      question: "다음 중 JavaScript의 WeakMap에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "키는 반드시 객체여야 하며, 키에 대한 약한 참조를 가져 가비지 컬렉션의 대상이 될 수 있다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "일반 Map과 동일하지만 크기 제한이 있어 성능이 더 좋다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "키와 값 모두 원시 타입만 사용할 수 있으며, 순회가 가능하다",
          answerBoolean: false,
        },
      ],
      answerString:
        "키는 반드시 객체여야 하며, 키에 대한 약한 참조를 가져 가비지 컬렉션의 대상이 될 수 있다",
    },

    {
      id: 22,
      question:
        "다음 중 JavaScript의 Generator 함수에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "function* 문법으로 정의하며, yield 키워드로 실행을 일시 정지하고 값을 반환할 수 있다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "일반 함수보다 빠른 실행 속도를 가지며, 메모리 사용량도 적다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "비동기 작업을 동기적으로 처리하기 위한 함수로, Promise를 대체한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "function* 문법으로 정의하며, yield 키워드로 실행을 일시 정지하고 값을 반환할 수 있다",
    },

    {
      id: 23,
      question: "다음 중 JavaScript의 Proxy 객체에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "다른 객체에 대한 작업을 가로채고 재정의할 수 있는 메타프로그래밍 기능을 제공한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "네트워크 요청을 대리로 처리하는 HTTP 프록시 서버 기능이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "상속 관계에서 부모 클래스의 메서드를 호출할 때 사용하는 키워드이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "다른 객체에 대한 작업을 가로채고 재정의할 수 있는 메타프로그래밍 기능을 제공한다",
    },

    {
      id: 24,
      question: "다음 중 배열의 `reduce()` 메서드에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "배열의 각 요소에 대해 주어진 리듀서 함수를 실행하고, 하나의 결과값을 반환한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "배열의 크기를 절반으로 줄여서 새로운 배열을 반환한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "조건을 만족하는 요소의 개수를 세어서 숫자를 반환한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "배열의 각 요소에 대해 주어진 리듀서 함수를 실행하고, 하나의 결과값을 반환한다",
    },

    {
      id: 25,
      question:
        "다음 중 JavaScript의 템플릿 리터럴에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "백틱(`)으로 감싸며, ${} 문법으로 표현식을 삽입할 수 있고 여러 줄 문자열도 지원한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "작은따옴표나 큰따옴표로 감싸며, + 연산자 없이도 변수를 자동으로 연결한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "HTML 템플릿 전용 문법으로, DOM 요소에만 사용할 수 있다",
          answerBoolean: false,
        },
      ],
      answerString:
        "백틱(`)으로 감싸며, ${} 문법으로 표현식을 삽입할 수 있고 여러 줄 문자열도 지원한다",
    },

    {
      id: 26,
      question:
        "다음 중 JavaScript의 call(), apply(), bind() 메서드에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "모두 함수의 this 값을 명시적으로 설정하는 메서드로, call과 apply는 즉시 실행하고 bind는 새로운 함수를 반환한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "call은 객체 생성, apply는 배열 처리, bind는 함수 바인딩 전용 메서드이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "모두 비동기 함수를 동기적으로 실행하기 위한 메서드이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "모두 함수의 this 값을 명시적으로 설정하는 메서드로, call과 apply는 즉시 실행하고 bind는 새로운 함수를 반환한다",
    },

    {
      id: 27,
      question:
        "다음 중 JavaScript의 이벤트 버블링과 캡처링에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "버블링은 이벤트가 자식에서 부모로 전파되고, 캡처링은 부모에서 자식으로 전파되는 과정이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "버블링과 캡처링은 같은 의미로, 이벤트가 무작위로 전파되는 현상이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "버블링은 클릭 이벤트에만 적용되고, 캡처링은 키보드 이벤트에만 적용된다",
          answerBoolean: false,
        },
      ],
      answerString:
        "버블링은 이벤트가 자식에서 부모로 전파되고, 캡처링은 부모에서 자식으로 전파되는 과정이다",
    },

    {
      id: 28,
      question: "다음 중 JavaScript의 JSON에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "JSON.stringify()는 객체를 JSON 문자열로 변환하고, JSON.parse()는 JSON 문자열을 객체로 변환한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "JSON은 함수와 undefined 값도 모두 표현할 수 있는 데이터 형식이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "JSON.parse()는 모든 문자열을 자동으로 객체로 변환하며, 오류가 발생하지 않는다",
          answerBoolean: false,
        },
      ],
      answerString:
        "JSON.stringify()는 객체를 JSON 문자열로 변환하고, JSON.parse()는 JSON 문자열을 객체로 변환한다",
    },
    {
      id: 29,
      question: "클로저(Closure)에 대한 설명으로 가장 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "외부 함수가 종료된 후에도 내부 함수가 외부 함수의 변수에 접근할 수 있는 현상이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "함수 내부에서 선언된 모든 변수가 전역적으로 접근 가능해지는 기능이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "함수가 실행될 때마다 새로운 스코프를 생성하여 변수를 완전히 격리하는 메커니즘이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "외부 함수가 종료된 후에도 내부 함수가 외부 함수의 변수에 접근할 수 있는 현상이다",
    },
    {
      id: 30,
      question:
        "JavaScript의 프로토타입 체인(Prototype Chain)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "객체에서 프로퍼티나 메서드를 찾을 때, 해당 객체에 없으면 프로토타입 체인을 따라 상위 객체에서 찾는 과정이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "모든 객체가 동일한 프로토타입을 공유하여 메모리를 절약하는 시스템이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "객체 생성 시에만 실행되는 일회성 상속 메커니즘이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "객체에서 프로퍼티나 메서드를 찾을 때, 해당 객체에 없으면 프로토타입 체인을 따라 상위 객체에서 찾는 과정이다",
    },
    {
      id: 31,
      question: "JavaScript의 this 바인딩에서 '명시적 바인딩'에 해당하는 것은?",
      options: [
        {
          id: 1,
          label:
            "call(), apply(), bind() 메서드를 사용하여 this를 직접 지정하는 방식이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "객체의 메서드로 함수를 호출할 때 자동으로 this가 해당 객체를 가리키는 방식이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "화살표 함수에서 상위 스코프의 this를 상속받는 방식이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "call(), apply(), bind() 메서드를 사용하여 this를 직접 지정하는 방식이다",
    },
    {
      id: 32,
      question: "call(), apply(), bind() 메서드의 차이점으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "call은 인수를 개별적으로 전달하고, apply는 배열로 전달하며, bind는 새로운 함수를 반환한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "call과 apply는 비동기로 실행되고, bind는 동기적으로 실행된다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "apply는 즉시 실행되고, call과 bind는 나중에 호출할 수 있도록 함수를 저장한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "call은 인수를 개별적으로 전달하고, apply는 배열로 전달하며, bind는 새로운 함수를 반환한다",
    },
    {
      id: 33,
      question:
        "JavaScript 이벤트 루프에서 Microtask Queue와 Task Queue(Macro Queue)의 실행 우선순위는?",
      options: [
        {
          id: 1,
          label:
            "Microtask Queue가 Task Queue보다 높은 우선순위를 가지며, Call Stack이 비면 Microtask를 먼저 실행한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "Task Queue가 Microtask Queue보다 높은 우선순위를 가지며, 먼저 등록된 순서대로 실행한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "두 Queue는 동일한 우선순위를 가지며, 무작위로 선택되어 실행된다",
          answerBoolean: false,
        },
      ],
      answerString:
        "Microtask Queue가 Task Queue보다 높은 우선순위를 가지며, Call Stack이 비면 Microtask를 먼저 실행한다",
    },
    {
      id: 34,
      question:
        "Promise.all()과 Promise.allSettled()의 차이점으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "Promise.all()은 하나라도 reject되면 즉시 실패하고, Promise.allSettled()는 모든 Promise가 완료될 때까지 기다린다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "Promise.all()은 순차적으로 실행하고, Promise.allSettled()는 병렬로 실행한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "Promise.allSettled()는 ES5에서 사용 가능하고, Promise.all()은 ES6부터 사용할 수 있다",
          answerBoolean: false,
        },
      ],
      answerString:
        "Promise.all()은 하나라도 reject되면 즉시 실패하고, Promise.allSettled()는 모든 Promise가 완료될 때까지 기다린다",
    },
    {
      id: 35,
      question: "async/await와 Promise의 주요 차이점으로 가장 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "async/await는 동기적 코드처럼 읽기 쉽고 try/catch로 에러 처리가 가능하지만, 순차 실행으로 인한 성능 이슈가 있을 수 있다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "async/await는 실제로 동기적으로 실행되어 블로킹이 발생하고, Promise는 항상 비동기로 실행된다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "Promise는 병렬 처리가 불가능하고, async/await만이 여러 비동기 작업을 동시에 처리할 수 있다",
          answerBoolean: false,
        },
      ],
      answerString:
        "async/await는 동기적 코드처럼 읽기 쉽고 try/catch로 에러 처리가 가능하지만, 순차 실행으로 인한 성능 이슈가 있을 수 있다",
    },
    {
      id: 36,
      question: "Generator 함수의 특징으로 가장 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "function* 키워드로 선언하며, yield를 통해 실행을 일시 중지하고 재개할 수 있는 함수이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "비동기 작업만을 위한 특별한 함수로, Promise와 완전히 동일한 기능을 제공한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "한 번 실행되면 자동으로 완료까지 실행되며, 중간에 멈출 수 없는 함수이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "function* 키워드로 선언하며, yield를 통해 실행을 일시 중지하고 재개할 수 있는 함수이다",
    },
    {
      id: 37,
      question:
        "얕은 복사(Shallow Copy)와 깊은 복사(Deep Copy)의 차이점으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "얕은 복사는 중첩된 객체의 참조를 공유하고, 깊은 복사는 모든 레벨의 객체를 새롭게 생성한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "얕은 복사가 깊은 복사보다 메모리를 더 많이 사용하고 성능이 더 느리다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "깊은 복사는 1차원 배열과 객체에서만 사용할 수 있고, 얕은 복사는 다차원에서 사용한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "얕은 복사는 중첩된 객체의 참조를 공유하고, 깊은 복사는 모든 레벨의 객체를 새롭게 생성한다",
    },
    {
      id: 38,
      question:
        "JavaScript의 가비지 컬렉션(Garbage Collection)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "더 이상 참조되지 않는 객체들을 자동으로 메모리에서 해제하는 메커니즘으로, Mark and Sweep 알고리즘을 주로 사용한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "개발자가 직접 delete 연산자를 사용해서 수동으로 메모리를 해제해야 하는 시스템이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "함수가 실행될 때마다 자동으로 실행되어 모든 지역 변수를 즉시 삭제한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "더 이상 참조되지 않는 객체들을 자동으로 메모리에서 해제하는 메커니즘으로, Mark and Sweep 알고리즘을 주로 사용한다",
    },
    {
      id: 39,
      question:
        "함수형 프로그래밍의 '순수 함수(Pure Function)'에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "같은 입력에 대해 항상 같은 출력을 반환하며, 외부 상태를 변경하지 않는 부작용이 없는 함수이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "전역 변수나 외부 데이터베이스에 접근할 수 있지만, 함수 내부에서만 데이터를 수정하는 함수이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "비동기 작업을 처리하지 않고 동기적으로만 실행되는 모든 함수를 의미한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "같은 입력에 대해 항상 같은 출력을 반환하며, 외부 상태를 변경하지 않는 부작용이 없는 함수이다",
    },
    {
      id: 40,
      question: "커링(Currying)에 대한 설명으로 가장 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "여러 개의 인수를 받는 함수를 하나의 인수만 받는 함수들의 체인으로 변환하는 기법이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "함수의 실행 결과를 캐시하여 동일한 입력에 대해 빠른 응답을 제공하는 최적화 기법이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "비동기 함수들을 순서대로 연결하여 실행하는 패턴이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "여러 개의 인수를 받는 함수를 하나의 인수만 받는 함수들의 체인으로 변환하는 기법이다",
    },
    {
      id: 41,
      question:
        "디바운싱(Debouncing)과 스로틀링(Throttling)의 차이점으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "디바운싱은 연속 호출 중 마지막만 실행하고, 스로틀링은 일정 시간 간격으로 실행한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "디바운싱은 첫 번째 호출만 실행하고, 스로틀링은 모든 호출을 지연시켜 실행한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "스로틀링이 디바운싱보다 메모리를 더 많이 사용하고 성능이 떨어진다",
          answerBoolean: false,
        },
      ],
      answerString:
        "디바운싱은 연속 호출 중 마지막만 실행하고, 스로틀링은 일정 시간 간격으로 실행한다",
    },
    {
      id: 42,
      question:
        "메모이제이션(Memoization) 기법에 대한 설명으로 가장 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "함수의 실행 결과를 캐시하여 동일한 인수로 다시 호출될 때 캐시된 결과를 반환하는 최적화 기법이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "함수가 실행될 때마다 이전 실행 결과를 삭제하여 메모리 사용량을 최소화하는 기법이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "비동기 함수의 실행 순서를 기억하여 올바른 순서로 결과를 반환하는 기법이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "함수의 실행 결과를 캐시하여 동일한 인수로 다시 호출될 때 캐시된 결과를 반환하는 최적화 기법이다",
    },
    {
      id: 43,
      question: "싱글톤 패턴(Singleton Pattern)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "클래스의 인스턴스가 하나만 생성되도록 보장하고, 전역적으로 접근할 수 있는 접근점을 제공하는 패턴이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "여러 개의 유사한 객체를 효율적으로 생성하기 위한 팩토리 패턴의 한 종류이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "객체 간의 느슨한 결합을 위해 중재자 역할을 하는 객체를 만드는 패턴이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "클래스의 인스턴스가 하나만 생성되도록 보장하고, 전역적으로 접근할 수 있는 접근점을 제공하는 패턴이다",
    },
    {
      id: 44,
      question: "JavaScript의 Proxy 객체에 대한 설명으로 가장 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "객체의 기본 동작(속성 접근, 할당, 함수 호출 등)을 가로채서 사용자 정의 동작으로 재정의할 수 있게 해주는 기능이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "네트워크 요청을 중계하는 프록시 서버의 역할을 JavaScript에서 구현한 내장 객체이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "여러 객체를 하나의 인터페이스로 통합하여 사용할 수 있게 해주는 어댑터 패턴의 구현체이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "객체의 기본 동작(속성 접근, 할당, 함수 호출 등)을 가로채서 사용자 정의 동작으로 재정의할 수 있게 해주는 기능이다",
    },
  ] as const;
