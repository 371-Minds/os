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
let’s wire mocks into your QA Agent so it can switch between:

Mock mode → fast Biome + Cucumber runs in CI/CD (no external deps)

Live mode → runs against real MongoDB + Akash (for staging/prod)

import { execSync } from "child_process";
import { logInfo, logSuccess, logError } from "@myorg/agents-core";

function run(command: string) {
  execSync(command, { stdio: "inherit" });
}

function main() {
  logInfo("🤖 QA Agent starting...");

  const useMocks = process.env.QA_USE_MOCKS === "true";

  try {
    if (useMocks) {
      logInfo("⚡ Running in MOCK mode (no live services)...");
      run("npx nx test agents-core"); // Biome unit tests (with mocks)
    } else {
      logInfo("🌐 Running in LIVE mode (real services)...");
      run("npm test"); // Jest integration tests (API + Mongo)
      run("npx cucumber-js specs/tasks.feature --require tests/bdd");
    }

    logSuccess("🎉 QA checks completed successfully!");
  } catch (err) {
    logError("QA checks failed", err);
    process.exit(1);
  }
}

import { execSync } from "child_process";
import { loadConfig, logInfo, logSuccess, logError } from "@myorg/agents-core";

function run(command: string) {
  execSync(command, { stdio: "inherit" });
}

function main() {
  logInfo("🤖 QA Agent starting...");

  // ✅ Step 1: Load + validate config
  let config;
  try {
    config = loadConfig();
    logSuccess(`Loaded config for env: ${config.env}`);
  } catch (err) {
    logError("❌ Invalid configuration", err);
    process.exit(1); // fail immediately
  }

  // ✅ Step 2: Decide mode
  const useMocks = config.qaUseMocks === true;

  try {
    if (useMocks) {
      logInfo("⚡ Running QA Agent in MOCK mode (no live services)...");
      run("npx nx test agents-core"); // unit tests with mocks
    } else {
      logInfo("🌐 Running QA Agent in LIVE mode (real API + DB + Akash)...");
      run("npm test"); // Jest integration (API)
      run("npx cucumber-js specs/tasks.feature --require tests/bdd");
    }

    logSuccess("🎉 QA checks completed successfully!");
  } catch (err) {
    logError("QA checks failed", err);
    process.exit(1);
  }
}

main();

