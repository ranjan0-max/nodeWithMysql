const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');
const Role = require('./role.model');

const Student = sequelize.define(
  'Student',
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
    gender: {
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
    fatherNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    motherName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    motherNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    classRollNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tenthRollNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twelfthRollNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    currentClass: {
      type: DataTypes.STRING,
      allowNull: false
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
    timestamps: true
  }
);

// Define associations
Student.belongsTo(Role, { foreignKey: 'roleId', as: 'studentRole' });

module.exports = Student;
