import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  name: z.string().min(1, "Nome é obrigatório"),
});

// Lista de categorias padrão para novos usuários
const DEFAULT_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Educação",
  "Saúde",
  "Lazer",
  "Vestuário",
  "Utilidades",
  "Outros"
];

// Função para criar categorias padrão para um usuário
async function createDefaultCategories(userId: string) {
  const categoriesData = DEFAULT_CATEGORIES.map(name => ({
    name,
    userId
  }));

  await db.category.createMany({
    data: categoriesData
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = userSchema.parse(body);

    // Verificar se o usuário já existe
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 409 }
      );
    }

    // Criar hash da senha
    const hashedPassword = await hash(password, 10);

    // Criar usuário
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Criar categorias padrão para o novo usuário
    await createDefaultCategories(user.id);

    // Retornar usuário sem a senha
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { user: userWithoutPassword, message: "Usuário criado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}