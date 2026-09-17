const HomePage = require('./HomePage');
const RecipePage = require('./RecipePage');
const AuthorPage = require('./AuthorPage');
const AboutUs = require('./AboutUs.js');
const NewsPage = require('./NewsPage.js');
const IngredientsPage = require('./IngredientsPage');
const SearchResultsPage = require('./SearchResultsPage');
const MobilePage = require('./MobilePage');

class PoManager{
    constructor(page){
        this.page = page;
        this.homePage = new HomePage(page);
        this.recipePage = new RecipePage(page);
        this.authorPage = new AuthorPage(page);
        this.aboutUsPage = new AboutUs(page);
        this.newsPage = new NewsPage(page);
        this.ingredientsPage = new IngredientsPage(page);
        this.searchResultsPage = new SearchResultsPage(page);
        this.mobilePage = new MobilePage(page);
    }

    getHomePage(){
        return this.homePage;
    }

    getRecipePage(){
        return this.recipePage;
    }

    getAuthorPage(){
        return this.authorPage;
    }

    getAboutUsPage(){
        return this.aboutUsPage;
    }

    getNewsPage(){
        return this.newsPage;
    }

    getIngredientsPage() { 
        return this.ingredientsPage; 
    }

    getSearchResultsPage() {
        return this.searchResultsPage;
    }

    getMobilePage() {
        return this.mobilePage;
    }
}

module.exports = PoManager;