import { test, expect } from "bun:test";
import request from "supertest";
import app from "../../src/app.js";

test("should create a new task", async () => {
  const response = await request(app)
    .post("/tasks")
    .send({ title: "Write spec-driven plan", dueDate: "2025-09-15" });

  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty("id");
  expect(response.body.title).toBe("Write spec-driven plan");
  expect(response.body.completed).toBe(false);
});

test("should fail if title is missing", async () => {
  const response = await request(app).post("/tasks").send({});
  expect(response.statusCode).toBe(400);
  expect(response.body.error).toBe("Title is required");
});