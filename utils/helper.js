const path = require('path');

async function capturePageScreenshot(page, folderName, screenShotName){
    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(__dirname, `../screenshots/${folderName}/${screenShotName}_${timeStamp}.png`);
    await page.screenshot({ path: filePath, fullPage: true});
    return filePath;
}

async function captureElementScreenshot(locator, folderName, screenShotName){
    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(__dirname, `../screenshots/${folderName}/${screenShotName}_${timeStamp}.png`);
    await locator.screenshot({ path: filePath});
    return filePath;
}

async function mouseScroll(page, x=0, y=500) {
    await page.mouse.wheel(x, y);
}
module.exports = { capturePageScreenshot, captureElementScreenshot, mouseScroll };