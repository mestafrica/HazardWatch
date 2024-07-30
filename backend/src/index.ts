import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import logging from './config/logging'
import userRoutes from './router/user'
import hazardRoutes from './router/hazardtypes'
import dotenv from 'dotenv';
import config from './config/config'



dotenv.config();

const NAMESPACE = 'Server';
const router = express();


// Connecting to mongodb
mongoose.connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info(NAMESPACE, 'Connected to Database');
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

// Log the request

router.use((req, res, next) => {
   /** Log the req */
   logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

   res.on('finish', () => {
       /** Log the res */
       logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
   });

   next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// Rules of our API
router.use((req, res, next) => {
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
router.use('/users',userRoutes)
router.use('/hazard',hazardRoutes)


// Error handling
router.use((req, res, next) =>{
   const error = new Error('Not found');
})

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

