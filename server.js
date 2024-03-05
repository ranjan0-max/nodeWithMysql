const { createServer } = require("http");
const { Server } = require("socket.io");
const { testDatabaseConnection } = require("./Database/connection");

const app = require("./app");
const Logger = require("./Helpers/logger");
const { IST } = require("./Helpers/dateTime.helper");
const HandleError = require("./Middleware/errorHandler.middleware");

const server = createServer(app);

const { PORT, NODE_ENV } = process.env;

const httpServer = server.listen(PORT || 1310, async (error) => {
  // Logger.info(`Server started connection on port ${PORT || 9081}`);
  if (error) {
    Logger.error(error);
    process.exit(1);
  }
  try {
    testDatabaseConnection();
    console.log(
      `server started on port: [${
        PORT || 1310
      }] with [${NODE_ENV.toUpperCase()} --env] [${IST("date")} ${IST("time")}]`
    );
  } catch (connectionError) {
    console.log(
      "Unable to connect --DATABASE, Killing app :/(",
      connectionError
    );
    Logger.error(connectionError?.stack);
    process.exit(1);
  }
});

//? routes
require("./Routes")();

//? error handler middleware

app.use(HandleError);
