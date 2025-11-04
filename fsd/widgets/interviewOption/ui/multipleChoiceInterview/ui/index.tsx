"use client";

import QuestionCard from "./_component/QuestionCard";
import EndQuestion from "./_component/EndQuestion";
import InterpretCard from "./_component/InterpretCard";
import AnswerCorrectCard from "./_component/AnswerCorrectCard";
import { useMultipleChoiceQuiz } from "../model/hooks/useMultipleChoiceQuiz";
import { useAnswerFeedbackState } from "../model/hooks/useAnswerFeedbackState";
import ProgressHeader from "./_component/ProgressHeader";
import { MultipleChoiceQuestion } from "../model/type";

interface MultipleChoiceInterviewProps {
  setOpenInterviewOptionsDialog: (open: boolean) => void;
  questionsOverride?: MultipleChoiceQuestion[];
}

export default function MultipleChoiceInterview({
  setOpenInterviewOptionsDialog,
  questionsOverride,
}: MultipleChoiceInterviewProps) {
  // 퀴즈 진행 상태 관리
  const { currentQuestion, currentQuestionIndex, score, isQuizFinished, totalQuestions, goNext, goFirst } =
    useMultipleChoiceQuiz({ setOpenInterviewOptionsDialog, questionsOverride });

  // 답변 피드백 상태 관리
  const {
    isLoading,
    interpret,
    showCorrectCard,
    showIncorrectInterpret,
    isAnswerCorrect,
    markCorrect,
    markIncorrect,
    setInterpret,
    setLoading,
    resetAnswerState,
    handleAddReview,
  } = useAnswerFeedbackState(currentQuestion);

  // 다음 문제로 진행 (단일 액션)
  const handleNext = () => {
    const correct = isAnswerCorrect;
    resetAnswerState();
    goNext(correct);
  };

  // Early return: 퀴즈 종료 상태
  if (isQuizFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <EndQuestion score={score} questionAnswerLength={totalQuestions} />
      </div>
    );
  }

  // 퀴즈 진행 중 UI
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex flex-col gap-8">
        <ProgressHeader score={score} currentQuestionIndex={currentQuestionIndex} totalQuestions={totalQuestions} />

        {currentQuestion && (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion.question}
            options={currentQuestion.options}
            answerString={currentQuestion.answerString}
            setInterpret={setInterpret}
            setLoading={setLoading}
            onAddReview={handleAddReview}
            goFirst={goFirst}
            onSubmitAnswer={(isCorrect) => {
              if (isCorrect) {
                markCorrect();
              } else {
                markIncorrect();
              }
            }}
          />
        )}

        {showIncorrectInterpret && <InterpretCard loading={isLoading} interpret={interpret} onNext={handleNext} />}

        {showCorrectCard && <AnswerCorrectCard onNext={handleNext} />}
      </div>
    </div>
  );
}
