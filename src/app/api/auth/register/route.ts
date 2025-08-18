import { NextResponse } from "next/server";
import * as z from "zod";
import { AuthService, UserAlreadyExistsError } from "@/services/AuthService";
import { UserRepository } from "@/repositories/UserRepository";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { db } from "@/lib/db"; // db ainda é necessário para instanciar repositórios

// Instanciar repositórios
const userRepository = new UserRepository(db);
const categoryRepository = new CategoryRepository(db);

// Instanciar o AuthService com os repositórios
const authService = new AuthService(userRepository, categoryRepository);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // A validação do schema agora é feita dentro do AuthService,
    // mas o ZodError ainda pode ser lançado por ele.
    const user = await authService.register(body);

    // Retornar usuário criado com sucesso (sem a senha, já tratado no service)
    return NextResponse.json(
      { user: user, message: "Usuário criado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro na rota de registro:", error); // Log do erro na rota

    if (error instanceof z.ZodError) {
      // Erro de validação lançado pelo AuthService
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof UserAlreadyExistsError) {
      // Erro específico de usuário já existente lançado pelo AuthService
      return NextResponse.json(
        { error: error.message }, // Usa a mensagem do erro customizado
        { status: 409 } // Conflito
      );
    }

    // Outros erros inesperados
    return NextResponse.json(
      { error: "Erro interno do servidor ao registrar usuário" },
      { status: 500 }
    );
  }
}