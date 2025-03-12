import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { updateUserBalance } from "@/lib/balance-utils";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    // Buscar o saldo do usuário
    let balance = await db.balance.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    // Se não existir, criar um novo saldo
    if (!balance) {
      // Obter o mês atual
      const hoje = new Date();
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

      // Calcular totais de receitas e despesas
      const [totalRevenues, totalExpenses] = await Promise.all([
        db.revenue.aggregate({
          where: {
            userId: session.user.id,
            date: {
              gte: inicioMes,
            },
          },
          _sum: { amount: true },
        }),
        db.expense.aggregate({
          where: {
            userId: session.user.id,
            date: {
              gte: inicioMes,
            },
          },
          _sum: { amount: true },
        }),
      ]);

      const revenuesAmount = totalRevenues._sum.amount?.toNumber() ?? 0;
      const expensesAmount = totalExpenses._sum.amount?.toNumber() ?? 0;
      const totalAmount = revenuesAmount - expensesAmount;

      // Criar o saldo inicial
      balance = await db.balance.create({
        data: {
          userId: session.user.id,
          totalAmount,
          totalRevenues: revenuesAmount,
          totalExpenses: expensesAmount,
          referenceMonth: inicioMes,
        },
      });
    }

    return NextResponse.json({
      totalAmount: balance.totalAmount.toNumber(),
      totalRevenues: balance.totalRevenues.toNumber(),
      totalExpenses: balance.totalExpenses.toNumber(),
      referenceMonth: balance.referenceMonth,
    });
  } catch (error) {
    console.error("[BALANCE_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    // Usar a função utilitária para atualizar o saldo
    const balance = await updateUserBalance(session.user.id);

    return NextResponse.json(balance);
  } catch (error) {
    console.error("[BALANCE_UPDATE_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}