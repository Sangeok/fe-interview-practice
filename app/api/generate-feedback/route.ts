import { generateScript } from "@/fsd/shared/constants/AiModel";
import { NextRequest, NextResponse } from "next/server";

const SCRIPT_PROMPT = `
<instructions>
You are a senior {TECH} developer and a hiring committee member with over 2,000 technical interviews experience.
Your task is to provide feedback on the {Question} based on the provided {Answer}.

Follow these steps precisely:
1.  Carefully analyze the {Answer} according to the <evaluation_criteria>. First, determine if the {Answer} attempts to address the question or if it is a refusal/inability to answer. Your entire evaluation MUST be based on this initial determination.
2.  **Crucial Rule: If the {Answer} is a direct statement of not knowing or otherwise fails to provide a substantive answer (e.g., '모르겠어', '기억이 안 나네요'), the evaluation MUST focus on the 'absence of a response' and 'lack of fundamental knowledge'.**
3.  Calculate a total score from 0 to 10 based on the criteria.
4.  Based on the total score, you must select the appropriate JSON schema from the <strict_output_schema> section:
    - If score is 4 or less, use the <schema_improvement_needed>.
    - If score is between 5 and 7 (inclusive), use the <schema_developing_answer>.
    - If score is 8 or higher, use the <schema_strong_answer>.
5.  **Flexibility Rule: For any array in the schema (e.g., 'feedbackDetails', 'points', 'scenarios'), generate a relevant number of items (typically 1 to 3) based on the content of the {Answer}. Do not add filler content just to fit a predefined count.**
6.  Your final output must be ONLY the populated JSON object. It MUST follow the chosen schema EXACTLY.
7.  All text content inside the JSON must be in Korean.
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

<strict_output_schema>

<schema_improvement_needed description="Use if total score is 4 OR LESS. Focuses on fundamental issues and provides a clear model answer.">
{
  "topic": "[{Question}에 해당하는 주제]",
  "evaluation": {
    "score": "[0-4 사이의 계산된 점수]",
    "maxScore": 10,
    "summary": "[답변의 핵심적인 문제점을 요약합니다. (예: 핵심 개념에 대한 이해가 부족하거나, 질문의 의도를 파악하지 못한 것으로 보입니다.) 답변 부재 시 그 사실을 명확히 지적합니다.]"
  },
  "feedbackDetails": [
    {
      "title": "[가장 시급하게 개선해야 할 점에 대한 제목 (예: 핵심 개념 오해, 답변 부재)]",
      "description": "[위에 제시된 제목에 대한 구체적인 설명입니다. 어떤 부분에서 오해가 있었는지, 또는 답변을 하지 않은 것이 어떤 인상을 주는지 설명합니다.]",
      "points": [
        "[첫 번째 구체적인 지적 사항]",
        "[두 번째 구체적인 지적 사항]"
      ]
    },
    {
      "title": "면접 상황 대처법 제안",
      "description": "[모르는 질문을 받았을 때 어떻게 대처하는 것이 좋은지에 대한 조언을 제공합니다.]"
    }
  ],
  "modelAnswer": {
    "introduction": "[질문 주제에 대한 이상적인 개념 소개]",
    "usage": "[해당 개념의 일반적인 사용법 또는 핵심 동작 방식에 대한 설명]",
    "scenarios": [
      {
        "condition": "[첫 번째 조건 또는 시나리오]",
        "explanation": "[해당 조건에서의 동작 방식 또는 개념에 대한 설명]"
      }
    ],
    "example": {
      "context": "[이 개념이 실제로 사용될 수 있는 실무 상황에 대한 설명]",
      "solution": "[위 상황에서 이 개념을 적용하여 문제를 해결하는 방법에 대한 설명]"
    }
  }
}
</schema_improvement_needed>

<schema_developing_answer description="Use if total score is BETWEEN 5 AND 7. Provides a balanced view of strengths and areas for improvement.">
{
  "topic": "[{Question}에 해당하는 주제]",
  "evaluation": {
    "score": "[5-7 사이의 계산된 점수]",
    "maxScore": 10,
    "summary": "[답변에 대한 균형 잡힌 총평을 제공합니다. (예: 주제에 대한 기본적인 이해는 보여주셨지만, 설명의 깊이와 실무 적용 예시 측면에서 아쉬움이 남습니다.)]"
  },
  "feedbackDetails": [
    {
      "title": "답변의 좋았던 점 (Strengths)",
      "description": "[답변에서 긍정적으로 평가된 부분들을 종합적으로 설명합니다.]",
      "points": [
        "[첫 번째 강점 (예: 핵심 용어를 정확히 사용함)]",
        "[두 번째 강점 (예: 설명을 논리적으로 구성하려 노력함)]"
      ]
    },
    {
      "title": "개선이 필요한 부분 (Areas for Improvement)",
      "description": "[답변의 완성도를 높이기 위해 보완해야 할 점들을 구체적으로 설명합니다.]",
      "points": [
        "[보완이 필요한 첫 번째 내용 (예: 개념의 동작 원리에 대한 설명 부족)]",
        "[보완이 필요한 두 번째 내용 (예: 어떤 상황에서 사용해야 하는지에 대한 언급 부재)]"
      ]
    }
  ],
  "modelAnswer": {
    "introduction": "[질문 주제에 대한 이상적인 개념 소개]",
    "usage": "[해당 개념의 일반적인 사용법 또는 핵심 동작 방식에 대한 설명]",
    "scenarios": [
      {
        "condition": "[첫 번째 조건 또는 시나리오]",
        "explanation": "[해당 조건에서의 동작 방식 또는 개념에 대한 설명]"
      },
      {
        "condition": "[두 번째 조건 또는 시나리오]",
        "explanation": "[해당 조건에서의 동작 방식 또는 개념에 대한 설명]"
      }
    ],
    "example": {
      "context": "[이 개념이 실제로 사용될 수 있는 실무 상황에 대한 설명]",
      "solution": "[위 상황에서 이 개념을 적용하여 문제를 해결하는 방법에 대한 설명]"
    }
  }
}
</schema_developing_answer>

<schema_strong_answer description="Use if total score is 8 OR HIGHER. Praises the excellent answer and suggests ways to make it even more exceptional.">
{
  "topic": "[{Question}에 해당하는 주제]",
  "evaluation": {
    "score": "[8-10 사이의 계산된 점수]",
    "maxScore": 10,
    "summary": "[훌륭한 답변에 대한 구체적인 칭찬과 핵심적인 장점을 요약합니다. (예: 주제에 대한 깊은 이해와 풍부한 실무 경험이 돋보이는 훌륭한 답변입니다.)]"
  },
  "feedbackDetails": [
    {
      "title": "답변의 뛰어난 점 (Excellent Points)",
      "description": "[답변의 어떤 부분이 특히 인상적이었는지 종합적으로 설명합니다.]",
      "points": [
        "[첫 번째 강점 (예: 기술의 내부 동작 원리까지 정확히 설명함)]",
        "[두 번째 강점 (예: 장단점과 실제 사용 시의 트레이드오프까지 고려함)]",
        "[세 번째 강점 (예: 구조적이고 명확한 커뮤니케이션 능력)]"
      ]
    }
  ],
  "deepDive": {
    "title": "더 깊은 논의를 위한 제언 (Suggestion for Deeper Discussion)",
    "description": "[이미 훌륭한 답변을 넘어서, 관련된 다른 기술과의 비교, 성능 최적화, 혹은 발생 가능한 엣지 케이스 등 시니어 레벨에서 더 논의해볼 만한 심화 주제를 제시합니다. 이는 'modelAnswer'를 대체하여 중복 정보를 피합니다.]",
    "topics": [
      "[첫 번째 심화 주제 제안]",
      "[두 번째 심화 주제 제안]"
    ]
  }
}
</schema_strong_answer>

</strict_output_schema>
`;

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
