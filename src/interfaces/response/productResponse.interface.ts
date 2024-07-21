import { IProduct } from "../products.interface";
import { GeneralResponseInterface } from "./general.interface";

interface ProductResponseInterface extends GeneralResponseInterface {
    data: IProduct[];
}

interface ProductDetailResponseInterface extends GeneralResponseInterface {
    data: IProduct | null;
}

interface UpdateProductResponseInterface extends GeneralResponseInterface {
    data: IProduct | null;
}

interface DeleteProductResponseInterface extends GeneralResponseInterface {
    data: {
        _id: string;
    };
}

export {
    ProductResponseInterface,
    ProductDetailResponseInterface,
    UpdateProductResponseInterface,
    DeleteProductResponseInterface,
};
