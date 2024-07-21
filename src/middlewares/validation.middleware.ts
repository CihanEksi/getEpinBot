import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateSchema = (schema: Joi.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req);

        if (error) {
            const validationErrors = error.details.map(err => err.message);
            res.status(422).json({ errors: validationErrors });
            return;
        }

        next();
    };
};
