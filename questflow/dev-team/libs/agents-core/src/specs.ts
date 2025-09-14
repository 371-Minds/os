import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export function loadOpenApiSpec(file = "specs/openapi.yaml") {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) throw new Error(`Spec not found: ${filePath}`);
  return yaml.load(fs.readFileSync(filePath, "utf8"));
}

export function loadFeature(file = "specs/tasks.feature") {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) throw new Error(`Feature not found: ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
}
