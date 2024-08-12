import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
// import User from '../models/user';
import signJWT from '../functions/signJWT'
import { createUserValidator, loginValidator, registerValidator, updateUserValidator } from '../schema/user';
import { UserModel } from '../models/user';
import IUser from '../interfaces/user';

const NAMESPACE = 'User';


// Function to register a user
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate request
        const { value, error } = registerValidator.validate(req.body);
        if (error) {
            console.error('Validation Error:', error.details);
            return res.status(422).json({ error: error.details });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hashSync(value.password, 10);
        console.log('Hashed Password:', hashedPassword);

        // Create new user
        const user = await UserModel.create({
            ...value,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });
        console.log('User Created:', user);

        return res.status(201).json({ message: 'User is Registered', user });
    } catch (error) {
        console.error('Registration Error:', error);
        next(error);
    }
};

// Function to login (token)
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate request
        const { value, error } = loginValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // Find user by username or email
        const user = await UserModel.findOne({
            $or: [
                { userName: value.userName },
                { email: value.email },
            ]
        });

        if (!user) {
            return res.status(401).json('User Not Found');
        }
        // Check password
        const isMatch = bcryptjs.compareSync(value.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        // Convert user document to plain object
        const users = user.toObject() as IUser;
        // Sign JWT
        signJWT(users, (signError, token) => {
            if (signError) {
                return res.status(500).json({ error: 'Failed to sign JWT' });
            }

            if (token) {
                return res.status(200).json({ token });
            }
        });
    } catch (error) {
        next(error);
    }
};



export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate request
        const { value, error } = createUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Encrypt user password
        const hashedPassword = bcryptjs.hashSync(value.password, 10);
        // Create user
        await UserModel.create({
            ...value,
            password: hashedPassword
        });
        // Return response
        res.status(201).json('User Created');
    } catch (error) {
        next(error);
    }
}

// Function to edit user
export const editUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
            // Validate request
            const { value, error } = updateUserValidator.validate(req.body);
            if (error) {
                return res.status(422).json(error);
            }
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.status(200).json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        next(error)
    }
};



// Function to delete a user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const  userId  = req.params.id;

    try {
        const user = await UserModel.findByIdAndDelete(userId).exec();

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
      next(error)
    }
};



// Logout function
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ message: 'User logged out successfully' });
        });
    } catch (error) {
        next(error);
    }
};



// Function to get all users
export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    UserModel.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users,
                count: users.length
            });
        })
        .catch((error) => {
        next(error)
        });
};

