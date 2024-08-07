"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("./config/logging"));
const user_1 = __importDefault(require("./router/user"));
const hazardtypes_1 = __importDefault(require("./router/hazardtypes"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config/config"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const auth_controller_1 = require("controllers/auth.controller");
const auth_controller_2 = require("controllers/auth.controller");
dotenv_1.default.config();
const NAMESPACE = 'Server';
const router = (0, express_1.default)();
// Connecting to mongodb
mongoose_1.default.connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then(() => {
    logging_1.default.info(NAMESPACE, 'Connected to Database');
})
    .catch((error) => {
    logging_1.default.error(NAMESPACE, 'Database connection error', error);
});
// Log the request
router.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        //Log the response
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
//security middleware
router.use((0, cors_1.default)());
//Parse the body of the request 
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
// Rules of the API
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
router.use('/users', user_1.default);
router.use('/hazard', hazardtypes_1.default);
router.use('/api', user_1.default);
router.use('api', auth_controller_2.resetPasswordController);
router.use('api', auth_controller_1.resetPasswordRequestController);
// Error handling for not found routes
router.use((req, res, next) => {
    const error = new Error('Not found');
});
const httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));
// Error handling middleware
router.use((error, req, res, next) => {
    logging_1.default.error(NAMESPACE, error.message, error);
    return res.status(500).json({
        message: error.message
    });
});
//# sourceMappingURL=index.js.map