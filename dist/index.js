import express from 'express';
import { connectToDatabase } from '../database/mongodb.ts';
import { HOST, PORT } from '../config/env.config.ts';
import { sendEmail } from '../controller/email.controller.ts';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    message: "Too many requests, please try again later."
});
app.use(limiter);
app.post('/v1/email-sending', sendEmail);
const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
