import express, { Request, Response, NextFunction} from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import logging from './config/logging'
import userRoutes from './router/user'
import hazardRoutes from './router/hazardtypes'
import hazardReport from './router/hazardreport'
import dotenv from 'dotenv';
import config from './config/config'
import cors from "cors";
import "express-async-errors";
import { forgotPassword, resetPassword,verifyResetToken } from '../src/controllers/auth';


dotenv.config();

const NAMESPACE = 'Server';
const app = express();


// Connecting to mongodb
mongoose.connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info(NAMESPACE, 'Connected to Database');
  })
  .catch((error) => {
    logging.error(NAMESPACE, 'Database connection error', error);
  });

// Log the request
app.use((req, res, next) => {
   logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

   res.on('finish', () => {
       //Log the response
       logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
   });

   next();
});


//security middleware
app.use(cors());

//Parse the body of the request 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Rules of the API
app.use((req, res, next) => {
   // Set CORS headers
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

   // Handle preflight requests
   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
   }
   
   // Pass to next middleware or route handler
   next();
});


// Use Route

app.use('/users',userRoutes);
app.use('/hazard',hazardRoutes);
app.use('/hazardreport',hazardReport);
app.use('/api', userRoutes);
app.use('/api', forgotPassword)
app.use('/api', resetPassword)
app.use('/api', verifyResetToken)





// Error handling for not found routes
app.use((req, res, next) =>{
   const error = new Error('Not found');

})

// const httpServer = http.createServer(router);

// httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

// Listen for incoming requests
const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

   
// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logging.error(NAMESPACE, error.message, error);
  return res.status(500).json({
    message: error.message
  });
});