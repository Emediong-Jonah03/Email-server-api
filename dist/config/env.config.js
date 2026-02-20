"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESEND_API = exports.GMAIL_USER = exports.DB_URI = exports.HOST = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== "production") {
    const envFile = `${process.env.NODE_ENV || "development"}.env`;
    (0, dotenv_1.config)({ path: envFile });
}
_a = process.env, exports.PORT = _a.PORT, exports.NODE_ENV = _a.NODE_ENV, exports.HOST = _a.HOST, exports.DB_URI = _a.DB_URI, exports.GMAIL_USER = _a.GMAIL_USER, exports.RESEND_API = _a.RESEND_API;
