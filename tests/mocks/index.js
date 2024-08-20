import closeWithGrace from "close-with-grace";
import { setupServer } from "msw/node";

import { handlers as resendHandlers } from "./handlers/resend.js";

export const server = setupServer(...resendHandlers);

server.listen({
  onUnhandledRequest(request, print) {
    if (
      request.url.startsWith("http://localhost:3000") ||
      request.url.includes(".npmjs.org") ||
      request.url.includes(".nextjs.org") ||
      request.url.includes(".sentry.io")
    ) {
      return;
    }

    print.warning();
  },
});

if (process.env.NODE_ENV !== "test") {
  console.info("🔶 Mock server installed");

  closeWithGrace(() => {
    server.close();
  });
}
