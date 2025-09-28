import { test, expect } from "bun:test";
import { loadFeature } from "../specs.js";

test("loadFeature reads BDD file", () => {
  const feature = loadFeature("specs/tasks.feature");
  expect(feature).toContain("Feature: Task management");
});
