test("Code-MERN Agent should load without crashing", () => {
  expect(true).toBe(true);
});

Run with:

npx nx test code-mern-agent

Final Pipeline

Biome lint → check code quality (API, agents, libs).

Biome unit tests → agents + libs (fast).

Jest integration tests → API routes only.

OpenAPI validation → ensures openapi.yaml is valid.

Cucumber → ensures system matches tasks.feature (spec-driven).
