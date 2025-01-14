const express = require('express');
const StudentController = require('../Controllers/student.controller');
const router = express.Router();
const { authJwt, authorize } = require('../Middleware/apiAuth.middleware');

router
  .post('/', authJwt, StudentController.createStudent)
  .get('/', authJwt, StudentController.getStudents)
  .put('/:id', authJwt, StudentController.updateStudent);

module.exports = router;
