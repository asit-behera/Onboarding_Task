const multer = require("multer");
const path = require("path");

const storageEngine = multer.diskStorage({
  destination: "./Uploads/",
  filename: (req, file, callback) => {
    callback(null, req.body.userId + path.extname(file.originalname));
  },
});

module.exports.storageEngine = storageEngine;
