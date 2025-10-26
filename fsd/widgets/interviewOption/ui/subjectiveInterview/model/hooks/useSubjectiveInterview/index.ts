import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { SubjectiveQuestion } from "../../type";
import { Message } from "@/fsd/features/chat/chatMessage/model/type";
import { useFeedbackAPI } from "./internal/useFeedbackAPI";
import { useQuestionNavigation } from "./internal/useQuestionNavigation";
import { useMessageState } from "./internal/useMessageState";
import { useEffect } from "react";
import { useUserStore } from "@/fsd/entities/user/useUserStore";

interface UseSubjectiveInterviewReturn {
  messages: Message[];
  questionIndex: number;
  isLoading: boolean;
  handleSendMessage: (content: string) => void;
  handleNextQuestion: () => void;
  handleEndInterview: () => void;
}

export const useSubjectiveInterview = (questionAnswer: SubjectiveQuestion[]): UseSubjectiveInterviewReturn => {
  const tech = useSelectTechStore((state) => state.tech);
  const { generateFeedback, isLoading, setIsLoading } = useFeedbackAPI();
  const { questionIndex, moveToNextQuestion } = useQuestionNavigation(questionAnswer.length);
  const {
    messages,
    addLoadingMessage,
    addQuestionMessage,
    addUserMessage,
    addFeedback_ActionButtonMessage,
    addEndMessage,
    removeLoadingMessage,
    clearMessagesAndShowQuestion,
  } = useMessageState();

  const addInCorrectSubQuestion = useUserStore((s) => s.addInCorrectSubQuestion);
  const removeInCorrectSubQuestion = useUserStore((s) => s.removeInCorrectSubQuestion);
  const persistUserToDB = useUserStore((s) => s.persistUserToDB);

  // 첫 번째 질문을 자동으로 표시
  useEffect(() => {
    if (questionAnswer.length > 0 && messages.length === 0) {
      addQuestionMessage(questionAnswer[0].question);
    }
  }, [questionAnswer, messages.length, addQuestionMessage]);

  const handleSendMessage = async (content: string) => {
    addUserMessage(content);
    addLoadingMessage();

    const feedbackResult = await generateFeedback({
      tech,
      question: questionAnswer[questionIndex].question,
      answer: content,
    });
    console.log("feedbackResult", feedbackResult);

    if (feedbackResult.success && feedbackResult.data.evaluation.score <= 4) {
      addInCorrectSubQuestion(questionAnswer[questionIndex]);
    } else {
      removeInCorrectSubQuestion(questionAnswer[questionIndex].id);
    }

    // 정답/오답 여부와 무관하게 현재 user 상태를 저장
    await persistUserToDB();
    removeLoadingMessage();

    addFeedback_ActionButtonMessage(feedbackResult.data);
  };

  const handleNextQuestion = () => {
    const result = moveToNextQuestion();
    if (result.success) {
      const nextQuestion = questionAnswer[result.newIndex];
      clearMessagesAndShowQuestion(nextQuestion.question);
    }
  };

  const handleEndInterview = () => {
    addEndMessage();
  };

  return {
    messages,
    questionIndex,
    isLoading,
    handleSendMessage,
    handleNextQuestion,
    handleEndInterview,
  };
};
