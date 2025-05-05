import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as z from "zod";
import CategoryService from "@/services/CategoryService"; // Importar o serviço
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Instanciar o serviço
const categoryService = new CategoryService();

const categorySchema = z.object({
  name: z.string().min(1, "Nome da categoria é obrigatório"),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    // Usar o serviço para buscar as categorias do usuário
    const categorias = await categoryService.getCategoriesByUser(session.user.id);
    // O serviço já deve ordenar por nome ascendentemente

    return NextResponse.json(categorias);
  } catch (error) {
    console.error("[CATEGORIAS_GET_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor ao buscar categorias" }),
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const body = await req.json();
    const { name } = categorySchema.parse(body);

    // Usar o serviço para criar a categoria
    const categoria = await categoryService.createCategory({
      name,
      userId: session.user.id,
    });

    return NextResponse.json(categoria);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: "Dados inválidos", details: error.errors }),
        { status: 422 },
      );
    }
    // Adicionar tratamento de erro para nome duplicado (se o serviço/repo tratar)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        return new NextResponse(
            JSON.stringify({ error: "Já existe uma categoria com este nome." }),
            { status: 409 } // Conflict
        );
    }

    console.error("[CATEGORIAS_POST_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor ao criar categoria" }),
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("ID não fornecido", { status: 400 });
    }

    // Verificar se o ID é um UUID válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return new NextResponse("ID inválido", { status: 400 });
    }

    const body = await req.json();
    const { name } = categorySchema.parse(body);

    // Usar o serviço para atualizar a categoria
    const categoria = await categoryService.updateCategory(
        id,
        session.user.id,
        { name }
    );

    // O serviço lança erro se não encontrar ou não pertencer ao usuário

    return NextResponse.json(categoria);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: "Dados inválidos", details: error.errors }),
        { status: 422 },
      );
    }
    // Tratar erros específicos do serviço ou Prisma
    if (error instanceof Error && (error.message.includes("não encontrada") || error.message.includes("Acesso não permitido"))) {
       return new NextResponse(
        JSON.stringify({ error: error.message }),
        { status: 404 },
      );
    }
     if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        return new NextResponse(
            JSON.stringify({ error: "Já existe uma categoria com este nome." }),
            { status: 409 } // Conflict
        );
    }
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
       return new NextResponse(
        JSON.stringify({ error: "Recurso não encontrado (Prisma P2025)" }),
        { status: 404 },
      );
    }

    console.error("[CATEGORIAS_PUT_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor ao atualizar categoria" }),
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("ID não fornecido", { status: 400 });
    }

    // Verificar se o ID é um UUID válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return new NextResponse("ID inválido", { status: 400 });
    }

    // Usar o serviço para deletar a categoria
    await categoryService.deleteCategory(id, session.user.id);

    // O serviço lança erro se não encontrar ou não pertencer ao usuário

    return new NextResponse(null, { status: 204 });
  } catch (error) { // Adicionar parâmetro de erro
    // Tratar erros específicos do serviço ou Prisma
    if (error instanceof Error && (error.message.includes("não encontrada") || error.message.includes("Acesso não permitido"))) {
       return new NextResponse(
        JSON.stringify({ error: error.message }),
        { status: 404 },
      );
    }
    // Tratar erro de constraint (categoria em uso)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2003') {
        return new NextResponse(
            JSON.stringify({ error: "Não é possível excluir a categoria, pois ela está associada a despesas existentes." }),
            { status: 409 } // Conflict
        );
    }
     if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
       return new NextResponse(
        JSON.stringify({ error: "Recurso não encontrado (Prisma P2025)" }),
        { status: 404 },
      );
    }

    console.error("[CATEGORIAS_DELETE_ERROR]", error);
    return new NextResponse(
        JSON.stringify({ error: "Erro interno do servidor ao deletar categoria" }),
        { status: 500 }
    );
  }
}