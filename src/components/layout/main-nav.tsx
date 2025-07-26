"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UserMenu } from "@/components/layout/user-menu";

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
		href: "/categorias",
		label: "Categorias",
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
		<nav className="flex items-center w-full px-4 lg:px-0">
			{/* Logo - Always at start */}
			<div className="flex items-center space-x-2 flex-shrink-0">
				<Image
					src="/images/logo.jpg"
					alt="Saldo Positivo Logo"
					width={32}
					height={32}
					className="rounded-lg"
				/>
				<span className="hidden lg:block text-lg font-bold text-blue-600">
					Saldo Positivo
				</span>
			</div>
			
			{/* Desktop Navigation - Centered */}
			<div className="hidden lg:flex items-center justify-center flex-1">
				<div className="flex items-center space-x-6">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
								pathname === route.href
									? "text-primary font-semibold border-b-2 border-primary"
									: "text-muted-foreground",
							)}
						>
							{route.label}
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
						<Button variant="outline" size="icon">
							<Menu className="h-4 w-4" />
							<span className="sr-only">Abrir menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-[250px] sm:w-[300px]">
						<SheetTitle>
							<VisuallyHidden>Menu de Navegação</VisuallyHidden>
						</SheetTitle>
						<nav className="flex flex-col space-y-4 mt-6 ml-4">
							{routes.map((route) => (
								<SheetClose asChild key={route.href}>
									<Link
										href={route.href}
										className={cn(
											"text-sm font-medium transition-colors hover:text-primary",
											pathname === route.href
												? "text-primary font-semibold"
												: "text-muted-foreground",
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
