import dotenv from "dotenv";

dotenv.config();

// Load environment variables from .env file
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:1337/defaultDB';


const MONGO_OPTIONS = {
  socketTimeoutMS: Number(process.env.MONGO_OPTIONS_SOCKET_TIMEOUT_MS) || 30000,
  autoIndex: process.env.MONGO_OPTIONS_AUTO_INDEX === 'true',
  retryWrites: process.env.MONGO_OPTIONS_RETRY_WRITES === 'true',
};


const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = Number(process.env.SERVER_PORT) || 1337;
const SERVER_TOKEN_EXPIRETIME = Number(process.env.SERVER_TOKEN_EXPIRETIME) || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || 'defaultSecret';




const BCRYPT_SALT=10;
const EMAIL_USER = '306194eb628069';
const EMAIL_PASSWORD ='253128ec552d5f';
const EMAIL_HOST ='sandbox.smtp.mailtrap.io';
const EMAIL_PORT ='25'


const config = {
  mongo: {
    url: MONGO_URL,
    options: MONGO_OPTIONS,
    bcrypt:BCRYPT_SALT,
    email:EMAIL_USER,
    pass:EMAIL_PASSWORD,
    Host:EMAIL_HOST,
    port:EMAIL_PORT
  },
  server: {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
      expireTime: SERVER_TOKEN_EXPIRETIME,
      issuer: SERVER_TOKEN_ISSUER,
      secret: SERVER_TOKEN_SECRET,
    },
  },
};





export default config;