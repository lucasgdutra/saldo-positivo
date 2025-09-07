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

		// Get month and year from query params, default to current month
		const searchParams = request.nextUrl.searchParams;
		const yearParam = searchParams.get("year");
		const monthParam = searchParams.get("month");

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
			_max: {
				amount: true,
			},
		});

		// Get previous month revenues for comparison
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

		const currentRevenues = currentMonthRevenues._sum.amount?.toNumber() || 0;
		const previousRevenues = previousMonthRevenues._sum.amount?.toNumber() || 0;
		const largestRevenue = currentMonthRevenues._max.amount?.toNumber() || 0;

		// Calculate percentage change
		const revenueChange =
			previousRevenues > 0
				? ((currentRevenues - previousRevenues) / previousRevenues) * 100
				: currentRevenues > 0
					? 100
					: 0;

		// Calculate average daily revenue for the selected month
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		const isCurrentMonth =
			currentYear === now.getFullYear() && currentMonth === now.getMonth();
		const currentDay = isCurrentMonth ? now.getDate() : daysInMonth;
		const avgDaily = currentDay > 0 ? currentRevenues / currentDay : 0;

		return NextResponse.json({
			currentMonth: {
				revenues: currentRevenues,
				revenueCount: currentMonthRevenues._count,
			},
			changes: {
				revenues: revenueChange,
			},
			avgDaily: avgDaily,
			largestRevenue: largestRevenue,
		});
	} catch (error) {
		console.error("[REVENUE_STATS_ERROR]", error);
		return new NextResponse(
			JSON.stringify({ error: "Erro interno do servidor" }),
			{ status: 500 },
		);
	}
}
