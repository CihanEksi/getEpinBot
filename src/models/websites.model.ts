import { Schema, model } from "mongoose";
import { IWebSite } from "../interfaces/webSites.interface";

const websideSchema = new Schema<IWebSite>(
    {
        name: { type: String, required: true },
        url: { type: String, required: true },
        readyToUse: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

export const WebSite = model("Website", websideSchema);
