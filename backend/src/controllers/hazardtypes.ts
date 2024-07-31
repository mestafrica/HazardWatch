import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import HazardType from '../models/hazardtypes';

const NAMESPACE = 'HazardType';

const createHazardType = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const _hazardType = new HazardType({
        _id: new mongoose.Types.ObjectId(),
        name
    });
    try {
        const hazardType = await _hazardType.save();
        return res.status(400).json({
            message: 'Hazard Type created successfully',     hazardType
        });
    } catch (error) {
        next(error); 
    }
};



const getAllHazardTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hazardTypes = await HazardType.find().exec();

        return res.status(200).json({
            message: 'All the Hazard Types',  hazardTypes,
            count: hazardTypes.length
        });
    } catch (error) {
        // return res.status(500).json({
        //     message: error.message,
        //     error
        // });
        next(error); 
    }
};


const getHazardTypeById = async (req: Request, res: Response, next: NextFunction) => {
    const hazardTypeId = req.params.id;

    try {
        const hazardType = await HazardType.findById(hazardTypeId).exec();

        if (hazardType) {
            return res.status(200).json({
              message: 'Your Specific Hazard Type',hazardType
            });
        } else {
            return res.status(404).json({
                message: 'Hazard Type not found'
            });
        }
    } catch (error) {
        // return res.status(500).json({
        //     message: error.message,
        //     error
        // });
    }
};

const updateHazardType = async (req: Request, res: Response, next: NextFunction) => {
    const hazardTypeId = req.params.id;

    try {
        const hazardType = await HazardType.findById(hazardTypeId).exec();

        if (hazardType) {
            hazardType.set(req.body);

            const result = await hazardType.save();

            return res.status(200).json({
                message: 'Your Specific Hazard Type',                hazardType: result
            });
        } else {
            return res.status(404).json({
                message: 'HazardType not found'
            });
        }
    } catch (error) {
        // return res.status(500).json({
        //     message: error.message,
        //     error
        // });
        next(error)
    }
};


const deleteHazardType = async (req: Request, res: Response, next: NextFunction) => {
    const hazardTypeId = req.params.id;

    try {
        const hazardType = await HazardType.findByIdAndDelete(hazardTypeId).exec();

        if (hazardType) {
            return res.status(200).json({
                message: 'Hazard Type Deleted'
            });
        } else {
            return res.status(404).json({
                message: 'Hazard Type not found'
            });
        }
    } catch (error) {
        // return res.status(500).json({
        //     message: error.message,
        //     error
        // });
        next(error)
    }
};

export default { createHazardType, getAllHazardTypes, getHazardTypeById, updateHazardType, deleteHazardType };
