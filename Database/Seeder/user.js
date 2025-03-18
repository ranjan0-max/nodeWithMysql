require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const AuthHelper = require('../../Helpers/auth.helper');

const prisma = new PrismaClient();

const init = async () => {
  try {
    console.log('Running Prisma Seeder!');

    const hashedPassword = await AuthHelper.generateHash('secret');

    const data = {
      name: 'test',
      email: 'principal@gmail.com',
      password: hashedPassword,
      roleId: 1,
      phoneNumber: 9876543210,
      active: true,
    };

    await prisma.user.deleteMany();
    console.log('User table cleared.');

    // Insert new user
    await prisma.user.create({ data });
    console.log('Seeder record added!');

    console.log('DB seed complete');
  } catch (error) {
    console.error('Error seeding DB ::', error.message);
  } finally {
    await prisma.$disconnect();
    process.exit();
  }
};

init();