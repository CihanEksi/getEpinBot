import { GeneralResponseInterface } from "../interfaces/response/general.interface";
import axios from "axios";
import { WebSiteProductInterface } from "../interfaces/response/productResponse.interface";
import { xmlToJSON } from "../utils/xml.parser";
import fs from "fs";
import { IProduct } from "../interfaces/products.interface";
import { ObjectId } from "mongodb";
import { Product } from "../models";
import puppeteer from "../libraries/pupeteer.lib"

interface KSOXMLItem {
    merchantItemId: number;
    merchantItemCategoryId: number;
    merchantItemCategoryName: string;
    brand: string;
    model: string;
    itemTitle: string;
    merchantItemField: string;
    itemUrl: string;
    priceEft: number;
    pricePlusTax: number;
    itemUrlMobile: string;
    itemImageUrl: string;
    shippingFee: number;
    stockStatus: number;
    stockDetail: string;
    shippingDay: number;
    shippingDetail: string;
    typeOfWarranty: number;
    warrantyPeriod: number;
    eans: any;
    specs: string;
    installments: string;
    shippings: string;
}

const ksoXMLtoProductMapper = (xmlItem: KSOXMLItem, webSiteId: ObjectId): IProduct => {
    return {
        productIdOnWebSite: xmlItem.merchantItemId.toString(),
        name: xmlItem.itemTitle,
        price: xmlItem.pricePlusTax,
        description: xmlItem.merchantItemField,
        url: xmlItem.itemUrl,
        websiteId: webSiteId as any,
        stock: xmlItem.stockStatus,
        categoryId: xmlItem.merchantItemCategoryId.toString(),
        tax: xmlItem.pricePlusTax - xmlItem.priceEft,
    };
};

const getKsoProducts = async (webSiteId: ObjectId): Promise<WebSiteProductInterface> => {
    const xmlAddress = "https://www.kabasakalonline.com/cimri.xml";

    // Fetch the XML data from the given address
    const response = await axios.get(xmlAddress, {
        headers: {
            "Content-Type": "application/xml",
        },
    });

    // Parse the XML data
    const xmlData = response.data;
    const parsedXML = xmlToJSON(xmlData);

    const merchantItems = parsedXML.MerchantItems.MerchantItem as KSOXMLItem[];
    const products = merchantItems.map(xmlItem => ksoXMLtoProductMapper(xmlItem, webSiteId));

    return {
        success: true,
        message: "Products are fetched successfully",
        data: products,
    };
};

const updateKsoProducts = async (webSiteId: ObjectId): Promise<GeneralResponseInterface> => {
    if (!webSiteId) {
        return {
            success: false,
            message: "Website ID is required",
            data: [],
        };
    }
    const result = await getKsoProducts(webSiteId);
    if (result.success === false) {
        return result;
    }
    if (result.data.length === 0) {
        return {
            success: false,
            message: "No products to update",
            data: [],
        };
    }
    await Product.deleteMany({ websiteId: webSiteId });
    const createdProducts = await Product.insertMany(result.data);
    if (!createdProducts) {
        return {
            success: false,
            message: "Failed to create products",
            data: [],
        };
    }

    return {
        success: true,
        message: "Products are created successfully",
        data: createdProducts,
    };
};


export { getKsoProducts, updateKsoProducts };
