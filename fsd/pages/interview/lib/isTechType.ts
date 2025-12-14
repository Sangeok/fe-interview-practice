import { z } from "zod";
import type { TechType } from "@/fsd/shared/model/type";

export const techTypeSchema = z.enum(["JavaScript", "NextJs", "React", "TypeScript", ""]);

export function isTechType(value: unknown): value is TechType {
  return techTypeSchema.safeParse(value).success;
}
