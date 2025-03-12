import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as z from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Nome da categoria é obrigatório"),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const categorias = await db.category.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categorias);
  } catch (error) {
    console.error("[CATEGORIAS_GET_ERROR]", error);
    return new NextResponse("Erro interno", { status: 500 });
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

    const categoria = await db.category.create({
      data: {
        name,
        userId: session.user.id,
      },
    });

    return NextResponse.json(categoria);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Dados inválidos", { status: 422 });
    }

    return new NextResponse("Erro interno", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
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

    const categoria = await db.category.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(categoria);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Dados inválidos", { status: 422 });
    }

    return new NextResponse("Erro interno", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("ID não fornecido", { status: 400 });
    }

    // Verificar se o ID é um UUID válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return new NextResponse("ID inválido", { status: 400 });
    }

    await db.category.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse("Erro interno", { status: 500 });
  }
}