const UserConfig = require('../Models/config.model');
const { sequelize } = require('../connection');

// seeder data here

const data = [
  {
    id: 1,
    userId: 1,
    menuId: 1,
    create: false,
    update: false,
    view: false
  },
  {
    id: 2,
    userId: 1,
    menuId: 2,
    create: false,
    update: false,
    view: false
  },
  {
    id: 3,
    userId: 1,
    menuId: 3,
    create: false,
    update: false,
    view: false
  },
  {
    id: 4,
    userId: 1,
    menuId: 4,
    create: false,
    update: false,
    view: false
  },
  {
    id: 5,
    userId: 1,
    menuId: 5,
    create: false,
    update: false,
    view: false
  },
  {
    id: 6,
    userId: 1,
    menuId: 6,
    create: false,
    update: false,
    view: false
  },
  {
    id: 7,
    userId: 1,
    menuId: 7,
    create: false,
    update: false,
    view: false
  },
  {
    id: 8,
    userId: 1,
    menuId: 8,
    create: false,
    update: false,
    view: false
  },
  {
    id: 9,
    userId: 1,
    menuId: 9,
    create: false,
    update: false,
    view: false
  },
  {
    id: 10,
    userId: 1,
    menuId: 10,
    create: false,
    update: false,
    view: false
  },
  {
    id: 11,
    userId: 1,
    menuId: 11,
    create: false,
    update: false,
    view: false
  },
  {
    id: 12,
    userId: 1,
    menuId: 12,
    create: false,
    update: false,
    view: false
  },
  {
    id: 13,
    userId: 1,
    menuId: 13,
    create: false,
    update: false,
    view: false
  },
  {
    id: 13,
    userId: 1,
    menuId: 14,
    create: false,
    update: false,
    view: false
  },
  {
    id: 13,
    userId: 1,
    menuId: 15,
    create: false,
    update: false,
    view: false
  },
  {
    id: 13,
    userId: 1,
    menuId: 16,
    create: false,
    update: false,
    view: false
  }
];

const init = async (data) => {
  try {
    console.log('Running seeder!');

    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Check existing data
    const existingData = await UserConfig.findAll();
    console.log('Existing Data:', existingData);

    // Clear the table
    await UserConfig.destroy({ where: {}, truncate: true, cascade: true });

    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Adding seeder record/s!');

    // Insert data
    await UserConfig.bulkCreate(data, { validate: true });

    console.log('DB seed complete');
    process.exit();
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1); // Exit with non-zero code to indicate failure
  }
};

init(data);
