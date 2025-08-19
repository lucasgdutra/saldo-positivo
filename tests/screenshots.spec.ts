import { test } from '@playwright/test';
import { createTestHelpers } from './helpers/test-utils';

test.describe('Screenshots for Documentation', () => {
  // Configure screenshots
  test.use({
    viewport: { width: 1280, height: 800 }
  });

  test('Homepage - Landing page', async ({ page }) => {
    await page.goto('/');

    // Wait for content to load
    await page.waitForSelector('h1:has-text("Saldo Positivo")');

    // Take full page screenshot
    await page.screenshot({
      path: 'docs/screenshots/homepage-full.png',
      fullPage: true
    });

    // Take hero section screenshot
    await page.screenshot({
      path: 'docs/screenshots/homepage-hero.png',
      clip: { x: 0, y: 0, width: 1280, height: 600 }
    });
  });

  test('Homepage - Features section', async ({ page }) => {
    await page.goto('/');

    // Scroll to features section
    await page.click('a[href="#features"]');
    await page.waitForSelector('#features');

    // Take screenshot of features section
    const featuresSection = page.locator('#features');
    await featuresSection.screenshot({
      path: 'docs/screenshots/features-section.png'
    });
  });

  test('Registration page', async ({ page }) => {
    await page.goto('/cadastro');

    // Wait for form to load
    await page.waitForSelector('form');

    await page.screenshot({
      path: 'docs/screenshots/registration-page.png',
      fullPage: true
    });
  });

  test('Login form', async ({ page }) => {
    await page.goto('/');

    // Navigate to auth section
    await page.click('a[href="#auth"]');
    await page.waitForSelector('#auth');

    // Take screenshot of auth section
    const authSection = page.locator('#auth');
    await authSection.screenshot({
      path: 'docs/screenshots/login-form.png'
    });
  });

  test('Dashboard - Authenticated view', async ({ page }) => {

    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();


    // Login with seed user
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Wait for dashboard content to load
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 15000 });

    // Wait for API data to load (charts, summary, transactions)
    await page.waitForTimeout(5000);

    // Wait for any loading states to complete
    await page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, .spinner');
      return loadingElements.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Continue if no loading elements found
    });

    // Take full dashboard screenshot
    await page.screenshot({
      path: 'docs/screenshots/dashboard-full.png',
      fullPage: true
    });

    // Take screenshot of just the main content area
    await page.screenshot({
      path: 'docs/screenshots/dashboard-main.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
  });

  test('Expenses page', async ({ page }) => {

    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();


    // Login with seed user
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    await page.goto('/despesas');

    // Wait for page content to load
    await page.waitForTimeout(3000);

    // Wait for any API data to load
    await page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, .spinner');
      return loadingElements.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Continue if no loading elements found
    });

    await page.screenshot({
      path: 'docs/screenshots/expenses-page.png',
      fullPage: true
    });
  });

  test('Revenues page', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();


    // Login with seed user
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    await page.goto('/receitas');

    // Wait for page content to load
    await page.waitForTimeout(3000);

    // Wait for any API data to load
    await page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, .spinner');
      return loadingElements.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Continue if no loading elements found
    });

    await page.screenshot({
      path: 'docs/screenshots/revenues-page.png',
      fullPage: true
    });
  });

  test('Categories page', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();


    // Login with seed user
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    await page.goto('/categorias');

    // Wait for page content to load
    await page.waitForTimeout(3000);

    // Wait for any API data to load
    await page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, .spinner');
      return loadingElements.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Continue if no loading elements found
    });

    await page.screenshot({
      path: 'docs/screenshots/categories-page.png',
      fullPage: true
    });
  });

  test('Reports page', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
   
    // Login with seed user
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    await page.goto('/relatorios');

    // Wait for page content to load
    await page.waitForTimeout(3000);

    // Wait for any API data to load (reports may take longer)
    await page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, .spinner');
      return loadingElements.length === 0;
    }, { timeout: 15000 }).catch(() => {
      // Continue if no loading elements found
    });

    await page.screenshot({
      path: 'docs/screenshots/reports-page.png',
      fullPage: true
    });
  });

  test('Profile page', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
   
    // Login with seed user
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    await page.goto('/perfil');

    // Wait for page content to load
    await page.waitForTimeout(3000);

    // Wait for any API data to load
    await page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, .spinner');
      return loadingElements.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Continue if no loading elements found
    });

    await page.screenshot({
      path: 'docs/screenshots/profile-page.png',
      fullPage: true
    });
  });

  test('Mobile view - Homepage', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForSelector('h1:has-text("Saldo Positivo")');

    await page.screenshot({
      path: 'docs/screenshots/homepage-mobile.png',
      fullPage: true
    });
  });

  test('Mobile view - Dashboard', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
   
    // Login with seed user
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    await page.goto('/dashboard');

    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 15000 });

    // Wait for API data to load on mobile
    await page.waitForTimeout(5000);

    // Wait for any loading states to complete
    await page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, .spinner');
      return loadingElements.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Continue if no loading elements found
    });

    await page.screenshot({
      path: 'docs/screenshots/dashboard-mobile.png',
      fullPage: true
    });
  });

  test('Error states', async ({ page }) => {
    // Try to access a protected route without authentication
    await page.goto('/dashboard');

    // Wait for any error state or redirect
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'docs/screenshots/auth-required-state.png'
    });
  });

  test('Forms and modals', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
   
    // Login with seed user
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    await page.goto('/despesas');

    // Wait for page to load
    await page.waitForTimeout(3000);

    // Wait for any API data to load first
    await page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, .spinner');
      return loadingElements.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Continue if no loading elements found
    });

    // Try to find and click add expense button
    const addButton = page.locator('button:has-text("Nova"), button:has-text("Adicionar"), button:has-text("+")').first();

    if (await addButton.count() > 0) {
      await addButton.click();

      // Wait for modal/form to appear
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: 'docs/screenshots/expense-form-modal.png'
      });
    }
  });
});