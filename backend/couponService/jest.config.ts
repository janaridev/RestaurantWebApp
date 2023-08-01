import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  testTimeout: 30000,
};
export default config;
