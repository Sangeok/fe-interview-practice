import { useState } from "react";

interface FeedbackAPIOptions {
  tech: string;
  question: string;
  answer: string;
}

export const useFeedbackAPI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateFeedback = async ({ tech, question, answer }: FeedbackAPIOptions) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-feedback", {
        method: "POST",
        body: JSON.stringify({
          tech,
          question,
          answer,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("서버에서 받은 data", data);
      // 서버 응답 형식을 그대로 반환합니다. (예: { success: true, data: { ... } })
      return data;
    } catch (error) {
      console.error("Error generating feedback:", error);
      return {
        success: false,
        data: "죄송합니다. 피드백 생성 중 오류가 발생했습니다.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { generateFeedback, isLoading, setIsLoading };
};
