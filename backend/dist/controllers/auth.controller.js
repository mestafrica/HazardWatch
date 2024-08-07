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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.resetPasswordRequestController = void 0;
const auth_service_1 = require("../services/auth.service");
const resetPasswordRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestPasswordResetService = yield (0, auth_service_1.requestPasswordReset)(req.body.email);
        return res.json(requestPasswordResetService);
    }
    catch (error) {
        next(error);
    }
});
exports.resetPasswordRequestController = resetPasswordRequestController;
const resetPasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resetPasswordService = yield (0, auth_service_1.resetPassword)(
        // req.body.userId,
        req.body.token);
        return res.json(resetPasswordService);
    }
    catch (error) {
        next(error);
    }
});
exports.resetPasswordController = resetPasswordController;
//# sourceMappingURL=auth.controller.js.map