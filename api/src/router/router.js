import { Router } from "express";
const router = Router();

import validateData from "../middlewares/validationMiddleware.js";
import textSchema from "../schemas/textSchema.js";
import fileNameSchema from "../schemas/fileNameSchema.js";

import CardGenerationController from "../controllers/CardGenerationController.js";
import cardDownloadController from "../controllers/CardDownloadController.js";

router.post(
  "/api/card",
  validateData(textSchema),
  CardGenerationController.generateAnkiCards.bind(CardGenerationController)
);

router.get(
  "/download/card/:fileName",
  validateData(fileNameSchema),
  cardDownloadController.downloadAnkiCsv.bind(cardDownloadController)
);

export default router;
