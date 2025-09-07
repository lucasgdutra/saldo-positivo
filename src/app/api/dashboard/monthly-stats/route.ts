import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
				status: 401,
			});
		}

		const now = new Date();
		const currentYear = now.getFullYear();
		const currentMonth = now.getMonth();

		// Current month start and end
		const currentMonthStart = new Date(currentYear, currentMonth, 1);
		const currentMonthEnd = new Date(
			currentYear,
			currentMonth + 1,
			0,
			23,
			59,
			59,
		);

		// Previous month start and end for comparison
		const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
		const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
		const previousMonthStart = new Date(previousYear, previousMonth, 1);
		const previousMonthEnd = new Date(
			previousYear,
			previousMonth + 1,
			0,
			23,
			59,
			59,
		);

		// Get current month expenses
		const currentMonthExpenses = await db.expense.aggregate({
			where: {
				userId: session.user.id,
				date: {
					gte: currentMonthStart,
					lte: currentMonthEnd,
				},
			},
			_sum: {
				amount: true,
			},
			_count: true,
		});

		// Get current month revenues
		const currentMonthRevenues = await db.revenue.aggregate({
			where: {
				userId: session.user.id,
				date: {
					gte: currentMonthStart,
					lte: currentMonthEnd,
				},
			},
			_sum: {
				amount: true,
			},
			_count: true,
		});

		// Get previous month expenses
		const previousMonthExpenses = await db.expense.aggregate({
			where: {
				userId: session.user.id,
				date: {
					gte: previousMonthStart,
					lte: previousMonthEnd,
				},
			},
			_sum: {
				amount: true,
			},
		});

		// Get previous month revenues
		const previousMonthRevenues = await db.revenue.aggregate({
			where: {
				userId: session.user.id,
				date: {
					gte: previousMonthStart,
					lte: previousMonthEnd,
				},
			},
			_sum: {
				amount: true,
			},
		});

		const currentExpenses = currentMonthExpenses._sum.amount?.toNumber() || 0;
		const currentRevenues = currentMonthRevenues._sum.amount?.toNumber() || 0;
		const previousExpenses = previousMonthExpenses._sum.amount?.toNumber() || 0;
		const previousRevenues = previousMonthRevenues._sum.amount?.toNumber() || 0;

		// Calculate percentage changes
		const expenseChange =
			previousExpenses > 0
				? ((currentExpenses - previousExpenses) / previousExpenses) * 100
				: currentExpenses > 0
					? 100
					: 0;

		const revenueChange =
			previousRevenues > 0
				? ((currentRevenues - previousRevenues) / previousRevenues) * 100
				: currentRevenues > 0
					? 100
					: 0;

		const balance = currentRevenues - currentExpenses;
		const previousBalance = previousRevenues - previousExpenses;
		const balanceChange =
			previousBalance !== 0
				? ((balance - previousBalance) / Math.abs(previousBalance)) * 100
				: balance > 0
					? 100
					: balance < 0
						? -100
						: 0;

		return NextResponse.json({
			currentMonth: {
				expenses: currentExpenses,
				revenues: currentRevenues,
				balance: balance,
				expenseCount: currentMonthExpenses._count,
				revenueCount: currentMonthRevenues._count,
			},
			changes: {
				expenses: expenseChange,
				revenues: revenueChange,
				balance: balanceChange,
			},
		});
	} catch (error) {
		console.error("[MONTHLY_STATS_ERROR]", error);
		return new NextResponse(
			JSON.stringify({ error: "Erro interno do servidor" }),
			{ status: 500 },
		);
	}
}
