"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hazardtypes_1 = __importDefault(require("../models/hazardtypes"));
const hazardtypes_2 = require("../schema/hazardtypes");
const NAMESPACE = 'HazardType';
const createHazardType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const _hazardType = new hazardtypes_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name
    });
    try {
        // Validate the data provided to create a hazardtype
        const { error, value } = hazardtypes_2.hazardtypeSchema.validate(req.body);
        if (error) {
            console.error('Validation Error:', error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }
        const name = value.name;
        console.log('Validation successful. Checking if a hazard type is created:', name);
        const hazardType = yield _hazardType.save();
        return res.status(400).json({
            message: 'Hazard Type created successfully', hazardType
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllHazardTypes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the data provided to get all hazardtypes
        const { error, value } = hazardtypes_2.hazardtypeSchema.validate(req.body);
        if (error) {
            console.error('Validation Error:', error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }
        const name = value.name;
        console.log('Validation successful. Checking to get all hazard types:', name);
        const hazardTypes = yield hazardtypes_1.default.find().exec();
        return res.status(200).json({
            message: 'All the Hazard Types', hazardTypes,
            count: hazardTypes.length
        });
    }
    catch (error) {
        next(error);
    }
});
const getHazardTypeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hazardTypeId = req.params.id;
    try {
        // Validate the data provided for one hazardtype
        const { error, value } = hazardtypes_2.hazardtypeSchema.validate(req.body);
        if (error) {
            console.error('Validation Error:', error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }
        const name = value.name;
        console.log('Validation successful. Checking to get one hazard type:', name);
        const hazardType = yield hazardtypes_1.default.findById(hazardTypeId).exec();
        if (hazardType) {
            return res.status(200).json({
                message: 'Your Specific Hazard Type', hazardType
            });
        }
        else {
            return res.status(404).json({
                message: 'Hazard Type not found'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const updateHazardType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hazardTypeId = req.params.id;
    try {
        // Validate the data to update a hazardtype
        const { error, value } = hazardtypes_2.hazardtypeSchema.validate(req.body);
        if (error) {
            console.error('Validation Error:', error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }
        const name = value.name;
        console.log('Validation successful. Checking to update a hazard type:', name);
        const hazardType = yield hazardtypes_1.default.findById(hazardTypeId).exec();
        if (hazardType) {
            hazardType.set(req.body);
            const result = yield hazardType.save();
            return res.status(200).json({
                message: 'Your Specific Hazard Type', hazardType: result
            });
        }
        else {
            return res.status(404).json({
                message: 'HazardType not found'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteHazardType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hazardTypeId = req.params.id;
    try {
        // Validate the data to delete a hazardtype
        const { error, value } = hazardtypes_2.hazardtypeSchema.validate(req.params.id);
        if (error) {
            console.error('Validation Error:', error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }
        const name = value.name;
        console.log('Validation successful. Checking to delete a hazard type:', name);
        const hazardType = yield hazardtypes_1.default.findByIdAndDelete(hazardTypeId).exec();
        if (hazardType) {
            return res.status(200).json({
                message: 'Hazard Type Deleted'
            });
        }
        else {
            return res.status(404).json({
                message: 'Hazard Type not found'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = { createHazardType, getAllHazardTypes, getHazardTypeById, updateHazardType, deleteHazardType };
//# sourceMappingURL=hazardtypes.js.map