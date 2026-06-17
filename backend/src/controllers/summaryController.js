const {
  getFilesForUser
} = require("../services/summaryDataService");
const {
  extractText
} = require("../services/textExtractionService");
const {
  generateSummary
} = require("../services/summaryService");

const getSummaries = async (
  req,
  res,
  next
) => {
  try {
    const files = await getFilesForUser(req.user.id);

    const summaries = await Promise.all(
      files.map(async (file) => {
        const text = await extractText(file.file_path);
        const summary = await generateSummary(text);
        return {
          id: file.id,
          fileName: file.file_name,
          summary
        };
      })
    );

    res.json({ success: true, summaries });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSummaries
};
