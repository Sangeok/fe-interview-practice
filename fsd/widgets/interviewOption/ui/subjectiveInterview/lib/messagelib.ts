import { Message } from "@/fsd/features/chat/chatMessage/model/type";

export const createQuestionMessage = (question: string): Message => ({
  id: Date.now(),
  role: "assistant",
  content: question,
});

export const createUserMessage = (content: string): Message => ({
  id: Date.now(),
  role: "user",
  content,
});

export const createFeedbackMessage = (content: string): Message => ({
  id: Date.now() + 1,
  role: "assistant",
  content,
});

export const createLoadingMessage = (): Message => ({
  id: Date.now() + 3,
  role: "assistant",
  content: "AI가 답변을 생성하는 중입니다...",
});

export const createActionButtonMessage = (): Message => ({
  id: Date.now() + 2,
  role: "system",
  content: "SHOW_BUTTONS",
});

export const createEndMessage = (): Message => ({
  id: Date.now(),
  role: "assistant",
  content: "면접이 종료되었습니다. 수고하셨습니다!",
});

export const filterButtonMessages = (messages: Message[]): Message[] => {
  return messages.filter((msg) => msg.content !== "SHOW_BUTTONS");
};
