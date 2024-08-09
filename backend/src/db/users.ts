import mongoose from 'mongoose';

// Define schema
const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

// Create model
export const UserModel = mongoose.model('User', UserSchema);

// Function to get all users
export const getUser = () => UserModel.find();

// Function to get a user by email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Function to get a user by session token
export const getUserBySessionToken = (sessionToken: string) => 
    UserModel.findOne({ 'authentication.sessionToken': sessionToken });

// Function to get a user by ID
export const getUserById = (id: string) => UserModel.findById(id);

// Function to create a new user
export const createUser = (values: Record<string, any>) => 
    new UserModel(values).save().then((user) => user.toObject());

// Function to delete a user by ID
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

// Function to update a user by ID
export const updateUserById = (id: string, values: Record<string, any>) => 
    UserModel.findByIdAndUpdate(id, values, { new: true });
