"use client";

import { standardSchemaResolver as zodResolver } from "@hookform/resolvers/standard-schema";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { AuthGuard } from "@/components/auth/auth-guard";

const forgotPasswordSchema = z.object({
	email: z.string().email("E-mail inválido"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<ForgotPasswordData>({
		resolver: zodResolver(forgotPasswordSchema),
		mode: "onBlur",
	});

	const onSubmit = async (data: ForgotPasswordData) => {
		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (response.ok) {
				setEmailSent(true);
				toast.success("E-mail de recuperação enviado!");
			} else {
				toast.error(result.error || "Erro ao enviar e-mail de recuperação");
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Erro interno do servidor");
		} finally {
			setIsLoading(false);
		}
	};

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
								← Voltar ao login
							</Link>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="container mx-auto px-4 py-8">
					<div className="max-w-md mx-auto">
						<div className="bg-white rounded-lg shadow-md p-8">
							{!emailSent ? (
								<>
									<div className="text-center mb-8">
										<h2 className="text-3xl font-bold text-gray-900">
											Esqueci minha senha
										</h2>
										<p className="mt-2 text-gray-600">
											Digite seu e-mail para receber instruções de recuperação
										</p>
									</div>

									<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium"
											>
												E-mail
											</label>
											<input
												{...register("email")}
												type="email"
												placeholder="seu@email.com"
												className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
											{errors.email && (
												<p className="mt-1 text-sm text-red-600">
													{errors.email.message}
												</p>
											)}
										</div>

										<button
											type="submit"
											disabled={isLoading}
											className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
										>
											{isLoading
												? "Enviando..."
												: "Enviar e-mail de recuperação"}
										</button>
									</form>
								</>
							) : (
								<div className="text-center">
									<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
										<svg
											className="h-6 w-6 text-green-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>

									<h2 className="text-2xl font-bold text-gray-900 mb-2">
										E-mail enviado!
									</h2>

									<p className="text-gray-600 mb-6">
										Se o e-mail <strong>{getValues("email")}</strong> estiver
										cadastrado, você receberá instruções para redefinir sua
										senha.
									</p>

									<div className="space-y-4">
										<div className="bg-blue-50 border border-blue-200 rounded-md p-4">
											<div className="flex">
												<div className="flex-shrink-0">
													<svg
														className="h-5 w-5 text-blue-400"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fillRule="evenodd"
															d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
												<div className="ml-3">
													<p className="text-sm text-blue-700">
														<strong>Dica:</strong> Verifique também sua pasta de
														spam ou lixo eletrônico.
													</p>
												</div>
											</div>
										</div>

										<button
											onClick={() => {
												setEmailSent(false);
												setIsLoading(false);
											}}
											className="text-blue-600 hover:text-blue-700 font-medium"
										>
											Tentar novamente
										</button>
									</div>
								</div>
							)}

							<div className="mt-6 text-center">
								<Link
									href="/"
									className="text-sm text-gray-600 hover:text-gray-700"
								>
									← Voltar para o login
								</Link>
							</div>
						</div>
					</div>
				</main>
			</div>
		</AuthGuard>
	);
}
