// import { db } from "@/lib/db"; // Removido acesso direto ao DB

import { Decimal } from "@prisma/client/runtime/library"; // Importa Decimal se necessário para conversão
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// import { updateUserBalance } from "@/lib/balance-utils"; // Removida função antiga
import UserService from "@/services/UserService"; // Importa o UserService

// Instancia o UserService
const userService = new UserService();

export async function GET(req: NextRequest) {
	// Adiciona req para logs futuros se necessário
	try {
		const session = await getServerSession(authOptions);
		const userId = session?.user?.id;

		if (!userId) {
			return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		console.log(`[BALANCE_GET] Buscando saldo para usuário: ${userId}`);

		// Usa o UserService para buscar o usuário com o saldo
		const userWithBalance = await userService.getUserByIdWithBalance(userId);

		// Verifica se o usuário e o saldo existem
		if (!userWithBalance || !userWithBalance.balance) {
			console.warn(
				`[BALANCE_GET] Saldo não encontrado para usuário ${userId}. Retornando zerado.`,
			);
			// Retorna o objeto zerado conforme comportamento anterior
			return NextResponse.json({
				totalAmount: 0,
				totalRevenues: 0,
				totalExpenses: 0,
				referenceMonth: new Date(), // Mantém o comportamento de retornar data atual
			});
		}

		const balance = userWithBalance.balance;

		// Retorna os valores do saldo, convertendo Decimal para number
		console.log(
			`[BALANCE_GET] Saldo encontrado para usuário ${userId}:`,
			balance,
		);
		return NextResponse.json({
			totalAmount:
				balance.totalAmount instanceof Decimal
					? balance.totalAmount.toNumber()
					: balance.totalAmount,
			totalRevenues:
				balance.totalRevenues instanceof Decimal
					? balance.totalRevenues.toNumber()
					: balance.totalRevenues,
			totalExpenses:
				balance.totalExpenses instanceof Decimal
					? balance.totalExpenses.toNumber()
					: balance.totalExpenses,
			referenceMonth: balance.referenceMonth,
		});
	} catch (error) {
		console.error("[BALANCE_GET_ERROR]", error);
		return new NextResponse(
			JSON.stringify({ error: "Erro interno do servidor ao buscar saldo" }),
			{ status: 500 },
		);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session?.user?.id;

		if (!userId) {
			return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		console.log(
			`[BALANCE_PUT] Iniciando recálculo de saldo para usuário: ${userId}`,
		);

		// Usa o UserService para forçar o recálculo do saldo
		const updatedBalance = await userService.recalculateBalance(userId);

		console.log(
			`[BALANCE_PUT] Saldo recalculado para usuário ${userId}:`,
			updatedBalance,
		);

		// Formata a resposta com os valores convertidos para number
		const responseData = {
			totalAmount:
				updatedBalance.totalAmount instanceof Decimal
					? updatedBalance.totalAmount.toNumber()
					: updatedBalance.totalAmount,
			totalRevenues:
				updatedBalance.totalRevenues instanceof Decimal
					? updatedBalance.totalRevenues.toNumber()
					: updatedBalance.totalRevenues,
			totalExpenses:
				updatedBalance.totalExpenses instanceof Decimal
					? updatedBalance.totalExpenses.toNumber()
					: updatedBalance.totalExpenses,
			referenceMonth: updatedBalance.referenceMonth,
		};

		return NextResponse.json(responseData);
	} catch (error) {
		console.error("[BALANCE_PUT_ERROR]", error);
		return new NextResponse(
			JSON.stringify({ error: "Erro interno do servidor ao atualizar saldo" }),
			{ status: 500 },
		);
	}
}
