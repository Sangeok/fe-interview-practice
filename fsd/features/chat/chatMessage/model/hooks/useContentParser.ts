import { FeedbackData } from "../../ui/_component/FeedbackMessage";

export const useContentParser = () => {
  const parseContent = (
    content: string
  ): {
    isStructuredData: boolean;
    parsedData: FeedbackData | null;
  } => {
    console.log("content", content);
    try {
      const parsedData = JSON.parse(content) as FeedbackData;

      console.log("parsedData", parsedData);
      return { isStructuredData: true, parsedData };
    } catch {
      return { isStructuredData: false, parsedData: null };
    }
  };

  return { parseContent };
};
