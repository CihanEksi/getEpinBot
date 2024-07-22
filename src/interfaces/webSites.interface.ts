import { WEB_SITE_NAMES } from "../enums/webSite.enum";

interface IWebSite {
    name: string;
    url: string;
    readyToUse?: boolean;
}

type IWebSiteNames = (typeof WEB_SITE_NAMES)[keyof typeof WEB_SITE_NAMES];

export { IWebSite, IWebSiteNames };
