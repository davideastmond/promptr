import OpenAI from "openai";

export const getAiResponse = async (input: string) => {
  const openAi = new OpenAI();
  const response = await openAi.responses.create({
    model: "gpt-5-nano",
    input: prompt(input),
  });

  return response.output_text;
};

const prompt = (
  input: string,
) => `You are a helpful assistant that summarizes text and extracts key action items.
Analyze the following text and provide a concise summary along with a list of 3 key action items. Return the response in JSON format
with this structure: 

{
  "summary": "A brief summary of the text",
  "keyActionItems": [
    "First action item",
    "Second action item",
    "Third action item"
  ]
}

Return only the JSON response without any additional text or explanations. Remove formatting and line breaks.

Text to analyze:
${input}
`;
