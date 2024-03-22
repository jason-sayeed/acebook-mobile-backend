const { dataUri } = require("../middleware/multer");
const { uploader } = require("../config/cloudinaryConfig");

// const { resolve } = require("path");

const User = require("../models/user");
const { generateToken } = require("../lib/token");

const create = async (req, res) => {
  try {
    const userDetails = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      imgString: ""
    };

    if (req.file) {
      const file = dataUri(req).content;
      const result = await uploader.upload(file);

      userDetails.imgString = result.url;

    } else {
      userDetails.imgString = "assets/blank-profile-picture-973460_640.png";
    }

    const user = new User(userDetails);
    console.log(user);

    await user.save();

    console.log("User created, id:", user._id.toString());
    res.status(201).json({ message: "OK" });
    
  } catch (err) {

    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const imgString = `/assets/uploads/${req.file.filename}`;

    const user = await User.find({ _id: req.user_id });
    user[0].imgString = imgString;

    await User.findOneAndUpdate({ _id: req.user_id }, user[0]);

    const token = generateToken(req.user_id);
    res.status(201).json({
      message: `User ${req.user_id} profile picture has been uplodad`,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const UsersController = {
  create: create,
  updateProfilePicture: updateProfilePicture,
};

module.exports = UsersController;
