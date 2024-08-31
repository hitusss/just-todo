import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { USER_EMAIL_MAX_LENGTH, USERNAME_MAX_LENGTH } from "~/validators/user";

import { accounts } from "./accounts";
import { authenticators } from "./authenticators";
import { sessions } from "./sessions";

export const users = pgTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: varchar("username", { length: USERNAME_MAX_LENGTH }).unique(),
  name: varchar("name", { length: USERNAME_MAX_LENGTH }),
  email: varchar("email", { length: USER_EMAIL_MAX_LENGTH }).notNull().unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  authenticators: many(authenticators),
}));
