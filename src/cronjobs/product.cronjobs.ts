import { WEB_SITE_NAMES } from "../enums/webSite.enum";
import { GeneralResponseInterface } from "../interfaces/response/general.interface";
import { WebSiteProductInterface } from "../interfaces/response/productResponse.interface";
import { IWebSiteNames } from "../interfaces/webSites.interface";
import { WebSite } from "../models";
import { updateKsoProducts } from "./kso.cronjons";

const getWebSiteProducts = async (webSiteName: IWebSiteNames): Promise<WebSiteProductInterface> => {
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
        default:
            console.log("Web site is not found", webSiteName);
            return {
                success: false,
                message: "Web site is not found",
                data: [],
            };
    }
};

export { getWebSiteProducts };
