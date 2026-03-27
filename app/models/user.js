import { getDB } from "../.server/mongo";
import bcrypt from "bcryptjs";
import { ObjectId } from "../.server/mongo";

/* ---------------- CREATE USER ---------------- */

export async function createUser({ name, email, password }) {
  const db = await getDB();
  const collection = db.collection("users");

  // check if user already exists
  let existingUser = await collection.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  let hashedPassword = await bcrypt.hash(password, 10);

  // create user
  let result = await collection.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  return result;
}

/* ---------------- FIND USER ---------------- */

export async function getUserByEmail(email) {
  const db = await getDB();
  const collection = db.collection("users");

  return collection.findOne({ email });
}

/* ---------------- VERIFY PASSWORD ---------------- */

export async function verifyUser(email, password) {
  const db = await getDB();
  const collection = db.collection("users");

  let user = await collection.findOne({ email });

  if (!user) return null;

  let isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return null;

  return user;
}

export async function getUserById(id) {
  const db = await getDB();
  const collection = db.collection("users");

  return collection.findOne({
    _id: new ObjectId(id),
  });
}
