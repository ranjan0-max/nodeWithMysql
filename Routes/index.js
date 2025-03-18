const authRoute = require('./auth.routes');
const UserRoute = require('./user.routes');
const app = require('../app');

//! always remove  before pushing to server
function appRouter() {
  app.use('/v1/auth', authRoute);
  app.use('/v1/user', UserRoute);

  //\\ ==============================|| END: UI MASTERS ROUTES ||============================== //\\
}

module.exports = appRouter;
