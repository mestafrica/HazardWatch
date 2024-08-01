import jwt, { sign } from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import IUser from '../interfaces/user';

const NAMESPACE = 'Auth';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    const timeSinchEpoch = new Date().getTime();
    const expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    logging.info(NAMESPACE, `Attempting to sign for token for ${user.userName}`);
    try {
        jwt.sign(
            {
                userName: user.userName
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    if (error instanceof Error) {
                        callback(error, null)
                    } else {
                        logging.error(NAMESPACE, 'An unknown error occurred', error);
                        callback(new Error('An unknown error occurred'), null);
                    }

                } else if (token) {
                    callback(null, token);
                } else {
                    logging.error(NAMESPACE, 'Token generation failed');
                    callback(new Error('Token generation failed'), null);
                }
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            logging.error(NAMESPACE, error.message, error);
            callback(error, null);
        } else {
            logging.error(NAMESPACE, 'An unknown error occurred', error);
            callback(new Error('An unknown error occurred'), null);
        }

    }
};

export default signJWT;