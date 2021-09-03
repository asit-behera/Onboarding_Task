const bcrypt = require("bcrypt");

const getHashed = async (password) => {
  // process.env.SALT_OR_ROUNDS returns a STRING
  // convering salt into number
  const salt = process.env.SALT_OR_ROUNDS - 0;
  return await bcrypt.hash(password, salt);
};

const checkHash = async (string, hashedString) => {
  return await bcrypt.compare(string, hashedString);
};

module.exports = {
  getHashed,
  checkHash,
};
