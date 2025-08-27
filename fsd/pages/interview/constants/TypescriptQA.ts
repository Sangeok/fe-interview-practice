import { MultipleChoiceQuestion } from "../../../widgets/interviewOption/ui/multipleChoiceInterview/model/type";

export const MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_TYPESCRIPT: MultipleChoiceQuestion[] =
  [
    {
      id: 1,
      question: "TypeScript에서 `any`와 `unknown`의 차이점으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "`any`는 타입 검사를 비활성화하고, `unknown`은 타입 안전성을 유지하면서 모든 타입을 허용한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "`unknown`은 모든 타입을 허용하고, `any`는 특정 타입만 허용한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "`any`와 `unknown`은 완전히 동일하며, 단순히 별칭 관계이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "`any`는 타입 검사를 비활성화하고, `unknown`은 타입 안전성을 유지하면서 모든 타입을 허용한다",
    },
    {
      id: 2,
      question:
        "TypeScript에서 `interface`와 `type` 별칭의 차이점으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "`interface`는 확장 가능하고 선언 병합이 가능하며, `type`은 유니온/인터섹션 타입을 정의할 수 있다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "`type`만 객체 타입을 정의할 수 있고, `interface`는 함수 타입만 정의 가능하다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "`interface`는 런타임에 존재하고, `type`은 컴파일 타임에만 존재한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "`interface`는 확장 가능하고 선언 병합이 가능하며, `type`은 유니온/인터섹션 타입을 정의할 수 있다",
    },
    {
      id: 3,
      question: "TypeScript의 제네릭(Generic)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "재사용 가능한 컴포넌트를 만들기 위해 타입을 매개변수화하여 다양한 타입에서 동작하게 하는 기능이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "특정 타입만 사용할 수 있도록 제한하는 타입 제약 기능이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "런타임에 타입을 동적으로 변경할 수 있는 기능이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "재사용 가능한 컴포넌트를 만들기 위해 타입을 매개변수화하여 다양한 타입에서 동작하게 하는 기능이다",
    },
    {
      id: 4,
      question:
        "다음 중 TypeScript의 유틸리티 타입 `Partial<T>`에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "타입 T의 모든 프로퍼티를 선택적(optional)으로 만드는 타입이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "타입 T에서 일부 프로퍼티만 선택하여 새로운 타입을 만드는 타입이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "타입 T의 모든 프로퍼티를 필수(required)로 만드는 타입이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "타입 T의 모든 프로퍼티를 선택적(optional)으로 만드는 타입이다",
    },
    {
      id: 5,
      question:
        "TypeScript의 타입 가드(Type Guard)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "런타임에 특정 타입인지 확인하여 타입 범위를 좁히는(narrowing) 기법이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "컴파일 시점에만 동작하며 런타임에는 영향을 주지 않는 타입 검사 기능이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "잘못된 타입 사용을 방지하기 위해 타입을 숨기는 보안 기능이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "런타임에 특정 타입인지 확인하여 타입 범위를 좁히는(narrowing) 기법이다",
    },
    {
      id: 6,
      question: "TypeScript에서 `never` 타입에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "절대 발생할 수 없는 타입을 나타내며, 모든 타입의 하위 타입이지만 어떤 값도 할당할 수 없다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "null과 undefined를 제외한 모든 값을 나타내는 타입이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "함수가 값을 반환하지 않을 때 사용하는 void와 동일한 타입이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "절대 발생할 수 없는 타입을 나타내며, 모든 타입의 하위 타입이지만 어떤 값도 할당할 수 없다",
    },
    {
      id: 7,
      question:
        "TypeScript의 옵셔널 체이닝(?.)과 널 병합 연산자(??)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "옵셔널 체이닝은 안전한 프로퍼티 접근을 제공하고, 널 병합 연산자는 null/undefined일 때 기본값을 제공한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "둘 다 TypeScript에서만 사용 가능한 문법으로 JavaScript로 컴파일되지 않는다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "옵셔널 체이닝은 타입 정의에만 사용되고, 널 병합 연산자는 런타임 연산자이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "옵셔널 체이닝은 안전한 프로퍼티 접근을 제공하고, 널 병합 연산자는 null/undefined일 때 기본값을 제공한다",
    },
    {
      id: 8,
      question:
        "TypeScript의 함수 오버로딩(Function Overloading)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "같은 이름의 함수에 대해 여러 타입 시그니처를 정의하여 다양한 매개변수 조합을 허용하는 기능이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "하나의 함수에서 여러 개의 return 문을 사용할 수 있게 해주는 기능이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "상속 관계에서 부모 함수를 재정의하는 메서드 오버라이딩과 동일한 개념이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "같은 이름의 함수에 대해 여러 타입 시그니처를 정의하여 다양한 매개변수 조합을 허용하는 기능이다",
    },
    {
      id: 9,
      question:
        "TypeScript의 유틸리티 타입 `Pick<T, K>`와 `Omit<T, K>`의 차이점으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "`Pick`은 지정된 프로퍼티만 선택하고, `Omit`은 지정된 프로퍼티를 제외한 나머지를 선택한다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "`Pick`은 객체에서만 사용되고, `Omit`은 배열에서만 사용된다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "`Omit`이 `Pick`보다 성능이 좋고 메모리를 적게 사용한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "`Pick`은 지정된 프로퍼티만 선택하고, `Omit`은 지정된 프로퍼티를 제외한 나머지를 선택한다",
    },
    {
      id: 10,
      question:
        "TypeScript의 리터럴 타입(Literal Types)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label: "특정 값 자체를 타입으로 사용하여 해당 값만 허용하는 타입이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "문자열과 숫자만 사용할 수 있는 제한된 타입이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "변수에 할당된 첫 번째 값의 타입으로 자동 추론되는 타입이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "특정 값 자체를 타입으로 사용하여 해당 값만 허용하는 타입이다",
    },
    {
      id: 11,
      question:
        "TypeScript의 조건부 타입(Conditional Types)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "`T extends U ? X : Y` 형태로 타입 조건에 따라 다른 타입을 반환하는 고급 타입 기능이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "if-else 문과 같은 조건부 로직을 타입 수준에서 실행하는 런타임 기능이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "유니온 타입에서 특정 타입만 필터링하는 단순한 타입 가드 기능이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "`T extends U ? X : Y` 형태로 타입 조건에 따라 다른 타입을 반환하는 고급 타입 기능이다",
    },
    {
      id: 12,
      question:
        "TypeScript의 매핑된 타입(Mapped Types)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "기존 타입의 각 프로퍼티를 순회하면서 새로운 타입을 생성하는 타입 변환 기법이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "객체의 프로퍼티와 배열의 인덱스를 매핑하는 자료구조 타입이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "Map과 Set 같은 컬렉션 타입의 TypeScript 버전이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "기존 타입의 각 프로퍼티를 순회하면서 새로운 타입을 생성하는 타입 변환 기법이다",
    },
    {
      id: 13,
      question: "TypeScript의 `keyof` 연산자에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "객체 타입의 모든 키를 유니온 타입으로 추출하는 타입 연산자이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "객체의 키 개수를 반환하는 런타임 연산자이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "객체에서 특정 키가 존재하는지 확인하는 타입 가드 함수이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "객체 타입의 모든 키를 유니온 타입으로 추출하는 타입 연산자이다",
    },
    {
      id: 14,
      question:
        "TypeScript의 `typeof` 연산자가 타입 컨텍스트에서 사용될 때의 역할은?",
      options: [
        {
          id: 1,
          label:
            "값의 타입을 추출하여 타입으로 사용할 수 있게 해주는 타입 쿼리 연산자이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "JavaScript의 typeof와 동일하게 런타임에 타입 문자열을 반환한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "변수의 메모리 크기를 바이트 단위로 측정하는 연산자이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "값의 타입을 추출하여 타입으로 사용할 수 있게 해주는 타입 쿼리 연산자이다",
    },
    {
      id: 15,
      question: "TypeScript의 튜플(Tuple) 타입에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label: "고정된 길이와 각 위치별로 정해진 타입을 가지는 배열 타입이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "키-값 쌍을 저장하는 객체와 동일한 타입이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "동일한 타입의 요소만 저장할 수 있는 제한된 배열 타입이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "고정된 길이와 각 위치별로 정해진 타입을 가지는 배열 타입이다",
    },
    {
      id: 16,
      question: "TypeScript의 `readonly` 키워드에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "프로퍼티를 읽기 전용으로 만들어 할당 후 수정을 방지하는 타입 수식어이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "런타임에 객체를 동결(freeze)하여 변경을 완전히 차단하는 키워드이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "private와 동일한 역할을 하는 접근 제어자의 별칭이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "프로퍼티를 읽기 전용으로 만들어 할당 후 수정을 방지하는 타입 수식어이다",
    },
    {
      id: 17,
      question:
        "TypeScript의 유틸리티 타입 `Record<K, T>`에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "키 타입 K와 값 타입 T를 가지는 객체 타입을 생성하는 유틸리티 타입이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "배열을 객체로 변환하는 런타임 함수이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "데이터베이스 레코드를 표현하는 특별한 타입이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "키 타입 K와 값 타입 T를 가지는 객체 타입을 생성하는 유틸리티 타입이다",
    },
    {
      id: 18,
      question: "TypeScript의 템플릿 리터럴 타입에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "문자열 리터럴 타입을 조합하여 새로운 문자열 타입을 생성하는 타입 시스템 기능이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "HTML 템플릿을 타입으로 정의하는 웹 개발 전용 기능이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "JavaScript의 템플릿 리터럴과 완전히 동일한 런타임 기능이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "문자열 리터럴 타입을 조합하여 새로운 문자열 타입을 생성하는 타입 시스템 기능이다",
    },
    {
      id: 19,
      question: "TypeScript의 `infer` 키워드에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "조건부 타입 내에서 타입을 추론하고 캡처하여 사용할 수 있게 해주는 키워드이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "함수의 반환 타입을 자동으로 추론하는 타입 어노테이션이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "상속 관계에서 부모 타입을 추론하는 키워드이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "조건부 타입 내에서 타입을 추론하고 캡처하여 사용할 수 있게 해주는 키워드이다",
    },
    {
      id: 20,
      question:
        "TypeScript의 `strictNullChecks` 옵션에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "null과 undefined를 다른 타입에 할당할 수 없게 하여 null 관련 오류를 방지하는 컴파일러 옵션이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "모든 변수를 null로 초기화하도록 강제하는 엄격한 코딩 규칙이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "런타임에 null 체크를 자동으로 수행하는 성능 최적화 기능이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "null과 undefined를 다른 타입에 할당할 수 없게 하여 null 관련 오류를 방지하는 컴파일러 옵션이다",
    },
    {
      id: 21,
      question:
        "TypeScript의 교차 타입(Intersection Types)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "`A & B` 형태로 여러 타입을 결합하여 모든 타입의 멤버를 포함하는 새로운 타입을 만든다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "두 타입의 공통 부분만 추출하여 새로운 타입을 생성한다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "상속 관계에 있는 타입들 사이의 관계를 나타내는 타입이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "`A & B` 형태로 여러 타입을 결합하여 모든 타입의 멤버를 포함하는 새로운 타입을 만든다",
    },
    {
      id: 22,
      question:
        "TypeScript의 유니온 타입(Union Types)에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "`A | B` 형태로 여러 타입 중 하나일 수 있음을 나타내는 타입이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "배열과 객체를 결합한 새로운 자료구조 타입이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "여러 모듈을 하나로 합치는 번들링 기능이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "`A | B` 형태로 여러 타입 중 하나일 수 있음을 나타내는 타입이다",
    },
    {
      id: 23,
      question: "TypeScript의 `as const` 어서션에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "값을 읽기 전용으로 만들고 리터럴 타입으로 추론하도록 하는 타입 어서션이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "변수를 상수로 선언하는 const 키워드의 대체 문법이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "런타임에 값이 변경되지 않음을 보장하는 불변성 키워드이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "값을 읽기 전용으로 만들고 리터럴 타입으로 추론하도록 하는 타입 어서션이다",
    },
    {
      id: 24,
      question: "TypeScript의 `implements` 키워드에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "클래스가 특정 인터페이스나 타입의 구조를 따르도록 강제하는 키워드이다",
          answerBoolean: true,
        },
        {
          id: 2,
          label: "상속을 위한 extends와 동일한 기능을 수행하는 키워드이다",
          answerBoolean: false,
        },
        {
          id: 3,
          label: "추상 클래스를 구현할 때만 사용할 수 있는 전용 키워드이다",
          answerBoolean: false,
        },
      ],
      answerString:
        "클래스가 특정 인터페이스나 타입의 구조를 따르도록 강제하는 키워드이다",
    },
    {
      id: 25,
      question:
        "TypeScript의 `private`, `protected`, `public` 접근 제어자에 대한 설명으로 올바른 것은?",
      options: [
        {
          id: 1,
          label:
            "`private`는 같은 클래스 내에서만, `protected`는 상속받은 클래스에서도, `public`은 어디서든 접근 가능하다",
          answerBoolean: true,
        },
        {
          id: 2,
          label:
            "모두 런타임에 실제로 접근을 차단하며, JavaScript로 컴파일된 후에도 유지된다",
          answerBoolean: false,
        },
        {
          id: 3,
          label:
            "`protected`가 가장 제한적이고, `private`가 가장 개방적인 접근 권한을 제공한다",
          answerBoolean: false,
        },
      ],
      answerString:
        "`private`는 같은 클래스 내에서만, `protected`는 상속받은 클래스에서도, `public`은 어디서든 접근 가능하다",
    },
  ] as const;
