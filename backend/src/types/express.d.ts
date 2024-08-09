import  IUser  from '../interfaces/user'; 

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
