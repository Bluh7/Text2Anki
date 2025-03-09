import fs from "fs";
import path from "path";

class CsvService {
  generateAnkiCsv(cards) {
    const regex = /front - (.*?)\s*\nback - (.*?)\s*(?=(\nfront -|$))/gs;
    const csvContent = [];
    let match;

    while ((match = regex.exec(cards)) !== null) {
      const front = match[1].trim();
      const back = match[2].trim();

      // Escape any commas in the text by wrapping the content in double quotes
      const escapedFront = `"${front.replace(/"/g, '""')}"`;
      const escapedBack = `"${back.replace(/"/g, '""')}"`;

      csvContent.push([escapedFront, escapedBack]);
    }

    const ankiCsv = csvContent.map(row => row.join(",")).join("\n");
    const ankiCsvFileName = this.#downloadAnkiCsv(ankiCsv);

    const ankiCsvData = {
      fileName: ankiCsvFileName,
      csvContent: ankiCsv,
    };

    return ankiCsvData;
  }

  #downloadAnkiCsv(ankiCsv) {
    const fileName = Math.random().toString(36).substring(2, 15);
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.join(
      __dirname,
      "..",
      "data",
      "cards-csv",
      `${fileName}.csv`
    );

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, ankiCsv);

    return fileName;
  }
}

export default CsvService;
