import { expect, test } from "@playwright/test";
import { createTestHelpers } from "./helpers/test-utils";

test.describe("Smoke Tests", () => {
	test("should load all main pages without errors", async ({ page }) => {
		const helpers = createTestHelpers(page);
		const checkErrors = await helpers.checkConsoleErrors();

		const pages = [
			{ url: "/", name: "Homepage" },
			{ url: "/cadastro", name: "Signup" },
			{ url: "/contato", name: "Contact" },
			{ url: "/termos", name: "Terms" },
			{ url: "/privacidade", name: "Privacy" },
			{ url: "/esqueci-senha", name: "Forgot Password" },
		];

		for (const { url, name } of pages) {
			await test.step(`Load ${name} page`, async () => {
				await helpers.navigateAndWait(url);

				// Check that page loads
				await expect(page).toHaveURL(url);

				// Check that main content is visible
				const mainContent = page.locator("main, .main, .container").first();
				if ((await mainContent.count()) > 0) {
					await expect(mainContent).toBeVisible();
				} else {
					// Fallback: check for any heading
					const heading = page.locator("h1, h2").first();
					await expect(heading).toBeVisible();
				}

				// Check basic accessibility
				await helpers.checkBasicAccessibility();
			});
		}

		// Check for critical console errors
		const errors = checkErrors();
		expect(errors.length).toBe(0);
	});

	test("should have proper SEO meta tags", async ({ page }) => {
		const helpers = createTestHelpers(page);
		await helpers.navigateAndWait("/");

		// Check for essential meta tags
		await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
			"content",
			/width=device-width/,
		);

		// Check for title
		await expect(page).toHaveTitle(/.+/); // Should have some title

		// Check for description (if present)
		const descriptionMeta = page.locator('meta[name="description"]');
		if ((await descriptionMeta.count()) > 0) {
			const content = await descriptionMeta.getAttribute("content");
			expect(content).toBeTruthy();
			expect(content!.length).toBeGreaterThan(10);
		}

		// Check lang attribute
		const html = page.locator("html");
		const lang = await html.getAttribute("lang");
		expect(lang).toBeTruthy();
	});

	test("should be responsive across major breakpoints", async ({ page }) => {
		const helpers = createTestHelpers(page);

		const breakpoints = [
			{ width: 375, height: 667, name: "Mobile" },
			{ width: 768, height: 1024, name: "Tablet" },
			{ width: 1280, height: 720, name: "Desktop" },
		];

		for (const { width, height, name } of breakpoints) {
			await test.step(`Check responsiveness on ${name}`, async () => {
				await helpers.checkResponsiveness(width, height);
				await helpers.navigateAndWait("/");

				// Check that main elements are visible
				await expect(page.locator("header, .header")).toBeVisible();
				await expect(page.locator("h1")).toBeVisible();
			});
		}
	});

	test("should load critical resources quickly", async ({ page }) => {
		const startTime = Date.now();

		await page.goto("/", { waitUntil: "domcontentloaded" });

		const domLoadTime = Date.now() - startTime;

		// DOM should load quickly
		expect(domLoadTime).toBeLessThan(3000);

		// Critical content should be visible
		await expect(page.locator("h1")).toBeVisible({ timeout: 2000 });
	});

	test("should handle basic user interactions", async ({ page }) => {
		const helpers = createTestHelpers(page);
		await helpers.navigateAndWait("/");

		// Test scroll to features
		await page.click('a[href="#features"]');
		await helpers.waitForStableElement("#features");
		await expect(page.locator("#features")).toBeInViewport();

		// Test scroll to auth
		await page.click('a[href="#auth"]');
		await helpers.waitForStableElement("#auth");
		await expect(page.locator("#auth")).toBeInViewport();

		// Test navigation to signup
		await page.click('a[href="/cadastro"]');
		await expect(page).toHaveURL("/cadastro");
	});

	test("should have working form validation", async ({ page }) => {
		const helpers = createTestHelpers(page);

		// Test homepage auth form
		await helpers.navigateAndWait("/");
		await helpers.scrollToElement("#auth");

		// Try to submit without filling required fields
		const submitButton = page.locator('#auth button[type="submit"]');
		if ((await submitButton.count()) > 0) {
			await submitButton.click();

			// HTML5 validation should prevent submission
			// Check that we're still on the same page
			await expect(page).toHaveURL("/");
		}

		// Test with invalid email format
		const emailInput = page.locator('#auth input[type="email"]');
		if ((await emailInput.count()) > 0) {
			await emailInput.fill("invalid-email");
			await submitButton.click();

			// Should still be on same page due to validation
			await expect(page).toHaveURL("/");
		}
	});

	test("should handle 404 errors gracefully", async ({ page }) => {
		const response = await page.goto("/this-page-does-not-exist");

		// Should return 404 status
		expect(response?.status()).toBe(404);

		// Should show some kind of error page or redirect
		// Check that we get a valid HTML response
		const title = await page.title();
		expect(title).toBeTruthy();
	});
});
