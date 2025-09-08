import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return new NextResponse("Unauthorized", { status: 401 });
	}
	const userId = session.user.id;

	try {
		const result = await db.expense.aggregate({
			_min: {
				date: true,
			},
			_max: {
				date: true,
			},
			where: {
				userId,
			},
		});

		return NextResponse.json({
			minDate: result._min.date,
			maxDate: result._max.date,
		});
	} catch (error) {
		console.error("[EXPENSES_PERIOD_RANGE]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
