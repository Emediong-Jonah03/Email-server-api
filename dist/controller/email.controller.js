"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmails = exports.sendEmail = void 0;
const email_model_1 = require("../model/email.model");
const resend_1 = require("resend");
const env_config_1 = require("../config/env.config");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("bufferCommands", false);
const resend = new resend_1.Resend(env_config_1.RESEND_API);
const sendEmail = async (req, res) => {
    try {
        const { from, subject, body } = req.body;
        if (!from || !subject || !body ||
            typeof from !== "string" ||
            typeof subject !== "string" ||
            typeof body !== "string") {
            return res.status(400).json({ error: "Invalid input" });
        }
        if (!env_config_1.GMAIL_USER) {
            return res.status(500).json({ error: "Recipient email not configured" });
        }
        const trimmedEmail = {
            from: from.trim(),
            to: env_config_1.GMAIL_USER,
            subject: subject.trim(),
            body: body.trim(),
            sentAt: new Date(),
        };
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: env_config_1.GMAIL_USER,
            subject: trimmedEmail.subject,
            html: trimmedEmail.body,
        });
        if (error) {
            console.error("Resend Error:", error);
            return res.status(500).json({ error: "Failed to send email", details: error });
        }
        const savedEmail = await email_model_1.EmailModel.create(trimmedEmail);
        res.status(201).json({
            message: "Email sent and stored successfully",
            data: savedEmail,
            resendId: data?.id,
        });
    }
    catch (error) {
        console.error("Send Email Error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};
exports.sendEmail = sendEmail;
const getEmails = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const emails = await email_model_1.EmailModel.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json({
            message: "Emails retrieved successfully",
            data: emails,
        });
    }
    catch (error) {
        console.error("Get Emails Error:", error);
        res.status(500).json({ error: "Failed to retrieve emails" });
    }
};
exports.getEmails = getEmails;
