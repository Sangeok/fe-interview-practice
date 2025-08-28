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

export const createFeedbackMessage = (userContent: string): Message => ({
  id: Date.now() + 1,
  role: "assistant",
  content: `좋은 답변입니다! "${userContent}"에 대한 피드백을 드리겠습니다. 이 답변은 문제의 핵심을 잘 이해하고 있음을 보여줍니다.`,
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
