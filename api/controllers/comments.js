const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

const getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.postId;

        const comments = await Comment.find({ underPost: postId }).populate(
          "createdBy"
        );

        const responseComments = [];

        comments.forEach((comment) => {
          let updatedComment = {
            _id: comment._id,
            message: comment.message,
            createdAt: comment.createdAt,
            createdBy: {
              _id: comment.createdBy._id,
              username: comment.createdBy.username,
            },
          };

          responseComments.push(updatedComment);
        });

        console.log(responseComments);

        const token = generateToken(req.user_id);
        res
          .status(200)
          .json({
            message: `comments for post ${postId}`,
            comments: responseComments,
            token: token,
          });

    } catch (error) {
      // console.log(error);
      res.status(400).json({ message: "Something went wrong - try again" });
    }
};

const createNewComment = async (req, res) => {
    try {
        const commentData = {
          message: req.body.message,
          createdBy: req.user_id,
          underPost: req.params.postId,
          createdAt: Date.now(),
        };

        const comment = new Comment(commentData);

        comment.save();

        const newToken = generateToken(req.user_id);
        res.status(201).json({ message: "Comment created", token: newToken });

    } catch (error) { 
        console.log(error);
        res.status(400).json({ message: "Something went wrong - try again" });
    }
};

const CommentsController = {
  getCommentsByPost: getCommentsByPost,
  createNewComment: createNewComment,
};

module.exports = CommentsController;
