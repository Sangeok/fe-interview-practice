import { Message } from "@/fsd/features/chat/chatMessage/model/type";
import { useState } from "react";

export const useMessageManager = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  return { messages, setMessages };
};
