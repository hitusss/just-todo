import { withSentryConfig } from "@sentry/nextjs";

await import("./src/env.js");
if (process.env.MOCKS === "true") {
  await import("./tests/mocks/index.js");
}

///** @type {import("next").NextConfig} */
const config = {};

export default withSentryConfig(config, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
