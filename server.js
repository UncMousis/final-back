import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import habitRoutes from './routes/habits.js';
import pgclient from './db/index.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/api/habits', habitRoutes);

// Test Route
app.get('/', (req, res) => res.send('Routinee backend is live'));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

pgclient.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Failed to connect to PostgreSQL:", err);
  });
