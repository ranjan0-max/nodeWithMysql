const Menu = require('../Models/menu.model');
const { sequelize } = require('../connection');

// seeder data here

const data = [
  {
    id: 1,
    label: 'USER',
    icon: null,
    url: '/user',
    access: 0
  },
  {
    id: 2,
    label: 'CLASS I',
    icon: null,
    url: '/class/1',
    access: 0
  },
  {
    id: 3,
    label: 'CLASS II',
    icon: null,
    url: '/class/2',
    access: 0
  },
  {
    id: 4,
    label: 'CLASS III',
    icon: null,
    url: '/class/3',
    access: 0
  },
  {
    id: 5,
    label: 'CLASS IV',
    icon: null,
    url: '/class/4',
    access: 0
  },
  {
    id: 6,
    label: 'CLASS V',
    icon: null,
    url: '/class/5',
    access: 0
  },
  {
    id: 7,
    label: 'CLASS VI',
    icon: null,
    url: '/class/6',
    access: 0
  },
  {
    id: 8,
    label: 'CLASS VII',
    icon: null,
    url: '/class/7',
    access: 0
  },
  {
    id: 9,
    label: 'CLASS VIII',
    icon: null,
    url: '/class/8',
    access: 0
  },
  {
    id: 10,
    label: 'CLASS IX',
    icon: null,
    url: '/class/9',
    access: 0
  },
  {
    id: 11,
    label: 'CLASS X',
    icon: null,
    url: '/class/10',
    access: 0
  },
  {
    id: 12,
    label: 'CLASS XI',
    icon: null,
    url: '/class/11',
    access: 0
  },
  {
    id: 13,
    label: 'CLASS XII',
    icon: null,
    url: '/class/12',
    access: 0
  },
  {
    id: 14,
    label: 'TEACHER',
    icon: null,
    url: '/teacher',
    access: 0
  },
  {
    id: 15,
    label: 'STUDENT',
    icon: null,
    url: '/student',
    access: 0
  },
  {
    id: 16,
    label: 'STAFF',
    icon: null,
    url: '/staff',
    access: 0
  }
];

const init = async (data) => {
  try {
    console.log('Running seeder!');

    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Check existing data
    const existingData = await Menu.findAll();
    console.log('Existing Data:', existingData);

    // Clear the table
    await Menu.destroy({ where: {}, truncate: true, cascade: true });

    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Adding seeder record/s!');

    // Insert data
    await Menu.bulkCreate(data, { validate: true });

    console.log('DB seed complete');
    process.exit();
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1); // Exit with non-zero code to indicate failure
  }
};

init(data);
