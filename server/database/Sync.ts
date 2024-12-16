import sequelize from './db';
// import User from './models/User';
// import Artist from './models/Artist';
// import Song from './models/Song';
// import Playlist from './models/Playlist';

(async () => {
  try {
    await sequelize.sync({ force: true }); // Use force: true only in development
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    process.exit();
  }
})();
