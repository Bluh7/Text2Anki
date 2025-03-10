import axios from "axios";
import config from "../config/config.js";

class AiService {
  constructor() {
    this.apiUrl = config.openRouterAi.apiUrl;
    this.apiKey = config.openRouterAi.apiKey;
    this.model = config.openRouterAi.model;
    this.aiInstruction = config.openRouterAi.model.instructions;
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: this.headers,
    });
  }

  async generateCards(text) {
    try {
      const response = await this.axiosInstance.post("/v1/chat/completions", {
        model: this.model.id,
        messages: [this.aiInstruction, { role: "user", content: text }],
        temperature: this.model.temperature,
      });

      return response.data?.choices[0]?.message?.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default AiService;
