import { execSync } from "child_process";
import path from "path";

function main() {
  console.log("🤖 Deploy Agent starting...");

  const deployFile = path.join(__dirname, "../../../docker/deploy.yaml");

  try {
    console.log("🚀 Deploying to Akash using:", deployFile);
    // NOTE: This assumes `akash` CLI is available in environment
    execSync(`akash tx deployment create ${deployFile} --from your-wallet`, {
      stdio: "inherit",
    });
    console.log("✅ Deployment submitted to Akash");
  } catch (err) {
    console.error("❌ Deployment failed:", err);
  }
}

main();
