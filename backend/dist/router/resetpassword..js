"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotpasswordRouter = void 0;
const auth_controller_1 = require("controllers/auth.controller");
const express_1 = require("express");
exports.forgotpasswordRouter = (0, express_1.Router)();
exports.forgotpasswordRouter.post('users/forgotpassword', auth_controller_1.resetPasswordRequestController);
exports.forgotpasswordRouter.patch('users/resetpassword/:token', auth_controller_1.resetPasswordController);
//# sourceMappingURL=resetpassword..js.map