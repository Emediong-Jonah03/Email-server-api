"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("../config/env.config");
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(env_config_1.DB_URI, {
            dbName: "email-db",
        });
        console.log(`Connected to MongoDB at ${env_config_1.NODE_ENV} environment`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
exports.connectToDatabase = connectToDatabase;
