export interface Message {
  id: number;
  role: "user" | "assistant" | "Admin";
  content: string;
}
