# Prompt: Generate Tests from Specs

You are an AI coder. Create automated tests from the specifications in:

- `specs/openapi.yaml`
- `specs/tasks.feature`

Requirements:
- Use Jest + Supertest.
- Save integration tests in `tests/integration/`.
- Cover:
  - Successful task creation
  - Missing required fields
  - Invalid data formats
- Ensure tests align with the BDD scenarios.

Generate Jest + Supertest tests for GET /tasks from the specs.

Requirements:
- Test retrieving all tasks.
- Ensure response is an array of tasks.
- Verify fields: id, title, dueDate, completed.
- Save in `tests/integration/tasks.test.js`.

Expected AI output: 

it("should retrieve all tasks", async () => {
  // First create a task
  await request(app)
    .post("/tasks")
    .send({ title: "Test Task", dueDate: "2025-09-20" });

  // Then fetch tasks
  const response = await request(app).get("/tasks");

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body[0]).toHaveProperty("id");
  expect(response.body[0]).toHaveProperty("title");
});

Generate Jest + Supertest tests for PUT /tasks/{id} from the specs.

Requirements:
- Test updating a task’s completion.
- Test handling a non-existent task (404).
- Save in `tests/integration/tasks.test.js`.

Expected AI output:

it("should mark a task as completed", async () => {
  const createRes = await request(app)
    .post("/tasks")
    .send({ title: "Complete me" });

  const taskId = createRes.body.id;

  const updateRes = await request(app)
    .put(`/tasks/${taskId}`)
    .send({ completed: true });

  expect(updateRes.statusCode).toBe(200);
  expect(updateRes.body.completed).toBe(true);
});

it("should return 404 if task does not exist", async () => {
  const res = await request(app)
    .put("/tasks/nonexistent")
    .send({ completed: true });

  expect(res.statusCode).toBe(404);
  expect(res.body.error).toBe("Task not found");
});
