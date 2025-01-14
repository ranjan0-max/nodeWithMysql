const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const AuthHelper = require('../Helpers/auth.helper');
const controllerName = 'user.controller';

// models
const User = require('../Database/Models/user.model');
const UserConfig = require('../Database/Models/config.model');
const Role = require('../Database/Models/role.model');

const createUser = async (req, res) => {
  try {
    await DB.isUnique(User, { email: req.body.email });

    const passwordHash = await AuthHelper.generateHash(req.body.password);
    const data = {
      ...req.body,
      password: passwordHash
    };
    await DB.create(User, data);

    return Response.success(res, {
      data: data,
      message: 'User Created SuccessFully'
    });
  } catch (error) {
    Logger.error(error.message + ' at createUser function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

const getUsers = async (req, res) => {
  try {
    delete req.query.auth_user_id;
    delete req.query.user_role;

    const query = {
      ...req.query
    };

    const roleIncludeConfig = {
      model: Role,
      as: 'userRole',
      attributes: ['id', 'role']
    };

    const includes = [roleIncludeConfig];

    const userList = await DB.findDetails(User, query, includes);
    return Response.success(res, {
      data: userList,
      message: 'Users Found'
    });
  } catch (error) {
    Logger.error(error.message + ' at getUsers function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

// get user config by there Id
const getUserConfig = async (req, res) => {
  try {
    delete req.query.user_role;

    const query = {
      userId: req.query.auth_user_id
    };

    const selectedField = ['menuId'];
    const userConfig = await DB.findDetailsWithSelectedField(UserConfig, { conditions: query, projection: selectedField });

    return Response.success(res, {
      data: userConfig,
      message: 'User Config Found'
    });
  } catch (error) {
    Logger.error(error.message + 'at getUserConfig function' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

// update the user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const query = {
      id: id
    };

    const data = {
      ...req.body,
      updatedAt: IST()
    };

    if (data.password) {
      const passwordHash = await AuthHelper.generateHash(data.password);
      data.password = passwordHash;
    } else {
      delete data.password;
    }

    await DB.update(User, { query: query, data: data });

    return Response.success(res, {
      data: data,
      message: 'User Updated SuccessFully'
    });
  } catch (error) {
    Logger.error(error.message + 'at updateUser function' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserConfig,
  updateUser
};
