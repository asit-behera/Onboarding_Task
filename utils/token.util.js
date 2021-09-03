var jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET);
};

const validateToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) reject({ error: true, errorMessage: err.message });
      resolve(user);
    });
  });
};

module.exports = {
  generateToken,
  validateToken,
};
