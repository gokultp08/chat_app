const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  login,
  getTopContributers,
} = require("../services/userService");
const verifyJwt = require("../helpers/middlewares/verifyJwt");
const validateRequest = require("../helpers/middlewares/validateRequest");
const { loginSchema, userSchema } = require("../helpers/joiSchema");

router.post("/login", validateRequest(loginSchema), login);
router.post("", validateRequest(userSchema), addUser);
router.get("/all", verifyJwt, getAllUsers);
router.get("/topContributers", getTopContributers);
router.get("/:id", verifyJwt, getUser);
router.delete("/:id", verifyJwt, deleteUser);

module.exports = router;
