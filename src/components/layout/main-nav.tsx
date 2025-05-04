"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // Import useSession
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

	return (
		<nav className="flex space-x-6 w-full">
			<div className="flex items-center space-x-6">
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

			<div className="ml-auto flex items-center space-x-4">
				{session?.user?.name && (
					<span className="text-sm font-medium text-muted-foreground">
						{session.user.name}
					</span>
				)}
				<button
					type="button"
					onClick={() => signOut({ callbackUrl: "/" })}
					className="text-sm font-medium text-muted-foreground hover:text-primary"
				>
					Sair
				</button>
			</div>
		</nav>
	);
}
