import AiService from "../services/AiService.js";
import CsvService from "../services/CsvService.js";
import config from "../config/config.js";

class CardGenerationController {
  constructor(aiService, csvService) {
    this.aiService = aiService;
    this.csvService = csvService;
    this.baseUrl = config.baseUrl;
  }

  async generateAnkiCards(req, res) {
    const { text } = req.body;

    try {
      const cards = await this.aiService.generateCards(text);
      const ankiCsvData = this.csvService.generateAnkiCsv(await cards);
      const { fileName: ankiCsvFileName, csvContent } = ankiCsvData;

      res.json({
        downloadLink: `${this.baseUrl}/download/card/${ankiCsvFileName}`,
        csvContent,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Sorry, something went wrong. Please try again later.",
      });
    }
  }
}

const aiService = new AiService();
const csvService = new CsvService();
const cardGenerationController = new CardGenerationController(
  aiService,
  csvService
);

export default cardGenerationController;
