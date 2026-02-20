import { config } from "dotenv";

const envFile = `${process.env.NODE_ENV || "development"}.env`;

config({ path: envFile });

export const { PORT, NODE_ENV, HOST, DB_URI, GMAIL_USER, RESEND_API } = process.env;

