import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateUserBalance } from "@/lib/balance-utils";
import { db } from "@/lib/db";
import { parse } from "csv-parse/sync";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const csvContent = buffer.toString("utf-8");

    let records;
    try {
      records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ",",
        trim: true,
      });
    } catch (err) {
      return NextResponse.json({ error: "Erro ao ler o CSV" }, { status: 400 });
    }

    const despesasCriadas = [];

    for (const row of records) {
      const date = new Date(row.date);
      const description = row.title;
      const amount = parseFloat(row.amount);

      if (!date || isNaN(amount)) continue;

      const despesa = await db.expense.create({
        data: {
          userId: session.user.id,
          date,
          amount,
          description,
          categoryId: null as any, // deixa para o usuário classificar depois
        },
      });

      despesasCriadas.push(despesa);
    }

    await updateUserBalance(session.user.id);

    return NextResponse.json({
      message: `${despesasCriadas.length} despesas importadas com sucesso!`,
    });
  } catch (error) {
    console.error("[IMPORT_EXPENSES_ERROR]", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
