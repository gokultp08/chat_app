const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  login,
} = require("../services/userService");
const verifyJwt = require("../helpers/middlewares/verifyJwt");

router.post("/login", login);
router.post("", createUser);
router.get("/all", verifyJwt, getAllUsers);
router.get("/:id", verifyJwt, getUser);
router.delete("/:id", verifyJwt, deleteUser);

module.exports = router;
