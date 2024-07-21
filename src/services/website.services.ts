import { WebSite } from "../models";
import { IWebSite } from "../interfaces/webSites.interface";
import { FilterQuery } from "mongoose";
import {
    DeleteWebSiteResponseInterface,
    WebSiteDetailResponseInterface,
    WebSiteResponseInterface,
    UpdateWebSiteResponseInterface,
} from "../interfaces/response/webSites.interface";

export class WebSiteService {
    async createWebSite(website: IWebSite): Promise<IWebSite> {
        const createdDocument = await WebSite.create(website);
        return createdDocument;
    }

    async getDetail(query: FilterQuery<IWebSite>): Promise<WebSiteDetailResponseInterface> {
        const data: IWebSite | null = await WebSite.findOne(query).lean();
        return {
            data: data,
            success: true,
            message: "Successfully retrieved WebSite",
        };
    }

    async getAllWebSites(query: FilterQuery<IWebSite> = {}): Promise<WebSiteResponseInterface> {
        const data: IWebSite[] = await WebSite.find(query).lean();
        return {
            data: data,
            success: true,
            message: "Successfully retrieved WebSites",
        };
    }

    async updateWebSite(_id: string, webSite: IWebSite): Promise<UpdateWebSiteResponseInterface> {
        const updateOne = await WebSite.updateOne({ _id: _id }, webSite).lean();
        if (updateOne.modifiedCount === 0) {
            return {
                data: await WebSite.findOne({ _id: _id }).lean(),
                success: true,
                message: "Successfully updated WebSite",
            };
        }
        return {
            data: null,
            success: false,
            message: "Failed to update WebSite",
        };
    }

    async deleteWebSite(_id: string): Promise<DeleteWebSiteResponseInterface> {
        return {
            data: {
                _id: _id,
            },
            success: true,
            message: "Successfully deleted WebSite",
        };
    }
}
