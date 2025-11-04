"use client";

import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { useMCQSessionStore } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/store/useMCQSessionStore";
import { useSubjectiveSessionStore } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/store/useSubjectiveSessionStore";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "./_component/InterviewOptions";
import InterviewTypeRenderer from "./_component/InterviewTypeRenderer";
import { getQuestionAnswer } from "../lib/getQuestionAnswer";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { useUserStore } from "@/fsd/entities/user/useUserStore";

export default function InterviewPage() {
  const [selectedOptions, setSelectedOptions] = useState<InterviewOptionsValue | "">("");
  const [openDialog, setOpenDialog] = useState(true);
  const { tech, setTech } = useSelectTechStore();
  const params = useParams();
  const routeTech = (params as any)?.title as string | undefined;

  const isInterviewSelected = selectedOptions !== "";
  const isDialogClosed = !openDialog;
  const canShowInterview = isInterviewSelected && isDialogClosed;

  const question_answer = getQuestionAnswer(tech, selectedOptions as InterviewOptionsValue);

  // 세션 키 (기술 + 옵션 기준)
  const sessionId = `${tech}:${selectedOptions}`;

  // MCQ 세션 초기화/복원
  const initSession = useMCQSessionStore((s) => s.initSession);
  const mcqQuestions = useMCQSessionStore((s) => s.shuffledQuestions);
  const initSubjSession = useSubjectiveSessionStore((s) => s.initSession);
  const resetSubjSession = useSubjectiveSessionStore((s) => s.resetSession);
  const subjQuestions = useSubjectiveSessionStore((s) => s.orderedQuestions);
  const resetMCQSession = useMCQSessionStore((s) => s.resetSession);

  const subjQuestionIndex = useSubjectiveSessionStore((s) => s.currentIndex);
  const mcqQuestionIndex = useMCQSessionStore((s) => s.currentIndex);

  const addInCorrectSubQuestion = useUserStore((s) => s.addInCorrectSubQuestion);
  const addInCorrectMultipleChoiceQuestion = useUserStore((s) => s.addInCorrectMultipleChoiceQuestion);

  const persistUserToDB = useUserStore((s) => s.persistUserToDB);

  // 새로고침/직접 진입 시 라우트 파라미터로 tech를 복원
  useEffect(() => {
    if (routeTech && tech !== routeTech) {
      setTech(routeTech as any);
    }
  }, [routeTech, tech, setTech]);

  useEffect(() => {
    if (selectedOptions !== "Multiple Choice" || !canShowInterview) return;
    const raw = (question_answer as MultipleChoiceQuestion[]) || [];
    if (!Array.isArray(raw) || raw.length === 0) return; // 빈 배열이면 초기화 호출하지 않음(무한 루프 방지)
    initSession({ sessionId, rawQuestions: raw });
  }, [selectedOptions, canShowInterview, sessionId, question_answer, initSession]);

  // Subjective 세션 초기화/복원
  useEffect(() => {
    if (selectedOptions !== "Subjective" || !canShowInterview) return;
    const raw = (question_answer as SubjectiveQuestion[]) || [];
    if (!Array.isArray(raw) || raw.length === 0) return;
    initSubjSession({ sessionId, rawQuestions: raw });
  }, [selectedOptions, canShowInterview, sessionId, question_answer, initSubjSession]);

  const handleGoFirst = () => {
    setOpenDialog(true);
    if (selectedOptions === "Subjective") {
      resetSubjSession();
    } else if (selectedOptions === "Multiple Choice") {
      resetMCQSession();
    }
  };

  const handleAddToReview = async () => {
    if (selectedOptions === "Subjective") {
      addInCorrectSubQuestion(subjQuestions[subjQuestionIndex]);
    } else if (selectedOptions === "Multiple Choice") {
      addInCorrectMultipleChoiceQuestion(mcqQuestions[mcqQuestionIndex]);
    }

    await persistUserToDB();
  };

  // 렌더용 질문 배열: MCQ는 스토어의 셔플/복원 결과 사용
  const shuffledQuestions = selectedOptions === "Multiple Choice" ? mcqQuestions : subjQuestions;
  const isMCQReady = selectedOptions !== "Multiple Choice" || mcqQuestions.length > 0;

  return (
    <div className="p-8 h-screen">
      <header className="text-2xl font-bold flex justify-between">
        <div>{tech} Interview</div>
        {canShowInterview && (
          <div className="flex items-center gap-4">
            <Button variant="light" size="sm" onClick={handleGoFirst}>
              처음으로 돌아가기
            </Button>
            <Button variant="light" size="sm" onClick={handleAddToReview}>
              복습 문제에 추가하기
            </Button>
          </div>
        )}
      </header>

      {canShowInterview && isMCQReady && (
        <InterviewTypeRenderer
          selectedOptions={selectedOptions as InterviewOptionsValue}
          shuffledQuestions={shuffledQuestions}
          setOpenDialog={setOpenDialog}
        />
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} title="Select Options">
        <InterviewOptions
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          onClose={() => setOpenDialog(false)}
        />
      </Dialog>
    </div>
  );
}
