# promptr

A lightweight REST API built with Node.js, Express, and TypeScript that accepts free-form text and uses the OpenAI API to return a structured summary and a list of key action items.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [AI Prompts Used](#ai-prompts-used)

---

## Overview

`promptr` exposes a single `POST /prompt` endpoint. You send it a block of text and it returns a JSON response containing:

- A **concise summary** of the text
- A list of **3 key action items** extracted from the text

The response is validated against a strict Zod schema before being returned to the caller, ensuring the AI output always conforms to the expected shape.

---

## Project Structure

```
promptr/
├── src/
│   ├── index.ts                          # Express app entry point
│   ├── ai-client.ts                      # OpenAI client & prompt template
│   ├── controllers/
│   │   └── ai-controller.ts              # Route handler
│   ├── types/
│   │   └── ai-model-response.ts          # AIModelResponse TypeScript type
│   └── validators/
│       ├── ai-model-response-validator.ts # Zod schema for AI output
│       └── request-input-validator.ts    # Zod middleware for request body
├── env.sample                            # Example environment variables
├── eslint.config.cjs                     # ESLint configuration
├── tsconfig.json                         # TypeScript configuration
└── package.json
```

---

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- An **OpenAI API key** with access to the model used (`gpt-5-nano`)

---

## Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/davideastmond/promptr.git
   cd promptr
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the sample env file and fill in your OpenAI API key:

   ```bash
   cp env.sample .env
   ```

   Open `.env` and set your key:

   ```
   OPENAI_API_KEY=sk-...
   ```

   Optionally set a custom port (defaults to `3000`):

   ```
   PORT=3000
   ```

---

## Environment Variables

| Variable         | Required | Default | Description                        |
| ---------------- | -------- | ------- | ---------------------------------- |
| `OPENAI_API_KEY` | Yes      | —       | Your OpenAI secret API key         |
| `PORT`           | No       | `3000`  | Port the Express server listens on |

---

## Running the App

### Development (with hot reload)

```bash
npm run dev
```

Uses `tsx watch` to restart automatically on file changes.

### Production build

```bash
npm run build   # Compiles TypeScript to dist/
npm start       # Runs the compiled output
```

---

## API Reference

### `POST /prompt`

Accepts a JSON body with a `text` field and returns a structured AI-generated summary.

**Request**

```http
POST /prompt
Content-Type: application/json

{
  "text": "Your input text goes here..."
}
```

**Success Response** — `200 OK`

```json
{
  "summary": "A brief summary of the provided text.",
  "keyActionItems": ["First action item", "Second action item", "Third action item"]
}
```

**Error Responses**

| Status | Cause                                             |
| ------ | ------------------------------------------------- |
| `400`  | Missing or empty `text` field in the request body |
| `400`  | AI response did not match the expected schema     |
| `500`  | Unexpected error while processing the AI response |

---

## AI Prompts Used

The following prompts were used with AI assistants during the development of this project.

### 1. Project scaffold

> "Create a basic Node.js TypeScript Express scaffold project."

Used to bootstrap the initial project structure, including `tsconfig.json`, `package.json` with relevant dependencies, and a minimal Express entry point.

### 2. OpenAI system prompt (used at runtime)

This is the prompt sent to the OpenAI model with every request:

```
You are a helpful assistant that summarizes text and extracts key action items.
Analyze the following text and provide a concise summary along with a list of 3 key action items.
Return the response in JSON format with this structure:

{
  "summary": "A brief summary of the text",
  "keyActionItems": [
    "First action item",
    "Second action item",
    "Third action item"
  ]
}

Return only the JSON response without any additional text or explanations.
Remove formatting and line breaks from your response.

Text to analyze:
<user input>
```

### 3. Output refinement

> "Refine the AI output to remove formatting and line breaks from the response."

Used to improve the cleanliness of the raw string returned by the model, making it easier to parse as JSON reliably.

### 4. README generation

> "Generate README content for this project."

Used to produce the initial draft of this README file.
