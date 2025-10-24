import { FeedbackData, DeepDiveFeedbackData, FeedbackResponse } from "@/fsd/shared/model/type";

// content가 FeedbackData 타입인지 판단하는 타입 가드 함수
export const isFeedbackData = (content: string | FeedbackResponse): content is FeedbackData => {
  return (
    typeof content === "object" &&
    content !== null &&
    "topic" in content &&
    "evaluation" in content &&
    "feedbackDetails" in content &&
    "modelAnswer" in content
  );
};

// content가 DeepDiveFeedbackData 타입인지 판단하는 타입 가드 함수
export const isDeepDiveFeedbackData = (content: string | FeedbackResponse): content is DeepDiveFeedbackData => {
  return (
    typeof content === "object" &&
    content !== null &&
    "topic" in content &&
    "evaluation" in content &&
    "feedbackDetails" in content &&
    "deepDive" in content
  );
};

// content가 FeedbackResponse 타입인지 판단하는 통합 타입 가드 함수
export const isFeedbackResponse = (content: string | FeedbackResponse): content is FeedbackResponse => {
  return isFeedbackData(content) || isDeepDiveFeedbackData(content);
};
