"use client";

import { standardSchemaResolver as zodResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";
import { type UserLoginFormData, UserLoginFormSchema } from "@/lib/validations";

export function AuthForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLoginFormData>({
		resolver: zodResolver(UserLoginFormSchema),
		mode: "onBlur",
	});

	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: UserLoginFormData) => {
		setError(null);
		setIsLoading(true);

		try {
			await signIn("credentials", {
				email: data.email,
				password: data.password,
				callbackUrl: "/dashboard",
				redirect: true,
			});
		} catch (err) {
			console.error("Erro de autenticação:", err);
			setError(err instanceof Error ? err.message : "Ocorreu um erro");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const errorParam = searchParams.get("error");
		if (errorParam === "CredentialsSignin") {
			// Limpa o parâmetro de erro da URL PRIMEIRO para evitar toast duplicado em Strict Mode
			router.replace("/", { scroll: false });
			toast.error("Credenciais inválidas. Por favor, tente novamente.");
		}
		// Adicione outras verificações de erro do NextAuth aqui, se necessário
		// else if (errorParam === 'OAuthSignin') { ... }
	}, [searchParams]);

	return (
		<div className="w-full max-w-md space-y-8">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Entrar no Saldo Positivo
				</h1>
				<p className="text-sm text-gray-600">
					Acesse sua conta para gerenciar suas finanças
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
				<fieldset className="space-y-6" disabled={isLoading}>
					<legend className="sr-only">Dados de acesso</legend>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							E-mail *
						</label>
						<input
							{...register("email")}
							type="email"
							id="email"
							autoComplete="email"
							autoFocus
							required
							aria-describedby={errors.email ? "email-error" : undefined}
							aria-invalid={errors.email ? "true" : "false"}
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 disabled:bg-gray-100 disabled:cursor-not-allowed"
							placeholder="seu@email.com"
						/>
						{errors.email && (
							<p
								id="email-error"
								role="alert"
								className="mt-1 text-sm text-red-600"
							>
								<span className="sr-only">Erro:</span> {errors.email.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Senha *
						</label>
						<PasswordInput
							{...register("password")}
							id="password"
							autoComplete="current-password"
							required
							aria-describedby={errors.password ? "password-error" : undefined}
							aria-invalid={errors.password ? "true" : "false"}
							error={errors.password?.message}
						/>
					</div>

					{error && (
						<div
							role="alert"
							className="rounded-md bg-red-50 border border-red-200 p-4"
						>
							<div className="flex items-start">
								<div className="flex-shrink-0">
									<svg
										className="h-5 w-5 text-red-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="ml-3">
									<h3 className="text-sm font-medium text-red-800">
										Erro de autenticação
									</h3>
									<div className="mt-1 text-sm text-red-700">{error}</div>
								</div>
							</div>
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						aria-describedby="submit-help"
						className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
					>
						{isLoading ? (
							<>
								<svg
									className="inline -ml-1 mr-2 h-4 w-4 animate-spin text-white"
									fill="none"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Entrando...
							</>
						) : (
							"Entrar"
						)}
					</button>
					<p id="submit-help" className="sr-only">
						Pressione Enter ou clique para fazer login
					</p>
				</fieldset>

				<div className="text-center space-y-4 pt-4 border-t border-gray-200">
					<Link
						href="/esqueci-senha"
						className="block text-sm text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
					>
						Esqueci minha senha
					</Link>

					<p className="text-sm text-gray-600">
						Não tem uma conta?{" "}
						<Link
							href="/cadastro"
							className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
						>
							Criar conta
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}
