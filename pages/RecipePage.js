const { expect } = require("@playwright/test");
const { capturePageScreenshot, captureElementScreenshot } = require('../utils/helper.js');

class RecipePage {
    constructor(page) {
        this.page = page;
        this.myRecipeSection = page.locator('.icon.icon-myrecipes');
        this.RecipeCard = page.locator('#recipe-flipcard_2-0');
        this.viewRecipeBtn = page.locator('#view-recipe-button_2-0');

        // Recipe main section Page
        this.mainHeading = page.locator('.article-heading.text-headline-400');
        this.authorName = page.locator('.mntl-dynamic-tooltip--trigger');
        
        // Breadcrumbs section
        this.breadcrumbs = page.locator('#mntl-universal-breadcrumbs_1-0');
        this.breadcrumbItem3 = page.locator('#mntl-breadcrumbs__item_3-0');
        this.breadcrumbItem3PageHeading = page.locator('#mntl-taxonomysc-heading_1-0');

        // video section
        this.videoSection = page.locator('#article__primary-video-container_1-0');

        this.timeSection = page.locator('#mm-recipes-details_1-0');

        // ingredients section
        this.ingredientsHeading = page.locator('#mm-recipes-structured-ingredients__heading_1-0');
        this.screenAwakeToggle = page.locator('#mm-recipes-screen-wake__button-1-0');
        this.recipe_Ingredients_Quantity_Box = page.locator('.mm-recipes-serving-size-adjuster__buttons');
        this.recipe_Ingredients_Quantity = page.locator('.mm-recipes-serving-size-adjuster__multiplier');
        this.ingredientListItem = page.locator('.mm-recipes-structured-ingredients__list-item');
           
        // Review Bar Summary (Top of the recipe)
        this.reviewBar = page.locator('#mm-recipes-review-bar_1-0');
        this.reviewBarStars = page.locator('#mm-recipes-review-bar__star-rating_1-0');
        this.reviewBarRatingScore = page.locator('#mm-recipes-review-bar__rating_1-0');
        this.reviewBarRatingCount = page.locator('#mm-recipes-review-bar__rating-count_1-0');
        this.reviewBarCommentCount = page.locator('#mm-recipes-review-bar__comment-count_1-0');

        // Print button section
        this.printForm = page.locator('#mntl-print-button_1-0');
        this.printButton = page.locator('#mntl-print-button_1-0 .mntl-print-button__btn');

        // directions section
        this.directionsHeading = page.locator('#mm-recipes-steps__heading_1-0');
    
        // Jump Nutrition Btn section
        this.jumpNutritionBtn = page.locator('#mm-recipes-details__nutrition-link_1-0');

        // nutrition section
        this.nutritionTable = page.locator('#mm-recipes-nutrition-facts-summary_1-0');

        // reviews section
        this.starRating = page.locator('#recipe-ugc-threaded-wrapper_1-1');

        // related section
        this.relatedSection = page.locator('#pre-carousel__heading--text-title_1-0');

        // footer section
        this.footer = page.locator('#mntl-footer_1-0');
    }

    async verifyPageHeader(name, author){
        await expect(this.mainHeading).toBeVisible();
        await expect(this.mainHeading).toContainText(name);
        await expect(this.authorName).toBeVisible();
        await expect(this.authorName).toContainText(author);
        await expect(this.breadcrumbs).toBeVisible();
        await expect(this.videoSection).toBeVisible();
    }

    async verifyBreadcrumbsFunctionality(breadcrumbText){
        await expect(this.breadcrumbs).toBeVisible();
        await expect(this.breadcrumbItem3).toBeVisible();
        await this.breadcrumbItem3.click();
        await expect(this.breadcrumbItem3PageHeading).toBeVisible();
        await expect(this.breadcrumbItem3PageHeading).toContainText(breadcrumbText);
    }

    async navigateToAuthorProfile(){
        await expect(this.authorName).toBeVisible();
        await this.authorName.click();
    }

    async verifyTimeSection(){
        await expect(this.timeSection).toBeVisible();
    }

    async verifyScreenAwakeToggleWorking(){
        await expect(this.screenAwakeToggle).toBeVisible();
        await this.screenAwakeToggle.click();
        await expect(this.screenAwakeToggle).toHaveAttribute('aria-pressed', 'true');
        await captureElementScreenshot(this.screenAwakeToggle, 'recipePage', 'Screen_Awake_Toggle_On');
        await this.screenAwakeToggle.click();
        await expect(this.screenAwakeToggle).toHaveAttribute('aria-pressed', 'false');
    }

    async verifyIngredients(){
        await expect(this.ingredientsHeading).toBeVisible();
    }

    async recipe_Ingredients_Quantity_Changer(quantity){
        await expect(this.recipe_Ingredients_Quantity_Box).toBeVisible();
        const quatityBtn = this.recipe_Ingredients_Quantity_Box.getByText(quantity, {exact: true});
        await expect(quatityBtn).toBeVisible();
        await quatityBtn.click();
    }

    async verify_Ingredient_Quantity(ingredientName, expectedQuantity){
        const item = this.ingredientListItem.filter({ hasText: ingredientName});
        const quantity = await item.locator('[data-ingredient-quantity="true"]');

        await expect(quantity).toBeVisible();
        await expect(quantity).toContainText(expectedQuantity);
    }

    async verifyDirections(){
        await expect(this.directionsHeading).toBeVisible();
    }

    async verifyNutritionFacts(){
        await expect(this.nutritionTable).toBeVisible();
    }

    async verifyStarRating(){
        await expect(this.starRating).toBeVisible();
    }

    async verifyRelatedRecipes(){
        await expect(this.relatedSection).toBeVisible();
    }

    async verifyFooter(){
        await expect(this.footer).toBeVisible();
    }

    // Verify Print Button and URL attribute
    async verifyPrintRecipeButton() {
        await expect(this.printButton).toBeVisible();
        await expect(this.printButton).toContainText('Print');
        await expect(this.printForm).toHaveAttribute('action', /.*print/i);
    }

    // Verify Rating and Review Summary at top of page
    async verifyRatingAndReviewSummary() {
        await expect(this.reviewBar).toBeVisible();
        await expect(this.reviewBarStars).toBeVisible();
        await expect(this.reviewBarRatingScore).toBeVisible();
        await expect(this.reviewBarRatingCount).toBeVisible();
        await expect(this.reviewBarCommentCount).toBeVisible();
        await expect(this.reviewBarCommentCount).toContainText('Review');
    }

    // Verify Jump Link Smooth-Scrolls directly to Nutrition Facts
    async verifyJumpToNutritionFacts() {
        await expect(this.jumpNutritionBtn).toBeVisible();
        await this.jumpNutritionBtn.click();
        // Assert that the nutrition table has scrolled directly into the browser viewport!
        await expect(this.nutritionTable).toBeInViewport();
    }
};

module.exports = RecipePage;