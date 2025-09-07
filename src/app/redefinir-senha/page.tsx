"use client";

import { standardSchemaResolver as zodResolver } from "@hookform/resolvers/standard-schema";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { AuthGuard } from "@/components/auth/auth-guard";

const resetPasswordSchema = z
	.object({
		password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
		confirmPassword: z.string().min(6, "A confirmação é obrigatória"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [tokenValid, setTokenValid] = useState<boolean | null>(null);
	const [resetSuccess, setResetSuccess] = useState(false);

	const token = searchParams.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordData>({
		resolver: zodResolver(resetPasswordSchema),
		mode: "onBlur",
	});

	useEffect(() => {
		const validateToken = async () => {
			if (!token) {
				setTokenValid(false);
				return;
			}

			try {
				const response = await fetch(`/api/auth/reset-password?token=${token}`);
				const result = await response.json();

				setTokenValid(result.valid);

				if (!result.valid) {
					toast.error(result.message);
				}
			} catch (error) {
				console.error("Error validating token:", error);
				setTokenValid(false);
				toast.error("Erro ao validar token");
			}
		};

		validateToken();
	}, [token]);

	const onSubmit = async (data: ResetPasswordData) => {
		if (!token) {
			toast.error("Token inválido");
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/reset-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token,
					password: data.password,
				}),
			});

			const result = await response.json();

			if (response.ok) {
				setResetSuccess(true);
				toast.success("Senha redefinida com sucesso!");
			} else {
				toast.error(result.error || "Erro ao redefinir senha");
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Erro interno do servidor");
		} finally {
			setIsLoading(false);
		}
	};

	if (tokenValid === null) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Validando token...</p>
				</div>
			</div>
		);
	}

	return (
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
						{!tokenValid ? (
							<div className="text-center">
								<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
									<svg
										className="h-6 w-6 text-red-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>

								<h2 className="text-2xl font-bold text-gray-900 mb-2">
									Token inválido
								</h2>

								<p className="text-gray-600 mb-6">
									O link de redefinição de senha é inválido ou expirou.
								</p>

								<div className="space-y-4">
									<Link
										href="/esqueci-senha"
										className="inline-block w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-center"
									>
										Solicitar novo link
									</Link>

									<Link
										href="/"
										className="block text-sm text-gray-600 hover:text-gray-700"
									>
										← Voltar para o login
									</Link>
								</div>
							</div>
						) : resetSuccess ? (
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
									Senha redefinida!
								</h2>

								<p className="text-gray-600 mb-6">
									Sua senha foi redefinida com sucesso. Agora você pode fazer
									login com sua nova senha.
								</p>

								<Link
									href="/"
									className="inline-block w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-center"
								>
									Fazer login
								</Link>
							</div>
						) : (
							<>
								<div className="text-center mb-8">
									<h2 className="text-3xl font-bold text-gray-900">
										Nova senha
									</h2>
									<p className="mt-2 text-gray-600">Digite sua nova senha</p>
								</div>

								<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
									<div>
										<label
											htmlFor="password"
											className="block text-sm font-medium"
										>
											Nova senha
										</label>
										<input
											{...register("password")}
											type="password"
											className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
										{errors.password && (
											<p className="mt-1 text-sm text-red-600">
												{errors.password.message}
											</p>
										)}
									</div>

									<div>
										<label
											htmlFor="confirmPassword"
											className="block text-sm font-medium"
										>
											Confirmar nova senha
										</label>
										<input
											{...register("confirmPassword")}
											type="password"
											className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
										{errors.confirmPassword && (
											<p className="mt-1 text-sm text-red-600">
												{errors.confirmPassword.message}
											</p>
										)}
									</div>

									<button
										type="submit"
										disabled={isLoading}
										className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
									>
										{isLoading ? "Redefinindo..." : "Redefinir senha"}
									</button>
								</form>

								<div className="mt-6 text-center">
									<Link
										href="/"
										className="text-sm text-gray-600 hover:text-gray-700"
									>
										← Voltar para o login
									</Link>
								</div>
							</>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

export default function ResetPasswordPage() {
	return (
		<AuthGuard requireAuth={false}>
			<Suspense
				fallback={
					<div className="min-h-screen bg-gray-50 flex items-center justify-center">
						<div className="text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
							<p className="mt-4 text-gray-600">Carregando...</p>
						</div>
					</div>
				}
			>
				<ResetPasswordForm />
			</Suspense>
		</AuthGuard>
	);
}
