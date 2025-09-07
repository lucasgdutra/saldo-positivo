"use client";

import type { ReactNode } from "react";
import { MainNav } from "./main-nav";

interface AppLayoutProps {
	children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b">
				<div className="container flex h-16 items-center px-4">
					<MainNav />
				</div>
			</header>
			<main className="flex-1">
				<div className="container px-4 py-6">{children}</div>
			</main>
			<footer className="border-t py-4">
				<div className="container px-4 text-center text-sm text-muted-foreground">
					© {new Date().getFullYear()} Saldo Positivo. Todos os direitos
					reservados.
				</div>
			</footer>
		</div>
	);
}
