const { expect } = require('@playwright/test');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
class SearchResultsPage {
    constructor(page) {
        this.page = page;

        // 1. Header Search Bar Locators (on Home & Header)
        this.headerSearchInput = page.locator('#mntl-search-form--open__search-input');
        this.headerSearchBtn = page.locator('#mntl-search-form--open_1-0').getByRole('button', { name: 'Click to search' });
        this.headerClearBtn = page.locator('#mntl-search-form--open_1-0 .mntl-search-form__clear-button');

        // 2. Popular Search Tags Section (Home Page)
        this.popularSearchTagsSection = page.locator('#related-category-search--curated_1-0');

        // 3. Search Results Page Locators (/search?q=...)
        this.resultsTitle = page.locator('.mntl-hero-search__title');
        this.heroSearchInput = page.locator('#mntl-search-form--hero__search-input');
        this.heroSearchGoBtn = page.locator('#mntl-search-form--hero_1-0 .mntl-search-form__button');
        this.heroClearBtn = page.locator('#mntl-search-form--hero_1-0 .mntl-search-form__clear-button');

        // 4. Cards & Results Metadata Locators
        this.firstResultCard = page.locator('#mntl-card-list-card--extendable_1-0');
        this.firstCardTitle = page.locator('#mntl-card-list-card--extendable_1-0 .card__title-text');
        this.firstCardImage = page.locator('#mntl-card-list-card--extendable_1-0 .card__img');
        this.firstCardRating = page.locator('#mntl-card-list-card--extendable_1-0 .mntl-recipe-star-rating');
        this.firstCardRatingCount = page.locator('#mntl-card-list-card--extendable_1-0 .mm-recipes-card-meta__rating-count-number');

        // 5. No Results Container
        this.noResultsHeader = page.locator('#mntl-search-results__no-results-header_1-0');
    }

    // Navigate to base URL
    async gotoHomePage() {
        await this.page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
        await expect(this.headerSearchInput).toBeVisible();
    }

    // Positive search by clicking Search button
    async searchViaClick(query) {
        await this.headerSearchInput.fill(query);
        await this.headerSearchBtn.click();
    }

    // Positive search by pressing 'Enter' key on keyboard
    async searchViaEnterKey(query) {
        await this.headerSearchInput.fill(query);
        await this.page.keyboard.press('Enter');
    }

    // Negative search by clicking Search button
    async negativeSearchViaClick(query) {
        await this.headerSearchInput.fill(query);
        await this.headerSearchBtn.click();
        await expect(this.noResultsHeader).toBeVisible();
    }

        // Clear in-page search input on the Search Results page using the physical 'X' button
    async clearResultsHeroSearchInput() {
        await expect(this.heroSearchInput).toBeVisible();
        await expect(this.heroClearBtn).toBeVisible();
        await this.heroClearBtn.click();
        await expect(this.heroSearchInput).toHaveValue('');
    }

    // Re-search directly from the search results page
    async reSearchFromResultsPage(newQuery) {
        await expect(this.heroSearchInput).toBeVisible();
        await this.heroSearchInput.fill(newQuery);
        await this.heroSearchGoBtn.click();
    }

    // Click a popular category search tag
    async clickPopularSearchTag(tagName) {
        await expect(this.popularSearchTagsSection).toBeVisible();
        const tag = this.page.locator('.category-tag__link').filter({ hasText: tagName });
        await tag.scrollIntoViewIfNeeded();
        await expect(tag).toBeVisible();
        await tag.click();
    }

    // Assert the first result card has full metadata (Title, Image, Star Rating, Review Count)
    async assertFirstCardMetadata() {
        await expect(this.firstResultCard).toBeVisible();
        await expect(this.firstCardTitle).toBeVisible();
        await expect(this.firstCardImage.first()).toBeVisible();
        await expect(this.firstCardRating).toBeVisible();
        await expect(this.firstCardRatingCount).toBeVisible();
    }
}

module.exports = SearchResultsPage;