import * as Sentry from "@sentry/nextjs";

import { env } from "~/env.js";

Sentry.init({
  dsn: env.SENTRY_DSN,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
