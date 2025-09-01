import { test, expect } from '@playwright/test';
import { createTestHelpers } from './helpers/test-utils';

test.describe('Seed Integration Tests', () => {
  test('should have seed user available for authentication', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();

    // Check that seed user credentials are available
    expect(seedUser.email).toBe('test.user@saldopositivo.com');
    expect(seedUser.name).toBe('João Silva Santos');
    expect(seedUser.password).toBe('TestPassword123!');
  });

  test('should access dashboard with mocked authentication', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    // Mock authentication
    await helpers.mockAuthentication();
    
    // Go to dashboard
    await page.goto('/dashboard');
    
    // Should be able to access dashboard
    await expect(page.locator('h1')).toContainText('Dashboard');
    expect(page.url()).toContain('/dashboard');
    
    console.log('✅ Dashboard access successful with mock auth');
  });

  test('should show authentication working', async ({ page }) => {
    const helpers = createTestHelpers(page);
    
    // Test without auth - should redirect
    await page.goto('/dashboard');
    //wait for url rewrite
    await page.waitForURL('http://localhost:3000/');
    expect(page.url()).toBe('http://localhost:3000/');
    console.log('✅ Without auth: redirected to home page');
    
    // Test with auth - should stay on dashboard  
    await helpers.mockAuthentication();
    await page.goto('/dashboard');
    expect(page.url()).toContain('/dashboard');
    console.log('✅ With auth: can access dashboard');
  });

  test('should demonstrate seed data usage', async ({ page }) => {
    const helpers = createTestHelpers(page);
    await helpers.mockAuthentication();
    
    // This test demonstrates how seed data would be used
    // In a real scenario, you would:
    // 1. Run the seed to populate the database
    // 2. Login with seed user credentials
    // 3. Verify data appears on dashboard/pages
    
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    console.log('✅ Ready for seed data integration');
    console.log('📊 Seed includes:');
    console.log('   - User: João Silva Santos');
    console.log('   - Period: Jan 2024 - Aug 2025');
    console.log('   - 12 categories');
    console.log('   - ~5000 total revenue');
    console.log('   - 30+ small expenses (2-150) per month');
    console.log('   - 5-15 large expenses (150-1500) per month');
  });
});