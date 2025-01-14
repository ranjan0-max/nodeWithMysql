const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection'); // Assuming you have a sequelize connection setup
const Role = require('./role.model');

const Teacher = sequelize.define(
  'Teacher',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    motherName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateOfJoining: {
      type: DataTypes.STRING,
      allowNull: true
    },
    todayPresence: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id'
      }
    }
  },
  {
    timestamps: true // Automatically manages createdAt and updatedAt fields
  }
);

// Define associations
Teacher.belongsTo(Role, { foreignKey: 'roleId', as: 'teacherRole' });

module.exports = Teacher;
