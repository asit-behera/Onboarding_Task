const login = (req, res) => {
  res.status(200).json({ route: "login" });
};
const register = (req, res) => {
  res.status(200).json({ route: "register" });
};
module.exports = { login, register };
