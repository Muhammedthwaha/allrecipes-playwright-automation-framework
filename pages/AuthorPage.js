const { expect } = require('@playwright/test');

class AuthorPage {
    constructor(page) {
        this.page = page;

        this.authorName = page.locator('.mntl-bio-header__title.text-title-300');
        this.authorBio = page.locator('#mntl-bio-intro_1-0');

        this.latestRecipesHeading = page.locator('#mntl-recirc-section__header_1-0');
        this.authorRecipeCards = page.locator('#mntl-recirc-section__block-1_1-0');
        
    }

    //Direct navigation to author URL
    async gotoAuthorPage(authorUrl) {
        await this.page.goto(authorUrl, { waitUntil: 'domcontentloaded' });
        await expect(this.authorName).toBeVisible();
    }

    async verifyAuthorNameAndBio(expectedName){
        await expect(this.authorName).toBeVisible();
        await expect(this.authorName).toContainText(expectedName);
        await expect(this.authorBio).toBeVisible();
    }

    async verifyAuthorRecipeCatalog(){
        await expect(this.latestRecipesHeading).toBeVisible();
        await expect(this.latestRecipesHeading).toContainText('Latest from');
    }

    async clickFirstRecipe(dishName){
        const recipeCard = this.page.locator('.card__title').filter({ hasText: dishName });
        await expect(recipeCard).toBeVisible();
        await recipeCard.click();
    }

    async verifyAuthorProfileDetails(expectedName) {
        await expect(this.authorName).toBeVisible();
        await expect(this.authorName).toContainText(expectedName);
        await expect(this.authorBio).toBeVisible();
        await expect(this.latestRecipesHeading).toBeVisible();
        await expect(this.latestRecipesHeading).toContainText('Latest from');
    }

}

module.exports = AuthorPage;