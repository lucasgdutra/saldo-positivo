"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthGuard } from "@/components/auth/auth-guard";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
	return (
		<AuthGuard requireAuth={false}>
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<header className="bg-white border-b">
					<div className="container mx-auto px-4 py-6">
						<div className="flex items-center justify-between">
							<Link href="/" className="flex items-center space-x-3">
								<Image
									src="/images/logo.jpg"
									alt="Saldo Positivo Logo"
									width={48}
									height={48}
									className="rounded-lg"
								/>
								<h1 className="text-2xl font-bold text-blue-600">
									Saldo Positivo
								</h1>
							</Link>
							<Link
								href="/"
								className="text-blue-600 hover:text-blue-700 font-medium"
							>
								← Voltar ao início
							</Link>
						</div>
					</div>
				</header>

				{/* Registration Form */}
				<main className="container mx-auto px-4 py-8">
					<div className="max-w-2xl mx-auto">
						<div className="bg-white rounded-lg shadow-md p-8">
							<div className="text-center mb-8">
								<h2 className="text-3xl font-bold text-gray-900">
									Criar sua conta
								</h2>
								<p className="mt-2 text-gray-600">
									Comece a gerenciar suas finanças de forma inteligente
								</p>
							</div>

							<RegisterForm />

							<div className="mt-6 text-center">
								<p className="text-sm text-gray-600">
									Já tem uma conta?{" "}
									<Link
										href="/"
										className="text-blue-600 hover:text-blue-700 font-medium"
									>
										Fazer login
									</Link>
								</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</AuthGuard>
	);
}
