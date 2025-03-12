import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    // Obter os últimos 6 meses
    const hoje = new Date();
    const meses = [];
    
    for (let i = 5; i >= 0; i--) {
      const mes = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      meses.push({
        inicio: new Date(mes.getFullYear(), mes.getMonth(), 1),
        fim: new Date(mes.getFullYear(), mes.getMonth() + 1, 0),
        nome: mes.toLocaleDateString('pt-BR', { month: 'short' }),
      });
    }

    // Buscar dados para cada mês
    const dadosMensais = await Promise.all(
      meses.map(async (mes) => {
        const [despesas, receitas] = await Promise.all([
          db.expense.aggregate({
            where: {
              userId: session.user.id,
              date: {
                gte: mes.inicio,
                lte: mes.fim,
              },
            },
            _sum: { amount: true },
          }),
          db.revenue.aggregate({
            where: {
              userId: session.user.id,
              date: {
                gte: mes.inicio,
                lte: mes.fim,
              },
            },
            _sum: { amount: true },
          }),
        ]);

        return {
          month: mes.nome,
          receitas: receitas._sum.amount?.toNumber() ?? 0,
          despesas: despesas._sum.amount?.toNumber() ?? 0,
        };
      })
    );

    return NextResponse.json(dadosMensais);
  } catch (error) {
    console.error("[BALANCE_HISTORY_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}