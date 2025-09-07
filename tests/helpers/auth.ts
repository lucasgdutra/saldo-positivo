import { BrowserContext, Page } from "@playwright/test";

// Import seed user credentials
export const SEED_USER = {
	email: "test.user@saldopositivo.com",
	password: "TestPassword123!",
	name: "João Silva Santos",
};

export class AuthHelper {
	constructor(private page: Page) {}

	/**
	 * Login using the seed user credentials
	 */
	async loginWithSeedUser() {
		console.log("🔐 Attempting login with seed user:", SEED_USER.email);

		await this.page.goto("/");

		// Navigate to auth section
		await this.page.locator("#auth").scrollIntoViewIfNeeded();

		// Fill login form
		await this.page.fill(
			'input[type="email"], input[name="email"]',
			SEED_USER.email,
		);
		await this.page.fill(
			'input[type="password"], input[name="password"]',
			SEED_USER.password,
		);

		// Submit form
		await this.page.click('button[type="submit"]');

		// Wait for navigation or success indicator
		await this.page.waitForTimeout(3000);

		console.log("Current URL after login attempt:", this.page.url());

		// Check if login was successful
		const isLoggedIn = await this.isAuthenticated();

		if (isLoggedIn) {
			console.log("✅ Login successful");
		} else {
			console.log("❌ Login failed or auth check failed");
			// Don't throw error, let the test handle it
		}

		return isLoggedIn;
	}

	/**
	 * Check if user is currently authenticated
	 */
	async isAuthenticated(): Promise<boolean> {
		// Check for authenticated indicators
		const indicators = [
			"text=Dashboard",
			"text=Sair",
			"text=Logout",
			`text=${SEED_USER.name}`,
			'[data-testid="user-menu"]',
			".user-menu",
		];

		for (const indicator of indicators) {
			if ((await this.page.locator(indicator).count()) > 0) {
				return true;
			}
		}

		// Check if we're on a protected page (dashboard, expenses, etc.)
		const currentUrl = this.page.url();
		const protectedRoutes = [
			"/dashboard",
			"/despesas",
			"/receitas",
			"/categorias",
			"/relatorios",
			"/perfil",
		];

		if (protectedRoutes.some((route) => currentUrl.includes(route))) {
			// If we're on a protected route, check if content is loading properly
			const hasProtectedContent = (await this.page.locator("h1").count()) > 0;
			return hasProtectedContent;
		}

		return false;
	}

	/**
	 * Logout current user
	 */
	async logout() {
		// Look for logout button/link
		const logoutSelectors = [
			"text=Sair",
			"text=Logout",
			'button:has-text("Sair")',
			'a:has-text("Sair")',
			'[data-testid="logout"]',
		];

		for (const selector of logoutSelectors) {
			const element = this.page.locator(selector);
			if ((await element.count()) > 0) {
				await element.click();
				await this.page.waitForTimeout(1000);
				return;
			}
		}

		// If no logout button found, clear storage and navigate to home
		await this.page.evaluate(() => {
			localStorage.clear();
			sessionStorage.clear();
		});
		await this.page.goto("/");
	}

	/**
	 * Mock authentication for testing purposes (alternative to real login)
	 */
	async mockAuthentication() {
		await this.page.addInitScript(() => {
			// Mock NextAuth session token in cookies and localStorage
			const mockSession = {
				user: {
					id: "seed-user-id",
					email: "test.user@saldopositivo.com",
					name: "João Silva Santos",
				},
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
				accessToken: "mock-access-token",
			};

			// Mock NextAuth session in localStorage (NextAuth client side)
			localStorage.setItem("next-auth.session-token", "mock-session-token");
			localStorage.setItem("next-auth.callback-url", "http://localhost:3000");

			// Mock the session for useSession hook
			(window as any).__NEXT_AUTH_SESSION__ = mockSession;

			// Override fetch to return mock session for NextAuth API calls
			const originalFetch = window.fetch;
			window.fetch = function (input: any, init?: any) {
				const url = typeof input === "string" ? input : input.url;

				if (url && url.includes("/api/auth/session")) {
					return Promise.resolve(
						new Response(JSON.stringify(mockSession), {
							status: 200,
							headers: { "Content-Type": "application/json" },
						}),
					);
				}

				return originalFetch(input, init);
			};
		});

		// Set authentication cookies
		await this.page.context().addCookies([
			{
				name: "next-auth.session-token",
				value: "mock-session-token",
				domain: "localhost",
				path: "/",
				expires: Date.now() / 1000 + 24 * 60 * 60, // 24 hours
			},
			{
				name: "next-auth.callback-url",
				value: "http://localhost:3000",
				domain: "localhost",
				path: "/",
			},
		]);
	}

	/**
	 * Set up authenticated browser context
	 */
	static async createAuthenticatedContext(context: BrowserContext) {
		// Add authentication cookies to context
		await context.addCookies([
			{
				name: "next-auth.session-token",
				value: "mock-session-token",
				domain: "localhost",
				path: "/",
				expires: Date.now() / 1000 + 24 * 60 * 60,
			},
		]);

		// Add authentication scripts to context
		await context.addInitScript(() => {
			const mockSession = {
				user: {
					id: "seed-user-id",
					email: "test.user@saldopositivo.com",
					name: "João Silva Santos",
				},
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
				accessToken: "mock-access-token",
			};

			localStorage.setItem("next-auth.session-token", "mock-session-token");
			(window as any).__NEXT_AUTH_SESSION__ = mockSession;

			// Override fetch for NextAuth session calls
			const originalFetch = window.fetch;
			window.fetch = function (input: any, init?: any) {
				const url = typeof input === "string" ? input : input.url;
				if (url && url.includes("/api/auth/session")) {
					return Promise.resolve(
						new Response(JSON.stringify(mockSession), {
							status: 200,
							headers: { "Content-Type": "application/json" },
						}),
					);
				}
				return originalFetch(input, init);
			};
		});
	}
}

export const createAuthHelper = (page: Page) => new AuthHelper(page);
