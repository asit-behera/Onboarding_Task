const profileService = require("../services").profileService;

const createProfile = async (req, res) => {
  //console.log(req.body);
  const userData = {
    userId: req.user.userId,
    name: req.body.name,
    bio: req.body.bio,
  };
  const data = await profileService.createProfile(userData);
  res.status(data.statusCode).json(data.body);
};

const updateProfile = async (req, res) => {
  //console.log(req.body);
  const userData = {
    userId: req.user.userId,
    updateQueries: req.body,
  };
  const data = await profileService.updateProfile(userData);
  res.status(data.statusCode).json(data.body);
};

const deleteProfile = async (req, res) => {
  const userData = {
    userId: req.user.userId,
  };
  const data = await profileService.deleteProfile(userData.userId);
  res.status(data.statusCode).json(data.body);
  //res.sendStatus(200);
};

const updateProfilePicture = async (req, res) => {
  //console.log(req.body.userId);
  //console.log(req.body.userId, req.file.filename);
  const data = await profileService.updateAvtar(
    req.user.userId,
    req.file.filename
  );
  res.status(data.statusCode).json(data.body);
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  updateProfilePicture,
};
