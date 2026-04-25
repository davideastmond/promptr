import dotenv from "dotenv";
import express from "express";
import { completeAIRequest } from "./controllers/ai-controller.js";
import { validateTextInput } from "./validators/request-input-validator.js";

dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.post("/prompt", validateTextInput(), completeAIRequest);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
