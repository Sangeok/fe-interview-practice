"use client";
import { useState, useMemo } from "react";
import { MultipleChoiceQuestion } from "../model/type";
import QuestionCard from "./_component/QuestionCard";
import EndQuestion from "./_component/EndQuestion";
import InterpretCard from "./_component/InterpretCard";
import { MultipleChoiceInterpretType } from "@/fsd/shared/model/type";
import AnswerCorrectCard from "./_component/AnswerCorrectCard";
import { arrayShuffle } from "@/fsd/shared/lib/array-shuffle";

interface MultipleChoiceInterviewProps {
  questionAnswer: MultipleChoiceQuestion[];
}

export default function MultipleChoiceInterview({
  questionAnswer,
}: MultipleChoiceInterviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [interpret, setInterpret] =
    useState<MultipleChoiceInterpretType | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // 각 질문의 옵션을 한 번만 섞어서 메모이제이션
  const shuffledQuestions = useMemo(() => {
    return questionAnswer.map((qa) => ({
      ...qa,
      options: arrayShuffle([...qa.options]),
    }));
  }, [questionAnswer]);

  const isQuizFinished = currentQuestionIndex >= questionAnswer.length;
  const showWrongAnswerInterpret = isAnswerCorrect === false;
  const showCorrectAnswerCard = isAnswerCorrect === true;
  
  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerCorrect(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  if (isQuizFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <EndQuestion
          score={score}
          questionAnswerLength={questionAnswer.length}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex flex-col gap-8">
        <QuestionCard
          key={questionAnswer[currentQuestionIndex].id}
          question={shuffledQuestions[currentQuestionIndex].question}
          options={shuffledQuestions[currentQuestionIndex].options}
          answerString={shuffledQuestions[currentQuestionIndex].answerString}
          setInterpret={setInterpret}
          setLoading={setLoading}
          setIsAnswerCorrect={setIsAnswerCorrect}
        />
        
        {showWrongAnswerInterpret && (
          <InterpretCard
            loading={loading}
            interpret={interpret}
            onNext={() => handleNextQuestion(true)}
          />
        )}
        
        {showCorrectAnswerCard && (
          <AnswerCorrectCard onNext={() => handleNextQuestion(true)} />
        )}
      </div>
    </div>
  );
}
