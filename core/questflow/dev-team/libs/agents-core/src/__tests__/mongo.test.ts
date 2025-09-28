import { connectToDb } from "../__mocks__/mongo.js";

test("inserts a mock task into MongoDB", async () => {
  const { db } = await connectToDb("mock://", "testdb");
  const result = await db.collection("tasks").insertOne({ title: "My Task" });
  expect(result.insertedId).toBe("mock-id");
});
