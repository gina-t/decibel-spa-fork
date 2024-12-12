import { sequelize } from '../models/index';
import { seedUsers } from './user-seeds';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await seedUsers();
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
};

seedDatabase();