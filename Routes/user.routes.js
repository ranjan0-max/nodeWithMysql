const express = require("express");
const UserController = require("../Controllers/user.controller");
const router = express.Router();
const { authJwt, authorize } = require("../Middleware/apiAuth.middleware");

router.post("/", UserController.createUser).get("/", UserController.getUsers);

module.exports = router;
