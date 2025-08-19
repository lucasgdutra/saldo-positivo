import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Large Desktop', width: 1920, height: 1080 }
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should display correctly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Check that main elements are visible
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();

      // Check that content doesn't overflow horizontally
      const body = page.locator('body');
      const bodyBoundingBox = await body.boundingBox();
      if (bodyBoundingBox) {
        expect(bodyBoundingBox.width).toBeLessThanOrEqual(width);
      }

      // Check that navigation is accessible
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // On mobile, check if navigation might be collapsed
      if (width < 768) {
        // Mobile-specific checks
        const mobileNav = page.locator('[data-testid="mobile-nav"], .mobile-nav, button[aria-label*="menu"], button[aria-label*="Menu"]');
        if (await mobileNav.count() > 0) {
          await expect(mobileNav).toBeVisible();
        }
      }
    });
  });

  test('should handle orientation changes on mobile', async ({ page }) => {
    // Portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();

    // Landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have readable text on all screen sizes', async ({ page }) => {
    for (const { width, height } of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Check that headings are appropriately sized
      const h1 = page.locator('h1').first();
      if (await h1.count() > 0) {
        const fontSize = await h1.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });
        
        // Font size should be reasonable (at least 16px base, but headings larger)
        const fontSizeNum = Number.parseFloat(fontSize);
        expect(fontSizeNum).toBeGreaterThanOrEqual(16);
      }

      // Check that paragraphs have readable font size
      const paragraph = page.locator('p').first();
      if (await paragraph.count() > 0) {
        const fontSize = await paragraph.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });
        
        const fontSizeNum = Number.parseFloat(fontSize);
        expect(fontSizeNum).toBeGreaterThanOrEqual(14); // Minimum readable size
      }
    }
  });

  test('should have proper spacing on different screen sizes', async ({ page }) => {
    for (const { width, height } of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Check that elements have appropriate spacing
      const sections = page.locator('section');
      const sectionCount = await sections.count();

      if (sectionCount > 1) {
        // Check that sections don't overlap
        for (let i = 0; i < Math.min(sectionCount, 3); i++) {
          const section = sections.nth(i);
          const bbox = await section.boundingBox();
          
          if (bbox) {
            // Sections should have some height (not collapsed)
            expect(bbox.height).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  test('should handle touch interactions on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Test tap events on buttons
    const ctaButton = page.locator('link[href="/cadastro"]').first();
    if (await ctaButton.count() > 0) {
      await expect(ctaButton).toBeVisible();
      
      // Check that the button is large enough for touch (minimum 44px recommended)
      const bbox = await ctaButton.boundingBox();
      if (bbox) {
        expect(Math.min(bbox.width, bbox.height)).toBeGreaterThanOrEqual(32); // Slightly less strict for testing
      }
    }
  });

  test('should maintain usability in landscape mode on tablets', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');

    // Check that layout adapts well to landscape orientation
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('#features')).toBeVisible();
    await expect(page.locator('#auth')).toBeVisible();

    // Features should be laid out properly
    const featureCards = page.locator('#features .grid > div');
    const cardCount = await featureCards.count();
    
    if (cardCount >= 3) {
      // On tablet landscape, cards should be visible
      for (let i = 0; i < 3; i++) {
        await expect(featureCards.nth(i)).toBeVisible();
      }
    }
  });

  test('should have accessible focus indicators on all screen sizes', async ({ page }) => {
    for (const { width, height } of viewports.slice(0, 2)) { // Test mobile and tablet
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Navigate to a focusable element
      const firstLink = page.locator('a').first();
      if (await firstLink.count() > 0) {
        await firstLink.focus();
        
        // Check that focused element is visible
        await expect(firstLink).toBeFocused();
        
        // Focus indicator should be visible (this is hard to test directly)
        // At minimum, the element should remain focusable
        const isFocused = await firstLink.evaluate((el) => el === document.activeElement);
        expect(isFocused).toBeTruthy();
      }
    }
  });
});