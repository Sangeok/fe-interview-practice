import { useEffect } from "react";
import { Message } from "../../../../../../features/chat/chatMessage/model/type";

export function useScrollToBottom(
  messages: Message[],
  messagesEndRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages, messagesEndRef]);
}
