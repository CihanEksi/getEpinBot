import { GeneralResponseInterface } from "../interfaces/response/general.interface";
import axios from "axios";
import { WebSiteProductInterface } from "../interfaces/response/productResponse.interface";
import { xmlToJSON } from "../utils/xml.parser";
import fs from "fs";
import { IProduct } from "../interfaces/products.interface";
import { ObjectId } from "mongodb";
import { Product } from "../models";
import puppeteer from "../libraries/pupeteer.lib";
import parse from "node-html-parser";
import environments from "../constants/environments";

type midasMainResponse = {
    gameDataList: {
        href: string;
        url: string;
        appid: string;
        titleName: string;
    }[];
};

type midasProductResponse = {
    shelf: {
        products: {
            app_id: string;
            icon: string;
            prices: {
                amount: string;
                // display_amount: string;
                payment_channel_id: string;
                available_channel_ids: string[];
            }[];
            game_coins_num: string;
            channel_group: {
                pay_channel: string;
                promotion_list: {
                    gift_list: {
                        name: string;
                        quantity: string;
                    }[];
                }[];
            }[];
            available_channel_ids: string[];
        }[];
        lowest_price: {
            amount: string;
            // display_amount: string;
            payment_channel_id: string;
        };
    };
};

const mainURL = environments.MIDAS_URL;
const pref_payment_channel_id = "CREDIT_CARD";

const findServerData = (element: HTMLElement[]) => {
    let foundIndex = -1;
    for (let index = 0; index < element.length; index++) {
        const el = element[index].toString();
        if (typeof el === "string") {
            const findOnEl = el.includes("var SERVER_DATA");
            if (findOnEl) {
                console.log("foundIndex", index);
                foundIndex = index;
            }
        } else {
            console.log("not found");
        }
    }

    const foundElement = element[foundIndex].toString();
    const splitScripts = foundElement.split("var SERVER_DATA = ");
    const splitScripts2 = splitScripts[1].split("</script>")[0].trim();
    const deleteLastChar = splitScripts2.slice(0, -1);

    return JSON.parse(deleteLastChar);
};

const contentToScriptHTMLElement = (content: string) => {
    const parsedContent = parse(content);
    const element: HTMLElement[] | any = parsedContent.querySelectorAll("script");
    return element;
};

const updateMidasBuyProducts = async (webSiteId: ObjectId): Promise<GeneralResponseInterface> => {
    const { content, browser, page } = await puppeteer.openBrowser(mainURL + "/midasbuy/tr");

    const element: HTMLElement[] | any = contentToScriptHTMLElement(content);
    const response: midasMainResponse = findServerData(element);

    for (const game of response.gameDataList) {
        const titleName = game.titleName;
        const url = game.url;
        const appid = game.appid;
        const href = game.href;

        console.log("titleName", titleName);
        console.log("url", url);
        console.log("appid", appid);
        console.log("href", href);
        const nextPage = mainURL + href;
        await puppeteer.redirectBrowserPage(page, nextPage);
        const productListContent = await page.content();
        console.log("productListContent");
        // fs.writeFileSync("productListContent.html", productListContent);
        const productsResponse = contentToScriptHTMLElement(productListContent);
        const productsHTML: midasProductResponse = findServerData(productsResponse);
        fs.writeFileSync("productsHTML.json", JSON.stringify(productsHTML, null, 2));
        for (const product of productsHTML.shelf.products) {
            const app_id = product.app_id;
            const icon = product.icon;
            const game_coins_num = product.game_coins_num;
            const prices = product.prices;
            let relatedPrice = prices.find(
                price => price.payment_channel_id === pref_payment_channel_id,
            );
            if (!relatedPrice) {
                relatedPrice = prices.find(price =>
                    price.available_channel_ids.includes(pref_payment_channel_id),
                );
            }

            if (!relatedPrice) {
                console.log("Price is not found");
            }

            const price = relatedPrice?.amount;

            console.log("app_id", app_id);
            console.log("titleName", titleName);
            console.log("game_coins_num", game_coins_num);
            console.log("price", price);
        }
    }

    return {
        success: true,
        message: "Products are fetched successfully",
        data: [],
    };
};

export { updateMidasBuyProducts };
