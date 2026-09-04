import mongoose from "mongoose";
import { DB_URL } from "../utils/config.js";

export default async function ConnectDB() {
	try {
		mongoose.set("strictQuery", false);
		console.log("Connecting to DB...");
		await mongoose.connect(DB_URL);
    console.log("connected to mongoDB")
    return

  } catch (err) {
		console.log("Connection error: ", err);
		process.exit(1); // kills the server
	}
}
