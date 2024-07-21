import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateSchema = (schema: Joi.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validate: {
            body?: any;
            query?: any;
            params?: any;
        } = {};
        if (Object.keys(req.body).length > 0) {
            validate.body = req.body;
        }
        if (Object.keys(req.query).length > 0) {
            validate.query = req.query;
        }
        if (Object.keys(req.params).length > 0) {
            validate.params = req.params;
        }
        const { error } = schema.validate(validate);

        if (error) {
            const validationErrors = error.details.map(err => err.message);
            res.status(422).json({ errors: validationErrors });
            return;
        }

        next();
    };
};
