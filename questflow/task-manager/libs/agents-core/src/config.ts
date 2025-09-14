import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type Config = {
  env: string;
  mongoUri?: string;
  dbName?: string;
  akashWallet?: string;
  qaUseMocks?: boolean;
};

let cachedConfig: Config | null = null;

export function loadConfig(): Config {
  if (cachedConfig) return cachedConfig;

  const env = process.env.NODE_ENV || "development";
  const config: Config = { env };

  // 1. From env vars
  if (process.env.MONGO_URI) config.mongoUri = process.env.MONGO_URI;
  if (process.env.DB_NAME) config.dbName = process.env.DB_NAME;
  if (process.env.AKASH_WALLET) config.akashWallet = process.env.AKASH_WALLET;
  if (process.env.QA_USE_MOCKS) config.qaUseMocks = process.env.QA_USE_MOCKS === "true";

  // 2. From config file (config.yaml or config.json at root)
  const yamlPath = path.resolve("config.yaml");
  const jsonPath = path.resolve("config.json");

  if (fs.existsSync(yamlPath)) {
    Object.assign(config, yaml.load(fs.readFileSync(yamlPath, "utf8")));
  } else if (fs.existsSync(jsonPath)) {
    Object.assign(config, JSON.parse(fs.readFileSync(jsonPath, "utf8")));
  }

  cachedConfig = config;
  return config;
}
