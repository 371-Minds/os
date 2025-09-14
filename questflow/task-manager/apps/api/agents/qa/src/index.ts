import { execSync } from "child_process";

function main() {
  console.log("🤖 QA Agent starting...");
  console.log("✅ Running tests against specs...");

  try {
    // Run Jest + Cucumber feature tests
    execSync("npm test", { stdio: "inherit" });
    execSync("npx cucumber-js specs/tasks.feature --require tests/bdd", {
      stdio: "inherit",
    });
    console.log("🎉 QA checks completed successfully!");
  } catch (err) {
    console.error("❌ QA checks failed:", err);
    process.exit(1);
  }
}

main();
