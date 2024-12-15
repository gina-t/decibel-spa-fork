import { sequelize } from "../models/index.js";
import { seedUsers } from "./user-seeds.js";
import { seedPlaylists } from "./playlist-seed.js";

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPlaylists();
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
