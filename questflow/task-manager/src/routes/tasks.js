import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const tasks = []; // in-memory storage for demo

// Create a new task
router.post("/", (req, res) => {
  const { title, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    id: uuidv4(),
    title,
    dueDate: dueDate || null,
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

export default router;
