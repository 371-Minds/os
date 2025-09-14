import express from "express";
import bodyParser from "body-parser";
import tasksRouter from "./routes/tasks.js";
import { connectToDb } from "./services/mongo.js";
import { loadConfig, logInfo, logSuccess, logError } from "@myorg/agents-core";


const app = express();
app.use(bodyParser.json());
app.use("/tasks", tasksRouter);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  const mongoUri = process.env.MONGO_URI || "mongodb://mongo:27017";
  const dbName = process.env.DB_NAME || "taskdb";

  connectToDb(mongoUri, dbName)
    .then(() => {
      app.listen(port, () => {
        logSuccess(`🚀 API running on http://localhost:${port}`);
      });
    })
    .catch((err) => {
      logError("❌ Failed to connect to MongoDB", err);
      process.exit(1);
    });
}

export default app;
