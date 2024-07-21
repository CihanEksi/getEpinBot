import { Document, Schema, model } from "mongoose";
import { IProduct } from "../interfaces/products.interface";

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        url: { type: String },
        websiteId: { type: Schema.Types.ObjectId, ref: "Website" },
    },
    {
        timestamps: true,
    },
);

export const Product = model<IProduct>("Product", productSchema);
