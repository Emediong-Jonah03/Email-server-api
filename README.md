# Email Server API

A RESTful backend service for sending and storing transactional emails, built with Node.js, Express, TypeScript, Resend, and MongoDB.

## Overview

This project provides a backend API that powers a contact form. When a user submits a message, the server sends the email to a configured recipient via the Resend email delivery service and persists the email record to a MongoDB database for logging and retrieval.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express** | HTTP server and routing |
| **TypeScript** | Type-safe JavaScript |
| **Resend** | Transactional email delivery |
| **MongoDB** | Email record persistence |
| **Mongoose** | MongoDB object modeling |

## Project Structure

```
email-server/
├── src/
│   ├── config/
│   │   └── env.config.ts       # Environment variable exports
│   ├── controller/
│   │   └── email.controller.ts # Request handlers for email routes
│   ├── model/
│   │   └── email.model.ts      # Mongoose schema and model
│   └── index.ts                # App entry point
├── .env                        # Environment variables (never commit this)
├── tsconfig.json
└── package.json
```

## API Endpoints

### Send Email
**POST** `/api/email/send`

Sends an email via Resend and saves the record to MongoDB.

**Request Body:**
```json
{
  "from": "sender@example.com",
  "subject": "Hello",
  "body": "<p>Your message here</p>"
}
```

**Success Response — 201:**
```json
{
  "message": "Email sent and stored successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "from": "sender@example.com",
    "to": "recipient@gmail.com",
    "subject": "Hello",
    "body": "<p>Your message here</p>",
    "sentAt": "2024-01-01T12:00:00.000Z"
  },
  "resendId": "re_123abc456def"
}
```

**Error Response — 400 (Invalid input):**
```json
{
  "error": "Invalid input"
}
```

---

### Get Emails
**GET** `/api/email?page=1&limit=20`

Retrieves stored email records with pagination, sorted by most recent first.

**Query Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Records per page |

**Success Response — 200:**
```json
{
  "message": "Emails retrieved successfully",
  "data": [...]
}
```

## Environment Variables

Create a `.env` file in the root of the project with the following:

```env
RESEND_API=your_resend_api_key
GMAIL_USER=your_recipient_email@gmail.com
MONGODB_URI=your_mongodb_connection_string
```

| Variable | Description |
|---|---|
| `RESEND_API` | Your API key from the Resend dashboard |
| `GMAIL_USER` | The email address that receives all contact form submissions |
| `MONGODB_URI` | MongoDB connection string (e.g. from MongoDB Atlas) |

## Getting Started

### Prerequisites
- Node.js v18+
- A [Resend](https://resend.com) account and API key
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or local MongoDB instance

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/email-server.git
cd email-server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your values in .env
```

### Running Locally

```bash
# Development
npx ts-node src/index.ts

# Or compile and run
npm run build
npm start
```

### Build for Production

```bash
npm run build
node dist/index.js
```

Make sure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

## Deployment (Render)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`
5. Add your environment variables under **Environment**
6. Click **Deploy**

Render will automatically redeploy every time you push to your main branch.

## Email Delivery Notes

- The `from` field in the request body is stored in the database to identify the sender but is **not** used as the Resend sender address.
- Resend requires a verified domain for the `from` address. During development, `onboarding@resend.dev` is used. In production, replace this with `no-reply@yourdomain.com` after verifying your domain on the [Resend dashboard](https://resend.com/domains).

## Error Handling

The API validates all incoming request fields and returns appropriate HTTP status codes. Resend delivery errors are caught and returned with details to aid debugging. All errors are logged to the console via `console.error`.

## License

MIT