import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_URI;
const JWT_SECRET= process.env.JWT_SECRET;
export {PORT, DB_URL, JWT_SECRET}