import { NextFunction, Request, Response } from "express";

export const errorHandler = (fn: (req: Request, res: Response) => Promise<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res);
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(500).json({ message: "Internal Server Error" }); // Send generic error response
        } finally {
            // Optional: Cleanup operations that always need to run
        }
    };
};
