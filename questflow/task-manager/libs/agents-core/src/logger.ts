export function logInfo(message: string) {
  console.log(`ℹ️ [INFO] ${message}`);
}

export function logSuccess(message: string) {
  console.log(`✅ [SUCCESS] ${message}`);
}

export function logError(message: string, err?: any) {
  console.error(`❌ [ERROR] ${message}`, err || "");
}
