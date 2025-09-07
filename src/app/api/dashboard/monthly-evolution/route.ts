import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
				status: 401,
			});
		}

		// Get category filter from query params
		const { searchParams } = new URL(request.url);
		const categoryId = searchParams.get("categoryId");

		const now = new Date();
		const monthsToShow = 6; // Show last 6 months
		const monthlyData = [];

		for (let i = monthsToShow - 1; i >= 0; i--) {
			const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
			const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
			const monthEnd = new Date(
				date.getFullYear(),
				date.getMonth() + 1,
				0,
				23,
				59,
				59,
			);

			// Build where clause for expenses
			const expenseWhere: any = {
				userId: session.user.id,
				date: {
					gte: monthStart,
					lte: monthEnd,
				},
			};

			if (categoryId) {
				expenseWhere.categoryId = categoryId;
			}

			// Get expenses for this month
			const monthExpenses = await db.expense.aggregate({
				where: expenseWhere,
				_sum: {
					amount: true,
				},
			});

			// Get revenues for this month
			const monthRevenues = await db.revenue.aggregate({
				where: {
					userId: session.user.id,
					date: {
						gte: monthStart,
						lte: monthEnd,
					},
				},
				_sum: {
					amount: true,
				},
			});

			const expenses = monthExpenses._sum.amount?.toNumber() || 0;
			const revenues = monthRevenues._sum.amount?.toNumber() || 0;
			const balance = revenues - expenses;

			monthlyData.push({
				month: date.toLocaleDateString("pt-BR", {
					month: "short",
					year: "2-digit",
				}),
				expenses,
				revenues,
				balance,
				fullDate: date.toISOString(),
			});
		}

		return NextResponse.json(monthlyData);
	} catch (error) {
		console.error("[MONTHLY_EVOLUTION_ERROR]", error);
		return new NextResponse(
			JSON.stringify({ error: "Erro interno do servidor" }),
			{ status: 500 },
		);
	}
}
