import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
				status: 401,
			});
		}

		// Get month, year, and category from query params, default to current month
		const searchParams = request.nextUrl.searchParams;
		const yearParam = searchParams.get("year");
		const monthParam = searchParams.get("month");
		const categoryId = searchParams.get("categoryId");

		const now = new Date();
		const currentYear = yearParam ? parseInt(yearParam) : now.getFullYear();
		const currentMonth = monthParam ? parseInt(monthParam) : now.getMonth();

		// Selected month start and end
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

		// Build where clause for current month
		const currentMonthWhere: any = {
			userId: session.user.id,
			date: {
				gte: currentMonthStart,
				lte: currentMonthEnd,
			},
		};

		if (categoryId) {
			currentMonthWhere.categoryId = categoryId;
		}

		// Get current month expenses
		const currentMonthExpenses = await db.expense.aggregate({
			where: currentMonthWhere,
			_sum: {
				amount: true,
			},
			_count: true,
			_max: {
				amount: true,
			},
		});

		// Build where clause for previous month
		const previousMonthWhere: any = {
			userId: session.user.id,
			date: {
				gte: previousMonthStart,
				lte: previousMonthEnd,
			},
		};

		if (categoryId) {
			previousMonthWhere.categoryId = categoryId;
		}

		// Get previous month expenses for comparison
		const previousMonthExpenses = await db.expense.aggregate({
			where: previousMonthWhere,
			_sum: {
				amount: true,
			},
		});

		const currentExpenses = currentMonthExpenses._sum.amount?.toNumber() || 0;
		const previousExpenses = previousMonthExpenses._sum.amount?.toNumber() || 0;
		const largestExpense = currentMonthExpenses._max.amount?.toNumber() || 0;

		// Calculate percentage change
		const expenseChange =
			previousExpenses > 0
				? ((currentExpenses - previousExpenses) / previousExpenses) * 100
				: currentExpenses > 0
					? 100
					: 0;

		// Calculate average daily expense for the selected month
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		const isCurrentMonth =
			currentYear === now.getFullYear() && currentMonth === now.getMonth();
		const currentDay = isCurrentMonth ? now.getDate() : daysInMonth;
		const avgDaily = currentDay > 0 ? currentExpenses / currentDay : 0;

		return NextResponse.json({
			currentMonth: {
				expenses: currentExpenses,
				expenseCount: currentMonthExpenses._count,
			},
			changes: {
				expenses: expenseChange,
			},
			avgDaily: avgDaily,
			largestExpense: largestExpense,
		});
	} catch (error) {
		console.error("[EXPENSE_STATS_ERROR]", error);
		return new NextResponse(
			JSON.stringify({ error: "Erro interno do servidor" }),
			{ status: 500 },
		);
	}
}
