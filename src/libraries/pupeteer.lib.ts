import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs";
import { parse } from "node-html-parser";

const openBrowser = async (url: string) => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    const context = await browser.createBrowserContext();
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto(url);
    const content = await page.content();

    return { browser, page, content, context };
};

const redirectBrowserPage = async (page: Page, url: string) => {
    return await page.goto(url);
};

const closeBrowser = async (browser: Browser) => {
    await browser.close();
};

export default {
    openBrowser,
    closeBrowser,
    redirectBrowserPage,
};
