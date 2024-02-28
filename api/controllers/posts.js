const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  //Get all posts and populate the createdBy field with user data
  const posts = await Post.find().populate("createdBy");

  const updatedPosts = [];

  /* creating an updatedPosts object with the relevant data for both the post and the user - 
  excluding any sensitive data, i.e password for instance. */
  posts.forEach((post) => {
    let newPost = {
      _id: post._id,
      message: post.message,
      createdAt: post.createdAt,
      createdBy: { _id: post.createdBy._id, username: post.createdBy.username }
    };

    updatedPosts.push( newPost );
  });

  const token = generateToken(req.user_id);
  res.status(200).json({ posts: updatedPosts, token: token });
};

const createPost = async (req, res) => {

  const postContent = {
    message: req.body.message,
    createdAt: Date.now(),
    createdBy: req.user_id,
  };

  const post = new Post(postContent);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
