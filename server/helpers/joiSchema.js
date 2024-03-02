const joi = require("joi");

const loginSchema = joi.object({
  email: joi.string().required().min(3).max(40),
  password: joi.string().required().min(3).max(25),
});

const userSchema = joi.object({
  email: joi.string().required().min(3).max(40),
  password: joi.string().required().min(3).max(25),
  name: joi.string().required().min(2).max(40),
});

const postSchema = joi.object({
  authorId: joi.number().required(),
  content: joi.string().required().min(3),
});

const commentSchema = joi.object({
  authorId: joi.number().required(),
  postId: joi.number().required(),
  content: joi.string().required().min(3).max(250),
});

module.exports = { userSchema, loginSchema, postSchema, commentSchema };
