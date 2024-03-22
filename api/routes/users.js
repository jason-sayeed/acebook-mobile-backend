const express = require("express");
const { multerUploads } = require("../middleware/multer");


const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker")

const router = express.Router();

router.post("/", multerUploads, UsersController.create);
router.put(
  "/",
  tokenChecker,
  multerUploads,
  UsersController.updateProfilePicture
);


module.exports = router;
