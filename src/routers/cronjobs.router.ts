import express, { Router, Request, Response } from "express";
import { errorHandler } from "../middlewares/tryCatch.middleware";
import { validateSchema } from "../middlewares/validation.middleware";
import cronjobValidations from "../validations/cronjob.validations";
import { updateWebsiteProductsPayload } from "../interfaces/requests/cronjob.interface";
import { GeneralResponseInterface } from "../interfaces/response/general.interface";
import { getWebSiteProducts } from "../cronjobs/product.cronjobs";
import { IWebSiteNames } from "../interfaces/webSites.interface";

const router: Router = express.Router();

router.post(
    "/update-products",
    validateSchema(cronjobValidations.updateWebsiteProductsSchema),
    errorHandler(async (req: updateWebsiteProductsPayload, res: Response) => {
        const body = req.body;
        const webSiteName = body.webSiteName as IWebSiteNames;

        const webSiteProducts = await getWebSiteProducts(webSiteName);
        if (webSiteProducts.success === false) {
            return res.status(400).send(webSiteProducts);
        }
        return res.send({
            success: true,
            message: "Products are fetched successfully",
            data: [],
        });
    }),
);

export default router;
