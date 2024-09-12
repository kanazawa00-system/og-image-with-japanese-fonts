const chrome = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
import { FileType } from './types';

const getPage = async () => {
    const browser = await puppeteer.launch({
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath(),
        headless: 'new',
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    return page;
};

export async function getScreenshot(html: string, type: FileType) {
    const page = await getPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.setContent(html);
    return await page.screenshot({ type });
}
