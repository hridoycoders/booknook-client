import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "booknook";

if (!uri) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

const client = new MongoClient(uri);

export const db = client.db(dbName);
