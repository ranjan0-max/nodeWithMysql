const Response = require("../Helpers/response.helper");
const { IST } = require("../Helpers/dateTime.helper");
const User = require("../Database/Models/user.model");
const DB = require("../Helpers/crud.helper");
const Logger = require("../Helpers/logger");
const AuthHelper = require("../Helpers/auth.helper");
const controllerName = "user.controller";

const createUser = async (req, res) => {
  try {
    await DB.isUnique(User, { email: req.body.email });

    const passwordHash = await AuthHelper.generateHash(req.body.password);
    const data = {
      ...req.body,
      password: passwordHash,
    };
    await DB.create(User, data);

    return Response.success(res, {
      data: data,
      message: "User Created SuccessFully",
    });
  } catch (error) {
    Logger.error(error.message + " at createUser function " + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const query = {
      ...req.query,
    };
    const userList = await DB.findDetails(User, query);
    return Response.success(res, {
      data: userList,
      message: "Users Found",
    });
  } catch (error) {
    Logger.error(error.message + " at getUsers function " + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
};
