import path from "node:path";
import { fileURLToPath } from "node:url";
import fsExtra from "fs-extra";
import { z } from "zod";

/**
 * The directory where fixtures are stored.
 *
 * @type {string}
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * The path to the fixtures directory.
 *
 * @type {string}
 */
const fixturesDirPath = path.join(__dirname, "..", "fixtures");

/**
 * Reads a fixture file.
 *
 * @param {string} subdir - The subdirectory of the fixtures directory.
 * @param {string} name - The name of the fixture file, without the extension.
 * @returns {Promise<unknown>} - The parsed contents of the fixture file.
 */
export async function readFixture(subdir, name) {
  return fsExtra.readJSON(path.join(fixturesDirPath, subdir, `${name}.json`));
}

/**
 * Creates a fixture file.
 *
 * @param {string} subdir - The subdirectory of the fixtures directory.
 * @param {string} name - The name of the fixture file, without the extension.
 * @param {unknown} data - The data to write to the fixture file.
 * @returns {Promise<void>} - A promise that resolves when the fixture file is created.
 */
export async function createFixture(subdir, name, data) {
  const dir = path.join(fixturesDirPath, subdir);
  await fsExtra.ensureDir(dir);
  return fsExtra.writeJSON(path.join(dir, `./${name}.json`), data);
}

/**
 * The schema for an email.
 *
 * @typedef Email
 * @type {object}
 * @property {string} to - The recipient of the email.
 * @property {string} from - The sender of the email.
 * @property {string} subject - The subject of the email.
 * @property {string} text - The plain text content of the email.
 * @property {string} html - The HTML content of the email.
 */

export const EmailSchema = z.object({
  to: z.string(),
  from: z.string(),
  subject: z.string(),
  text: z.string(),
  html: z.string(),
});

/**
 * Writes an email to a fixture file.
 *
 * @param {unknown} rawEmail - The raw email data.
 * @returns {Promise<Email>} - The parsed email data.
 * @throws {Error} - If the email data is invalid.
 */
export async function writeEmail(rawEmail) {
  const email = EmailSchema.parse(rawEmail);
  await createFixture("email", email.to, email);
  return email;
}

/**
 * Reads an email from a fixture file.
 *
 * @param {string} recipient - The recipient of the email.
 * @returns {Promise<Email|null>} - The parsed email data, or null if the email file is not found.
 */
export async function readEmail(recipient) {
  try {
    const email = (await readFixture("email", recipient)) || null;
    return email && EmailSchema.parse(email);
  } catch (error) {
    console.error(`Error reading email`, error);
    return null;
  }
}

/**
 * Throws an error if a required header is missing.
 *
 * @param {Headers} headers - The headers object.
 * @param {string} header - The name of the required header.
 * @throws {Error} - If the required header is missing.
 */
export function requireHeader(headers, header) {
  if (!headers.has(header)) {
    const headersString = JSON.stringify(
      Object.fromEntries(headers.entries()),
      null,
      2,
    );
    throw new Error(
      `Header "${header}" required, but not found in ${headersString}`,
    );
  }
  return headers.get(header);
}
