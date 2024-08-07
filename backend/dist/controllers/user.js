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
exports.createUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logging_1 = __importDefault(require("../config/logging"));
const user_1 = __importDefault(require("../models/user"));
const signJWT_1 = __importDefault(require("../functions/signJWT"));
const user_2 = require("schema/user");
const NAMESPACE = 'User';
const isErrorWithMessage = (error) => {
    return (typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string');
};
// Function to register a user
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request
    const { value, error } = user_2.registerValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    const { firstName, lastName, email, userName, password, confirmPassword } = req.body;
    // Check for all required fields
    if (!firstName || !lastName || !email || !userName || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        // Hash the password
        const hash = yield bcryptjs_1.default.hashSync(password, 10);
        // Create new user
        const _user = new user_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            firstName,
            lastName,
            email,
            userName,
            password: hash,
            confirmPassword: hash
        });
        // Save the user
        const user = yield _user.save();
        return res.status(201).json({ user });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, 'Error saving user', error);
        const errorMessage = isErrorWithMessage(error) ? error.message : 'Unknown error occurred';
        return res.status(500).json({
            message: errorMessage,
            error
        });
    }
});
// Function to login (token)
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        // Validate request
        const { value, error } = user_2.loginValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const user = yield user_1.default.findOne({ userName })
            .exec();
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        const isMatch = bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Password Mismatch'
            });
        }
        // Sign JWT using the signJWT function
        (0, signJWT_1.default)(user, (signError, token) => {
            if (signError) {
                return res.status(500).json({
                    message: isErrorWithMessage(signError) ? signError.message : 'Unknown error occurred',
                    error: signError
                });
            }
            else if (token) {
                return res.status(200).json({ token });
            }
        });
    }
    catch (err) {
        logging_1.default.error(NAMESPACE, 'Error finding user', err);
        return res.status(500).json({
            message: isErrorWithMessage(err) ? err.message : 'Unknown error occurred',
            error: err
        });
    }
    ;
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request
        const { value, error } = user_2.createUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Encrypt user password
        const hashedPassword = bcryptjs_1.default.hashSync(value.password, 10);
        // Create user
        yield user_1.default.create(Object.assign(Object.assign({}, value), { password: hashedPassword }));
        // Send email to user
        // await mailTransport.sendMail({
        //     to: value.email,
        //     subject: "User Account Created!",
        //     text: `Dear user,\n\nA user account has been created for you with the following credentials.\n\nUsername: ${value.username}\nEmail: ${value.email}\nPassword: ${value.password}\nRole: ${value.role}\n\nThank you!`,
        // });
        // Return response
        res.status(201).json('User Created');
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
// Function to edit user
const editUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request
        const { value, error } = user_2.updateUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.status(200).json({
            message: 'User updated successfully',
            user
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: 'Error processing request',
            error: error instanceof Error ? error.message : String(error)
        });
    }
});
// Function to delete a user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_1.default.findByIdAndDelete(userId).exec();
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.status(200).json({
            message: 'User deleted successfully'
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: 'Error processing request',
            error: error instanceof Error ? error.message : String(error)
        });
    }
});
// Logout function
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Invalidate token (client-side logic is needed to actually remove the token)
        return res.status(200).json({
            message: 'User logged out successfully'
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: 'Error processing request',
            error: error instanceof Error ? error.message : String(error)
        });
    }
});
// Function to get all users
const getAllUsers = (req, res, next) => {
    user_1.default.find()
        .select('-password')
        .exec()
        .then((users) => {
        return res.status(200).json({
            users,
            count: users.length
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, 'Error getting users', error);
        return res.status(500).json({
            message: isErrorWithMessage(error) ? error.message : 'Unknown error occurred',
            error
        });
    });
};
// Function for an admin to create a user
exports.default = { register, login, createUser: exports.createUser, logout, editUser, deleteUser, getAllUsers };
//# sourceMappingURL=user.js.map