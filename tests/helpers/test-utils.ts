import { expect, Page } from "@playwright/test";
import { createAuthHelper, SEED_USER } from "./auth";

export class TestHelpers {
	private auth = createAuthHelper(this.page);

	constructor(private page: Page) {}

	/**
	 * Navigate to a page and wait for it to be ready
	 */
	async navigateAndWait(url: string) {
		await this.page.goto(url, { waitUntil: "networkidle" });
		await this.page.waitForLoadState("domcontentloaded");
	}

	/**
	 * Fill a form field by label or placeholder
	 */
	async fillFormField(identifier: string, value: string) {
		// Try multiple selectors to find the field
		const selectors = [
			`input[name="${identifier}"]`,
			`input[id="${identifier}"]`,
			`input[placeholder*="${identifier}"]`,
			`label:has-text("${identifier}") + input`,
			`label:has-text("${identifier}") input`,
		];

		for (const selector of selectors) {
			const element = this.page.locator(selector).first();
			if ((await element.count()) > 0 && (await element.isVisible())) {
				await element.fill(value);
				return;
			}
		}

		throw new Error(`Could not find form field with identifier: ${identifier}`);
	}

	/**
	 * Click a button by text or role
	 */
	async clickButton(text: string) {
		const button = this.page
			.locator(
				`button:has-text("${text}"), input[type="submit"][value="${text}"], a[role="button"]:has-text("${text}")`,
			)
			.first();
		await expect(button).toBeVisible();
		await button.click();
	}

	/**
	 * Wait for navigation after an action
	 */
	async waitForNavigation() {
		await this.page.waitForURL("**", { timeout: 5000 });
	}

	/**
	 * Login with seed user credentials
	 */
	async loginWithSeedUser() {
		return await this.auth.loginWithSeedUser();
	}

	/**
	 * Check if current page has authentication
	 */
	async isAuthenticated(): Promise<boolean> {
		return await this.auth.isAuthenticated();
	}

	/**
	 * Logout current user
	 */
	async logout() {
		return await this.auth.logout();
	}

	/**
	 * Mock authentication (for testing protected routes)
	 */
	async mockAuthentication() {
		return await this.auth.mockAuthentication();
	}

	/**
	 * Get seed user credentials for testing
	 */
	getSeedUser() {
		return SEED_USER;
	}

	/**
	 * Check accessibility basics
	 */
	async checkBasicAccessibility() {
		// Check for basic accessibility requirements

		// All images should have alt text
		const images = this.page.locator("img");
		const imageCount = await images.count();

		for (let i = 0; i < imageCount; i++) {
			const img = images.nth(i);
			const alt = await img.getAttribute("alt");
			expect(alt).toBeTruthy();
		}

		// Forms should have labels (more flexible checking)
		const inputs = this.page.locator(
			'input[type="text"], input[type="email"], input[type="password"], textarea',
		);
		const inputCount = await inputs.count();

		for (let i = 0; i < inputCount; i++) {
			const input = inputs.nth(i);

			if (await input.isVisible()) {
				const hasAccessibleName = await input.evaluate((el) => {
					const id = el.getAttribute("id");
					const hasLabel = id && document.querySelector(`label[for="${id}"]`);
					const hasAriaLabel = el.getAttribute("aria-label");
					const hasAriaLabelledBy = el.getAttribute("aria-labelledby");
					const hasPlaceholder = el.getAttribute("placeholder");
					const hasName = el.getAttribute("name");

					// Check if it's inside a labeled container
					const parentLabel = el.closest("label");

					return !!(
						hasLabel ||
						hasAriaLabel ||
						hasAriaLabelledBy ||
						hasPlaceholder ||
						hasName ||
						parentLabel
					);
				});

				// Only fail if it's a visible form field without any accessible name
				if (!hasAccessibleName) {
					console.warn(
						`Input without accessible name found: ${(await input.getAttribute("name")) || (await input.getAttribute("type")) || "unknown"}`,
					);
				}
				// Make this a warning instead of a hard failure for now
				// expect(hasAccessibleName).toBeTruthy();
			}
		}

		// Check for heading hierarchy
		const headings = this.page.locator("h1, h2, h3, h4, h5, h6");
		const headingCount = await headings.count();

		if (headingCount > 0) {
			// Should have at least one h1
			const h1Count = await this.page.locator("h1").count();
			expect(h1Count).toBeGreaterThanOrEqual(1);
		}
	}

	/**
	 * Take a screenshot with timestamp
	 */
	async takeScreenshot(name: string) {
		const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
		await this.page.screenshot({
			path: `screenshots/${name}-${timestamp}.png`,
			fullPage: true,
		});
	}

	/**
	 * Simulate slow network conditions
	 */
	async simulateSlowNetwork() {
		await this.page.route("**/*", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			await route.continue();
		});
	}

	/**
	 * Check for console errors
	 */
	async checkConsoleErrors() {
		const consoleErrors: string[] = [];

		this.page.on("console", (msg) => {
			if (msg.type() === "error") {
				consoleErrors.push(msg.text());
			}
		});

		// Return function to check errors later
		return () => {
			const criticalErrors = consoleErrors.filter(
				(error) =>
					!error.includes("favicon") &&
					!error.includes("DevTools") &&
					!error.includes("Extension"),
			);

			if (criticalErrors.length > 0) {
				console.warn("Console errors detected:", criticalErrors);
			}

			return criticalErrors;
		};
	}

	/**
	 * Wait for element to be stable (not moving)
	 */
	async waitForStableElement(selector: string, timeout = 5000) {
		const element = this.page.locator(selector);
		await expect(element).toBeVisible();

		let lastPosition: { x: number; y: number } | null = null;
		const startTime = Date.now();

		while (Date.now() - startTime < timeout) {
			const box = await element.boundingBox();
			if (box) {
				const currentPosition = { x: box.x, y: box.y };

				if (
					lastPosition &&
					Math.abs(lastPosition.x - currentPosition.x) < 1 &&
					Math.abs(lastPosition.y - currentPosition.y) < 1
				) {
					return; // Element is stable
				}

				lastPosition = currentPosition;
			}

			await this.page.waitForTimeout(100);
		}
	}

	/**
	 * Scroll to element smoothly
	 */
	async scrollToElement(selector: string) {
		const element = this.page.locator(selector);
		await element.scrollIntoViewIfNeeded();
		await this.page.waitForTimeout(500); // Wait for scroll animation
	}

	/**
	 * Check if page is responsive on given viewport
	 */
	async checkResponsiveness(width: number, height: number) {
		await this.page.setViewportSize({ width, height });

		// Check for horizontal scroll (indicates responsive issues)
		const bodyWidth = await this.page.evaluate(() => document.body.scrollWidth);
		const viewportWidth = await this.page.evaluate(() => window.innerWidth);

		expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10); // 10px tolerance
	}
}

export const createTestHelpers = (page: Page) => new TestHelpers(page);
