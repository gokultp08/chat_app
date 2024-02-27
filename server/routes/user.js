const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  login,
} = require("../services/userService");
const authenticate = require("../helpers/middlewares/authenticate");

router.get("", authenticate, getUser);
router.post("", createUser);
router.delete("/:id", authenticate, deleteUser);
router.get("/all", authenticate, getAllUsers);
router.post("/login", login);

module.exports = router;
