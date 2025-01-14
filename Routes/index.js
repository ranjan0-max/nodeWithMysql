const authRoute = require('./auth.routes');
const UserRoute = require('./user.routes');
const RoleRoute = require('./role.routes');
const MenuRoute = require('./menu.routes');
const StudentRoute = require('./student.routes');
const app = require('../app');

//! always remove  before pushing to server
function appRouter() {
  app.use('/v1/auth', authRoute);
  app.use('/v1/users', UserRoute);
  app.use('/v1/role', RoleRoute);
  app.use('/v1/menu', MenuRoute);
  app.use('/v1/student', StudentRoute);

  //\\ ==============================|| END: UI MASTERS ROUTES ||============================== //\\
}

module.exports = appRouter;
