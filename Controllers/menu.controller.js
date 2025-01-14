const Response = require('../Helpers/response.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const AuthHelper = require('../Helpers/auth.helper');
const controllerName = 'menu.controller';

const Menu = require('../Database/Models/menu.model');
const UserConfig = require('../Database/Models/config.model');

// create menu
const createMenu = async (req, res) => {
  try {
    const data = {
      ...req.body
    };
    await DB.create(Menu, data);

    return Response.success(res, {
      data: data,
      message: 'Menu Created SuccessFully'
    });
  } catch (error) {
    Logger.error(error.message + ' at createMenu function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

// get menu by different query parameters
const getUserMenu = async (req, res) => {
  try {
    delete req.query.user_role;

    const menus = await DB.findDetails(Menu, {});

    const query = {
      userId: req.query.auth_user_id
    };

    const selectedField = ['menuId'];
    const userConfig = await DB.findDetailsWithSelectedField(UserConfig, { conditions: query, projection: selectedField });

    const responseData = [];
    const menuIds = [];

    userConfig.forEach((row) => {
      menuIds.push(row.menuId);
    });

    menus.forEach((menu) => {
      if (menuIds.includes(menu.id)) {
        responseData.push(menu);
      }
    });

    return Response.success(res, {
      data: responseData,
      message: 'Menu Found'
    });
  } catch (error) {
    Logger.error(error.message + ' at getUserMenu function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

module.exports = {
  createMenu,
  getUserMenu
};
