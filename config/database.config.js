const { Sequelize, DataTypes, Model } = require("sequelize");

const instance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    logging: false,
    // operatorsAliases: false, --> DEPRICATED
    host: process.env.DB_HOST,
    dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  }
);
const db = {};

//db.Sequelize = Sequelize;
db.instance = instance;

const models = require("../models");

db.User = models.User(instance, Sequelize, DataTypes);
db.Profile = models.Profile(instance, Sequelize, DataTypes);
db.ChatGroup = models.ChatGroup(instance, Sequelize, DataTypes);
db.UserChatGroup = models.UserChatGroup(instance, Sequelize, DataTypes);
db.Message = models.Message(instance, Sequelize, DataTypes);

// * Associations
// ! USER -> PROFILE relationship
db.User.hasOne(db.Profile, {
  onDelete: "cascade",
  foreignKey: "userId",
});
db.Profile.belongsTo(db.User, {
  foreignKey: "userId",
});
// ! USER -> ChatGroup relationship
db.User.belongsToMany(db.ChatGroup, {
  through: db.UserChatGroup,
  foreignKey: "userId",
});
db.ChatGroup.belongsToMany(db.User, {
  through: db.UserChatGroup,
  foreignKey: "chatGroupId",
});
// ! ChatGroup -> Message relationship
db.ChatGroup.hasMany(db.Message, {
  foreignKey: "chatGroupId",
});

module.exports.db = db;
//module.exports.sequelizeInstance = sequelizeInstance;

/* 
console.log(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME
);
*/
