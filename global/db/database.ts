import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
async function dbConnect() {
  let db = mongoose.connect(MONGODB_URI).then((mongoose) => {
    return mongoose;
  });
  return db;
}

export default dbConnect;
