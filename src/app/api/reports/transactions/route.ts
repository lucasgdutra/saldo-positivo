import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return new NextResponse("Unauthorized", { status: 401 });
	}
	const userId = session.user.id;

	const { searchParams } = new URL(request.url);
	const categoryId = searchParams.get("categoryId");
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");

	if (!categoryId || !startDate || !endDate) {
		return new NextResponse("Missing parameters", { status: 400 });
	}

	try {
		const transactions = await db.expense.findMany({
			where: {
				userId,
				categoryId,
				date: {
					gte: new Date(startDate),
					lte: new Date(endDate),
				},
			},
			orderBy: {
				date: "desc",
			},
		});

		return NextResponse.json(transactions);
	} catch (error) {
		console.error("[TRANSACTIONS_REPORT]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
