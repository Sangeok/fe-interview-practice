import { generateScript } from "@/fsd/shared/constants/AiModel";
import { NextRequest, NextResponse } from "next/server";

const SCRIPT_PROMPT = `
You are a senior developer who specializes professionally in {TECH}.
You need to explain in an easy-to-understand way why the {Question} about the given {TECH} results in {Answer}.
When explaining, you should provide an interpretation that can be understood based on the assumption that the other person has no knowledge about the subject.

**Guidelines
It would be good to use appropriate analogies when explaining.
Answers must be provided in Korean.
When answering, you must provide answers by referring to the example answer format.

**Example Answer
{
  "Question" : "다음 중 Promise.all()에 대한 설명으로 올바른 것은?",
  "summary" : "Promise.all()은 여러 Promise를 동시에 실행하며, 모두 성공해야만 성공으로 처리되고 하나라도 실패하면 즉시 실패로 처리되는 메서드입니다.",
  "details": {
    "theory": {
      "title": "이론적 설명",
      "description": "Promise.all()은 여러 개의 Promise를 동시에 처리하기 위한 메서드로, 동작 방식은 두 가지 핵심 규칙으로 정의됩니다.",
      "rules": [
        {
          "title": "성공 (Fulfilled) 처리",
          "explanation": "Promise.all()에 전달된 모든 Promise가 성공적으로 완료되어야만, Promise.all() 스스로도 fulfilled 상태가 됩니다. 이때 각각의 Promise가 반환한 결과값들을 원래의 순서대로 담은 배열을 최종 결과로 반환합니다.",
        },
        {
          "title": "실패 (Rejected) 처리",
          "explanation": "전달된 Promise 중 단 하나라도 실패하면, 다른 Promise의 완료 여부를 기다리지 않고 그 즉시 rejected 상태가 됩니다. 이때 가장 먼저 실패한 Promise의 실패 원인을 그대로 반환합니다.",
        }
      ]
    },
    "analogy": {
      "title": "비유: 항공기 이륙 전 최종 점검",
      "scenarios": [
        {
          "type": "Success",
          "title": "이륙 허가",
          "story": "조종사는 이륙 허가를 받기 위해 엔진, 날개, 연료 등 모든 시스템의 점검 완료 신호를 기다립니다. 모든 시스템에서 '이상 없음' 신호가 와야만 최종적으로 '이륙 준비 완료'라는 결과를 얻고 비행기를 이륙시킬 수 있습니다.",
        },
        {
          "type": "Failure",
          "title": "이륙 취소",
          "story": "점검 중인 여러 시스템 중 단 하나라도(예: 엔진) 결함 신호가 뜨면, 조종사는 다른 시스템의 점검 결과를 기다리지 않고 그 즉시 이륙 절차를 중단합니다. 이륙이 취소된 이유는 바로 그 '엔진 결함' 때문입니다.",
        }
      ]
    }
  }
}
`;

export async function POST(request: NextRequest) {
  try {
    const { tech, question, answer } = await request.json();

    if (!tech || !question || !answer) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: tech, question, or answer" },
        { status: 400 }
      );
    }

    const PROMPT = SCRIPT_PROMPT.replace("{TECH}", tech)
      .replace("{Question}", question)
      .replace("{Answer}", answer);

    const result = await generateScript.sendMessage(PROMPT);
    const responseText = result?.response?.text();

    if (!responseText) {
      throw new Error("AI model returned an empty response.");
    }

    const parsedResponse = JSON.parse(responseText);

    return NextResponse.json({ success: true, data: parsedResponse });
  } catch (error) {
    console.error("Error in generate-interpret API:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: `Failed to generate interpretation: ${errorMessage}` },
      { status: 500 }
    );
  }
}
