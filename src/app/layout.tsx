import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"; // Importar Toaster
import { AuthProvider } from "@/providers/auth-provider";
import { PostHogProvider } from "@/providers/posthog-provider";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Saldo Positivo",
	description: "Sistema de controle de despesas pessoais",
	viewport: "width=device-width, initial-scale=1",
	keywords: ["controle financeiro", "despesas", "receitas", "relatórios"],
	authors: [{ name: "Saldo Positivo" }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
			>
				<PostHogProvider>
					<AuthProvider>
						<div id="__next">
							<a
								href="#main-content"
								className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md"
							>
								Pular para o conteúdo principal
							</a>
							<main id="main-content">
								{children}
							</main>
						</div>
						<Toaster position="top-right" expand={true} richColors />
					</AuthProvider>
					<Analytics />
					<SpeedInsights />
				</PostHogProvider>
			</body>
		</html>
	);
}