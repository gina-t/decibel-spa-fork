import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
  try {
    const users = [
      { username: 'tao', email: 'taoamstaff@gmail.com', password: 'Hegemone39' },
      { username: 'jasmine', email: 'jasminebasenji@yahoo.com', password: 'Ananke12' },
      { username: 'sasha', email: 'sashamstaff@gmail.com', password: 'Arrakoth486958' },
    ];

    // Hash passwords before seeding
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await User.bulkCreate(users, { individualHooks: true });
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};