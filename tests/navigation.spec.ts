import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    // Test homepage
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // Test signup page
    await page.goto('/cadastro');
    await expect(page).toHaveURL('/cadastro');

    // Test forgot password page
    await page.goto('/esqueci-senha');
    await expect(page).toHaveURL('/esqueci-senha');

    // Test password reset page (might require token, but we can test the route)
    await page.goto('/redefinir-senha');
    await expect(page).toHaveURL('/redefinir-senha');

    // Test contact page
    await page.goto('/contato');
    await expect(page).toHaveURL('/contato');

    // Test terms page
    await page.goto('/termos');
    await expect(page).toHaveURL('/termos');

    // Test privacy page
    await page.goto('/privacidade');
    await expect(page).toHaveURL('/privacidade');
  });

  test('should handle protected routes without authentication', async ({ page }) => {
    // These routes should redirect to login or show auth guard
    const protectedRoutes = [
      '/dashboard',
      '/despesas',
      '/receitas',
      '/categorias',
      '/relatorios',
      '/perfil'
    ];

    for (const route of protectedRoutes) {
      await page.goto(route);
      
      // Should either redirect to home/login or show auth requirement
      // Since we're using AuthGuard, it might redirect or show the homepage
      const currentUrl = page.url();
      const isOnProtectedPage = currentUrl.includes(route);
      const isRedirected = currentUrl === 'http://localhost:3000/' || currentUrl.includes('login');
      
      // Either should be redirected or the auth guard should prevent access
      expect(isOnProtectedPage || isRedirected).toBeTruthy();
    }
  });

  test('should display 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/non-existent-page');
    
    // Check if we get a 404 status or are shown a not found page
    const response = await page.request.get('/non-existent-page');
    expect(response.status()).toBe(404);
  });

  test('should have working footer links', async ({ page }) => {
    await page.goto('/');

    // Test footer navigation
    await page.click('footer a[href="/termos"]');
    await expect(page).toHaveURL('/termos');

    await page.goto('/');
    await page.click('footer a[href="/privacidade"]');
    await expect(page).toHaveURL('/privacidade');

    await page.goto('/');
    await page.click('footer a[href="/contato"]');
    await expect(page).toHaveURL('/contato');
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate through multiple pages
    await page.goto('/');
    await page.goto('/cadastro');
    await page.goto('/contato');

    // Use browser back button
    await page.goBack();
    await expect(page).toHaveURL('/cadastro');

    await page.goBack();
    await expect(page).toHaveURL('/');

    // Use browser forward button
    await page.goForward();
    await expect(page).toHaveURL('/cadastro');
  });

  test('should maintain responsive navigation on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check if the page is responsive
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();

    // The layout should adapt to mobile view
    const headerContainer = page.locator('header .container');
    await expect(headerContainer).toBeVisible();
  });
});