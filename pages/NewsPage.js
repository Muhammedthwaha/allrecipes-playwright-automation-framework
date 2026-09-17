const { expect } = require('@playwright/test');

class NewsPage {
    constructor(page) {
        this.page = page;

        // 1. Navigation & News Landing Page Locators
        this.newsNavHeaderLink = page.locator('#mntl-header-nav_1-0').getByRole('link', { name: 'News' });
        this.newsArticleCards = page.locator('.mntl-card-list-items .card__title');
        this.newsPageHeading = page.locator('#mntl-taxonomysc-heading_1-0');
        this.newsArticleCardsHeading = page.locator('.card__title-text');

        // 2. News Article Page Locators
        this.newsArticleHeading = page.locator('h1.article-heading');
        this.relatedSectionHeading = page.locator('.midcirc__heading');
        this.relatedArticles = page.locator('.midcirc__card-list');
    }

    // Step 1: Click "News" in header and verify landing page heading
    async navigateToNewsPage(expectedHeading) {
        await expect(this.newsNavHeaderLink).toBeVisible();
        await this.newsNavHeaderLink.click();

        await expect(this.page).toHaveURL(/.*food-news-trends/);
        await expect(this.newsPageHeading).toBeVisible();
        await expect(this.newsPageHeading).toContainText(expectedHeading);
    }

    // Step 2: Click on any news article
    async selectNewsArticle(articleTitle){
        const articleToClick = this.newsArticleCardsHeading.filter({ hasText: articleTitle });
        await articleToClick.scrollIntoViewIfNeeded();
        await expect(articleToClick).toBeVisible();
        await articleToClick.click();
    }

    // Step 3: Assert the opened article heading and the "Related" section
    async verifyNewsArticlePageAndRelatedSection(){
        // Assert the article heading is visible
        await expect(this.newsArticleHeading).toBeVisible();

        // Scroll down to the Related section and assert it
        await this.relatedSectionHeading.scrollIntoViewIfNeeded();
        await expect(this.relatedSectionHeading).toBeVisible();

        // Verify that related article cards exist
        await expect(this.relatedArticles).toBeVisible();
    }
    
}

module.exports = NewsPage;