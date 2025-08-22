import { TechStackOption } from "../model/type";

export const TECH_STACK_OPTIONS: TechStackOption[] = [
  { id: "React", label: "React", value: "React" },
  { id: "Next.js", label: "Next.js", value: "Next.js" },
  { id: "JavaScript", label: "JavaScript", value: "JavaScript" },
  { id: "TypeScript", label: "TypeScript", value: "TypeScript" },
  { id: "CS(Computer Science)", label: "CS(Computer Science)", value: "CS(Computer Science)" },
] as const;
