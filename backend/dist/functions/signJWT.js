"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'Auth';
const signJWT = (user, callback) => {
    // const timeSinchEpoch = new Date().getTime();
    // const expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
    // const expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    logging_1.default.info('Auth', `Attempting to sign for token for ${user.userName}`);
    const payload = {
        id: user._id.toString(), // Ensure user ID is in the payload
        userName: user.userName,
        role: user.role
    };
    try {
        jsonwebtoken_1.default.sign(payload, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: config_1.default.server.token.expireTime
        }, (error, token) => {
            if (error) {
                logging_1.default.error(NAMESPACE, 'JWT signing error', error);
                callback(error, null);
            }
            else {
                // Ensure token is either string or null
                callback(null, token !== null && token !== void 0 ? token : null);
            }
        });
    }
    catch (error) {
        // if (error instanceof Error) {
        logging_1.default.error(NAMESPACE, 'An error occurred while signing the JWT', error);
        callback(error, null);
    }
};
exports.default = signJWT;
//# sourceMappingURL=signJWT.js.map