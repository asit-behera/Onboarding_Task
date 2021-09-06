const multer = require("multer");
const path = require("path");

const storageEngine = multer.diskStorage({
  destination: "./Uploads/",
  filename: (req, file, callback) => {
    // console.log("-----MULTER-------");
    callback(null, req.user.userId + path.extname(file.originalname));
  },
});

module.exports.storageEngine = storageEngine;
