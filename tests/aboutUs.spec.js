const testData = require('../testData/testData.json');
const { test, expect } = require('../fixtures/baseFixtures.js');

test.describe('About Us Page', () => {

    test('TEST:001 => About Us Page Contact Section assertions ', async ({ homePage, aboutUsPage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await aboutUsPage.navigateToAboutUsAndContactSection(testData.aboutUsPage.contactSectionContactNumber, testData.aboutUsPage.contactSectionSubHeading);
    });

    test('TEST:002 => About Us Page Editorial Guidelines Section assertions', async ({ homePage, aboutUsPage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await aboutUsPage.navigateToEditorialGuidelines();
    });
});
