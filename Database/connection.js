const { Sequelize } = require("sequelize");
require("dotenv").config();

const {
  NODE_ENV,
  DATABASE_HOST_DEV,
  DATABASE_USERNAME_DEV,
  DATABASE_PASSWORD_DEV,
  DATABASE_NAME_DEV,
  DATABASE_HOST_PROD,
  DATABASE_USERNAME_PROD,
  DATABASE_PASSWORD_PROD,
  DATABASE_NAME_PROD,
} = process.env;

const sequelize = new Sequelize({
  dialect: "mysql", // Specify the dialect as MySQL
  logging: false,
  host: NODE_ENV === "production" ? DATABASE_HOST_PROD : DATABASE_HOST_DEV,
  username:
    NODE_ENV === "production" ? DATABASE_USERNAME_PROD : DATABASE_USERNAME_DEV,
  password:
    NODE_ENV === "production" ? DATABASE_PASSWORD_PROD : DATABASE_PASSWORD_DEV,
  database: NODE_ENV === "production" ? DATABASE_NAME_PROD : DATABASE_NAME_DEV,
  define: {
    timestamps: true,
  },
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, testDatabaseConnection };
