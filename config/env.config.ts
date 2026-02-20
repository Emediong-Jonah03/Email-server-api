import { config } from "dotenv";

config(); 

export const { PORT, HOST, DB_URI, GMAIL_USER, RESEND_API } = process.env;