const User = require("../models/user");
const { generateToken } = require("../lib/token");

const create = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    let imgString;

    if (req.file) {
      imgString = `"assets/uploads/${req.file.filename}`;
    } else {
      imgString = "assets/blank-profile-picture-973460_640.png"
    }

    console.log(imgString);
    console.log(req.body)

    const user = new User({ email, password, username, imgString });
    console.log(user)

    await user.save()
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
    res.status(201).json({ message: `User ${req.user_id} profile picture has been uplodad`, token: token });
    
  } catch(error) { 
    console.log(error)
    res.status(400).json({ message: "Something went wrong" });
  }
}

const UsersController = {
  create: create,
  updateProfilePicture: updateProfilePicture,
};



module.exports = UsersController;
