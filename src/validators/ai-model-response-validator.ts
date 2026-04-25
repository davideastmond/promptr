import z from "zod";
import type { AIModelResponse } from "../types/ai-model-response.js";

export const aiModelResponseValidator = z.object({
  summary: z.string().min(1, "Summary cannot be empty"),
  keyActionItems: z
    .array(z.string().min(1, "Action item cannot be empty"))
    .min(1, "At least one action item is required"),
}) as z.ZodType<AIModelResponse>;
