import { IWebSite } from "../webSites.interface";
import { GeneralResponseInterface } from "./general.interface";

interface WebSiteResponseInterface extends GeneralResponseInterface {
    data: IWebSite[];
}

interface WebSiteDetailResponseInterface extends GeneralResponseInterface {
    data: IWebSite | null;
}

interface UpdateWebSiteResponseInterface extends GeneralResponseInterface {
    data: IWebSite | null;
}

interface DeleteWebSiteResponseInterface extends GeneralResponseInterface {
    data: {
        _id: string;
    };
}

export {
    WebSiteResponseInterface,
    WebSiteDetailResponseInterface,
    UpdateWebSiteResponseInterface,
    DeleteWebSiteResponseInterface,
};
