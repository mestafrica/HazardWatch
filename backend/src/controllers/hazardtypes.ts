import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import HazardType from '../models/hazardtypes';

const NAMESPACE = 'HazardType';

const createHazardType = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const _hazardType = new HazardType({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return _hazardType
        .save()
        .then((hazardType) => {
            return res.status(201).json({
                hazardType
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllHazardTypes = (req: Request, res: Response, next: NextFunction) => {
    HazardType.find()
        .exec()
        .then((hazardTypes) => {
            return res.status(200).json({
                hazardTypes: hazardTypes,
                count: hazardTypes.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getHazardTypeById = (req: Request, res: Response, next: NextFunction) => {
    const hazardTypeId = req.params.id;

    HazardType.findById(hazardTypeId)
        .exec()
        .then((hazardType) => {
            if (hazardType) {
                return res.status(200).json({
                    hazardType
                });
            } else {
                return res.status(404).json({
                    message: 'HazardType not found'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const updateHazardType = (req: Request, res: Response, next: NextFunction) => {
    const hazardTypeId = req.params.id;

    HazardType.findById(hazardTypeId)
        .exec()
        .then((hazardType) => {
            if (hazardType) {
                hazardType.set(req.body);

                hazardType.save()
                    .then((result) => {
                        return res.status(200).json({
                            hazardType: result
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: error.message,
                            error
                        });
                    });
            } else {
                return res.status(404).json({
                    message: 'HazardType not found'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const deleteHazardType = (req: Request, res: Response, next: NextFunction) => {
    const hazardTypeId = req.params.id;

    HazardType.findByIdAndDelete(hazardTypeId)
        .exec()
        .then((hazardType) => {
            if (hazardType) {
                return res.status(200).json({
                    message: 'Hazard Type Deleted'
                });
            } else {
                return res.status(404).json({
                    message: 'Hazard Type not found'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createHazardType, getAllHazardTypes, getHazardTypeById, updateHazardType, deleteHazardType };
