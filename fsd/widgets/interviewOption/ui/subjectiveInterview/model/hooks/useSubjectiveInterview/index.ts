import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { SubjectiveQuestion } from "../../type";
import { Message } from "@/fsd/features/chat/chatMessage/model/type";
import { useFeedbackAPI } from "./internal/useFeedbackAPI";
import { useMessageState } from "./internal/useMessageState";
import { useEffect, useState } from "react";
import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { useSubjectiveSessionStore } from "../../store/useSubjectiveSessionStore";

interface UseSubjectiveInterviewReturn {
  messages: Message[];
  questionIndex: number;
  isLoading: boolean;
  score: number;
  totalQuestions: number;
  isFinished: boolean;
  handleSendMessage: (content: string) => void;
  handleNextQuestion: () => void;
  handleEndInterview: () => void;
  handleAddReview: () => void;
}

export const useSubjectiveInterview = (questionAnswer: SubjectiveQuestion[]): UseSubjectiveInterviewReturn => {
  const tech = useSelectTechStore((state) => state.tech);
  const { generateFeedback, isLoading, setIsLoading } = useFeedbackAPI();
  const questionIndex = useSubjectiveSessionStore((s) => s.currentIndex);
  const score = useSubjectiveSessionStore((s) => s.score);
  const advance = useSubjectiveSessionStore((s) => s.advance);
  const addScore = useSubjectiveSessionStore((s) => s.addScore);
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

  const [isFinished, setIsFinished] = useState(false);
  const totalQuestions = questionAnswer.length;

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

    // 점수 및 오답 처리 규칙
    // - API 오류(success: false): 감점(가산 없음) + 오답 추가
    // - success && evaluation.score <= 4: 감점(가산 없음) + 오답 추가
    // - 그 외: 정답으로 판정하여 +1 점수, 오답 목록 제거
    if (!feedbackResult.success) {
      addInCorrectSubQuestion(questionAnswer[questionIndex]);
    } else if (feedbackResult.data.evaluation.score <= 4) {
      addInCorrectSubQuestion(questionAnswer[questionIndex]);
    } else {
      addScore(1);
      removeInCorrectSubQuestion(questionAnswer[questionIndex].id);
    }

    // 정답/오답 여부와 무관하게 현재 user 상태를 저장
    await persistUserToDB();
    removeLoadingMessage();

    addFeedback_ActionButtonMessage(feedbackResult.data);
  };

  const handleNextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < totalQuestions) {
      advance(false);
      const nextQuestion = questionAnswer[nextIndex];
      clearMessagesAndShowQuestion(nextQuestion.question);
    } else {
      addEndMessage();
      setIsFinished(true);
    }
  };

  const handleEndInterview = () => {
    addEndMessage();
    setIsFinished(true);
  };

  const handleAddReview = async () => {
    addInCorrectSubQuestion(questionAnswer[questionIndex]);
    await persistUserToDB();
    handleNextQuestion();
  };

  return {
    messages,
    questionIndex,
    isLoading,
    score,
    totalQuestions,
    isFinished,
    handleSendMessage,
    handleNextQuestion,
    handleEndInterview,
    handleAddReview,
  };
};
