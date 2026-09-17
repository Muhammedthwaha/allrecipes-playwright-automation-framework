const testData = require('../testData/testData.json');
const { test, expect } = require('../fixtures/baseFixtures.js');

test.describe('News Page', () => {

    test('TEST:001 => News Page Navigation and Assertions', async ({ homePage, newsPage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await newsPage.navigateToNewsPage(testData.newsPage.expectedHeading);
        await newsPage.selectNewsArticle(testData.newsPage.expectedArticleHeading);
        await newsPage.verifyNewsArticlePageAndRelatedSection();
    });
});
