import { deployToAkash } from "../akash.js";

jest.mock("../akash.js");

test("simulates Akash deployment", () => {
  const result = deployToAkash("docker/deploy.yaml", "test-wallet");
  expect(result).toContain("Simulated deployment");
});
