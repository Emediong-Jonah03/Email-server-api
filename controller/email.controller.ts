import { EmailModel } from "../model/email.model.ts";
import type { Request, Response } from "express";
import { Resend } from "resend";
import { RESEND_API, GMAIL_USER } from "../config/env.config.ts";
import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

const resend = new Resend(RESEND_API);

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { from, subject, body } = req.body;

    if (!from || !subject || !body ||
      typeof from !== "string" ||
      typeof subject !== "string" ||
      typeof body !== "string"
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    if (!GMAIL_USER) {
      return res.status(500).json({ error: "Recipient email not configured" });
    }

    const trimmedEmail = {
      from: from.trim(),
      to: GMAIL_USER,
      subject: subject.trim(),
      body: body.trim(),
      sentAt: new Date(),
    };

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: GMAIL_USER!,
      subject: trimmedEmail.subject,
      html: trimmedEmail.body,
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(500).json({ error: "Failed to send email", details: error });
    }

    const savedEmail = await EmailModel.create(trimmedEmail);

    res.status(201).json({
      message: "Email sent and stored successfully",
      data: savedEmail,
      resendId: data?.id, 
    });
    
  } catch (error) {
    console.error("Send Email Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

export const getEmails = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const emails = await EmailModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      message: "Emails retrieved successfully",
      data: emails,
    });
  } catch (error) {
    console.error("Get Emails Error:", error);
    res.status(500).json({ error: "Failed to retrieve emails" });
  }
};