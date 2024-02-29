const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { config } = require("../config");
const CustomError = require("../helpers/customError");

const getAllComments = async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany({});
    return res.status(200).json(comments);
  } catch (e) {
    return next(CustomError(e.message));
  }
};

const getComment = async (req, res, next) => {
  try {
    const comment = await prisma.comment.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(200).json(comment);
  } catch (e) {
    return next(CustomError(e.message));
  }
};

const addComment = async (req, res, next) => {
  const { content, authorId, postId } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: { content, authorId: Number(authorId), postId: Number(postId) },
    });

    return res.status(200).json({
      message: "Added Successfully",
      data: newComment,
    });
  } catch (e) {
    next(CustomError(e.message));
  }
};

const deleteComment = async (req, res, next) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  if (comment.authorId !== req.currentUserId) {
    return next(CustomError("Unauthorized to delete", 403));
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (e) {
    return next(CustomError(e.message));
  }
};

module.exports = {
  getAllComments,
  addComment,
  getComment,
  getComment,
  deleteComment,
};
