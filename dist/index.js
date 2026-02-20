"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("./database/mongodb");
const env_config_1 = require("./config/env.config");
const email_controller_1 = require("./controller/email.controller");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    message: "Too many requests, please try again later."
});
app.use(limiter);
app.post('/v1/email-sending', email_controller_1.sendEmail);
const startServer = async () => {
    try {
        await (0, mongodb_1.connectToDatabase)();
        app.listen(env_config_1.PORT, () => {
            console.log(`Server is running on http://${env_config_1.HOST}:${env_config_1.PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
