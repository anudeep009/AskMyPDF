import pdfParse from "pdf-parse";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const extractText = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res
      .status(400)
      .send({ message: "Please upload a valid PDF document" });
  }

  try {
    const data = await pdfParse(file.buffer);
    const extractedText = data.text;
    const extractedMetaData = data.metadata;

    res.send({
      text: extractedText,
      metadata: extractedMetaData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while processing PDF on the server",
      error: error.message,
    });
  }
};


export { extractText, upload };
