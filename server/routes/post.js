const express = require("express");
const router = express.Router();
const {
  addPost,
  getAllPosts,
  getPost,
  deletePost,
  getPostsForUser,
} = require("../services/postService");
const verifyJwt = require("../helpers/middlewares/verifyJwt");
const validateRequest = require("../helpers/middlewares/validateRequest");
const { postSchema } = require("../helpers/joiSchema");

router.post("", validateRequest(postSchema), addPost);
router.get("/all", getAllPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.get("/all/user/:userId", getPostsForUser);

module.exports = router;
