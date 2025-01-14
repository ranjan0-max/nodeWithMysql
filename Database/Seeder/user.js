require('dotenv').config();
const { sequelize } = require('../connection');
const AuthHelper = require('../../Helpers/auth.helper');

const User = require('../Models/user.model');

const init = async () => {
  try {
    console.log('Running seeder!');

    // Create the user data
    const data = [
      {
        name: 'test',
        userId: 'principal@gmail.com',
        password: await AuthHelper.generateHash('secret'), // Hash the password here
        role: 1,
        phoneNumber: 9876543210,
        active: true
      }
    ];

    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Truncate the User table
    await User.destroy({ truncate: true });

    // Enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Adding seeder record/s!');
    await User.bulkCreate(data);

    console.log('DB seed complete');
    process.exit();
  } catch (error) {
    console.log('Error seeding DB :: ', error?.message);
    process.exit(1);
  }
};

init();
