import * as Sentry from "@sentry/nextjs";

import { env } from "~/env.js";

Sentry.init({
  dsn: env.SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
});
