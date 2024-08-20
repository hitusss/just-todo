import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

import { requireHeader, writeEmail } from "../utils.js";

export const handlers = [
  http.post(`https://api.resend.com/emails`, async ({ request }) => {
    requireHeader(request.headers, "Authorization");
    const body = await request.json();
    console.info("🔶 mocked email contents:", body);

    const email = await writeEmail(body);

    return HttpResponse.json({
      id: faker.string.uuid(),
      from: email.from,
      to: email.to,
      created_at: new Date().toISOString(),
    });
  }),
];
