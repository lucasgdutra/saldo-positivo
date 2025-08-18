"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { standardSchemaResolver as  zodResolver} from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserRegistrationFormSchema, type UserRegistrationFormData } from "@/lib/validations";
import { PasswordInput } from "@/components/ui/password-input";

const VALOR_SALARIO_MINIMO = 1518.00;

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserRegistrationFormData>({
    resolver: zodResolver(UserRegistrationFormSchema),
    mode: "all",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const watchUsageMotivation = watch("usageMotivation");

  const onSubmit = async (data: UserRegistrationFormData) => {
    console.log("Dados do formulário:", data);
    setError(null);
    setIsLoading(true);

    try {
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
          salaryRange: data.salaryRange,
          usageMotivation: data.usageMotivation,
          customMotivation: data.customMotivation,
          financialGoals: data.financialGoals,
          hasDebts: data.hasDebts,
          monthlyIncome: data.monthlyIncome,
          familySize: data.familySize,
          financialExperience: data.financialExperience,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Erro ao criar conta");
      }

      toast.success("Conta criada com sucesso! Fazendo login...");

      // Login automático após registro bem-sucedido
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      console.error("Erro de registro:", err);
      setError(err instanceof Error ? err.message : "Ocorreu um erro");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Nome completo */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nome completo
        </label>
        <input
          {...register("name")}
          type="text"
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* E-mail */}
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

      {/* Senha */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Senha
        </label>
        <PasswordInput
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      {/*Confirmação Senha */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirmação Senha
        </label>
        <PasswordInput
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>


      {/* Faixa Salarial */}
      <div>
        <label htmlFor="salaryRange" className="block text-sm font-medium">
          Faixa Salarial <span className="text-red-500">*</span>
        </label>
        <select
          {...register("salaryRange")}
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione sua faixa salarial</option>
          <option value="ate-1-salario">Até 1 salário mínimo (R$ {VALOR_SALARIO_MINIMO.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})</option>
          <option value="1-a-2-salarios">1 a 2 salários mínimos (R$ {VALOR_SALARIO_MINIMO.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} - R$ {(VALOR_SALARIO_MINIMO * 2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})</option>
          <option value="2-a-3-salarios">2 a 3 salários mínimos (R$ {(VALOR_SALARIO_MINIMO * 2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} - R$ {(VALOR_SALARIO_MINIMO * 3).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})</option>
          <option value="3-a-5-salarios">3 a 5 salários mínimos (R$ {(VALOR_SALARIO_MINIMO * 3).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} - R$ {(VALOR_SALARIO_MINIMO * 5).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})</option>
          <option value="5-a-10-salarios">5 a 10 salários mínimos (R$ {(VALOR_SALARIO_MINIMO * 5).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} - R$ {(VALOR_SALARIO_MINIMO * 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})</option>
          <option value="acima-10-salarios">Acima de 10 salários mínimos (R$ {(VALOR_SALARIO_MINIMO * 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}+)</option>
          <option value="nao-informar">Prefiro não informar</option>
        </select>
        {errors.salaryRange && (
          <p className="mt-1 text-sm text-red-600">{errors.salaryRange.message}</p>
        )}
      </div>

      {/* Motivo de uso */}
      <div>
        <label htmlFor="usageMotivation" className="block text-sm font-medium">
          Por que você quer usar este aplicativo? (opcional)
        </label>
        <select
          {...register("usageMotivation")}
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o motivo</option>
          <option value="controlar-gastos">Controlar melhor meus gastos</option>
          <option value="economizar-dinheiro">Economizar dinheiro</option>
          <option value="pagar-dividas">Pagar dívidas</option>
          <option value="investir">Começar a investir</option>
          <option value="emergencia">Criar reserva de emergência</option>
          <option value="objetivos">Alcançar objetivos financeiros</option>
          <option value="educacao">Educação financeira</option>
          <option value="outro">Outro</option>
        </select>
        {errors.usageMotivation && (
          <p className="mt-1 text-sm text-red-600">{errors.usageMotivation.message}</p>
        )}
      </div>

      {/* Motivo personalizado */}
      {watchUsageMotivation === "outro" && (
        <div>
          <label htmlFor="customMotivation" className="block text-sm font-medium">
            Especifique seu motivo
          </label>
          <input
            {...register("customMotivation")}
            type="text"
            placeholder="Descreva seu motivo personalizado"
            className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.customMotivation && (
            <p className="mt-1 text-sm text-red-600">{errors.customMotivation.message}</p>
          )}
        </div>
      )}

      {/* Objetivos Financeiros */}
      <div>
        <label htmlFor="financialGoals" className="block text-sm font-medium">
          Objetivos Financeiros (opcional)
        </label>
        <textarea
          {...register("financialGoals")}
          placeholder="Ex: Comprar uma casa, viajar, aposentadoria..."
          className="mt-1 block w-full rounded-md border px-3 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.financialGoals && (
          <p className="mt-1 text-sm text-red-600">{errors.financialGoals.message}</p>
        )}
      </div>

      {/* Tamanho da Família */}
      <div>
        <label htmlFor="familySize" className="block text-sm font-medium">
          Tamanho da Família (opcional)
        </label>
        <select
          {...register("familySize")}
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione</option>
          <option value="1">Apenas eu</option>
          <option value="2">2 pessoas</option>
          <option value="3">3 pessoas</option>
          <option value="4">4 pessoas</option>
          <option value="5">5 pessoas</option>
          <option value="6">6+ pessoas</option>
        </select>
        {errors.familySize && (
          <p className="mt-1 text-sm text-red-600">{errors.familySize.message}</p>
        )}
      </div>

      {/* Experiência Financeira */}
      <div>
        <label htmlFor="financialExperience" className="block text-sm font-medium">
          Experiência com Finanças (opcional)
        </label>
        <select
          {...register("financialExperience")}
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione</option>
          <option value="iniciante">Iniciante - Nunca controlei minhas finanças</option>
          <option value="basico">Básico - Tenho algumas noções</option>
          <option value="intermediario">Intermediário - Já controlo alguns gastos</option>
          <option value="avancado">Avançado - Tenho boa experiência</option>
        </select>
        {errors.financialExperience && (
          <p className="mt-1 text-sm text-red-600">{errors.financialExperience.message}</p>
        )}
      </div>

      {/* Checkbox de dívidas */}
      <div className="flex items-center">
        <input
          {...register("hasDebts")}
          type="checkbox"
          id="hasDebts"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="hasDebts" className="ml-2 text-sm font-medium">
          Tenho dívidas que preciso controlar
        </label>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      {/* Botão de submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isLoading ? "Criando conta..." : "Criar conta"}
      </button>
    </form>
  );
}