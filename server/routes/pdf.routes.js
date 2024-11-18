import Router from "express";
import { extractText, upload } from "../controllers/pdf.controller.js";

const router = Router();

router.post("/pdf/extract-text", upload.single("pdf"), extractText);

export default router;
