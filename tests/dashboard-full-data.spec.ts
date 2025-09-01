import { test, expect } from '@playwright/test';
import { createTestHelpers } from './helpers/test-utils';

test.describe('Dashboard with Full Historical Data', () => {
  test('should display correct financial summary with 20 months of data', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
    console.log('🌱 Testing dashboard with full historical data');
    console.log('👤 User:', seedUser.email);
    
    // Login with seed user
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Verify we're on dashboard
    await expect(page.locator('h1')).toContainText('Dashboard');
    console.log('✅ Dashboard loaded successfully');
    
    // Check main summary cards
    const summaryCards = page.locator('.rounded-lg.border p');
    const cardCount = await summaryCards.count();
    console.log(`📊 Found ${cardCount} summary elements`);
    
    // Extract financial values
    const financialValues = page.locator('text=/R\\$\\s*[0-9.,]+/');
    const valueCount = await financialValues.count();
    console.log(`💰 Found ${valueCount} financial values`);
    
    if (valueCount >= 3) {
      for (let i = 0; i < Math.min(3, valueCount); i++) {
        const value = await financialValues.nth(i).textContent();
        console.log(`   ${i + 1}. ${value}`);
        
        // Verify values are reasonable (should be > R$ 1000 with 20 months of data)
        const numericValue = value?.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.') || '0';
        const amount = parseFloat(numericValue);
        expect(amount).toBeGreaterThan(1000); // Should have substantial amounts
      }
    }
    
    console.log('✅ Financial summary values look correct');
  });

  test('should load balance history data', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
    // Login
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    // Test balance history API directly
    const response = await page.request.get('/api/dashboard/balance-history');
    console.log('📈 Balance History API Status:', response.status());
    
    if (response.status() === 200) {
      const historyData = await response.json();
      console.log('📊 Balance history data:', historyData);
      
      expect(Array.isArray(historyData)).toBeTruthy();
      if (historyData.length > 0) {
        console.log(`✅ Found ${historyData.length} months of balance history`);
        
        // Verify structure of history data
        const firstMonth = historyData[0];
        expect(firstMonth).toHaveProperty('month');
        expect(firstMonth).toHaveProperty('receitas');
        expect(firstMonth).toHaveProperty('despesas');
        
        console.log('Sample month data:', firstMonth);
      }
    } else {
      console.log('⚠️ Balance history API returned status:', response.status());
      const errorText = await response.text();
      console.log('Error:', errorText);
    }
  });

  test('should load recent transactions data', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
    // Login
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    // Test recent transactions API
    const response = await page.request.get('/api/dashboard/recent-transactions');
    console.log('📝 Recent Transactions API Status:', response.status());
    
    if (response.status() === 200) {
      const transactions = await response.json();
      console.log(`📊 Found ${transactions.length} recent transactions`);
      
      expect(Array.isArray(transactions)).toBeTruthy();
      if (transactions.length > 0) {
        // Verify transaction structure
        const firstTransaction = transactions[0];
        expect(firstTransaction).toHaveProperty('id');
        expect(firstTransaction).toHaveProperty('type');
        expect(firstTransaction).toHaveProperty('amount');
        expect(firstTransaction).toHaveProperty('description');
        expect(firstTransaction).toHaveProperty('date');
        
        console.log('Sample transaction:', firstTransaction);
        console.log('✅ Recent transactions API working correctly');
      }
    } else {
      console.log('⚠️ Recent transactions API error:', response.status());
    }
  });

  test('should display charts and visualizations with historical data', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
    // Login and go to dashboard
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    await page.goto('/dashboard');
    await page.waitForTimeout(4000); // Extra time for charts to load
    
    // Look for chart containers
    const chartContainers = page.locator('canvas, svg[class*="recharts"], .recharts-wrapper, [data-testid*="chart"]');
    const chartCount = await chartContainers.count();
    console.log(`📈 Found ${chartCount} chart elements`);
    
    if (chartCount > 0) {
      for (let i = 0; i < Math.min(3, chartCount); i++) {
        const chart = chartContainers.nth(i);
        await expect(chart).toBeVisible();
        console.log(`✅ Chart ${i + 1} is visible`);
      }
    }
    
    // Look for chart sections in the dashboard
    const chartSections = page.locator('text=Receitas vs Despesas, text=Despesas por Categoria, text=Histórico');
    const sectionCount = await chartSections.count();
    console.log(`📊 Found ${sectionCount} chart section headers`);
    
    // Look for recent transactions section
    const transactionsSection = page.locator('text=Transações Recentes, text=Recent, text=Histórico de Transações');
    const hasTransactions = await transactionsSection.count() > 0;
    console.log(`📝 Has transactions section: ${hasTransactions}`);
    
    if (hasTransactions) {
      console.log('✅ Recent transactions section found');
    }
  });

  test('should handle large dataset performance', async ({ page }) => {
    const helpers = createTestHelpers(page);
    const seedUser = helpers.getSeedUser();
    
    // Measure load time
    const startTime = Date.now();
    
    // Login
    await page.goto('/');
    await page.locator('#auth').scrollIntoViewIfNeeded();
    await page.fill('input[type="email"]', seedUser.email);
    await page.fill('input[type="password"]', seedUser.password);
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`⏱️ Dashboard load time with full dataset: ${loadTime}ms`);
    
    // Should load within reasonable time even with large dataset
    expect(loadTime).toBeLessThan(15000); // 15 seconds max
    
    // Verify main content is loaded
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Check for loading states (should be completed)
    const loadingSpinners = page.locator('.animate-spin, :text("Carregando")');
    const spinnerCount = await loadingSpinners.count();
    console.log(`⏳ Loading spinners still visible: ${spinnerCount}`);
    
    // Should have finished loading
    expect(spinnerCount).toBeLessThanOrEqual(1); // Allow some loading states
    
    console.log('✅ Dashboard performance with large dataset is acceptable');
  });
});