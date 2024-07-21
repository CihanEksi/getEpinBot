import { Product } from "../models";
import { IProduct } from "../interfaces/products.interface";
import { FilterQuery } from "mongoose";
import {
    DeleteProductResponseInterface,
    ProductDetailResponseInterface,
    ProductResponseInterface,
    UpdateProductResponseInterface,
} from "../interfaces/response/productResponse.interface";

export class ProductService {
    async createProduct(product: IProduct): Promise<IProduct> {
        const createdDocument = await Product.create(product);
        return createdDocument;
    }

    async getDetail(query: FilterQuery<IProduct>): Promise<ProductDetailResponseInterface> {
        const data: IProduct | null = await Product.findOne(query).lean();
        return {
            data: data,
            success: true,
            message: "Successfully retrieved product",
        };
    }

    async getAllProducts(query: FilterQuery<IProduct> = {}): Promise<ProductResponseInterface> {
        const data: IProduct[] = await Product.find(query).lean();
        return {
            data: data,
            success: true,
            message: "Successfully retrieved products",
        };
    }

    async updateProduct(_id: string, product: IProduct): Promise<UpdateProductResponseInterface> {
        const updateOne = await Product.updateOne({ _id: _id }, product).lean();
        if (updateOne.modifiedCount === 0) {
            return {
                data: await Product.findOne({ _id: _id }).lean(),
                success: true,
                message: "Successfully updated product",
            };
        }
        return {
            data: null,
            success: false,
            message: "Failed to update product",
        };
    }

    async deleteProduct(_id: string): Promise<DeleteProductResponseInterface> {
        return {
            data: {
                _id: _id,
            },
            success: true,
            message: "Successfully deleted product",
        };
    }
}
