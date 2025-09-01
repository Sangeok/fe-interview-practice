import { generateScript } from "@/fsd/shared/constants/AiModel";
import { NextRequest, NextResponse } from "next/server";

const SCRIPT_PROMPT = `
<instructions>
You are a senior {TECH} developer and a hiring committee member with over 2,000 technical interviews experience.
Your task is to provide feedback on the {Question} based on the provided {Answer}.

Follow these steps precisely:
1.  Carefully analyze the {Answer} according to the <evaluation_criteria>.
2.  Calculate a total score from 0 to 10.
3.  Based on the total score, you must select the appropriate JSON structure from the <output_formats> section.
    - If score is less than 7, use the <format_low_score> structure.
    - If score is 7 or higher, use the <format_high_score> structure.
4.  Your final output must be ONLY the populated JSON object. Do not include any other text or explanations.
5.  All text content inside the JSON must be in Korean.
</instructions>

<evaluation_criteria>
**Total Score: 10**
1.  **Technical Accuracy (4 pts):**
    - 4: Perfect understanding, accurate implementation, edge cases considered.
    - 0: Fundamental misunderstanding.
2.  **Communication Skills (3 pts):**
    - 3: Perfect logical flow, explains complex concepts clearly.
    - 0: Unclear explanations.
3.  **Practical Application (2 pts):**
    - 2: Demonstrates production experience with practical approaches.
    - 0: Purely theoretical.
4.  **Advanced Understanding (1 pt):**
    - 1: Shows connection to related technologies, expansive thinking.
    - 0: Limited to the question scope.
</evaluation_criteria>

<output_formats>
<format_low_score description="Use this JSON structure if the total score is LESS THAN 7">
{
  "topic": "Promise.all() 답변 분석 및 피드백",
  "evaluation": {
    "score": 6,
    "maxScore": 10,
    "summary": "핵심적인 동작 방식을 정확히 이해하고 있는 점은 좋지만, 면접 답변으로서는 다소 추상적이고 기술적인 깊이가 부족합니다."
  },
  "feedbackDetails": [
    {
      "title": "'실행'이라는 표현의 모호함",
      "description": "Promise.all은 프로미스를 실행시키는 주체가 아니라, 이미 시작된 여러 비동기 작업들이 완료되기를 기다리는 역할을 합니다. 즉, 병렬 처리되는 작업들을 모아서 관리하는 도구입니다."
    },
    {
      "title": "반환 값의 구체성 부족",
      "description": "단순히 상태를 반환한다고 설명하기보다 어떤 '값'을 반환하는지 구체적으로 설명하는 것이 중요합니다.",
      "points": [
        "성공 시: 모든 프로미스의 결과 값을 '순서가 보장된 배열'에 담아 반환한다는 점이 누락되었습니다.",
        "실패 시: 가장 '먼저 실패한 프로미스의 에러(이유)'를 그대로 반환한다는 점이 빠졌습니다."
      ]
    },
    {
      "title": "입력 값에 대한 설명 부재",
      "description": "Promise.all이 어떤 형태의 인자를 받는지(프로미스 객체로 구성된 배열과 같은 순회 가능한 객체) 언급하지 않았습니다."
    }
  ],
  "modelAnswer": {
    "introduction": "Promise.all은 여러 비동기 작업을 한꺼번에 시작하고, 전부 끝날 때까지 기다렸다가 결과를 한 번에 처리하고 싶을 때 쓰는 유용한 메서드입니다.",
    "usage": "보통 API 요청 같은 프로미스들을 배열에 담아서 Promise.all에 넘겨주는 식으로 사용합니다.",
    "scenarios": [
      {
        "condition": "모든 작업이 성공했을 때",
        "explanation": "모든 프로미스가 성공하면 .then()으로 각 프로미스의 결과값들이 '순서대로 담긴 배열'이 넘어옵니다. 이 배열의 순서는 처음 전달한 프로미스 배열 순서와 동일하게 보장됩니다."
      },
      {
        "condition": "작업 중 하나라도 실패했을 때 (Fail-fast)",
        "explanation": "프로미스 중 하나라도 실패하면 다른 작업들을 기다리지 않고 즉시 전체를 실패로 처리하며 .catch()로 가장 먼저 실패한 프로미스의 에러 메시지를 넘겨줍니다."
      }
    ],
    "example": {
      "context": "사용자의 프로필 정보와 게시글 목록을 동시에 불러와야 하는 상황",
      "solution": "두 API 요청 프로미스를 Promise.all로 묶어 병렬로 실행하면 로딩 속도를 개선할 수 있고, 두 정보가 모두 성공적으로 왔을 때만 화면을 그려주는 방식으로 안정적인 구현이 가능합니다."
    }
  }
}
</format_low_score>

<format_high_score description="Use this JSON structure if the total score is 7 OR HIGHER">
{
  "topic": "Promise.all() 답변 분석 및 피드백",
  "evaluation": {
    "score": 9,
    "maxScore": 10,
    "summary": "매우 훌륭한 답변입니다. Promise.all의 핵심 동작 원리를 정확히 이해하고 있으며, 이를 구조적이고 명확하게 설명하는 능력이 돋보입니다. 실무 예시를 통해 활용 능력까지 보여주셨습니다."
  },
  "feedbackDetails": [
    {
      "title": "답변의 좋았던 점 (Strengths)",
      "description": "다음과 같은 핵심 요소들을 모두 포함하여 체계적으로 설명한 점이 매우 인상 깊었습니다.",
      "points": [
        "Input(순회 가능한 객체), Process(병렬 처리), Output(결과 배열)을 모두 포함한 완전한 설명",
        "성공 시 결과 값 배열의 '순서 보장'과 실패 시 'Fail-fast' 특징을 정확히 언급",
        "API 동시 요청과 같은 적절하고 구체적인 실무 예시 활용"
      ]
    },
    {
      "title": "더 완벽한 답변을 위한 제언 (Suggestion for Perfection)",
      "description": "이미 훌륭한 답변이지만, 관련 기술과의 비교 분석 능력을 함께 보여준다면 비동기 처리에 대한 폭넓은 이해도를 더욱 어필할 수 있습니다.",
      "points": [
        "예를 들어, 'Promise.allSettled'와의 차이점(실패 여부와 상관없이 모든 결과를 받고 싶을 때)을 함께 언급하면 좋습니다.",
        "'Promise.race'나 'Promise.any'와 같은 다른 Promise 정적 메서드와의 비교를 통해 사용 목적을 명확히 할 수도 있습니다."
      ]
    }
  ],
  "modelAnswer": {
    "introduction": "Promise.all은 여러 비동기 작업을 한꺼번에 시작하고, 전부 끝날 때까지 기다렸다가 결과를 한 번에 처리하고 싶을 때 쓰는 유용한 메서드입니다.",
    "usage": "보통 API 요청 같은 프로미스들을 배열에 담아서 Promise.all에 넘겨주는 식으로 사용합니다.",
    "scenarios": [
      {
        "condition": "모든 작업이 성공했을 때",
        "explanation": "모든 프로미스가 성공하면 .then()으로 각 프로미스의 결과값들이 '순서대로 담긴 배열'이 넘어옵니다. 이 배열의 순서는 처음 전달한 프로미스 배열 순서와 동일하게 보장됩니다."
      },
      {
        "condition": "작업 중 하나라도 실패했을 때 (Fail-fast)",
        "explanation": "프로미스 중 하나라도 실패하면 다른 작업들을 기다리지 않고 즉시 전체를 실패로 처리하며 .catch()로 가장 먼저 실패한 프로미스의 에러 메시지를 넘겨줍니다."
      }
    ],
    "example": {
      "context": "사용자의 프로필 정보와 게시글 목록을 동시에 불러와야 하는 상황",
      "solution": "두 API 요청 프로미스를 Promise.all로 묶어 병렬로 실행하면 로딩 속도를 개선할 수 있고, 두 정보가 모두 성공적으로 왔을 때만 화면을 그려주는 방식으로 안정적인 구현이 가능합니다."
    }
  }
}
</format_high_score>
</output_formats>`;

export async function POST(request: NextRequest) {
  const { tech, question, answer } = await request.json();

  console.log(tech, question, answer);

  const PROMPT = SCRIPT_PROMPT.replace("{TECH}", tech)
    .replace("{Question}", question)
    .replace("{Answer}", answer);

  const result = await generateScript.sendMessage(PROMPT);
  const response = result?.response?.text();

  console.log(response);

  return NextResponse.json(JSON.parse(response));
}
