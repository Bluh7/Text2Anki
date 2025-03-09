const aiInstructions = {
  role: "system",
  content: `You will function as a dedicated text-to-Anki flashcard conversion tool. Your task is as follows: You will receive a block of text and extract the most important and relevant key points. Convert the extracted information into flashcards. The flashcards must strictly follow this exact output format (without any markdown formatting): front - question (breakline) back - answer. The prefixes "front -" and "back -" must always be included before the question and answer, respectively. Ignore any text that resembles conversational dialogue or does not contribute to creating an effective flashcard. Follow these instructions precisely to ensure a clear and predictable output every time.`,
};

export default {
  PORT: process.env.PORT || 8080,
  baseUrl: process.env.BASE_URL || `http://api:${process.env.PORT}`,
  openRouterAi: {
    apiUrl: process.env.OPEN_ROUTER_AI_API_URL,
    apiKey: process.env.OPEN_ROUTER_AI_API_KEY,
    model: {
      // R1 generates way more latency than the current default but may be more accurate though it's not guaranteed
      id: process.env.OPEN_ROUTER_AI_MODEL_ID || "deepseek/deepseek-chat:free", // "deepseek/deepseek-r1:free",
      temperature: parseInt(process.env.OPEN_ROUTER_AI_MODEL_TEMPERATURE) || 1,
      instructions: aiInstructions,
    },
  },
};
