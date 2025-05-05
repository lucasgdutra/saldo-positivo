import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider"; // Importar QueryProvider
import { Toaster } from "@/components/ui/sonner"; // Importar Toaster
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
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AuthProvider>
					<QueryProvider>
						{children}
						<Toaster position="top-right" expand={true} richColors />
					</QueryProvider>
				</AuthProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
