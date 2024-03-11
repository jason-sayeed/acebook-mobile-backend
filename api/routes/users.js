const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const UsersController = require("../controllers/users");
const upload = require("../middleware/multerSetup");
const tokenChecker = require("../middleware/tokenChecker")

const router = express.Router();

router.post("/", upload.single('profilePicture'), UsersController.create);
router.put("/", tokenChecker, upload.single('profilePicture'), UsersController.updateProfilePicture )


//get request to get a user info? 

module.exports = router;
