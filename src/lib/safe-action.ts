import { createSafeActionClient } from "next-safe-action";

import { requireAuth } from "~/server/auth";

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await requireAuth();

  return next({
    ctx: {
      session,
    },
  });
});
