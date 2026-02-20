import mongoose, { Schema, model } from "mongoose";
const EmailSchema = new Schema({
    to: { type: String, required: true },
    from: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
}, { timestamps: true });
export const EmailModel = mongoose.models.Email || model("Email", EmailSchema);
