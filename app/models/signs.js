import { getClient, DB_NAME, ObjectId } from "../.server/mongo";

const COLLECTION_NAME = "signs";

function normalizeSignInput(raw) {
  // Normalize fields coming from the frontend form.
  // Frontend uses:
  // - `signName` -> we store as `name`
  // - `resourceLink` -> we store as `video`
  return {
    name: raw.name ?? raw.signName,
    category: raw.category,
    description: raw.description,
    video: raw.video ?? raw.resourceLink,
    notes: raw.notes,
    confidence: raw.confidence,
    image: raw.image,
    createdAt: raw.createdAt ?? new Date(),
  };
}

function normalizeSignForCreate(raw) {
  return normalizeSignInput(raw);
}

function normalizeSignForUpdate(raw) {
  // Only include fields that exist in the incoming object.
  // This prevents overwriting existing DB values with `undefined`.
  const updates = {};

  const name = raw?.name ?? raw?.signName;
  if (name !== undefined) updates.name = name;

  if (raw?.category !== undefined) updates.category = raw.category;

  if (raw?.description !== undefined) {
    // Only update description if it is explicitly provided.
    updates.description = raw.description;
  }

  if (raw?.video !== undefined) {
    updates.video = raw.video;
  } else if (raw?.resourceLink !== undefined) {
    updates.video = raw.resourceLink;
  }

  if (raw?.notes !== undefined) updates.notes = raw.notes;

  if (raw?.confidence !== undefined) updates.confidence = raw.confidence;
  if (raw?.image !== undefined) updates.image = raw.image;

  return updates;
}

export async function getSigns() {
  const client = await getClient();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  const signs = await collection.find({}).sort({ createdAt: -1 }).toArray();

  // Convert Mongo `_id` into a string `id` for the UI.
  return signs.map((sign) => ({
    ...sign,
    id: sign._id.toString(),
  }));
}

export async function getSignById(id) {
  const client = await getClient();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  const sign = await collection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  if (!sign) return null;

  return {
    ...sign,
    id: sign._id.toString(),
  };
}

export async function createSign(raw, userId) {
  const sign = normalizeSignForCreate(raw);

  const client = await getClient();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  const res = await collection.insertOne({
    ...sign,
    userId: ObjectId.createFromHexString(userId),
  });

  return {
    ...sign,
    id: res.insertedId.toString(),
  };
}

export async function updateSign(id, raw) {
  const updates = normalizeSignForUpdate(raw);

  const client = await getClient();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  await collection.updateOne(
    { _id: ObjectId.createFromHexString(id) },
    {
      $set: updates,
    },
  );
}

export async function deleteSign(id) {
  const client = await getClient();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  await collection.deleteOne({
    _id: ObjectId.createFromHexString(id),
  });
}

export async function getSignsByUser(userId) {
  const client = await getClient();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  const signs = await collection
    .find({ userId: ObjectId.createFromHexString(userId) })
    .sort({ createdAt: -1 })
    .toArray();

  return signs.map((sign) => ({
    ...sign,
    id: sign._id.toString(),
  }));
}
