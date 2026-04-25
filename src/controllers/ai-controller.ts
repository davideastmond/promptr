import type { Request, Response } from "express";
import z from "zod";
import { getAiResponse } from "../clients/ai-client.js";
import { aiModelResponseValidator } from "../validators/ai-model-response-validator.js";

export async function completeAIRequest(req: Request, res: Response) {
  const { text } = req.body;
  try {
    const aiResponse = await getAiResponse(text);
    // Validate the structure
    aiModelResponseValidator.parse(JSON.parse(aiResponse));
    return res.json(aiResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid AI response format", details: error.issues });
    } else {
      console.error("Error processing AI response:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
