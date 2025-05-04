"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu } from "lucide-react";

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
		<nav className="flex items-center justify-between w-full px-4 md:px-0">
			{/* Desktop Navigation */}
			<div className="hidden md:flex items-center space-x-6">
				{routes.map((route) => (
					<Link
						key={route.href}
						href={route.href}
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							pathname === route.href
								? "text-primary font-semibold border-b-2 border-primary"
								: "text-muted-foreground",
						)}
					>
						{route.label}
					</Link>
				))}
			</div>

			{/* User Info and Logout - Desktop */}
			<div className="hidden md:flex items-center space-x-4 ml-auto">
				{session?.user?.name && (
					<span className="text-sm font-medium text-muted-foreground">
						{session.user.name}
					</span>
				)}
				<Button
					variant="ghost"
					size="sm"
					onClick={() => signOut({ callbackUrl: "/" })}
					className="text-sm font-medium text-muted-foreground hover:text-primary"
				>
					Sair
				</Button>
			</div>

			{/* Mobile Navigation Trigger */}
			<div className="md:hidden flex items-center">
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
							<hr className="my-4" />
							{session?.user?.name && (
								<span className="text-sm font-medium text-muted-foreground px-2">
									{session.user.name}
								</span>
							)}
							<SheetClose asChild>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										signOut({ callbackUrl: "/" });
										setIsMobileMenuOpen(false);
									}}
									className="text-sm font-medium text-muted-foreground hover:text-primary justify-start px-2"
								>
									Sair
								</Button>
							</SheetClose>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	);
}
