import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('spotify_ui', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
