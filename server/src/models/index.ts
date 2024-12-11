import { Sequelize } from 'sequelize';
import { initializeUserModel } from './User.js';

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres', 
});

initializeUserModel(sequelize);

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

export { sequelize };