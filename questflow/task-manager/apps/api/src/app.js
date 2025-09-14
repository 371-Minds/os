import express from "express";
import bodyParser from "body-parser";
import tasksRouter from "./routes/tasks.js";
import { connectToDb } from "./services/mongo.js";

const app = express();
app.use(bodyParser.json());

app.use("/tasks", tasksRouter);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  const mongoUri = process.env.MONGO_URI || "mongodb://mongo:27017";
  const dbName = process.env.DB_NAME || "taskdb";

  connectToDb(mongoUri, dbName).then(() => {
    app.listen(port, () => {
      console.log(`🚀 API running on http://localhost:${port}`);
    });
  });
}

export default app;
