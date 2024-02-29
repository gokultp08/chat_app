const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { config } = require("../config");
const CustomError = require("../helpers/customError");
const { formatUserResponse } = require("../helpers/formatResponse");
const logger = require("../helpers/logger");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({});
    return res.status(200).json(users.map((user) => formatUserResponse(user)));
  } catch (e) {
    logger.error(e.message);
    return next(CustomError(e.message));
  }
};

const getTopContributers = async (req, res, next) => {
  try {
    const users = await prisma.$queryRaw`
      SELECT "User"."id", "User"."email", "User"."name", COUNT(DISTINCT "Post"."id") as "distinctPostCount"
      FROM "User"
      LEFT JOIN "Post" ON "User"."id" = "Post"."authorId"
      GROUP BY "User"."id", "User"."email", "User"."name"
      ORDER BY "distinctPostCount" DESC
    `;

    const serializedData = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      distinctPostCount: user.distinctPostCount.toString(),
    }));

    return res.status(200).json(serializedData);
  } catch (e) {
    logger.error(e.message);
    return next(CustomError(e.message));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json(formatUserResponse(user));
  } catch (e) {
    logger.error(e.message);
    return next(CustomError(e.message));
  }
};

const addUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    logger.error("User already exists");
    return next(CustomError("User already exists", 403));
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await prisma.user.create({
      data: { email, password: hashPassword, name },
    });
    const token = JWT.sign(
      {
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      },
      config.JWT_SECRET_KEY
    );
    return res.status(200).json({
      message: "Added Successfully",
      token,
    });
  } catch (e) {
    logger.error(e.message);
    next(CustomError(e.message));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    logger.error("User doesn't exist");
    return next(CustomError("User doesn't exist", 403));
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    logger.error("Incorrect credentials");
    return next(CustomError("Incorrect credentials", 403));
  }

  const token = JWT.sign(
    {
      user: {
        id: user.id,
        email: user.email,
      },
    },
    config.JWT_SECRET_KEY
  );

  return res.status(200).json({
    message: "Logged in",
    token,
    data: formatUserResponse(user),
  });
};

const deleteUser = async (req, res, next) => {
  const id = Number(req.params.id);
  if (id !== Number(req.currentUserId)) {
    logger.error("Unauthorized to delete");
    return next(CustomError("Unauthorized to delete", 403));
  }
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (e) {
    logger.error(e.message);
    return next(CustomError(e.message));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  login,
  getTopContributers,
};
