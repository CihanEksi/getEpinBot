import { WEB_SITE_NAMES } from "../enums/webSite.enum";
import { GeneralResponseInterface } from "../interfaces/response/general.interface";
import { getKsoProducts } from "./kso.cronjons";

const getWebSiteProducts = async (
    webSiteName: (typeof WEB_SITE_NAMES)[keyof typeof WEB_SITE_NAMES],
): Promise<GeneralResponseInterface> => {
    switch (webSiteName) {
        case WEB_SITE_NAMES.KSO:
            const result = await getKsoProducts();
            if (result.success === false) {
                return result;
            }
            return {
                success: true,
                message: "Products are fetched successfully",
                data: result.data,
            };
        default:
            return {
                success: false,
                message: "Web site is not found",
                data: [],
            };
    }
};

export { getWebSiteProducts };
