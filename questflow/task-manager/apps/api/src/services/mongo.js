import { MongoClient } from "mongodb";

let db;

export async function connectToDb(uri, dbName) {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`✅ Connected to MongoDB: ${dbName}`);
}

export function getDb() {
  if (!db) throw new Error("Database not initialized. Call connectToDb first.");
  return db;
}
