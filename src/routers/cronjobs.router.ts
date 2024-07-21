import express, { Router, Request, Response } from "express";
import { errorHandler } from "../middlewares/tryCatch.middleware";
import { validateSchema } from "../middlewares/validation.middleware";
import cronjobValidations from "../validations/cronjob.validations";
import { updateWebsiteProductsPayload } from "../interfaces/requests/cronjob.interface";
import { GeneralResponseInterface } from "../interfaces/response/general.interface";

const router: Router = express.Router();

router.post(
    "/get-products",
    validateSchema(cronjobValidations.updateWebsiteProductsSchema),
    errorHandler(async (req: updateWebsiteProductsPayload, res: Response) => {
        const body = req.body;
        res.send({
            success: true,
            message: "Products are fetched successfully",
            data: [],
        });
    }),
);

export default router;
