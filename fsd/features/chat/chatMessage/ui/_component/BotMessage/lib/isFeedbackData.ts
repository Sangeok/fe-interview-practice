import { FeedbackData } from "@/fsd/shared/model/type";

// content가 FeedbackData 타입인지 판단하는 타입 가드 함수
export const isFeedbackData = (content: string | FeedbackData): content is FeedbackData => {
  return (
    typeof content === "object" &&
    content !== null &&
    "topic" in content &&
    "evaluation" in content &&
    "feedbackDetails" in content &&
    "modelAnswer" in content
  );
};
