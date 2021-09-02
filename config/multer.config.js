const multer = require("multer");
const path = require("path");

const storageEngine = multer.diskStorage({
  destination: "./Uploads/",
  filename: (req, file, callback) => {
    callback(null, req.body.userId + path.extname(file.originalname));
  },
});

const uploadMiddleware = multer({
  storage: storageEngine,
  //limits:{fileSize: }
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  },
}).single("image");

const checkFileType = (file, callback) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return callback(null, file);
  } else {
    callback();
  }
};

module.exports.uploadMiddleware = uploadMiddleware;
