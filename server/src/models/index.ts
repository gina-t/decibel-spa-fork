import { Sequelize } from 'sequelize';
import { initializeUserModel } from './User.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

// Initialize the User model with the Sequelize instance
initializeUserModel(sequelize);

// Sync the database and log a message when the tables are created
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

// Export the Sequelize instance for use in other parts of the application
export { sequelize };