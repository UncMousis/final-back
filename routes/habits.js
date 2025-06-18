import express from 'express';
import pgclient from '../db/index.js';

const habitRoutes = express.Router();

// GET all habits
habitRoutes.get('/', async (req, res) => {
  const result = await pgclient.query("SELECT * FROM habits ORDER BY id DESC;");
  res.json(result.rows);
});

// GET single habit by ID
habitRoutes.get('/:id', async (req, res) => {
  const result = await pgclient.query("SELECT * FROM habits WHERE id = $1", [req.params.id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Habit not found" });
  }
  res.json(result.rows[0]);
});

// POST a new habit
habitRoutes.post("/", async (req, res) => {
  const { title, completed, targetDate } = req.body;

  try {
    const result = await pgclient.query(
      "INSERT INTO habits (title, completed, target_date) VALUES ($1, $2, $3) RETURNING *",
      [title, completed, targetDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting habit:", err);
    res.status(500).json({ message: "Server error while adding habit" });
  }
});

// UPDATE a habit
habitRoutes.put("/:id", async (req, res) => {
  const { title, completed, targetDate } = req.body;
  const result = await pgclient.query(
    "UPDATE habits SET title = $1, completed = $2, target_date = $3 WHERE id = $4 RETURNING *",
    [title, completed, targetDate, req.params.id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Habit not found" });
  }
  res.json(result.rows[0]);
});

// DELETE a habit
habitRoutes.delete("/:id", async (req, res) => {
  const result = await pgclient.query("DELETE FROM habits WHERE id = $1 RETURNING *", [req.params.id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Habit not found" });
  }
  res.json({ message: "Habit deleted successfully" });
});

export default habitRoutes;
