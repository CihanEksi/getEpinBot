import { Schema } from "mongoose";

interface IProduct extends Document {
    name: string;
    price: number;
    description?: string;
    url?: string;
    websiteId: Schema.Types.ObjectId;
}

export { IProduct };
