import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface PeriodData {
	period: string;
	total: number;
	categories: {
		categoryId: string;
		categoryName: string;
		amount: number;
	}[];
}

export async function GET(request: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return new NextResponse("Unauthorized", { status: 401 });
	}
	const userId = session.user.id;

	const { searchParams } = new URL(request.url);
	const granularity = searchParams.get("granularity") || "month";
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");

	if (!startDate || !endDate) {
		return new NextResponse("Missing parameters", { status: 400 });
	}

	const validGranularities = ["day", "week", "month", "quarter", "year"];
	if (!validGranularities.includes(granularity)) {
		return new NextResponse("Invalid granularity", { status: 400 });
	}

	try {
		const query = `
            SELECT
                DATE_TRUNC('${granularity}', e.date) as period,
                c.id as "categoryId",
                c.name as "categoryName",
                SUM(e.amount) as total
            FROM expenses e
            JOIN categories c ON e."categoryId" = c.id
            WHERE e."userId" = $1::uuid
            AND e.date >= $2::timestamp
            AND e.date <= $3::timestamp
            GROUP BY period, c.id, c.name
            ORDER BY period
        `;

		const expenses: any[] = await db.$queryRawUnsafe(
			query,
			userId,
			new Date(startDate),
			new Date(endDate),
		);

		const result = expenses.reduce((acc: PeriodData[], row) => {
			const periodString = new Date(row.period).toISOString();
			let periodData = acc.find((p) => p.period === periodString);

			if (!periodData) {
				periodData = {
					period: periodString,
					total: 0,
					categories: [],
				};
				acc.push(periodData);
			}

			periodData.total = Number(
				(periodData.total + Number(row.total)).toFixed(2),
			);
			periodData.categories.push({
				categoryId: row.categoryId,
				categoryName: row.categoryName,
				amount: Number(row.total),
			});

			return acc;
		}, []);

		return NextResponse.json(result);
	} catch (error) {
		console.error("[COMPARE_EXPENSES_REPORT]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
