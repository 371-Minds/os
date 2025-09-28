import { MongoClient } from "mongodb";
import { connectToDbMock } from "@myorg/agents-core/mongo-mock";

let db;

export async function connectToDb(uri: string, dbName: string) {
  if (uri.startsWith("mock://")) {
    db = await connectToDbMock(uri, dbName);
    return;
  }

  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`✅ Connected to MongoDB: ${dbName}`);
}

export function getDb() {
  if (!db) throw new Error("Database not initialized. Call connectToDb first.");
  return db;
}

 


