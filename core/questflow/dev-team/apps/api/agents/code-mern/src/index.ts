import fs from "fs";
import path from "path";

function main() {
  console.log("🤖 Code-MERN Agent starting...");

  const specPath = path.join(__dirname, "../../../specs/openapi.yaml");
  if (fs.existsSync(specPath)) {
    console.log("📜 Loaded API spec:", specPath);
  } else {
    console.warn("⚠️ Spec not found at", specPath);
  }

  // TODO: Integrate Warp/Qoder AI workflow here
  // e.g., read OpenAPI spec → generate Express routes/tests
}

main();
