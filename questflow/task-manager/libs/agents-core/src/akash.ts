import { execSync } from "child_process";
import { logInfo, logSuccess, logError } from "./logger.js";
import { deployToAkashMock } from "./akash-mock.js";
import { loadConfig } from "./config.js";
import fs from "fs";

function adjustDeployFileForStaging(deployFile: string, profile: string) {
  const stagingFile = deployFile.replace(".yaml", `.staging.yaml`);
  let content = fs.readFileSync(deployFile, "utf8");

  if (profile === "minimal") {
    content = content.replace(/cpu: \d+/g, "cpu: 0.1");
    content = content.replace(/memory: \d+Gi/g, "memory: 0.25Gi");
    content = content.replace(/disk: \d+Gi/g, "disk: 1Gi");
  }

  fs.writeFileSync(stagingFile, content);
  return stagingFile;
}

export function deployToAkash(deployFile: string, wallet: string) {
  const config = loadConfig();

  if (config.env === "test" || config.qaUseMocks) {
    return deployToAkashMock(deployFile, wallet);
  }

  let fileToDeploy = deployFile;

  if (config.env === "staging") {
    fileToDeploy = adjustDeployFileForStaging(deployFile, config.akashProfile || "minimal");
    logInfo(`📦 Adjusted deployment file for staging: ${fileToDeploy}`);
  }

  try {
    logInfo(`Deploying to Akash (${config.env}) using ${fileToDeploy}`);
    execSync(`akash tx deployment create ${fileToDeploy} --from ${wallet}`, {
      stdio: "inherit",
    });
    logSuccess(`Deployment submitted to Akash (${config.env})`);
    return { status: "submitted", file: fileToDeploy };
  } catch (err) {
    logError("Deployment failed", err);
    throw err;
  }
}


