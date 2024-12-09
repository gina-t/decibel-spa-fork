import express, { Application } from 'express';
import bodyParser from 'body-parser';
import sequelize from './db';
import userRoutes from './routes/userRoutes';
import playlistRoutes from './routes/playlistRoutes';
import songRoutes from './routes/songRoutes';

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/playlists', playlistRoutes);
app.use('/songs', songRoutes);

// Start the server
const PORT = 3000;

(async () => {
  try {
    await sequelize.sync(); // Sync models with the database
    console.log('Database connected and models synced.');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
