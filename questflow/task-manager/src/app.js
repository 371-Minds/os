import express from "express";
import bodyParser from "body-parser";
import tasksRouter from "./routes/tasks.js";

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/tasks", tasksRouter);

// Start server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

export default app;
