How Agents Use It
Example in Code-MERN Agent
import { loadOpenApiSpec, generateFromSpec, logInfo } from "@myorg/agents-core";

function main() {
  logInfo("🤖 Code-MERN Agent starting...");
  const spec = loadOpenApiSpec();
  generateFromSpec("specs/openapi.yaml", "code-mern");
}

main();

Copy And Save
Share
Ask Copilot
Example in Deploy Agent
import { deployToAkash } from "@myorg/agents-core";

function main() {
  deployToAkash("docker/deploy.yaml", "your-wallet");
}

main();

Copy And Save
Share
Ask Copilot
🛠 Nx Integration

Generate the library with:

npx nx generate @nx/js:library agents-core --directory=libs

Copy And Save
Share
Ask Copilot

Then update your imports to use:

import { logInfo } from "@myorg/agents-core";

Copy And Save
Share
Ask Copilot

(@myorg comes from your package.json → "name": "@myorg/repo")

✅ Now all your agents share:

Spec loading (openapi.yaml, tasks.feature)

Logging (uniform console output)

Akash deployment wrapper

AI-coder integration hooks
