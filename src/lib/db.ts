import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_URL) {
  throw new Error("Please add the MONGO_URL environment variable");
}

var dbConnectionString = process.env.MONGO_URL
mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error"),
);
database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;

export default database;

