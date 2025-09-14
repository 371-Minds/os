import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../services/mongo.js";

const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
  const { title, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    title,
    dueDate: dueDate || null,
    completed: false,
  };

  const db = getDb();
  const result = await db.collection("tasks").insertOne(task);

  res.status(201).json({ id: result.insertedId, ...task });
});

// Get all tasks
router.get("/", async (req, res) => {
  const { completed } = req.query;
  const db = getDb();

  let query = {};
  if (completed !== undefined) {
    query.completed = completed === "true";
  }

  const tasks = await db.collection("tasks").find(query).toArray();
  res.status(200).json(tasks);
});

export default router;
