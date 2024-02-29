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

router.post("", validateRequest(commentSchema), addComment);
router.get("/all", getAllComments);
router.get("/:id", getComment);
router.delete("/:id", deleteComment);

module.exports = router;
