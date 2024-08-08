import "dotenv/config";

import { getTableName, sql, type Table } from "drizzle-orm";

import { db } from "./index";
import * as schema from "./schema";

async function resetTable(table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE "${getTableName(table)}" RESTART IDENTITY CASCADE`),
  );
}
async function seed() {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);

  console.time("🧹 Cleaned up the database...");
  for (const table of [
    schema.authenticators,
    schema.verificationTokens,
    schema.sessions,
    schema.accounts,
    schema.users,
  ]) {
    await resetTable(table);
  }
  console.timeEnd("🧹 Cleaned up the database...");

  console.timeEnd(`🌱 Database has been seeded`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
