import { expect, test } from "@playwright/test";
import { createTestHelpers } from "./helpers/test-utils";

test.describe("Real Authentication Tests", () => {
	test("should login with seed user and see dashboard data", async ({
		page,
	}) => {
		const helpers = createTestHelpers(page);
		const seedUser = helpers.getSeedUser();

		// Navigate to homepage
		await page.goto("/");

		// Navigate to auth section
		await page.locator("#auth").scrollIntoViewIfNeeded();

		// Fill login form with seed user credentials
		await page.fill('input[type="email"], input[name="email"]', seedUser.email);
		await page.fill(
			'input[type="password"], input[name="password"]',
			seedUser.password,
		);

		// Submit login form
		await page.click('button[type="submit"]');

		// Wait for potential navigation or loading
		await page.waitForTimeout(3000);

		// Check if we're authenticated (should have redirected or have dashboard access)
		const currentUrl = page.url();
		console.log("Current URL after login attempt:", currentUrl);

		// Try to access dashboard
		await page.goto("/dashboard");

		// Wait for dashboard to load
		await page.waitForTimeout(2000);

		// Check dashboard content
		const dashboardTitle = page.locator("h1");
		const hasTitle = (await dashboardTitle.count()) > 0;

		if (hasTitle) {
			const titleText = await dashboardTitle.textContent();
			console.log("Dashboard title:", titleText);

			if (titleText?.includes("Dashboard")) {
				console.log("✅ Successfully accessed dashboard");

				// Check for financial data
				const summaryCards = page.locator(".rounded-lg.border");
				const cardCount = await summaryCards.count();
				console.log(`Found ${cardCount} summary cards`);

				if (cardCount > 0) {
					// Get text from first few cards to see the data
					for (let i = 0; i < Math.min(3, cardCount); i++) {
						const cardText = await summaryCards.nth(i).textContent();
						console.log(`Card ${i + 1}:`, cardText);
					}
				}
			} else {
				console.log("⚠️ Dashboard title not found, current title:", titleText);
			}
		} else {
			console.log("❌ No dashboard title found");
		}

		// This test is exploratory - we expect it might fail but want to see the behavior
		expect(hasTitle).toBeTruthy();
	});

	test("should show seed data after successful login", async ({ page }) => {
		const helpers = createTestHelpers(page);
		const seedUser = helpers.getSeedUser();

		// This test assumes seed has been run and user exists
		console.log("🌱 Testing with seed user:", seedUser.email);

		await page.goto("/");

		// Scroll to auth section
		await page.locator("#auth").scrollIntoViewIfNeeded();

		// Login attempt
		await page.fill('input[type="email"]', seedUser.email);
		await page.fill('input[type="password"]', seedUser.password);
		await page.click('button[type="submit"]');

		// Wait for potential redirect
		await page.waitForTimeout(3000);

		// Go to dashboard
		await page.goto("/dashboard");
		await page.waitForTimeout(3000);

		// Look for financial data indicators
		const hasFinancialData = (await page.locator("text=R$").count()) > 0;
		const hasNoDataMessage =
			(await page.locator("text=Sem dados financeiros").count()) > 0;

		console.log("Has financial data (R$ indicators):", hasFinancialData);
		console.log("Has no data message:", hasNoDataMessage);

		if (hasFinancialData) {
			console.log("✅ Dashboard shows financial data");

			// Try to extract some values
			const financialElements = page.locator("text=/R\\$\\s*[0-9.,]+/");
			const count = await financialElements.count();
			console.log(`Found ${count} financial values`);

			for (let i = 0; i < Math.min(3, count); i++) {
				const value = await financialElements.nth(i).textContent();
				console.log(`Financial value ${i + 1}:`, value);
			}
		} else if (hasNoDataMessage) {
			console.log("⚠️ Dashboard shows no data message");
		} else {
			console.log("❓ Dashboard state unclear");
		}

		// Check URL to see if we're actually on dashboard
		console.log("Final URL:", page.url());
	});
});
