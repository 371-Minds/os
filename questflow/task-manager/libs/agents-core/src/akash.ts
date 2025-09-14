import { execSync } from "child_process";
import { logInfo, logSuccess, logError } from "./logger.js";
import { deployToAkashMock } from "./akash-mock.js";
import { loadConfig } from "./config.js";
import fs from "fs";
import yaml from "js-yaml";

function mergeYaml(baseFile: string, overrideFile: string, outFile: string) {
  const base = yaml.load(fs.readFileSync(baseFile, "utf8"));
  const override = yaml.load(fs.readFileSync(overrideFile, "utf8"));

  // Deep merge: override resources
  const merged = { ...base, ...override };
  fs.writeFileSync(outFile, yaml.dump(merged));
  return outFile;
}

export function deployToAkash(deployFile: string, wallet: string) {
  const config = loadConfig();

  if (config.env === "test" || config.qaUseMocks) {
    return deployToAkashMock(deployFile, wallet);
  }

  let fileToDeploy = deployFile;

  if (config.akashProfile) {
    const profileFile = `docker/profiles/${config.akashProfile}.yaml`;
    if (fs.existsSync(profileFile)) {
      const stagingFile = deployFile.replace(".yaml", `.${config.akashProfile}.yaml`);
      fileToDeploy = mergeYaml(deployFile, profileFile, stagingFile);
      logInfo(`📦 Applied profile '${config.akashProfile}': ${fileToDeploy}`);
    } else {
      logError(`Profile file not found: ${profileFile}`);
      process.exit(1);
    }
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
