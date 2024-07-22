import { Schema } from "mongoose";

interface IProduct {
    productIdOnWebSite: string;
    name: string;
    price: number;
    description?: string;
    url?: string;
    websiteId: Schema.Types.ObjectId;
    stock: number;
    categoryId: string;
    tax: number | null;
}

export { IProduct };
