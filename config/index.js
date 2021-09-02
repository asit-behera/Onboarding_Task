module.exports.sequelizeInstance =
  require("./database.config").sequelizeInstance;

module.exports.uploadMiddleware = require("./multer.config").uploadMiddleware;
