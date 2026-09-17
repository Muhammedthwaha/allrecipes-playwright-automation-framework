const { expect } = require('@playwright/test');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

class MobilePage {
    constructor(page) {
        this.page = page;
        
        // 1. Mobile Header & Drawer Locators (Home Module)
        this.hamburgerIcon = page.locator('.icon.icon-menu.mntl-header__menu-icon');
        this.mobileDrawer = page.locator('#mntl-fullscreen-nav_1-0');
        this.drawerCloseBtn = page.locator('.icon.icon-close.mntl-header__close-icon');
        this.drawerDinnerLink = page.locator('#mntl-fullscreen-nav_1-0 a').filter({ hasText: 'Dinner Tonight' });
        this.drawerRecipesLink = page.locator('#mntl-fullscreen-nav_1-0').getByRole('link', { name: 'Recipes', exact: true });

        // 2. Mobile Search Locators (Search Module)
        this.mobileSearchInput = page.locator('#mntl-fullscreen-nav__search__search-input');
        this.mobileSearchBtn = page.locator('#mntl-fullscreen-nav__search_1-0 button[aria-label="Click to search"]');
        this.firstSearchResultCard = page.locator('#mntl-card-list-card--extendable_1-0');

        // 3. Recipe Page Mobile Locators (Recipe Module)
        this.myrecipeSection = page.locator('#pre-carousel__heading--myrecipes-link_1-0');
        this.recipeCardFront = page.locator('#recipe-flipcard__front_1-0');
        this.recipeCardBack = page.locator('#recipe-flipcard__back_1-0');
        this.viewRecipeBtn = page.locator('#view-recipe-button_1-0');
        this.recipeHeading = page.locator('#article-header--recipe_1-0 .article-heading.text-headline-400');
        this.ingredientsHeading = page.getByRole('heading', { name: 'Ingredients' }).first();

        // 4. Author Profile Mobile Locators (Author Module)
        this.authorName = page.locator('.mntl-dynamic-tooltip--trigger .mntl-attribution__item-name').first();
        this.authorDetailsArea = page.locator('.mntl-author-tooltip__top').first();
        this.authorBio = page.locator('.mntl-author-tooltip__bio').first();         

        // 5. Ingredients Directory Locators (Ingredients Module) eg: C
        this.drawerIngredientsLink = page.locator('#mntl-fullscreen-nav_1-0').getByRole('link', { name: 'Ingredients', exact: true });
        this.drawerIngredientsViewAll = page.locator('#mntl-fullscreen-nav_1-0').getByRole('link', { name: 'VIEW ALL', exact: false }); 
        this.ingredients_letter_C = page.locator('.mntl-alphabetical-nav__list-item a[href*="#alphabetical-list-c"]').first();
        this.section_C_Heading = page.locator('#alphabetical-list-c');
    }

    // Navigate to base URL
    async gotoWebPage() {
        await this.page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
        await expect(this.hamburgerIcon).toBeVisible();
    }

    // 1. Home Module Actions
    async openHamburgerDrawer() {
        await expect(this.hamburgerIcon).toBeVisible();
        await this.hamburgerIcon.click();
        await expect(this.mobileDrawer).toBeVisible();
    }

    async verifyDrawerLinks() {
        await expect(this.drawerDinnerLink).toBeVisible();
        await expect(this.drawerRecipesLink).toBeVisible();
    }

    async closeHamburgerDrawer() {
        await expect(this.drawerCloseBtn).toBeVisible();
        await this.drawerCloseBtn.click();
        await expect(this.mobileDrawer).toBeHidden();
    }

    // 2. Search Module Actions
    async searchRecipeFromDrawer(term) {
        await this.openHamburgerDrawer();
        await expect(this.mobileSearchInput).toBeVisible();
        await this.mobileSearchInput.fill(term);
        await this.mobileSearchInput.press('Enter');
    }

    async verifySearchResults() {
        await expect(this.firstSearchResultCard).toBeVisible({ timeout: 15000 });
    }

    // 3. Recipe Module Actions
    async navigateToRecipeFromHomePage() {
        await expect(this.myrecipeSection).toBeVisible();
        await expect(this.recipeCardFront).toBeVisible();
        await this.recipeCardFront.click();
        await expect(this.recipeCardBack).toBeVisible();
        await this.viewRecipeBtn.click();
        await expect(this.recipeHeading).toBeVisible();
    }

    async navigateToFirstRecipe() {
        await expect(this.recipeCardFront).toBeVisible();
        await this.recipeCardFront.click();
        await expect(this.recipeHeading).toBeVisible();
    }

    async verifyRecipeDetails() {
        await expect(this.recipeHeading).toBeVisible();
        await expect(this.ingredientsHeading).toBeVisible();
    }
    
    // 4. Author Module Actions
    async openAuthorSubWindow() {
        await expect(this.authorName).toBeVisible();
        await this.authorName.click();
        await expect(this.authorDetailsArea).toBeVisible();
        await expect(this.authorBio).toBeVisible();
    }

    // 5. Ingredients Module Actions
    async navigateToIngredientsDirectory() {
        await this.openHamburgerDrawer();
        await expect(this.drawerIngredientsLink).toBeVisible();
        await this.drawerIngredientsLink.click();
        // Click VIEW ALL inside the expanded accordion to open the A-Z directory
        await expect(this.drawerIngredientsViewAll).toBeVisible();
        await this.drawerIngredientsViewAll.click();
        await expect(this.ingredients_letter_C).toBeVisible();
        await this.ingredients_letter_C.click();
        await expect(this.section_C_Heading).toBeVisible();
    }
}

module.exports = MobilePage;