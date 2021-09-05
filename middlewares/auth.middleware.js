const tokenUtil = require("../utils").tokenUtil;

const authorizeUser = async (req, res, next) => {
  //if (!req.body || !req.body.token) res.sendStatus(401);
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { userId, email } = await tokenUtil.validateToken(token);
    req.user = { userId, email };
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

module.exports = {
  authorizeUser,
};
