import { execSync } from "child_process";
import { logInfo, logSuccess, logError } from "./logger.js";
import { deployToAkashMock } from "./akash-mock.js";
import { loadConfig } from "./config.js";

export function deployToAkash(deployFile: string, wallet: string) {
  const config = loadConfig();

  if (config.env === "test" || config.qaUseMocks) {
    return deployToAkashMock(deployFile, wallet);
  }

  try {
    logInfo(`Deploying to Akash: ${deployFile}`);
    execSync(`akash tx deployment create ${deployFile} --from ${wallet}`, {
      stdio: "inherit",
    });
    logSuccess("Deployment submitted to Akash");
    return { status: "submitted" };
  } catch (err) {
    logError("Deployment failed", err);
    throw err;
  }
}

