"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const auth_1 = require("middlewares/auth");
const router = express_1.default.Router();
// Define routes
router.post('/users/register', user_1.default.register);
router.post('/users/login', user_1.default.login);
router.patch('/users/', auth_1.checkAuth, (0, auth_1.hasPermission)('create_user'), user_1.default.createUser);
router.patch('/users/:id', auth_1.checkAuth, (0, auth_1.hasPermission)('update_user'), user_1.default.editUser);
router.delete('/users/:id', auth_1.checkAuth, (0, auth_1.hasPermission)('delete_user'), user_1.default.deleteUser);
router.post('/users/logout', auth_1.checkAuth, user_1.default.logout);
router.get('/users', auth_1.checkAuth, (0, auth_1.hasPermission)('read_users'), user_1.default.getAllUsers);
// Export router
exports.default = router;
//# sourceMappingURL=user.js.map