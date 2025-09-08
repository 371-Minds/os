import { expect, test } from "bun:test";

test("1 + 1", () => {
  expect(1 + 1).toBe(2);
});

test("array", () => {
  expect([1, 2, 3]).toContain(2);
});