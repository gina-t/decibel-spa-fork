import { User } from '../models/User.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { id: '1', username: 'JollyGuru', email: 'jollyguru@example.com', password: 'password' },
    { id: '2', username: 'SunnyScribe', email: 'sunnyscribe@example.com', password: 'password' },
    { id: '3', username: 'RadiantComet', email: 'radiantcomet@example.com', password: 'password' },
  ], { individualHooks: true });
};