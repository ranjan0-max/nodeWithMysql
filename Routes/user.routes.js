const express = require("express");
const UserController = require("../Controllers/user.controller");
const router = express.Router();
const { authJwt, authorize } = require("../Middleware/apiAuth.middleware");

router
  .post("/", authJwt, UserController.createUser)
  .get("/", authJwt, UserController.getUsers)
  .put("/:id", authJwt, UserController.updateUser);

module.exports = router;
