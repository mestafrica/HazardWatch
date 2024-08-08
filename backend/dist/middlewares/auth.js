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
exports.hasPermission = exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logging_1 = __importDefault(require("../config/logging"));
const user_1 = __importDefault(require("../models/user"));
const roles_1 = require("../config/roles");
const NAMESPACE = 'Auth';
const checkAuth = (req, res, next) => {
    var _a;
    logging_1.default.info(NAMESPACE, 'Validating token');
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, (error, decoded) => {
            if (error) {
                console.error('JWT verification error:', error);
                return res.status(401).json({
                    message: error.message,
                    error
                });
            }
            else {
                // Log the decoded JWT
                console.log('Decoded JWT:', decoded);
                // Attach decoded token to res.locals for use in subsequent middleware or route handlers
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        console.error('No token provided');
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports.checkAuth = checkAuth;
const hasPermission = (permission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Ensure res.locals.jwt is correctly populated
            const decodedJwt = res.locals.jwt;
            const userId = decodedJwt.id;
            // // Log the JWT payload
            if (!userId) {
                return res.status(401).json('Unauthorized: No user ID provided.');
            }
            // Find user by id
            const user = yield user_1.default.findById(userId);
            if (!user) {
                return res.status(404).json('User not found.');
            }
            // Find user role with permissions
            const userRole = roles_1.roles.find(element => element.role === user.role);
            // // Log the user role
            // console.log('User role:', userRole);
            // Use role to check if the user has permission
            if (userRole && userRole.permissions.includes(permission)) {
                return next();
            }
            else {
                return res.status(403).json('Not authorized!');
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.hasPermission = hasPermission;
//# sourceMappingURL=auth.js.map