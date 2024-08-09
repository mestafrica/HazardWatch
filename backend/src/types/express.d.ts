// import  IUser  from '../interfaces/user'; 

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser;
//     }
//   }
// }


import session from 'express-session';
// import  IUser  from '../interfaces/user';

declare module 'express-session' {
    interface SessionData {
        userId?: string;
        // Add any other properties you need here
    }
}

declare module 'express' {
    interface Request {
        session: session.Session & Partial<session.SessionData>;
    }
}