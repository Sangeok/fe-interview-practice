import { TechStackOption } from "../model/type";

export const TECH_STACK_OPTIONS: TechStackOption[] = [
  { id: "React", label: "React", value: "React" },
  { id: "NextJs", label: "NextJs", value: "NextJs" },
  { id: "JavaScript", label: "JavaScript", value: "JavaScript" },
  { id: "TypeScript", label: "TypeScript", value: "TypeScript" },
  { id: "Computer Science", label: "Computer Science", value: "Computer Science" },
] as const;
