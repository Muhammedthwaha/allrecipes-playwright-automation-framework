const { expect } = require('@playwright/test');

class AboutUsPage {
    constructor(page) {
        this.page = page;
        this.aboutUsHeaderLink = page.locator('.mntl-header-nav__list-item-about-us > a');
        this.aboutPageHeading = page.locator('#allrecipes-article-header_1-0');

        // Contact Section
        this.tocContactUsLink = page.locator('a[href="#toc-contact-us"]');
        this.contactUsHeading = page.locator('h2').filter({ hasText: 'Contact Us' });

        // Editorial Guidelines Section
        this.tocEditorialGuidelinesLink = page.locator('a[href="#toc-editorial-guidelines"]');
        this.editorialGuidelinesHeading = page.locator('h2').filter({ hasText: 'Editorial Guidelines' });
    }

    async navigateToAboutUsAndContactSection(contactNumber, helpRequestName){
        this.PhoneNumber = this.page.getByText(contactNumber);
        this.helpRequestLink = this.page.getByRole('link', { name: helpRequestName });
        
        // 1. Click "About Us" on the header navigation
        await expect(this.aboutUsHeaderLink).toBeVisible();
        await this.aboutUsHeaderLink.click();

        // 2. Verify navigation to the About Us page
        await expect(this.aboutPageHeading).toContainText('About Us');

        // 3. Click the "Contact Us" link in the Table of Contents
        await expect(this.tocContactUsLink).toBeVisible();
        await this.tocContactUsLink.click();

        // 4. Verify Contact Us section and details are displayed
        await expect(this.contactUsHeading).toBeVisible();
        await expect(this.helpRequestLink).toBeVisible();
        await expect(this.PhoneNumber).toBeVisible();
    }

    // Navigate to Editorial Guidelines via Table of Contents
    async navigateToEditorialGuidelines() {
        await expect(this.aboutUsHeaderLink).toBeVisible();
        await this.aboutUsHeaderLink.click();
        await expect(this.aboutPageHeading).toContainText('About Us');
        
        // Click Editorial Guidelines link in Table of Contents
        await expect(this.tocEditorialGuidelinesLink).toBeVisible();
        await this.tocEditorialGuidelinesLink.click();

        // Verify the heading is visible and scrolled into the viewport
        await expect(this.editorialGuidelinesHeading).toBeVisible();
        await expect(this.editorialGuidelinesHeading).toBeInViewport();
    }
};

module.exports = AboutUsPage;