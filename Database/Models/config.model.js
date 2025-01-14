const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const UserConfig = sequelize.define(
  'UserConfig',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    update: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    view: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = UserConfig;
