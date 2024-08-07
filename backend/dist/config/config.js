"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_OPTIONS = {
    socketTimeoutMS: 30000,
    autoIndex: false,
    retryWrites: true,
};
const MONGO_USERNAME = process.env.MONGO_USERNAME || "ghanahazardreporter";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "FZd9eckAnWeddsxX";
const MONGO_HOST = process.env.MONGO_HOST || 'cluster0.jiq9vep.mongodb.net/hazardreporter-db?w=majority';
const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    userName: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "coolIssuer";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET ||
    "4ea542f0ebb68f431e5bf042d56c98ab815c16c9f9a46a58d74332280f1f1b99973550a54e5be7b5eb7853e008474a4c";
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET,
    },
};
//Salting
const BCRYPT_SALT = 10;
const EMAIL_USER = '306194eb628069';
const EMAIL_PASSWORD = '253128ec552d5f';
const EMAIL_HOST = 'sandbox.smtp.mailtrap.io';
const EMAIL_PORT = '25';
const config = {
    mongo: MONGO,
    server: SERVER,
    bcrypt: BCRYPT_SALT,
    email: EMAIL_USER,
    pass: EMAIL_PASSWORD,
    Host: EMAIL_HOST,
    port: EMAIL_PORT
};
exports.default = config;
//# sourceMappingURL=config.js.map