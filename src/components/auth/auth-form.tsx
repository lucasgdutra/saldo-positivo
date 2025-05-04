"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

// Esquema para login
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  name: z.string().optional(),
});

// Esquema para registro
const registerSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  name: z.string().min(1, "Nome é obrigatório"),
});

type AuthFormData = z.infer<typeof loginSchema | typeof registerSchema>;

export function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const schema = isLogin ? loginSchema : registerSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: AuthFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          // callbackUrl: "/dashboard",
          // redirect: true,
        });
      } else {
        // Registrar novo usuário
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || "Erro ao criar conta");
        }

        // Login automático após registro bem-sucedido
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/dashboard",
          redirect: true,
        });
      }
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
      router.replace('/', { scroll: false });
      toast.error("Credenciais inválidas. Por favor, tente novamente.");
    }
    // Adicione outras verificações de erro do NextAuth aqui, se necessário
    // else if (errorParam === 'OAuthSignin') { ... }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          {isLogin ? "Entrar" : "Criar conta"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isLogin ? "Acesse sua conta" : "Crie sua conta para começar"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nome completo
            </label>
            <input
              {...register("name")}
              type="text"
              className="mt-1 block w-full rounded-md border px-3 py-2"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            E-mail
          </label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 block w-full rounded-md border px-3 py-2"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Senha
          </label>
          <input
            {...register("password")}
            type="password"
            className="mt-1 block w-full rounded-md border px-3 py-2"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
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
          {isLoading
            ? "Carregando..."
            : isLogin
            ? "Entrar"
            : "Criar conta"}
        </button>

        <p className="text-center text-sm">
          {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              reset();
            }}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Criar conta" : "Fazer login"}
          </button>
        </p>
      </form>
    </div>
  );
}