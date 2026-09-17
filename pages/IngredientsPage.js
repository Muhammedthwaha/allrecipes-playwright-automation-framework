const { expect } = require('@playwright/test');
class IngredientsPage {
    constructor(page) {
        this.page = page;

        // Header Navigation link from home
        this.topNavIngredients = page.locator('.mntl-header-nav__list-item > a').filter({ hasText: 'Ingredients' });

        // Directory Page Locators
        this.directoryHeading = page.locator('.mntl-hero-search__title');
        this.searchBar = page.locator('#mntl-search-form--hero__search-input');
        this.goButton = page.locator('.mntl-search-form--hero .mntl-search-form__button');
        this.alphabetNav = page.locator('#mntl-alphabetical-nav_1-0');

        // Target Recipe Page Heading
        this.ingredientRecipesHeading = page.locator('#mntl-taxonomysc-heading_1-0');
    }

    // Step 1: Navigate from Home Page to Ingredients A-Z
    async navigateToIngredientsPage(expectedHeading) {
        await expect(this.topNavIngredients).toBeVisible();
        await this.topNavIngredients.click();

        await expect(this.page).toHaveURL(/.*ingredients-a-z/);
        await expect(this.directoryHeading).toBeVisible();
        await expect(this.directoryHeading).toContainText(expectedHeading);
        await expect(this.searchBar).toBeVisible();
        await expect(this.alphabetNav).toBeVisible();
    }

    // Step 2: Click an alphabet letter (e.g., "C") and verify it jumps to that section
     async jumpToLetterSection(letter) {
        // Convert the letter to lowercase to match the href attribute in the alphabetical nav
        const letterLower = letter.toLowerCase();
        const letterLink = this.page.locator(`.mntl-alphabetical-nav__list-item a[href="#alphabetical-list-${letterLower}"]`);

        await expect(letterLink).toBeVisible();
        await letterLink.click();

        // Verify the letter heading (e.g., "C") is visible and matches
        const letterHeading = this.page.locator(`#alphabetical-list-${letterLower}`);
        await expect(letterHeading).toBeVisible();
        await expect(letterHeading).toHaveText(letter.toUpperCase());
     }

      // Step 3: Click an ingredient (e.g., "Chicken") and verify recipe collection opens
      async selectIngredientAndVerifyRecipes(ingredientName) {
        const ingredientLink = this.page.locator('.mntl-link-list__link').filter({ hasText: ingredientName }).first();

        await ingredientLink.scrollIntoViewIfNeeded();
        await expect(ingredientLink).toBeVisible();
        await ingredientLink.click();


        // Verify URL and page heading contain the ingredient name
        await expect(this.page).toHaveURL(new RegExp(`.*${ingredientName.toLowerCase()}`, 'i'));
        await expect(this.ingredientRecipesHeading).toBeVisible();
        await expect(this.ingredientRecipesHeading).toContainText(ingredientName);
      }

    // Method to search using the hero search bar on the directory page
    async searchIngredientFromDirectory(ingredientQuery) {
        await expect(this.searchBar).toBeVisible();
        await this.searchBar.fill(ingredientQuery);

        // Click the 'GO' button next to the input
        await expect(this.goButton).toBeVisible();
        await this.goButton.click();

        // Verify URL and search results page
        await expect(this.page).toHaveURL(new RegExp(`search\\?q=${ingredientQuery}`, 'i'));
    }

    // Method to verify active vs disabled letter buttons
    async verifyAlphabetLettersState(activeLetter, disabledLetter) {
        const activeLetterBtn = this.page.locator(`.mntl-alphabetical-nav__list-item a[href="#alphabetical-list-${activeLetter.toLowerCase()}"]`);
        const disabledLetterBtn = this.page.locator(`.mntl-alphabetical-nav__list-item a[href="#alphabetical-list-${disabledLetter.toLowerCase()}"]`);

        // Assert active letter does NOT have the disabled class
        await expect(activeLetterBtn).toBeVisible();
        await expect(activeLetterBtn).not.toHaveClass(/button--outlined-disabled/);

        // Assert disabled letter DOES have the disabled class
        await expect(disabledLetterBtn).toBeVisible();
        await expect(disabledLetterBtn).toHaveClass(/button--outlined-disabled/);
    }

    // Method to check ALL active letter sections across the entire page are alphabetically ordered
    async verifyAllLetterGroupsAreSorted() {
        const activeLetters = ['A', 'B', 'C', 'D', 'F', 'G', 'L', 'M', 'N', 'O', 'P', 'Q', 'S', 'T', 'V', 'W'];

        for (const letter of activeLetters) {
            const groupContainer = this.page.locator(`#alphabetical-list-${letter.toLowerCase()}`).locator('..');
            const ingredientLinks = groupContainer.locator('.mntl-link-list__link');
            
            // Read the text from the live website
            const names = await ingredientLinks.allTextContents();
            const trimmedNames = names.map(name => name.trim());

            // Make a copy and sort it alphabetically using JavaScript
            const sortedNames = [...trimmedNames].sort((firstWord, secondWord) => firstWord.localeCompare(secondWord));
            
            // Compare the original website list with the sorted list
            expect(trimmedNames).toEqual(sortedNames)
        }
    }
}

module.exports = IngredientsPage;