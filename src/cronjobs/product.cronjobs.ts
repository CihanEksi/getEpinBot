import { WEB_SITE_NAMES } from "../enums/webSite.enum";
import { GeneralResponseInterface } from "../interfaces/response/general.interface";
import { WebSiteProductInterface } from "../interfaces/response/productResponse.interface";
import { IWebSiteNames } from "../interfaces/webSites.interface";
import { WebSite } from "../models";
import { updateKsoProducts } from "./kso.cronjobs";
import { updateMidasBuyProducts } from "./midas.cronjobs";

const updateWebSiteProducts = async (
    webSiteName: IWebSiteNames,
): Promise<WebSiteProductInterface> => {
    const response = {
        success: false,
        message: "Something went wrong on getWebSiteProducts",
        data: [],
    };
    switch (webSiteName) {
        case WEB_SITE_NAMES.KSO:
            const findWebSite = await WebSite.findOne({ name: webSiteName }).select("_id").lean();
            if (!findWebSite) {
                response.message = "Web site is not found on getWebSiteProducts";
                return response;
            }
            const webSiteId = findWebSite._id;
            const result = await updateKsoProducts(webSiteId);
            if (result.success === false) {
                return result;
            }

            return {
                success: true,
                message: "Products are fetched successfully",
                data: result.data,
            };
        case WEB_SITE_NAMES.MidasBuy:
            const findWebSiteMidasBuy = await WebSite.findOne({ name: webSiteName })
                .select("_id")
                .lean();
            if (!findWebSiteMidasBuy) {
                response.message = "Web site is not found on getWebSiteProducts";
                return response;
            }
            const webSiteIdMidasBuy = findWebSiteMidasBuy._id;

            const resultMidasBuy = await updateMidasBuyProducts(webSiteIdMidasBuy);

            if (resultMidasBuy.success === false) {
                return resultMidasBuy;
            }

            return {
                success: true,
                message: "Products are fetched successfully",
                data: resultMidasBuy.data,
            };
        default:
            console.log("Web site is not found", webSiteName);
            return {
                success: false,
                message: "Web site is not found",
                data: [],
            };
    }
};

export { updateWebSiteProducts };
