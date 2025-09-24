import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",              // Needed for DOM tests
    setupFiles: "./src/vitest.setup.ts", // Vitest setup file
    include: ["src/**/*.test.{ts,tsx}"], // Test file pattern
  },
});
