const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roleActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.STRING, // Change the data type to VARCHAR
      allowNull: true, // Modify the nullability based on your requirements
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Role;
