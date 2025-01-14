const express = require('express');
const MenuController = require('../Controllers/menu.controller');
const router = express.Router();
const { authJwt, authorize } = require('../Middleware/apiAuth.middleware');

router.post('/', authJwt, MenuController.createMenu).get('/', authJwt, MenuController.getUserMenu);

module.exports = router;
