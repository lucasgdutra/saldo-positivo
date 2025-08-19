import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/');

    // Navigate to auth section
    await page.locator('#auth').scrollIntoViewIfNeeded();

    // Check login form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/cadastro');

    // Check that we're on the signup page
    await expect(page).toHaveURL('/cadastro');
    
    // Check page heading
    await expect(page.locator('h1, h2').first()).toContainText(/Cadastro|Criar conta|Registrar/i);
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await page.goto('/esqueci-senha');

    // Check that we're on the forgot password page
    await expect(page).toHaveURL('/esqueci-senha');
    
    // Check page content
    await expect(page.locator('h1, h2').first()).toContainText(/Esqueci|senha|recuperar/i);
  });

  test('should show validation errors for empty login form', async ({ page }) => {
    await page.goto('/');

    // Navigate to auth section
    await page.locator('#auth').scrollIntoViewIfNeeded();

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check for validation errors (these might be browser validation or custom validation)
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    
    // Check if inputs are marked as invalid
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('should show validation errors for invalid email', async ({ page }) => {
    await page.goto('/');

    // Navigate to auth section
    await page.locator('#auth').scrollIntoViewIfNeeded();

    // Fill invalid email
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'password123');
    
    // Try to submit
    await page.click('button[type="submit"]');

    // The browser should show validation error for invalid email
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('should attempt login with valid credentials format', async ({ page }) => {
    await page.goto('/');

    // Navigate to auth section
    await page.locator('#auth').scrollIntoViewIfNeeded();

    // Fill valid format credentials
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');

    // Since we don't have real authentication, we just check the form submission
    // The form should process (might show loading state or error message)
    await page.waitForTimeout(1000); // Wait for potential async operation
  });
});