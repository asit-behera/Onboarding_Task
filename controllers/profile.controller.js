const profileService = require("../services").profileService;
const fs = require("fs");
const fsPromises = fs.promises;

const createProfile = async (req, res) => {
  const userData = {
    userId: req.user.userId,
    name: req.body.name,
    bio: req.body.bio,
  };
  try {
    const { avtar, avtarLink, name, bio } = await profileService.createProfile(
      userData
    );
    res.status(200).json({
      avtar,
      avtarLink,
      name,
      bio,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ status: "Profile Already Exists." });
  }
};

const updateProfile = async (req, res) => {
  //console.log(req.body);
  const userData = {
    userId: req.user.userId,
    updateQueries: req.body,
  };
  try {
    const affectedRows = await profileService.updateProfile(userData);
    const status =
      affectedRows > 0 ? "Profile Updated successfully." : "Nothing to Updated";
    res.status(200).json({ status });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ status: "Unable to Update Profile." });
  }
};

const deleteProfile = async (req, res) => {
  const userData = {
    userId: req.user.userId,
  };
  try {
    const data = await profileService.deleteProfile(userData.userId);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ status: "Unable to Delete Account" });
  }
};

const updateProfilePicture = async (req, res) => {
  //console.log(req.body.userId);
  //console.log(req.body.userId, req.file.filename);
  const fileName = req.file.filename;
  const userId = req.user.userId;
  //console.log("-------");
  const temp = await profileService.getProfileDetailsById(req.user.userId);
  //console.log(temp.avtar);
  if (fileName == temp.avtar) {
    //console.log(true);
    res.status(200).json({ status: "Profile picture updated successfully." });
  } else {
    //console.log(false);
    try {
      if (temp.avtar != "dummyImage.png") {
        await fsPromises.unlink("Uploads/" + temp.avtar);
      }
      const updateQueries = {
        avtar: fileName,
        avtarLink:
          process.env.BASE_URL + process.env.UPLOAD_FOLDER_URL + fileName,
      };
      const userData = {
        userId,
        updateQueries,
      };
      try {
        const affectedRows = await profileService.updateProfile(userData);
        const status =
          affectedRows > 0
            ? "Profile picture updated successfully."
            : "Nothing to Updated";
        res.status(200).json({ status });
      } catch (error) {
        console.log("error1");
        console.log(error);
        res.status(400).json({ status: "Unable to update profile." });
      }
    } catch (error) {
      console.log("error2");
      console.log(error);
      res.status(400).json({ status: "Unable to update profile." });
    }
  }
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  updateProfilePicture,
};
