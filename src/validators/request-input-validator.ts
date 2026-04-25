import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validateTextInput() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      z.object({
        text: z.string().min(1, "Prompt text cannot be empty"),
      }).parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((issue) => issue.message);
        res.status(400).json({ errors: errorMessages || "Invalid request data" });
      }
    }
  };
}
