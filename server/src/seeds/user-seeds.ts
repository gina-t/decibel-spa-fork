import { User } from "../models/User.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      {
        username: "JollyGuru",
        email: "jollyguru@example.com",
        password: "password",
      },
      {
        username: "SunnyScribe",
        email: "sunnyscribe@example.com",
        password: "password",
      },
      {
        username: "RadiantComet",
        email: "radiantcomet@example.com",
        password: "password",
      },
    ],
    { individualHooks: true }
  );
};
