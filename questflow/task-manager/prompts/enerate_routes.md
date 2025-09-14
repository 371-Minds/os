# Prompt: Generate API Routes from Specs

You are an AI coder. Implement API routes based on the OpenAPI spec in `specs/openapi.yaml`.

Requirements:
- Use Express.js.
- Validate input against the schema (title is required).
- Return JSON responses as defined in the spec.
- Save routes in `src/routes/`.
- Do not duplicate existing routes; extend functionality if needed.
- Follow clean code and modular design principles.

Implement the GET /tasks endpoint defined in `specs/openapi.yaml`.

Requirements:
- Use Express.js.
- Return all stored tasks.
- Response must be an array of `Task` objects as defined in the spec.
- Save code in `src/routes/tasks.js`.

Exprected Output: // GET all tasks
router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

Implement the PUT /tasks/{id} endpoint from `specs/openapi.yaml`.

Requirements:
- Use Express.js.
- Update the task’s `completed` field.
- If no task exists with that ID, return 404.
- Save code in `src/routes/tasks.js`.

Expected AI output:
// Update task completion
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = completed;
  res.status(200).json(task);
});
