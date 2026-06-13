const fs = require("fs");

const extractTxtText = async (
  filePath
) => {

  return fs.readFileSync(
    filePath,
    "utf8"
  );

};

module.exports = {
  extractTxtText
};