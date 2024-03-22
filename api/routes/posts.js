const express = require("express");
const { multerUploads } = require("../middleware/multer");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", multerUploads, PostsController.createPost);
router.put("/", PostsController.updateLikes);

module.exports = router;
