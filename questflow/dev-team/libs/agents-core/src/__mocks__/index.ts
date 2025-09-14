export * from "./mongo.js";
export * from "./akash.js";

Now agents can import:

import { mocks } from "@myorg/agents-core";

const mockDb = await mocks.connectToDb("mock://", "qa-test");
const mockDeploy = mocks.deployToAkash("deploy.yaml", "qa-wallet");
