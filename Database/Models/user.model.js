const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection"); // Assuming you have a sequelize connection setup
const Role = require("./role.model");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

User.belongsTo(Role, { foreignKey: "role" });

module.exports = User;
