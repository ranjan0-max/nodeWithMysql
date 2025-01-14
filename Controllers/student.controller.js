const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const AuthHelper = require('../Helpers/auth.helper');
const controllerName = 'user.controller';

// models
const User = require('../Database/Models/user.model');
const Role = require('../Database/Models/role.model');
const Student = require('../Database/Models/student.model');

// create student
const createStudent = async (req, res) => {
  try {
    const role = await DB.read(Role, { role: 'STUDENT' });
    const passwordHash = await AuthHelper.generateHash('secret');

    const name = req.body.name.replace(/\s+/g, '');
    const fatherNumber = req.body.fatherNumber.replace(/\s+/g, '');

    const data = {
      ...req.body,
      userId: name + fatherNumber,
      phoneNumber: req.body.fatherNumber,
      role: role.id,
      password: passwordHash,
      active: true
    };
    await DB.create(User, data);

    const user = await DB.read(User, { userId: name + fatherNumber });

    const studentData = {
      userId: user.id,
      ...req.body,
      roleId: role.id
    };
    await DB.create(Student, studentData);

    return Response.success(res, {
      data: {},
      message: 'Student created successfully'
    });
  } catch (error) {
    console.log(error);
    Logger.error(`${controllerName}:createStudent`, error);
    return Response.error(res, {
      data: {},
      message: error.message
    });
  }
};

// get students list

const getStudents = async (req, res) => {
  try {
    delete req.query.auth_user_id;
    delete req.query.user_role;

    const query = {
      ...req.query
    };

    const studentList = await DB.findDetails(Student, query);

    return Response.success(res, {
      data: studentList,
      message: 'Student Found'
    });
  } catch (error) {
    Logger.error(error.message + ' at getStudents function ' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

// update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const query = {
      id: id
    };

    const data = {
      ...req.body,
      updatedAt: IST()
    };

    await DB.update(Student, { query: query, data: data });

    return Response.success(res, {
      data: data,
      message: 'Student Updated SuccessFully'
    });
  } catch (error) {
    Logger.error(error.message + 'at updateStudent function' + controllerName);
    return Response.error(res, {
      data: [],
      message: error.message
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  updateStudent
};
