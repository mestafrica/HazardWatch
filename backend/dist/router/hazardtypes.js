"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const hazardtypes_1 = __importDefault(require("../controllers/hazardtypes"));
const extractJWT_1 = require("middlewares/extractJWT");
const router = express_1.default.Router();
router.post('/create', extractJWT_1.extractJWT, extractJWT_1.checkAdmin, hazardtypes_1.default.createHazardType);
router.patch('/update/:id', extractJWT_1.extractJWT, extractJWT_1.checkAdmin, hazardtypes_1.default.updateHazardType);
router.delete('/delete/:id', extractJWT_1.extractJWT, extractJWT_1.checkAdmin, hazardtypes_1.default.deleteHazardType);
router.get('/all', hazardtypes_1.default.getAllHazardTypes);
router.get('/:id', hazardtypes_1.default.getHazardTypeById);
module.exports = router;
//# sourceMappingURL=hazardtypes.js.map