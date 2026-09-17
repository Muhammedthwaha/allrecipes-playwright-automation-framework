# 🍳 Allrecipes Playwright E2E Automation Framework

A scalable, production-ready End-to-End (E2E) test automation framework built using **Playwright** and **JavaScript**, implementing the **Page Object Model (POM)** architectural pattern to automate and validate [Allrecipes.com](https://www.allrecipes.com/).

---

## 🌟 Key Features

- **Page Object Model (POM):** Clean modular separation of web locators, actions, and test assertions.
- **Page Object Manager (`PoManager`):** Centralized factory pattern for page object instances.
- **Custom Fixtures (`baseFixtures.js`):** Dependency injection of page objects directly into test suites.
- **Cross-Browser & Multi-Device Testing:**
  - **Desktop:** Google Chrome (Chromium) & Mozilla Firefox.
  - **Mobile:** Android (Pixel 7) & iOS (iPhone 14) mobile emulation.
- **Externalized Test Data:** Driven entirely via JSON (`testData.json`) and `.env` configuration.
- **Resilient Locating Strategies:** Playwright role-based selectors (`getByRole`) and dynamic auto-waiting.
- **Automated Failure Capture:** Dedicated `test.afterEach` hook capturing full-page screenshots of test failures into `failed_tests_screenshots/`.
- **Allure Reporting:** Integrated with video recordings (`.webm`), execution traces (`.zip`), and failure screenshots.
- **Automated Workspace Cleanup (`globalSetup.js`):** Automatically cleans stale Allure results, old HTML reports, execution traces, videos, and screenshots before every test run for clean test isolation.

---

## 📁 Project Structure

```text
├── fixtures/                 # Custom Playwright test fixtures
│   └── baseFixtures.js       # Base fixture extensions & afterEach failure hook
├── pages/                    # Page Object classes
│   ├── HomePage.js           # Main landing page actions & header
│   ├── RecipePage.js         # Recipe details, ingredients, nutrition
│   ├── SearchResultsPage.js  # Search queries, keyword filters, tags
│   ├── IngredientsPage.js    # A-Z directory and alphabet jumping
│   ├── AuthorPage.js         # Author profile & recipe catalog
│   ├── AboutUs.js            # Editorial guidelines & contact info
│   ├── NewsPage.js           # Food trends & news articles
│   ├── MobilePage.js         # Mobile navigation drawer & accordions
│   └── PoManager.js          # Page Object Manager
├── tests/                    # Test specifications
│   ├── homePage.spec.js
│   ├── recipePage.spec.js
│   ├── searchResultsPage.spec.js
│   ├── ingredientsPage.spec.js
│   ├── authorPage.spec.js
│   ├── aboutUs.spec.js
│   ├── newsPage.spec.js
│   └── mobile.spec.js        # Dedicated mobile suite (Android & iPhone)
├── testData/                 # Externalized test datasets
│   └── testData.json
├── utils/                    # Reusable utility functions
│   └── helper.js             # Screenshot capture & scroll 
│   └── globalSetup.js        # Automated pre-run cleanup hook
├── .env                      # Environment configuration
├── playwright.config.js      # Global Playwright configuration
└── package.json              # Dependencies and test runner scripts


---

## Getting Started

### 1. Prerequisites

Make sure you have the following installed on your system:

- **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
- **[Playwright](https://playwright.dev/)** (`@playwright/test` v1.50+ — Core E2E automation testing framework)
- **Java (JRE / JDK 21)** (Required to compile and generate Allure Reports)

---

### 2. Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <your-github-repo-url>
   cd allrecipes-playwright-automation-framework

   ```

> *Note: The `.env` file is already included with the base configuration (`BASE_URL=https://www.allrecipes.com/`). No additional environment configuration is required.*

---

## Running Tests

Use Playwright's native CLI commands to execute your test suites:

### 1. Run All Tests

```bash
# Run all tests headlessly
npx playwright test

# Run all tests with visible browser windows
npx playwright test --headed

```

### 2. Run by Device & Platform

```bash
# Run Mobile tests only (Android Pixel 7 & iOS iPhone 14)
npx playwright test tests/mobile.spec.js --headed

# Run only on Desktop Google Chrome
npx playwright test --project=chromium --headed

# Run only on Desktop Mozilla Firefox
npx playwright test --project=firefox --headed

# Run only on Mobile Android (Pixel 7)
npx playwright test --project=Android --headed

# Run only on Mobile iPhone (iOS 14)
npx playwright test --project=iPhone --headed

```

### 3. Run Specific Test Modules

```bash
# Recipe Page tests
npx playwright test tests/recipePage.spec.js --headed

# Search Results tests
npx playwright test tests/searchResultsPage.spec.js --headed

# Ingredients Directory tests
npx playwright test tests/ingredientsPage.spec.js --headed

# Author Profile tests
npx playwright test tests/authorPage.spec.js --headed

```

---

## Generating Allure Reports

The framework is integrated with `allure-playwright` to capture test execution status, step logs, failure screenshots, video recordings, and Playwright traces.

> [!TIP]
> **Automated Fresh Reports:** The framework is configured with a `globalSetup` hook that automatically deletes old results, videos, and traces from `./allure-results` and `./allure-report` before each test execution, ensuring each report reflects only the latest test run.

### Option 1: Quick Serve (Compile & Open in one step)

```bash
npx allure serve ./allure-results

```

### Option 2: Generate Static HTML Report

```bash
# 1. Generate the HTML report folder
npx allure generate ./allure-results --clean -o ./allure-report

# 2. Open the report in your browser
npx allure open ./allure-report

```

*(You can also view Playwright's built-in HTML report anytime with `npx playwright show-report`)*

---

## 📄 License

This project is licensed under the **MIT License**.
