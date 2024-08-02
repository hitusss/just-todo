import "dotenv/config";
import "src/env.js";

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi, type MockInstance } from "vitest";

import { server } from "tests/mocks/index.js";

import "@testing-library/jest-dom/vitest";

afterEach(() => server.resetHandlers());
afterEach(() => cleanup());

export let consoleError: MockInstance<(typeof console)["error"]>;

beforeEach(() => {
  const originalConsoleError = console.error;
  consoleError = vi.spyOn(console, "error");
  consoleError.mockImplementation(
    (...args: Parameters<typeof console.error>) => {
      originalConsoleError(...args);
      throw new Error(
        "Console error was called. Call consoleError.mockImplementation(() => {}) if this is expected.",
      );
    },
  );
});
