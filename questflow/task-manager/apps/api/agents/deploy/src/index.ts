import { deployToAkash, loadConfig, logInfo, logSuccess, logError } from "@myorg/agents-core";

function main() {
  logInfo("🤖 Deploy Agent starting...");

  let config;
  try {
    config = loadConfig();
    logSuccess(`Loaded config for env: ${config.env}`);
  } catch (err) {
    logError("❌ Invalid configuration", err);
    process.exit(1);
  }

  if (!config.akashWallet) {
    logError("❌ Missing akashWallet in configuration. Cannot deploy.");
    process.exit(1);
  }

  try {
    const result = deployToAkash("docker/deploy.yaml", config.akashWallet);
    logSuccess(`🚀 Deployment result: ${JSON.stringify(result)}`);
  } catch (err) {
    logError("❌ Deployment failed", err);
    process.exit(1);
  }
}

main();

