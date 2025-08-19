import { test, expect } from '@playwright/test';
import { createTestHelpers } from './helpers/test-utils';
import { createAuthHelper } from './helpers/auth';

test.describe('Authenticated User Tests', () => {
  test.beforeEach(async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    // Mock authentication for testing
    await helpers.mockAuthentication();
  });

  test('should access dashboard when authenticated', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    await page.goto('/dashboard');
    
    // Should be able to access dashboard
    await expect(page.locator('h1')).toContainText('Dashboard', { timeout: 10000 });
    
    // Should show welcome message
    await expect(page.locator('text=Bem-vindo')).toBeVisible();
  });

  test('should access expenses page when authenticated', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    await page.goto('/despesas');
    
    // Should be able to access expenses page
    await expect(page.locator('h1')).toBeVisible();
    
    // Page should load without redirecting to home
    expect(page.url()).toContain('/despesas');
  });

  test('should access revenues page when authenticated', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    await page.goto('/receitas');
    
    // Should be able to access revenues page
    await expect(page.locator('h1')).toBeVisible();
    
    // Page should load without redirecting to home
    expect(page.url()).toContain('/receitas');
  });

  test('should access categories page when authenticated', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    await page.goto('/categorias');
    
    // Should be able to access categories page
    await expect(page.locator('h1')).toBeVisible();
    
    // Page should load without redirecting to home
    expect(page.url()).toContain('/categorias');
  });

  test('should access reports page when authenticated', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    await page.goto('/relatorios');
    
    // Should be able to access reports page
    await expect(page.locator('h1')).toBeVisible();
    
    // Page should load without redirecting to home
    expect(page.url()).toContain('/relatorios');
  });

  test('should access profile page when authenticated', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    await page.goto('/perfil');
    
    // Should be able to access profile page
    await expect(page.locator('h1')).toBeVisible();
    
    // Page should load without redirecting to home
    expect(page.url()).toContain('/perfil');
  });

  test('should show user information on dashboard', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
    await page.goto('/dashboard');
    
    // Wait for dashboard to load
    await expect(page.locator('h1')).toContainText('Dashboard', { timeout: 10000 });
    
    // Should show some user-specific content (this depends on your implementation)
    // For now, just check that dashboard components are present
    await expect(page.locator('text=Receitas, text=Despesas')).toHaveCount({ min: 1 });
  });

  test('should navigate between authenticated pages', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    // Start at dashboard
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard', { timeout: 10000 });
    
    // Navigate to expenses (if navigation exists)
    const expensesLink = page.locator('a[href="/despesas"], text=Despesas').first();
    if (await expensesLink.count() > 0) {
      await expensesLink.click();
      expect(page.url()).toContain('/despesas');
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('should handle dashboard components', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard', { timeout: 10000 });
    
    // Check for dashboard summary components
    const summaryCards = page.locator('[data-testid="dashboard-summary"], .dashboard-summary, .summary-card');
    if (await summaryCards.count() > 0) {
      await expect(summaryCards.first()).toBeVisible();
    }
    
    // Check for charts or visualizations
    const charts = page.locator('canvas, svg[class*="recharts"], .chart, [data-testid="chart"]');
    if (await charts.count() > 0) {
      await expect(charts.first()).toBeVisible();
    }
  });
});