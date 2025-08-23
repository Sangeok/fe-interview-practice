"use client";
import { useState } from "react";
import { MultipleChoiceQuestion } from "../model/type";
import QuestionCard from "./_component/QuestionCard";
import EndQuestion from "./_component/EndQuestion";
import InterpretCard from "./_component/InterpretCard";
import { MultipleChoiceInterpretType } from "@/fsd/shared/model/type";
import AnswerCorrectCard from "./_component/AnswerCorrectCard";

interface MultipleChoiceInterviewProps {
  questionAnswer: MultipleChoiceQuestion[];
}

export default function MultipleChoiceInterview({ questionAnswer }: MultipleChoiceInterviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [interpret, setInterpret] = useState<MultipleChoiceInterpretType | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const isQuizFinished = currentQuestionIndex >= questionAnswer.length;

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerCorrect(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {isQuizFinished && <EndQuestion score={score} questionAnswerLength={questionAnswer.length} />}
      {!isQuizFinished && (
        <div className="flex flex-col gap-8">
          <QuestionCard
            key={questionAnswer[currentQuestionIndex].id}
            question={questionAnswer[currentQuestionIndex].question}
            options={questionAnswer[currentQuestionIndex].options}
            answerString={questionAnswer[currentQuestionIndex].answerString}
            setInterpret={setInterpret}
            setLoading={setLoading}
            setIsAnswerCorrect={setIsAnswerCorrect}
          />
          {!isAnswerCorrect && (
            <InterpretCard loading={loading} interpret={interpret} onNext={() => handleNextQuestion(true)} />
          )}
          {isAnswerCorrect && <AnswerCorrectCard onNext={() => handleNextQuestion(true)} />}
        </div>
      )}
    </div>
  );
}
