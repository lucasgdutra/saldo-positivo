"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

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

  return (
    <nav className="flex items-center space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === route.href
              ? "text-primary font-semibold border-b-2 border-primary"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-sm font-medium text-muted-foreground hover:text-primary"
      >
        Sair
      </button>
    </nav>
  );
}