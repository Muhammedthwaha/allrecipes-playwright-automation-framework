const { expect } = require("@playwright/test");
require('dotenv').config({path: require('path').join(__dirname, '../.env')});
const { capturePageScreenshot, captureElementScreenshot } = require('../utils/helper.js');
const testData = require('../testData/testData.json');


class HomePage {
    constructor(page) {
        this.page = page;
        this.h2_latest = page.locator('.news-feed__title');
        this.seaMoreBtn = page.locator('.news-feed__see-more-link');

        // Home page locators
        this.searhBox = page.locator('#mntl-search-form--open__search-input');
        this.seacrhBtn = page.locator('#mntl-search-form--open_1-0').getByRole('button', { name: 'Click to search' });
        this.mainBigLogo = page.locator('.mntl-header__logo-wrapper #header-logo_1-0');
        this.newsLetter = page.locator('#mntl-newsletter-dialog--header-link_1-0');
        this.newsLetterPopup = page.locator('#mntl-newsletter_1-0');
        this.newsLetterPopupCloseBtn = page.getByRole('button', { name: 'Close this dialog window' });

        // topNavigation section
        this.topNavBar = page.locator('.mntl-header-nav__list-wrapper');
        this.topNavDinner = page.locator('.mntl-header-nav__list-item').getByRole('link', { name: ' Dinner Tonight'});
        this.dinnerTonightH1Heading = page.locator('#mntl-taxonomysc-heading_1-0');
        this.topNavIngredients = page.locator('.mntl-header-nav__list-item').getByRole('link', { name: ' Ingredients'});
        this.ingredientsH1Heading = page.locator('.mntl-hero-search__title.text-headline-300');
        this.topNavCommunity = page.locator('.mntl-header-nav__list-item').getByRole('link', { name: '  Community'});
        this.communityH1Heading = page.locator('#mntl-taxonomysc-heading_1-0');

        // Trust Badges section


        // Hamburger Menu
        this.hamburgerMenuIcon = page.locator('.icon.icon-menu.mntl-header__menu-icon');
        this.hamburgerMenuCloseIcon = page.locator('.icon.icon-close.mntl-header__nav-panel-close-icon');
        this.dinnerTonight = page.getByRole('link', { name: ' Dinner Tonight'});
        this.hamburgerRecipes = page.locator('#mntl-fullscreen-nav_1-0').getByRole('link', { name: 'Recipes', exact: true });
        this.hamburgerSection = page.locator('#mntl-fullscreen-nav_1-0');

        // carousel section
        this.rightArrow = page.getByRole('button', {name: 'Right'});
        this.leftArrow = page.getByRole('button', {name: 'Left'});

        // recipe card section
        this.recipeCardFront = page.locator('#recipe-flipcard__front_1-0');
        this.recipeCardBack = page.locator('#recipe-flipcard__back_1-0');
        this.recipeCardBackBtn = page.locator('#recipe-flipcard__back--buttons_1-0');
        
        this.myRecipeSection = page.locator('.icon.icon-myrecipes');
        this.RecipeCard = page.locator('#recipe-flipcard_2-0');
        this.viewRecipeBtn = page.locator('#view-recipe-button_2-0');

        // popular search tags section
        this.popularSearchTagsSection = page.locator('#related-category-search--curated_1-0');


        //footer section
        this.footerSocialMediaSection = page.locator('#mntl-footer-social_1-0');
        this.facebookLink = this.footerSocialMediaSection.locator('.social-nav__link.social-nav__link--facebook');
        this.instagramLink = this.footerSocialMediaSection.locator('.social-nav__link.social-nav__link--instagram');
        this.pinterestLink = this.footerSocialMediaSection.locator('.social-nav__link.social-nav__link--pinterest');
        this.tiktokLink = this.footerSocialMediaSection.locator('.social-nav__link.social-nav__link--tiktok');
        this.youtubeLink = this.footerSocialMediaSection.locator('.social-nav__link.social-nav__link--youtube');
    }

    // creating a function to navigate to the website

    async gotoWebPage(){
        await this.page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
    }
    
    // Home page assertions 
    async homePageAssertions(){
        await expect(this.searhBox).toBeVisible();
        await expect(this.h2_latest).toBeVisible();
        await expect(this.h2_latest).toHaveText('The Latest');
        await expect(this.seaMoreBtn).toBeVisible();
        await expect(this.seaMoreBtn).toHaveText('See More');
    }

    async navigateToHamburgerMenu(){
        await expect(this.hamburgerMenuIcon).toBeVisible();
        await this.hamburgerMenuIcon.click();
        await expect(this.hamburgerMenuCloseIcon).toBeVisible();
        await expect(this.dinnerTonight).toBeVisible();
        await expect(this.hamburgerRecipes).toBeVisible();
        await captureElementScreenshot(this.hamburgerSection, 'homePage', 'Hamburger_Menu');
        await this.hamburgerMenuCloseIcon.click();
        await expect(this.hamburgerMenuIcon).toBeVisible();
    }

    async hoverOverNavHeadingAndGoTo_A_Sublist(headingName, expectedSublistItem){
        // 1. Find the specific category container (e.g. the "Dinner Tonight" section)
        const categorySection = this.page.locator('.mntl-header-nav__list-item').filter({ hasText: headingName });

        // 2. Hover over the top heading inside this section
        const heading = categorySection.locator('> a');
        await heading.hover();

        // 3. Search for the item ONLY inside this category's dropdown (resolves to 1 element!)
        const dropdownItem = categorySection.locator('.mntl-header-nav__sublist a').filter({ hasText: expectedSublistItem });
        
        await expect(dropdownItem).toBeVisible();
        await dropdownItem.click();
    }

    async navigateToRecipePage(){
        await expect(this.RecipeCard).toBeVisible();
        await this.RecipeCard.click();
        await expect(this.viewRecipeBtn).toBeVisible();
        await this.viewRecipeBtn.click();
    }

    async navigateCarouselRightAndLeft(){
        await this.rightArrow.click();
        await this.rightArrow.click();
        await this.leftArrow.click();
        await this.leftArrow.click();
    }

    async flipRecipeCard(){
        await expect(this.recipeCardFront).toBeVisible();
        await this.recipeCardFront.click();
        await expect(this.recipeCardBackBtn).toBeVisible();
        await this.recipeCardBack.click();
    }

    async seachingOnSeachBar(name){
        await expect(this.searhBox).toBeVisible();
        await this.searhBox.fill(name);
        await this.seacrhBtn.click();
    }

    async headerLogoReturnToHome(){
        await expect(this.mainBigLogo).toBeVisible();
        await this.mainBigLogo.click();
    }

    async verifyFooterSocialMediaSection(){
        await expect(this.footerSocialMediaSection).toBeVisible();
        await expect(this.facebookLink).toBeVisible();
        await expect(this.facebookLink).toHaveAttribute('href', testData.socialMediaLinks.facebook);
        await expect(this.facebookLink).toHaveAttribute('target', '_blank');
        await expect(this.instagramLink).toBeVisible();
        await expect(this.instagramLink).toHaveAttribute('href', testData.socialMediaLinks.instagram);
        await expect(this.instagramLink).toHaveAttribute('target', '_blank');
        await expect(this.pinterestLink).toBeVisible();
        await expect(this.pinterestLink).toHaveAttribute('href', testData.socialMediaLinks.pinterest);
        await expect(this.pinterestLink).toHaveAttribute('target', '_blank');
        await expect(this.tiktokLink).toBeVisible();
        await expect(this.tiktokLink).toHaveAttribute('href', testData.socialMediaLinks.tiktok);
        await expect(this.tiktokLink).toHaveAttribute('target', '_blank');
        await expect(this.youtubeLink).toBeVisible();
        await expect(this.youtubeLink).toHaveAttribute('href', testData.socialMediaLinks.youtube);
        await expect(this.youtubeLink).toHaveAttribute('target', '_blank');
    }

    async verifyTopCategoryNavigation(expectedHeading1, expectedHeading2, expectedHeading3){
        await expect(this.topNavBar).toBeVisible();
        await expect(this.topNavDinner).toBeVisible();
        await this.topNavDinner.click();
        await expect(this.dinnerTonightH1Heading).toBeVisible();
        await expect(this.dinnerTonightH1Heading).toContainText(expectedHeading1);
        await expect(this.topNavIngredients).toBeVisible();
        await this.topNavIngredients.click();
        await expect(this.ingredientsH1Heading).toBeVisible();
        await expect(this.ingredientsH1Heading).toContainText(expectedHeading2);
        await expect(this.topNavCommunity).toBeVisible();
        await this.topNavCommunity.click();
        await expect(this.communityH1Heading).toBeVisible();    
        await expect(this.communityH1Heading).toContainText(expectedHeading3);
    }

    async verifyNewsletterPopup(){
        await expect(this.newsLetter).toBeVisible();
        await this.newsLetter.click();
        await expect(this.newsLetterPopup).toBeVisible();
        await expect(this.newsLetterPopupCloseBtn).toBeVisible();
        await this.newsLetterPopupCloseBtn.click();
        await expect(this.newsLetter).toBeVisible();
    }

    async clickPopularSearchTag(tagName){
        await expect(this.popularSearchTagsSection).toBeVisible();
        const tag = this.page.locator('.category-tag__link').filter({ hasText: tagName });
        await tag.scrollIntoViewIfNeeded();
        await expect(tag).toBeVisible();
        await tag.click();
        await expect(this.page).toHaveURL(new RegExp(`search\\?q=${tagName}`, 'i'));
    }

    async verifySeeMoreBtnOnLatestSection() {
        await this.seaMoreBtn.scrollIntoViewIfNeeded();
        await expect(this.seaMoreBtn).toBeVisible();
        await this.seaMoreBtn.click();
        await expect(this.page).toHaveURL(/.*food-news-trends/);
    }

}

module.exports=HomePage;