import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
	test("should display the homepage correctly", async ({ page }) => {
		await page.goto("/");

		// Check page title
		await expect(page).toHaveTitle(/Saldo Positivo/);

		// Check main heading
		await expect(page.locator("h1")).toContainText("Saldo Positivo");

		// Check academic project warning
		await expect(page.locator("text=⚠️ Projeto Acadêmico")).toBeVisible();
		await expect(
			page.locator("text=desenvolvido exclusivamente para fins acadêmicos"),
		).toBeVisible();

		// Check hero section
		await expect(
			page.locator("text=Gerencie suas finanças com simplicidade"),
		).toBeVisible();
		await expect(
			page.locator("text=controle financeiro pessoal"),
		).toBeVisible();

		// Check CTA buttons
		await expect(
			page.locator('a[href="/cadastro"]').filter({ hasText: "Começar Agora" }),
		).toBeVisible();
		await expect(page.locator('a[href="#features"]')).toContainText(
			"Saiba Mais",
		);
	});

	test("should display features section", async ({ page }) => {
		await page.goto("/");

		// Check features section heading
		await expect(page.locator("#features h2")).toContainText(
			"Recursos Principais",
		);

		// Check all three feature cards
		await expect(page.locator("text=Dashboard Completo")).toBeVisible();
		await expect(
			page.locator("text=Gestão de Receitas e Despesas"),
		).toBeVisible();
		await expect(page.locator("text=Relatórios Detalhados")).toBeVisible();

		// Check feature descriptions
		await expect(page.locator("text=Visualize seu saldo atual")).toBeVisible();
		await expect(
			page.locator("text=Registre e categorize suas receitas"),
		).toBeVisible();
		await expect(
			page.locator("text=Acesse relatórios personalizados"),
		).toBeVisible();
	});

	test("should display auth section", async ({ page }) => {
		await page.goto("/");

		// Check auth section
		await expect(page.locator("#auth h2")).toContainText("Acesse sua conta");
		await expect(
			page.locator("text=Entre na sua conta para gerenciar suas finanças"),
		).toBeVisible();
	});

	test("should display footer", async ({ page }) => {
		await page.goto("/");

		// Check footer links
		await expect(page.locator('footer a[href="/termos"]')).toContainText(
			"Termos de Uso",
		);
		await expect(page.locator('footer a[href="/privacidade"]')).toContainText(
			"Política de Privacidade",
		);
		await expect(page.locator('footer a[href="/contato"]')).toContainText(
			"Contato",
		);

		// Check copyright
		await expect(
			page.locator("text=Todos os direitos reservados"),
		).toBeVisible();
	});

	test("should navigate to signup page", async ({ page }) => {
		await page.goto("/");

		// Click on "Começar Agora" button
		await page.click('a[href="/cadastro"]:has-text("Começar Agora")');

		// Check that we navigated to the signup page
		await expect(page).toHaveURL("/cadastro");
	});

	test('should scroll to features when clicking "Saiba Mais"', async ({
		page,
	}) => {
		await page.goto("/");

		// Click on "Saiba Mais" button
		await page.click('a[href="#features"]');

		// Check that features section is visible
		await expect(page.locator("#features")).toBeInViewport();
	});

	test('should scroll to auth when clicking "Fazer Login"', async ({
		page,
	}) => {
		await page.goto("/");

		// Click on "Fazer Login" button in header
		await page.click('a[href="#auth"]');

		// Check that auth section is visible
		await expect(page.locator("#auth")).toBeInViewport();
	});
});
