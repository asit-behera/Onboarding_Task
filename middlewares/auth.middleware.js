const tokenUtil = require("../utils").tokenUtil;

const authorizeUser = async (req, res, next) => {
  if (!req.body || !req.body.token) res.sendStatus(401);
  try {
    const { userId, email } = await tokenUtil.validateToken(req.body.token);
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
