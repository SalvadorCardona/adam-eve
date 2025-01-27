module.exports = {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {},
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts, tsx}"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  testMatch: ["**/*.test.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
}
