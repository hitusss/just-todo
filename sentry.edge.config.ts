import * as Sentry from "@sentry/nextjs";

import { env } from "~/env.js";

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DNS,
  tracesSampleRate: 1,
  debug: false,
});
