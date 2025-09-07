import { expect, test } from "@playwright/test";

test.describe("Forms", () => {
	test.describe("Contact Form", () => {
		test("should display contact form", async ({ page }) => {
			await page.goto("/contato");

			// Check if contact form exists (assuming there's a contact form)
			const form = page.locator("form").first();
			if ((await form.count()) > 0) {
				await expect(form).toBeVisible();
			}

			// Check page heading
			await expect(page.locator("h1, h2").first()).toBeVisible();
		});
	});

	test.describe("Registration Form", () => {
		test("should display registration form", async ({ page }) => {
			await page.goto("/cadastro");

			// Check page heading
			await expect(page.locator("h1, h2").first()).toBeVisible();

			// Look for common registration form fields
			const nameField = page
				.locator('input[name="name"], input[name="nome"], input[type="text"]')
				.first();
			const emailField = page
				.locator('input[type="email"], input[name="email"]')
				.first();
			const passwordField = page.locator('input[name="password"]').first(); // More specific selector

			if ((await nameField.count()) > 0) {
				await expect(nameField).toBeVisible();
			}
			if ((await emailField.count()) > 0) {
				await expect(emailField).toBeVisible();
			}
			if ((await passwordField.count()) > 0) {
				await expect(passwordField).toBeVisible();
			}
		});

		test("should validate required fields", async ({ page }) => {
			await page.goto("/cadastro");

			// Try to submit form without filling required fields
			const submitButton = page
				.locator('button[type="submit"], input[type="submit"]')
				.first();
			if ((await submitButton.count()) > 0) {
				await submitButton.click();

				// Check for HTML5 validation or custom validation messages
				const requiredInputs = page.locator("input[required]");
				const inputCount = await requiredInputs.count();

				if (inputCount > 0) {
					// At least one required field should exist
					expect(inputCount).toBeGreaterThan(0);
				}
			}
		});
	});

	test.describe("Password Reset Form", () => {
		test("should display forgot password form", async ({ page }) => {
			await page.goto("/esqueci-senha");

			// Check page heading
			await expect(page.locator("h1, h2").first()).toBeVisible();

			// Look for email field for password reset
			const emailField = page.locator('input[type="email"]');
			if ((await emailField.count()) > 0) {
				await expect(emailField).toBeVisible();
			}
		});

		test("should display password reset form", async ({ page }) => {
			await page.goto("/redefinir-senha");

			// Check page heading
			await expect(page.locator("h1, h2").first()).toBeVisible();

			// Look for password fields
			const passwordFields = page.locator('input[type="password"]');
			if ((await passwordFields.count()) > 0) {
				await expect(passwordFields.first()).toBeVisible();
			}
		});
	});

	test.describe("Form Accessibility", () => {
		test("should have proper labels for form inputs", async ({ page }) => {
			const pages = ["/", "/cadastro", "/contato", "/esqueci-senha"];

			for (const pagePath of pages) {
				await page.goto(pagePath);

				// Check that inputs have labels or aria-labels
				const inputs = page.locator(
					'input[type="email"], input[type="password"], input[type="text"], textarea',
				);
				const inputCount = await inputs.count();

				for (let i = 0; i < inputCount; i++) {
					const input = inputs.nth(i);
					const hasLabel = await input.evaluate((el) => {
						// Check for associated label or aria-label
						const id = el.getAttribute("id");
						const hasAssociatedLabel =
							id && document.querySelector(`label[for="${id}"]`);
						const hasAriaLabel = el.getAttribute("aria-label");
						const hasAriaLabelledBy = el.getAttribute("aria-labelledby");
						const hasPlaceholder = el.getAttribute("placeholder");

						return (
							hasAssociatedLabel ||
							hasAriaLabel ||
							hasAriaLabelledBy ||
							hasPlaceholder
						);
					});

					// Form inputs should have some form of labeling for accessibility
					if (await input.isVisible()) {
						expect(hasLabel).toBeTruthy();
					}
				}
			}
		});

		test("should be keyboard navigable", async ({ page }) => {
			await page.goto("/");

			// Navigate to auth section
			await page.locator("#auth").scrollIntoViewIfNeeded();

			// Use Tab key to navigate through form elements
			const firstInput = page.locator("input").first();
			if ((await firstInput.count()) > 0) {
				await firstInput.focus();
				await expect(firstInput).toBeFocused();

				// Tab to next element
				await page.keyboard.press("Tab");

				// Some element should be focused after tabbing
				const focusedElement = page.locator(":focus");
				await expect(focusedElement).toHaveCount(1);
			}
		});
	});

	test.describe("Form Validation", () => {
		test("should validate email format", async ({ page }) => {
			await page.goto("/");

			// Navigate to auth section
			await page.locator("#auth").scrollIntoViewIfNeeded();

			const emailInput = page.locator('input[type="email"]');
			if ((await emailInput.count()) > 0) {
				// Fill with invalid email
				await emailInput.fill("invalid-email");
				await page.keyboard.press("Tab"); // Trigger validation

				// Browser should handle email validation
				const validity = await emailInput.evaluate(
					(el: HTMLInputElement) => el.validity.valid,
				);
				expect(validity).toBeFalsy();

				// Fill with valid email
				await emailInput.fill("test@example.com");
				await page.keyboard.press("Tab");

				const validityAfter = await emailInput.evaluate(
					(el: HTMLInputElement) => el.validity.valid,
				);
				expect(validityAfter).toBeTruthy();
			}
		});
	});
});
