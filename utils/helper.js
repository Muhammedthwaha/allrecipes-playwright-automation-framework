const path = require('path');

async function capturePageScreenshot(page, folderName, screenShotName){
    // 1. Automatically get browser name ('chromium', 'firefox', etc.)
    const browserName = page.context().browser()?.browserType().name() || 'browser'
    const filePath = path.join(__dirname, `../screenshots/${folderName}/${screenShotName}_${browserName}.png`);
    await page.screenshot({ path: filePath, fullPage: true});
    return filePath;
}

async function captureElementScreenshot(locator, folderName, screenShotName){
    // 1. Get page from locator, then get browser name
    const page = locator.page();
    const browserName = page?.context().browser()?.browserType().name() || 'browser';
    const filePath = path.join(__dirname, `../screenshots/${folderName}/${screenShotName}_${browserName}.png`);
    await locator.screenshot({ path: filePath});
    return filePath;
}

async function mouseScroll(page, x=0, y=500) {
    await page.mouse.wheel(x, y);
}
module.exports = { capturePageScreenshot, captureElementScreenshot, mouseScroll };