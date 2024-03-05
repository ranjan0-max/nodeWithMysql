const Role = require("../Models/role.model");
const { sequelize } = require("../connection");

// seeder data here

const data = [
  {
    role: "SUPER_ADMIN",
    roleActive: true,
    priority: 1,
  },
  {
    role: "SITE_ADMIN",
    roleActive: true,
    priority: 2,
  },
  {
    role: "SALE_MANAGER",
    roleActive: true,
    priority: 3,
  },

  {
    role: "WAREHOUSE_MANAGER",
    roleActive: true,
    priority: 4,
  },
  {
    role: "ACCOUNT_MANAGER",
    roleActive: true,
    priority: 5,
  },
  {
    role: "OPERATION_MANAGER",
    roleActive: true,
    priority: 6,
  },
  {
    role: "SUPERVISOR",
    roleActive: true,
    priority: 7,
  },
  {
    role: "CUSTOMER",
    roleActive: true,
    priority: 8,
  },
  {
    id: 9,
    role: "LOADER",
    roleActive: true,
    priority: 9,
  },
  {
    role: "DRIVER",
    roleActive: true,
    priority: 10,
  },
  {
    role: "FIELD_EXECUTIVE",
    roleActive: true,
    priority: 11,
  },
  {
    id: 12,
    role: "SALEMAN",
    roleActive: true,
    priority: 12,
  },
  {
    role: "WAREHOUSE_EXECUTIVE",
    roleActive: true,
    priority: 13,
  },
];

const init = async (data) => {
  try {
    console.log("Running seeder!");

    // Disable foreign key checks
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    // Truncate the Role table
    await Role.destroy({ truncate: true });

    // Enable foreign key checks
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("Adding seeder record/s!");
    await Role.bulkCreate(data); // Insert seeding data

    console.log("DB seed complete");
    process.exit();
  } catch (error) {
    console.log("Error seeding DB:", error.message);
    process.exit(1); // Exit with non-zero code to indicate failure
  }
};

init(data);
