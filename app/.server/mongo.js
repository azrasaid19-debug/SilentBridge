import { MongoClient, BSON } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from `.env` (project root).
// This makes `process.env.MONGODB_CONNECTION_STRING` available on the server.
dotenv.config();

const connectionStringRaw = process.env.MONGODB_CONNECTION_STRING;
if (!connectionStringRaw) {
  throw new Error(
    "Missing `MONGODB_CONNECTION_STRING`. Add it to `silent-bridge-app/.env`.",
  );
}

// Some editors save env strings with quotes, e.g. `"mongodb+srv://..."`.
// We strip surrounding quotes so MongoDB accepts the URI.
const connectionString = connectionStringRaw
  .trim()
  .replace(/^['"]/, "")
  .replace(/['"]$/, "");

export const DB_NAME = process.env.MONGODB_DB_NAME || "silentbridge";

// Your Atlas URI might include a leftover query param like `silentbridge=Cluster0`
// (from earlier templates). The MongoDB driver treats unknown query params as
// connection options and will throw:
//   "MongoParseError: option silentbridge is not supported"
// So we remove it defensively.
function removeQueryParam(uri, key) {
  const parts = uri.split("?");
  if (parts.length !== 2) return uri;
  const [base, qs] = parts;
  const params = qs
    .split("&")
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !p.startsWith(`${key}=`));
  return params.length ? `${base}?${params.join("&")}` : base;
}

const sanitizedConnectionString = removeQueryParam(
  connectionString,
  "silentbridge",
);

// Export ObjectId so model code can convert string ids safely.
export const ObjectId = BSON.ObjectId;

// Reuse a single connected client in dev to avoid exhausting connections.
// (Mirrors the “global client” pattern from the class project.)
async function getClient() {
  if (!globalThis.__silentbridge_mongo_client_promise) {
    const client = new MongoClient(sanitizedConnectionString);
    globalThis.__silentbridge_mongo_client_promise = client.connect();
  }
  return globalThis.__silentbridge_mongo_client_promise;
}

export { getClient };

export async function getDB() {
  const client = await getClient();
  return client.db(DB_NAME);
}
