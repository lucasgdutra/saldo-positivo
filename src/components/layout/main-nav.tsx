"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { UserMenu } from "@/components/layout/user-menu";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const routes = [
	{
		href: "/dashboard",
		label: "Dashboard",
	},
	{
		href: "/despesas",
		label: "Despesas",
	},
	{
		href: "/receitas",
		label: "Receitas",
	},
	{
		href: "/relatorios",
		label: "Relatórios",
	},
];

export function MainNav() {
	const pathname = usePathname();
	const { data: session } = useSession();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<nav
			className="flex items-center w-full px-4 lg:px-0"
			role="navigation"
			aria-label="Navegação principal"
		>
			{/* Logo - Always at start */}
			<div className="flex items-center space-x-2 flex-shrink-0">
				<Link href="/dashboard" className="flex items-center space-x-2 group">
					<Image
						src="/images/logo.jpg"
						alt=""
						width={32}
						height={32}
						className="rounded-lg group-hover:opacity-80 transition-opacity"
					/>
					<span className="hidden lg:block text-lg font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
						Saldo Positivo
					</span>
				</Link>
			</div>

			{/* Desktop Navigation - Centered */}
			<div className="hidden lg:flex items-center justify-center flex-1">
				<div className="flex items-center space-x-6" role="menubar">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							role="menuitem"
							aria-current={pathname === route.href ? "page" : undefined}
							className={cn(
								"relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
								pathname === route.href
									? "text-blue-600 bg-blue-50 font-semibold"
									: "text-gray-600 hover:text-blue-600 hover:bg-gray-50",
							)}
						>
							{route.label}
							{pathname === route.href && (
								<span
									className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
									aria-hidden="true"
								/>
							)}
						</Link>
					))}
				</div>
			</div>

			{/* User Menu - Desktop - Always at end */}
			<div className="hidden lg:flex items-center flex-shrink-0">
				<UserMenu />
			</div>

			{/* Mobile Navigation and User Menu */}
			<div className="lg:hidden flex items-center ml-auto space-x-2">
				<UserMenu />
				<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							aria-label="Abrir menu de navegação"
							aria-expanded={isMobileMenuOpen}
							aria-controls="mobile-menu"
						>
							<Menu className="h-4 w-4" />
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-[250px] sm:w-[300px]">
						<SheetTitle>
							<VisuallyHidden>Menu de Navegação</VisuallyHidden>
						</SheetTitle>
						<nav
							id="mobile-menu"
							className="flex flex-col space-y-2 mt-6"
							role="navigation"
							aria-label="Menu móvel"
						>
							{routes.map((route) => (
								<SheetClose asChild key={route.href}>
									<Link
										href={route.href}
										aria-current={pathname === route.href ? "page" : undefined}
										className={cn(
											"px-3 py-2 text-sm font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
											pathname === route.href
												? "text-blue-600 bg-blue-50 font-semibold"
												: "text-gray-600 hover:text-blue-600 hover:bg-gray-50",
										)}
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{route.label}
									</Link>
								</SheetClose>
							))}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	);
}
