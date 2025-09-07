"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import type { ReactNode } from "react";

interface AuthGuardProps {
	children: ReactNode;
	requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = false }: AuthGuardProps) {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-center">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
					<p className="mt-4">Carregando...</p>
				</div>
			</div>
		);
	}

	if (requireAuth && !session) {
		redirect("/");
	}

	if (!requireAuth && session) {
		redirect("/dashboard");
	}

	return <>{children}</>;
}
