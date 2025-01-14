const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection'); // Assuming you have a sequelize connection setup
const Role = require('./role.model');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.INTEGER
    },
    refreshToken: {
      type: DataTypes.STRING
    },
    apiToken: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id'
      }
    }
  },
  {
    timestamps: true
  }
);

User.belongsTo(Role, { foreignKey: 'role', as: 'userRole' });

module.exports = User;
