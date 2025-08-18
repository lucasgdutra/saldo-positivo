"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver as  zodResolver} from "@hookform/resolvers/standard-schema";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/auth/auth-guard";
import { AppLayout } from "@/components/layout/app-layout";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(
  (data) => {
    if (data.newPassword && data.newPassword.length > 0 && data.newPassword.length < 6) {
      return false;
    }
    return true;
  },
  {
    message: "Nova senha deve ter pelo menos 6 caracteres",
    path: ["newPassword"],
  }
).refine(
  (data) => {
    if (data.newPassword && !data.currentPassword) {
      return false;
    }
    return true;
  },
  {
    message: "Senha atual é obrigatória para alterar a senha",
    path: ["currentPassword"],
  }
).refine(
  (data) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      return false;
    }
    return true;
  },
  {
    message: "Confirmação de senha não confere",
    path: ["confirmPassword"],
  }
);

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileStats {
  totalExpenses: number;
  totalRevenues: number;
  totalCategories: number;
  accountAge: number;
}

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!session) {
      router.push('/');
      return;
    }

    const fetchProfile = async () => {
      try {
        const [profileResponse, statsResponse] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/profile/stats')
        ]);

        if (profileResponse.ok) {
          const { profile } = await profileResponse.json();
          setValue('name', profile.name);
          setValue('email', profile.email);
        }

        if (statsResponse.ok) {
          const { stats } = await statsResponse.json();
          setStats(stats);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        toast.error('Erro ao carregar dados do perfil');
      }
    };

    fetchProfile();
  }, [session, router, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);

    try {
      const updateData: any = {
        name: data.name,
        email: data.email,
      };

      if (data.newPassword) {
        updateData.currentPassword = data.currentPassword;
        updateData.newPassword = data.newPassword;
      }

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao atualizar perfil');
      }

      await update({
        ...session,
        user: {
          ...session?.user,
          name: result.profile.name,
          email: result.profile.email,
        },
      });

      toast.success('Perfil atualizado com sucesso!');
      
      if (data.newPassword) {
        setValue('currentPassword', '');
        setValue('newPassword', '');
        setValue('confirmPassword', '');
        setShowPasswordFields(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <AuthGuard requireAuth>
      <AppLayout>
        <div className="space-y-8 max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold">Meu Perfil</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais e configurações de conta
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nome completo
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Alterar Senha</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPasswordFields(!showPasswordFields)}
                      >
                        {showPasswordFields ? 'Cancelar' : 'Alterar'}
                      </Button>
                    </div>

                    {showPasswordFields && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                            Senha atual
                          </label>
                          <input
                            {...register("currentPassword")}
                            type="password"
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.currentPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                            Nova senha
                          </label>
                          <input
                            {...register("newPassword")}
                            type="password"
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.newPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                            Confirmar nova senha
                          </label>
                          <input
                            {...register("confirmPassword")}
                            type="password"
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Estatísticas da Conta</h2>
                
                {stats ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Total de Despesas</span>
                      <span className="text-sm text-muted-foreground">{stats.totalExpenses}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Total de Receitas</span>
                      <span className="text-sm text-muted-foreground">{stats.totalRevenues}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Categorias Criadas</span>
                      <span className="text-sm text-muted-foreground">{stats.totalCategories}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium">Dias desde o cadastro</span>
                      <span className="text-sm text-muted-foreground">{stats.accountAge}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Carregando estatísticas...
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Informações da Conta</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Status da Conta</span>
                    <span className="text-sm text-green-600 font-medium">Ativa</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Data de Cadastro</span>
                    <span className="text-sm text-muted-foreground">
                      {session.user?.email ? new Date().toLocaleDateString('pt-BR') : 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium">Último Acesso</span>
                    <span className="text-sm text-muted-foreground">Agora</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  );
}