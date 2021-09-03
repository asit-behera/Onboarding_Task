module.exports.sequelizeInstance =
  require("./database.config").sequelizeInstance;

module.exports.storageEngine = require("./multer.config").storageEngine;
