"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = exports.createUserValidator = exports.resetPasswordValidator = exports.forgotPasswordValidator = exports.loginValidator = exports.registerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerValidator = joi_1.default.object({
    name: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required(),
});
exports.loginValidator = joi_1.default.object({
    username: joi_1.default.string(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().required(),
});
exports.forgotPasswordValidator = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.resetPasswordValidator = joi_1.default.object({
    resetToken: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required(),
});
exports.createUserValidator = joi_1.default.object({
    name: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    role: joi_1.default.string().required().valid('admin', 'manager'),
});
exports.updateUserValidator = joi_1.default.object({
    name: joi_1.default.string(),
    role: joi_1.default.string().valid('admin', 'manager'),
});
//# sourceMappingURL=user.js.map