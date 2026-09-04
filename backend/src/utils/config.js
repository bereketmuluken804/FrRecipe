import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_URI;
const JWT_SECRET= process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const BaseURL= process.env.BaseURL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export {PORT, DB_URL, JWT_SECRET, EMAIL_PASS, EMAIL_USER, BaseURL, GOOGLE_CLIENT_ID};