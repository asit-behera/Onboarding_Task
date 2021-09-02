const profileService = require("../services").profileService;

const createProfile = async (req, res) => {
  console.log(req.body);
  const data = await profileService.createProfile(req.body);
  res.status(data.statusCode).json(data.body);
};

const updateProfile = async (req, res) => {
  //console.log(req.body);
  const data = await profileService.updateProfile(req.body);
  res.status(data.statusCode).json(data.body);
};

const deleteProfile = async (req, res) => {
  console.log(req.body);
  const data = await profileService.deleteProfile(req.body);
  res.status(data.statusCode).json(data.body);
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
};
