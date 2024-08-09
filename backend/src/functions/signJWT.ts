import jwt, { sign } from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import IUser from '../interfaces/user';

const NAMESPACE = 'Auth';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {

    logging.info('Auth', `Attempting to sign for token for ${user.userName}`);

    const payload = {
        id: user._id.toString(), 
        userName: user.userName,
        role: user.role
    };
    try {
        jwt.sign(
            payload,
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: config.server.token.expireTime
            },
            (error, token) => {
                if (error) {
                    logging.error(NAMESPACE, 'JWT signing error', error);
                    callback(error, null)
                } else {
                    // Ensure token is either string or null
                    callback(null, token ?? null);
                }      
            }
    );
} catch (error) {
    // if (error instanceof Error) {
        logging.error(NAMESPACE, 'An error occurred while signing the JWT', error);
        callback(error as Error, null);
    } 
};

export default signJWT;