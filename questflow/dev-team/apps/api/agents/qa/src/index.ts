import { execSync } from "child_process";
import { loadConfig, logInfo, logSuccess, logError } from "../../../../../libs/agents-core/src/index.ts";

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
      run("bun nx test agents-core"); // unit tests with mocks
    } else {
      logInfo("🌐 Running QA Agent in LIVE mode (real API + DB + Akash)...");
      run("bun test"); // Bun integration tests (API)
      run("bun cucumber-js specs/tasks.feature --require tests/bdd");
    }

    logSuccess("🎉 QA checks completed successfully!");
  } catch (err) {
    logError("QA checks failed", err);
    process.exit(1);
  }
}

main();