How This Fits Together

Code-MERN Agent → turns OpenAPI into MERN stack code/tests.

Code-T3 Agent → scaffolds T3 (Next.js/Prisma) features from specs.

QA Agent → runs Jest + Cucumber tests against your API + specs.

Deploy Agent → handles Akash deployment automation.

All agents:

Load specs from /specs/

Run inside Nx monorepo (npx nx serve <agent>)

Can be extended to integrate with Warp/Qoder or other AI coders.

Example Usage
In QA Agent (apps/agents/qa/src/index.ts):

import { loadConfig, logInfo, logSuccess, logError } from "@myorg/agents-core";
import { execSync } from "child_process";

function run(command: string) {
  execSync(command, { stdio: "inherit" });
}

function main() {
  const config = loadConfig();
  logInfo(`🤖 QA Agent starting in ${config.env} mode...`);

  try {
    if (config.qaUseMocks) {
      logInfo("⚡ Running in MOCK mode...");
      run("npx nx test agents-core");
    } else {
      logInfo("🌐 Running in LIVE mode...");
      run("npm test");
      run("npx cucumber-js specs/tasks.feature --require tests/bdd");
    }

    logSuccess("🎉 QA checks passed!");
  } catch (err) {
    logError("QA checks failed", err);
    process.exit(1);
  }
}

main();

In Deploy Agent:
import { deployToAkash, loadConfig } from "@myorg/agents-core";

function main() {
  const config = loadConfig();
  deployToAkash("docker/deploy.yaml", config.akashWallet || "default-wallet");
}

main();

Config Files

You can add either config.yaml or config.json at the repo root.

Example config.yaml:

mongoUri: mongodb://mongo:27017
dbName: taskdb
akashWallet: my-wallet
qaUseMocks: true

CI/CD Integration

In .github/workflows/ci.yml, you can control behavior with env vars:
      - name: Run QA Agent (mock mode)
        run: npx nx serve qa-agent
        env:
          QA_USE_MOCKS: "true"
          NODE_ENV: "ci"

✅ Benefits

Unified config system → env vars, JSON, or YAML.

Cache layer → loads once, reused everywhere.

Portable across agents → same loadConfig() call for API, QA, Deploy.

Flexible for CI/CD → set QA_USE_MOCKS=true in CI, but use live MongoDB + Akash in staging/prod.














