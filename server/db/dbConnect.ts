import mongoose from 'mongoose'

var cached = (global as any).mongoose

if (!cached) cached = (global as any).mongoose = { conn: null, promise: null }

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    }

    cached.promise = mongoose
      .connect(process.env.MONGODB_URL!, opts)
      .then((mongoose) => {
        return mongoose
      })
  }
  cached.conn = await cached.promise
  return cached.conn
}
