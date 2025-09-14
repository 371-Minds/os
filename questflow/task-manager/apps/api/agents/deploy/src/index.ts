import { deployToAkash, loadConfig, logInfo, logSuccess, logError } from "@myorg/agents-core";

function main() {
  logInfo("🤖 Deploy Agent starting...");

  // ✅ Step 1: Load + validate config
  let config;
  try {
    config = loadConfig();
    logSuccess(`Loaded config for env: ${config.env}`);
  } catch (err) {
    logError("❌ Invalid configuration", err);
    process.exit(1); // fail immediately if schema check fails
  }

  // ✅ Step 2: Require Akash wallet
  if (!config.akashWallet) {
    logError("❌ Missing akashWallet in configuration. Cannot deploy.");
    process.exit(1);
  }

  // ✅ Step 3: Deploy to Akash
  try {
    deployToAkash("docker/deploy.yaml", config.akashWallet);
    logSuccess("🚀 Deployment succeeded!");
  } catch (err) {
    logError("❌ Deployment failed", err);
    process.exit(1);
  }
}

main();

