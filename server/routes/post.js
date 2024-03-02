const express = require("express");
const router = express.Router();
const {
  addPost,
  getAllPosts,
  getPost,
  deletePost,
  getPostsForUser,
  editPost,
} = require("../services/postService");
const verifyJwt = require("../helpers/middlewares/verifyJwt");
const validateRequest = require("../helpers/middlewares/validateRequest");
const { postSchema } = require("../helpers/joiSchema");

router.post("", validateRequest(postSchema), verifyJwt, addPost);
router.get("/all", verifyJwt, getAllPosts);
router.get("/:id", verifyJwt, getPost);
router.delete("/:id", verifyJwt, deletePost);
router.patch("/:id", verifyJwt, editPost);
router.get("/all/user/:userId", verifyJwt, getPostsForUser);

module.exports = router;
