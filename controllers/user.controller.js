const deleteUser = (req, res) => {
  res.status(200).json({ route: "User Delete" });
};

const editUser = (req, res) => {
  res.status(200).json({ route: "User Edit" });
};

const addUser = (req, res) => {
  res.status(200).json({ route: "User Add" });
};

module.exports = {
  addUser,
  editUser,
  deleteUser,
};
