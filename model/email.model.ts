import mongoose, { Schema, model, Model } from "mongoose";

export interface IEmail {
  to: string;
  from: string;
  subject: string;
  body: string;
  sentAt: Date;
}

const EmailSchema = new Schema<IEmail>(
  {
    to: { type: String, required: true },
    from: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const EmailModel: Model<IEmail> =
  mongoose.models.Email || model<IEmail>("Email", EmailSchema);
