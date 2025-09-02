import { generateScript } from "@/fsd/shared/constants/AiModel";
import { NextRequest, NextResponse } from "next/server";

const SCRIPT_PROMPT = `
<instructions>
You are a senior {TECH} developer and a hiring committee member with over 2,000 technical interviews experience.
Your task is to provide feedback on the {Question} based on the provided {Answer}.

Follow these steps precisely:
1.  Carefully analyze the {Answer} according to the <evaluation_criteria>. First, determine if the {Answer} attempts to address the question or if it is a refusal/inability to answer. Your entire evaluation MUST be based on this initial determination.
2.  **Crucial Rule: If the {Answer} is a direct statement of not knowing, an expression of uncertainty, or otherwise fails to provide a substantive answer to the question (e.g., '모르겠어', '잘 모르겠습니다', '기억이 안 나네요', 'I have no idea'), the 'summary' and 'feedbackDetails' MUST focus on the 'absence of a response' and 'lack of fundamental knowledge'. Do NOT invent or assume a partial answer and critique it.**
3.  Calculate a total score from 0 to 10. A refusal to answer should result in a very low score (0-2).
4.  Based on the total score, you must select the appropriate JSON schema from the <strict_output_schema> section.
    - If score is less than 7, use the <schema_low_score>.
    - If score is 7 or higher, use the <schema_high_score>.
5.  Your final output must be ONLY the populated JSON object. It MUST follow the chosen schema EXACTLY. Do not add, remove, rename, or restructure any keys.
6.  Before providing the final output, double-check that your generated JSON perfectly matches the required structure and logically follows from the provided {Answer}.
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
<schema_low_score description="Use this JSON schema if the total score is LESS THAN 7. Fill in the placeholders.">
{
  "topic": "[{Question}에 해당하는 주제]",
  "evaluation": {
    "score": "[0-6 사이의 계산된 점수]",
    "maxScore": 10,
    "summary": "[제공된 {Answer}를 바탕으로 한 총평 요약. 답변이 '모르겠어'와 같은 답변 부재일 경우, 그 사실을 명확히 지적할 것.]"
  },
  "feedbackDetails": [
    {
      "title": "[첫 번째 피드백의 제목 (예: 답변 부재, 핵심 개념 이해 부족 추정)]",
      "description": "[첫 번째 피드백에 대한 상세 설명]",
      "points": [
        "[상세 설명에 대한 첫 번째 핵심 포인트]",
        "[상세 설명에 대한 두 번째 핵심 포인트]"
      ]
    },
    {
      "title": "[두 번째 피드백의 제목 (예: 면접 대처 방식)]",
      "description": "[두 번째 피드백에 대한 상세 설명]"
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
</schema_low_score>

<schema_high_score description="Use this JSON schema if the total score is 7 OR HIGHER. Fill in the placeholders.">
{
    ... (내용 동일) ...
}
</schema_high_score>
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
