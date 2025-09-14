import { loadFeature } from "../specs.js";

test("loads BDD feature file", () => {
  const feature = loadFeature("specs/tasks.feature");
  expect(feature).toContain("Feature: Task management");
});
