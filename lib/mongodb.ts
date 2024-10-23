import mongoose from "mongoose"

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
  throw new Error("Falta la variable de entorno MONGODB_URL")
}


async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error("Falta la variable de entorno MONGODB_URL")
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
  } catch (error) {
    console.log("Hubo un error al conectarnos a la BBDD", error)
  }
}

export default connectDB

