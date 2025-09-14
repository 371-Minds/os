import { loadFeature } from "../specs.js";

test("loadFeature reads BDD file", () => {
  const feature = loadFeature("specs/tasks.feature");
  expect(feature).toContain("Feature: Task management");
});

Biome will pick this up automatically when you run npx biome test.

✅ Benefits

One tool for lint, format, and test (faster than separate Jest/ESLint/Prettier).

Nx can orchestrate Biome across all agents + API.

CI/CD runs Biome → OpenAPI validation → Cucumber tests for full spec-driven coverage.
