const Role = require('../Models/role.model');
const { sequelize } = require('../connection');

// seeder data here

const data = [
  {
    role: 'PRINCIPAL',
    roleActive: true,
    priority: 1
  },
  {
    role: 'TEACHER',
    roleActive: true,
    priority: 2
  },
  {
    role: 'LAB_ASSISTANT',
    roleActive: true,
    priority: 3
  },

  {
    role: 'STAFF',
    roleActive: true,
    priority: 4
  },
  {
    role: 'BACK_OFFICE',
    roleActive: true,
    priority: 5
  },
  {
    role: 'STUDENT',
    roleActive: true,
    priority: 6
  }
];

const init = async (data) => {
  try {
    console.log('Running seeder!');

    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Truncate the Role table
    await Role.destroy({ truncate: true });

    // Enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Adding seeder record/s!');
    await Role.bulkCreate(data);

    console.log('DB seed complete');
    process.exit();
  } catch (error) {
    console.log('Error seeding DB:', error.message);
    process.exit(1); // Exit with non-zero code to indicate failure
  }
};

init(data);
