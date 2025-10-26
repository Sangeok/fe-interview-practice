"use client";
import { MultipleChoiceQuestion } from "../model/type";
import QuestionCard from "./_component/QuestionCard";
import EndQuestion from "./_component/EndQuestion";
import InterpretCard from "./_component/InterpretCard";
import AnswerCorrectCard from "./_component/AnswerCorrectCard";
import { useMultipleChoiceQuiz } from "../model/hooks/useMultipleChoiceQuiz";
import { useAnswerFeedbackState } from "../model/hooks/useAnswerFeedbackState";

interface MultipleChoiceInterviewProps {
  questionAnswer: MultipleChoiceQuestion[];
}

export default function MultipleChoiceInterview({ questionAnswer }: MultipleChoiceInterviewProps) {
  // 퀴즈 진행 상태 관리
  const { currentQuestion, score, isQuizFinished, totalQuestions, onCorrectAnswer, onIncorrectAnswer } =
    useMultipleChoiceQuiz({ questions: questionAnswer });

  // 답변 피드백 상태 관리
  const {
    isLoading,
    interpret,
    showCorrectCard,
    showIncorrectInterpret,
    setAnswerCorrect,
    setAnswerIncorrect,
    setInterpret,
    setLoading,
    resetAnswerState,
  } = useAnswerFeedbackState(currentQuestion);

  // 정답 처리
  const handleCorrectAnswer = () => {
    resetAnswerState();
    onCorrectAnswer();
  };

  // 오답 처리
  const handleIncorrectAnswer = () => {
    resetAnswerState();
    onIncorrectAnswer();
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
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          answerString={currentQuestion.answerString}
          setInterpret={setInterpret}
          setLoading={setLoading}
          setIsAnswerCorrect={(isCorrect) => {
            if (isCorrect) {
              setAnswerCorrect();
            } else {
              setAnswerIncorrect();
            }
          }}
        />

        {showIncorrectInterpret && (
          <InterpretCard loading={isLoading} interpret={interpret} onNext={handleIncorrectAnswer} />
        )}

        {showCorrectCard && <AnswerCorrectCard onNext={handleCorrectAnswer} />}
      </div>
    </div>
  );
}
