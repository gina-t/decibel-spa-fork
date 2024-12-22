import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import { UserFactory } from "./User.js";
import { PlaylistFactory } from "./Playlist.js";

// Create a new Sequelize instance with the database configuration
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD || "", 
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

const User = UserFactory(sequelize);
const Playlist = PlaylistFactory(sequelize);

// Each user has one and only one Playlist
User.hasOne(Playlist, { foreignKey: "assignedUserId" });

// Each Playlist belongs to one and only one User
Playlist.belongsTo(User, { foreignKey: "assignedUserId", as: "assignedUser" });

export { sequelize, User, Playlist };
