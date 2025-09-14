import { logInfo, logSuccess } from "./logger.js";

export function deployToAkashMock(deployFile: string, wallet: string) {
  logInfo(`🧪 [MOCK] Simulating Akash deploy of ${deployFile} with wallet ${wallet}`);
  return {
    txHash: "mock-tx-12345",
    status: "success",
    message: "Simulated deployment (no Akash CLI invoked)"
  };
}
