import { Request } from "express";

interface updateWebsiteProductsPayload extends Request {
    body: {
        webSiteName: string;
    };
}
export { updateWebsiteProductsPayload };
