'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fatherName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fatherNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      motherName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      motherNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      classRollNo: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      tenthRollNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      twelfthRollNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currentClass: {
        type: Sequelize.STRING,
        allowNull: false
      },
      todayPresence: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Add composite unique constraint
    await queryInterface.addConstraint('Students', {
      fields: ['currentClass', 'classRollNo'],
      type: 'unique',
      name: 'unique_currentClass_classRollNo' // Custom name for the constraint
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the unique constraint
    await queryInterface.removeConstraint('Students', 'unique_currentClass_classRollNo');

    // Drop the table
    await queryInterface.dropTable('Students');
  }
};
