import { withSentryConfig } from "@sentry/nextjs";

import { env } from "./src/env.js";

if (process.env.MOCKS === "true") {
  await import("./tests/mocks/index.js");
}

/** @type {import('next').NextConfig} */
const config = {};

export default withSentryConfig(config, {
  org: env.SENTRY_ORG,
  project: env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
