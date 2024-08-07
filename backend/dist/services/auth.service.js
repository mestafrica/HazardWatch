"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = void 0;
const user_1 = __importDefault(require("../models/user"));
const token_1 = require("../models/token");
const sendEmail_1 = __importDefault(require("utils/emails/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// const JWTSecret: string = process.env.JWT_SECRET || '';
const JWTSecret = process.env.SERVER_TOKEN_SECRET || '';
const bcryptSalt = 10; // adjust the salt value as needed
//set up the password reset request      //Get user based on posted email
const requestPasswordReset = (req_1, res_1, next_1, _a) => __awaiter(void 0, [req_1, res_1, next_1, _a], void 0, function* (req, res, next, { email }) {
    const user = yield user_1.default.findOne({ email });
    //if user does not exist exist,pass error
    if (!user) {
        throw new Error('User does not exist');
    }
    let token = yield token_1.Token.findOne({ userId: user._id });
    if (token) {
        yield token.deleteOne();
    }
    //generate random plain reset token to be sent to user //specify size 32* and type hex*
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    //create a hash of the token 
    const hash = yield bcrypt_1.default.hash(resetToken, bcryptSalt);
    //save the id,token and time created in the database.
    yield new token_1.Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now() * 10 * 60 * 1000, //expires in 10mins
    }).save();
    //Send the token back to the user's email
    //reset password link contains the token and userId which will be used to verify the user's identity before reseting the password
    const resetUrl = `$(req.protocol)://$(req.get('host))/api/v1/users/resetPassword/${resetToken}`;
    const message = 'We have received the password request.Please use the link below to reset your password.\n\n${resetUrl}\n\nThis reset password will be valid for only 10 minutes.';
    try {
        yield (0, sendEmail_1.default)({
            email: user.email,
            subject: 'Password change received',
            message: message,
        });
        return res.status(200).json({
            status: 'success',
            message: 'password reset link sent to the user'
        });
    }
    catch (error) {
        user.save({ validateBeforeSave: false });
        new Error('There was an error sending password.Please try again later');
    }
});
exports.requestPasswordReset = requestPasswordReset;
//send back the token,new password, and userId
const resetPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, token, password }) {
    let passwordResetToken = yield token_1.Token.findOne({ userId });
    if (!passwordResetToken) {
        throw new Error('Invalid or expired password reset token');
    }
    ;
    //compare the token the server received with the hashed version in the database
    const isValid = yield bcrypt_1.default.compare(token, passwordResetToken.token);
    if (!isValid) {
        throw new Error('Invalid or expired password reset token');
    }
    //hash the new password
    const hash = yield bcrypt_1.default.hash(password, bcryptSalt);
    //update user account with the new password
    yield user_1.default.updateOne({ _id: userId }, { $set: { password: hash } }, { new: true });
    const user = yield user_1.default.findById(userId);
    try {
        yield (0, sendEmail_1.default)({
            email: user.email,
            subject: 'Password change received',
            message: "Kindly use the link to change your password.",
        });
    }
    catch (error) {
    }
    yield passwordResetToken.deleteOne();
    return true;
});
exports.resetPassword = resetPassword;
// export default {
//   resetPassword,
//   requestPasswordReset
// }
//# sourceMappingURL=auth.service.js.map