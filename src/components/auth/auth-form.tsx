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
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div>
					<label htmlFor="email" className="block text-sm font-medium">
						E-mail
					</label>
					<input
						{...register("email")}
						type="email"
						className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
					)}
				</div>

				<div>
					<label htmlFor="password" className="block text-sm font-medium">
						Senha
					</label>
					<PasswordInput
						{...register("password")}
						error={errors.password?.message}
					/>
				</div>

				{error && (
					<div className="rounded-md bg-red-50 p-4">
						<div className="flex">
							<div className="text-sm text-red-700">{error}</div>
						</div>
					</div>
				)}

				<button
					type="submit"
					disabled={isLoading}
					className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
				>
					{isLoading ? "Entrando..." : "Entrar"}
				</button>

				<div className="text-center space-y-2">
					<Link
						href="/esqueci-senha"
						className="block text-sm text-blue-600 hover:text-blue-700 font-medium"
					>
						Esqueci minha senha
					</Link>

					<p className="text-sm">
						Não tem uma conta?{" "}
						<Link
							href="/cadastro"
							className="text-blue-600 hover:text-blue-700 font-medium"
						>
							Criar conta
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}
