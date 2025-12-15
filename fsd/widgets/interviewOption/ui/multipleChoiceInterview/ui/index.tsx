"use client";

import QuestionCard from "./_component/QuestionCard/ui/QuestionCard";
import EndQuestion from "./_component/EndQuestion";
import InterpretCard from "./_component/InterpretCard";
import AnswerCorrectCard from "./_component/AnswerCorrectCard";
import { useNormalMCQSession } from "../model/hooks/useNormalMCQSession";
import { useReviewMCQSession } from "../model/hooks/useReviewMCQSession";
import { useAnswerFeedbackState } from "../model/hooks/useAnswerFeedbackState";
import ProgressHeader from "./_component/ProgressHeader";
import { MultipleChoiceQuestion } from "../model/type";

interface MultipleChoiceInterviewProps {
  questionsOverride?: MultipleChoiceQuestion[];
  isReviewMode?: boolean;
}

export default function MultipleChoiceInterview({ questionsOverride, isReviewMode }: MultipleChoiceInterviewProps) {
  // 퀴즈 진행 상태 관리 (모드별 훅 사용)
  const normalSession = useNormalMCQSession();
  const reviewSession = useReviewMCQSession({
    questions: questionsOverride ?? [],
  });

  // 모드에 따라 적절한 세션 선택
  const { currentQuestion, currentQuestionIndex, score, isQuizFinished, totalQuestions, goNext } = isReviewMode
    ? reviewSession
    : normalSession;

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
      <>
        {/* Background */}
        <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          <div className="absolute inset-0 bg-grain-texture opacity-30"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-lime-500/10 rounded-full blur-[120px] animate-float-slower"></div>
        </div>

        <div className="w-full max-w-2xl mx-auto p-4">
          <EndQuestion score={score} questionAnswerLength={totalQuestions} />
        </div>
      </>
    );
  }

  // 퀴즈 진행 중 UI
  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-grain-texture opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-lime-500/10 rounded-full blur-[120px] animate-float-slower"></div>
      </div>

      {/* Floating Code Snippets */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] animate-float-badge-1 opacity-40">
          <div className="tech-badge text-xs">if()</div>
        </div>
        <div className="absolute top-[20%] right-[8%] animate-float-badge-2 opacity-40">
          <div className="tech-badge tech-badge-ts text-xs">&lt;T&gt;</div>
        </div>
        <div className="absolute bottom-[30%] left-[10%] animate-float-badge-3 opacity-40">
          <div className="tech-badge tech-badge-js text-xs">[ ]</div>
        </div>
        <div className="absolute top-[50%] right-[5%] animate-float-badge-1 opacity-40">
          <div className="tech-badge text-xs">=&gt;</div>
        </div>
        <div className="absolute bottom-[20%] right-[15%] animate-float-badge-2 opacity-30">
          <div className="tech-badge tech-badge-ts text-xs">?:</div>
        </div>
      </div>

      <div className="relative w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 z-10">
        <div className="flex flex-col gap-6">
          <ProgressHeader score={score} currentQuestionIndex={currentQuestionIndex} totalQuestions={totalQuestions} />

          {currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              answerString={currentQuestion.answerString}
              setInterpret={setInterpret}
              setLoading={setLoading}
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
    </>
  );
}
