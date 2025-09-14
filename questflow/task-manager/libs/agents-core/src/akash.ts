import { execSync } from "child_process";
import { logInfo, logSuccess, logError } from "./logger.js";

export function deployToAkash(deployFile: string, wallet: string) {
  try {
    logInfo(`Deploying to Akash: ${deployFile}`);
    execSync(`akash tx deployment create ${deployFile} --from ${wallet}`, {
      stdio: "inherit",
    });
    logSuccess("Deployment submitted to Akash");
  } catch (err) {
    logError("Deployment failed", err);
    throw err;
  }
}
