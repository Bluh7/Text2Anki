import fs from "fs";
import path from "path";

class CardDownloadController {
  downloadAnkiCsv(req, res) {
    const { fileName } = req.params;
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.join(
      __dirname,
      "..",
      "data",
      "cards-csv",
      `${fileName}.csv`
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    res.download(filePath, fileName, err => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      // Deletes the file after download
      fs.unlinkSync(filePath);
    });
  }
}

const cardDownloadController = new CardDownloadController();
export default cardDownloadController;
