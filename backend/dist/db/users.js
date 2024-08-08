"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByEmail = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUser = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define schema
const UserSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
//function to get users
const getUser = () => exports.UserModel.find();
exports.getUser = getUser;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => exports.UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => exports.UserModel.findOne({ id });
exports.getUserById = getUserById;
const createUser = (values) => new exports.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = (id) => exports.UserModel.findOne({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserByEmail = (id, values) => exports.UserModel.findByIdAndUpdate(id, values);
exports.updateUserByEmail = updateUserByEmail;
//# sourceMappingURL=users.js.map