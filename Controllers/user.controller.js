const Response = require("../Helpers/response.helper");
const { IST } = require("../Helpers/dateTime.helper");
const Logger = require("../Helpers/logger");
const AuthHelper = require("../Helpers/auth.helper");
const DB = require("../Helpers/crud.helper");
const controllerName = "user.controller";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new user
const createUser = async (req, res) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return Response.error(res, { message: "Email already in use" });
    }

    const passwordHash = await AuthHelper.generateHash(req.body.password);
    const newUser = await prisma.user.create({
      data: { ...req.body, password: passwordHash },
    });

    return Response.success(res, {
      data: {},
      message: "User Created Successfully",
    });
  } catch (error) {
    Logger.error(error.message + " at createUser function " + controllerName);
    return Response.error(res, { message: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    delete req.query.auth_user_id;
    delete req.query.user_role;

    const numberFields = ["phoneNumber", "roleId", "id"];
    numberFields.forEach((field) => {
      if (req.query[field]) {
        req.query[field] = parseInt(req.query[field], 10);
      }
    });

    const userList = await prisma.user.findMany({
      include: { role: true },
      where: req.query,
    });
    return Response.success(res, {
      data: userList,
      message: "Users Found",
    });
  } catch (error) {
    Logger.error(error.message + " at getUsers function " + controllerName);
    return Response.error(res, { message: error.message });
  }
};

// Update user information
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let data = { ...req.body, updatedAt: IST() };

    if (data.password) {
      data.password = await AuthHelper.generateHash(data.password);
    }

    await prisma.user.update({
      where: { id: parseInt(id) },
      data: data,
    });

    return Response.success(res, {
      data: {},
      message: "User Updated Successfully",
    });
  } catch (error) {
    Logger.error(error.message + " at updateUser function " + controllerName);
    return Response.error(res, { message: error.message });
  }
};

module.exports = { createUser, getUsers, updateUser };
