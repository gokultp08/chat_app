const express = require("express");
const router = express.Router();
const {
  addComment,
  getAllComments,
  getComment,
  deleteComment,
} = require("../services/commentService");
const verifyJwt = require("../helpers/middlewares/verifyJwt");
const validateRequest = require("../helpers/middlewares/validateRequest");
const { commentSchema } = require("../helpers/joiSchema");

router.post("", verifyJwt, validateRequest(commentSchema), addComment);
router.get("/all", verifyJwt, getAllComments);
router.get("/:id", verifyJwt, getComment);
router.delete("/:id", verifyJwt, deleteComment);

module.exports = router;
