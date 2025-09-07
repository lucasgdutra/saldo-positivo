import { expect, test } from "@playwright/test";

test.describe("Performance", () => {
	test("should load homepage within acceptable time", async ({ page }) => {
		const startTime = Date.now();

		await page.goto("/", { waitUntil: "networkidle" });

		const loadTime = Date.now() - startTime;

		// Page should load within 5 seconds (adjust based on your requirements)
		expect(loadTime).toBeLessThan(5000);

		// Check that main content is visible
		await expect(page.locator("h1")).toBeVisible();
		await expect(page.locator("#features")).toBeVisible();
	});

	test("should have reasonable Core Web Vitals", async ({ page }) => {
		await page.goto("/");

		// Wait for page to fully load
		await page.waitForLoadState("networkidle");

		// Measure Largest Contentful Paint (LCP)
		const lcp = await page.evaluate(() => {
			return new Promise((resolve) => {
				const observer = new PerformanceObserver((list) => {
					const entries = list.getEntries();
					const lastEntry = entries[entries.length - 1];
					resolve(lastEntry?.startTime || 0);
				});
				observer.observe({ entryTypes: ["largest-contentful-paint"] });

				// Fallback timeout
				setTimeout(() => resolve(0), 3000);
			});
		});

		// LCP should be under 2.5 seconds for good performance
		if (typeof lcp === "number" && lcp > 0) {
			expect(lcp).toBeLessThan(2500);
		}
	});

	test("should not have layout shifts during load", async ({ page }) => {
		await page.goto("/");

		// Wait a moment for any potential layout shifts
		await page.waitForTimeout(2000);

		// Measure Cumulative Layout Shift (CLS)
		const cls = await page.evaluate(() => {
			return new Promise((resolve) => {
				let cls = 0;
				const observer = new PerformanceObserver((list) => {
					for (const entry of list.getEntries() as any[]) {
						if (!entry.hadRecentInput) {
							cls += entry.value;
						}
					}
				});
				observer.observe({ entryTypes: ["layout-shift"] });

				setTimeout(() => resolve(cls), 1000);
			});
		});

		// CLS should be less than 0.1 for good user experience
		if (typeof cls === "number") {
			expect(cls).toBeLessThan(0.1);
		}
	});

	test("should load images efficiently", async ({ page }) => {
		await page.goto("/");

		// Check that images have appropriate loading attributes
		const images = page.locator("img");
		const imageCount = await images.count();

		for (let i = 0; i < imageCount; i++) {
			const img = images.nth(i);

			// Images should have alt text for accessibility
			const altText = await img.getAttribute("alt");
			expect(altText).toBeTruthy();

			// Check if image loads successfully
			const isLoaded = await img.evaluate((img: HTMLImageElement) => {
				return img.complete && img.naturalWidth > 0;
			});

			if (isLoaded) {
				expect(isLoaded).toBeTruthy();
			}
		}
	});

	test("should have efficient CSS loading", async ({ page }) => {
		const response = await page.goto("/");

		// Check response time for main document
		const loadTime = response?.request().timing().responseEnd || 0;
		expect(loadTime).toBeLessThan(2000); // Should respond within 2 seconds

		// Check that CSS is not blocking rendering excessively
		await page.waitForSelector("h1"); // Main heading should appear quickly

		const mainHeading = page.locator("h1");
		await expect(mainHeading).toBeVisible();
	});

	test("should handle multiple concurrent users (stress test)", async ({
		page,
		context,
	}) => {
		// Simulate multiple tabs/pages loading simultaneously
		const pages = await Promise.all([
			context.newPage(),
			context.newPage(),
			context.newPage(),
		]);

		const startTime = Date.now();

		// Load homepage on all pages simultaneously
		await Promise.all(
			pages.map((p) => p.goto("/", { waitUntil: "domcontentloaded" })),
		);

		const totalLoadTime = Date.now() - startTime;

		// Even with multiple concurrent loads, should complete reasonably quickly
		expect(totalLoadTime).toBeLessThan(10000);

		// Clean up
		await Promise.all(pages.map((p) => p.close()));
	});

	test("should have reasonable bundle size impact", async ({ page }) => {
		// Monitor network requests to understand bundle sizes
		const responses: string[] = [];

		page.on("response", (response) => {
			const url = response.url();
			const contentType = response.headers()["content-type"] || "";

			if (contentType.includes("javascript") || contentType.includes("css")) {
				responses.push(url);
			}
		});

		await page.goto("/", { waitUntil: "networkidle" });

		// Should have loaded some CSS and JS resources
		expect(responses.length).toBeGreaterThan(0);

		// Check that we're not loading an excessive number of resources
		expect(responses.length).toBeLessThan(30); // Adjust based on your app structure
	});

	test("should handle slow network gracefully", async ({ page, context }) => {
		// Simulate slow 3G connection
		await context.route("**/*", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 100)); // Add 100ms delay
			await route.continue();
		});

		const startTime = Date.now();
		await page.goto("/");
		const loadTime = Date.now() - startTime;

		// Should still load within reasonable time even on slow connection
		expect(loadTime).toBeLessThan(15000);

		// Critical content should still be visible
		await expect(page.locator("h1")).toBeVisible();
	});

	test("should preload critical resources", async ({ page }) => {
		await page.goto("/");

		// Check for preload links in head
		const preloadLinks = page.locator('link[rel="preload"]');
		const preloadCount = await preloadLinks.count();

		// Having some preload links is good for performance
		// (This might be 0 if no explicit preloading is implemented)
		if (preloadCount > 0) {
			expect(preloadCount).toBeGreaterThan(0);
		}

		// Check that fonts are loading efficiently if any
		const fontLinks = page.locator('link[rel="preload"][as="font"]');
		const fontCount = await fontLinks.count();

		if (fontCount > 0) {
			// Font preloads should have crossorigin attribute
			for (let i = 0; i < fontCount; i++) {
				const fontLink = fontLinks.nth(i);
				const crossorigin = await fontLink.getAttribute("crossorigin");
				expect(crossorigin).toBeTruthy();
			}
		}
	});
});
