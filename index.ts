import express from 'express';
import { connectToDatabase } from './database/mongodb';
import { HOST, PORT } from './config/env.config';
import { sendEmail } from './controller/email.controller';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, 
	message: "Too many requests, please try again later."
})

app.use(limiter);

app.post('/v1/email-sending', sendEmail);

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
