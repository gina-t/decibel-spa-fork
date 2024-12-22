import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";
import dotenv from "dotenv";
dotenv.config();

const forceDatabaseRefresh = false;

const app = express();
const PORT = process.env.PORT || 3001;

// __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON and enable CORS
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Serve static files from the client's dist folder
const clientDistPath = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDistPath));

// routes
app.use('/api', routes);

// Serve the frontend index.html for non-API routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// Sync database and start server
sequelize
  .sync({ force: forceDatabaseRefresh })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });