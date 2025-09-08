import {
	endOfDay,
	endOfMonth,
	endOfQuarter,
	endOfWeek,
	endOfYear,
	parse,
	startOfDay,
	startOfMonth,
	startOfQuarter,
	startOfWeek,
	startOfYear,
} from "date-fns";

export function getPeriodDates(
	period: string,
	granularity: string,
): { startDate: Date; endDate: Date } {
	let startDate: Date;
	let endDate: Date;

	switch (granularity) {
		case "year":
			const year = parseInt(period, 10);
			startDate = startOfYear(new Date(year, 0, 1));
			endDate = endOfYear(new Date(year, 0, 1));
			break;
		case "quarter":
			const [qYear, quarter] = period.split("-Q");
			const qDate = new Date(
				parseInt(qYear, 10),
				(parseInt(quarter, 10) - 1) * 3,
				1,
			);
			startDate = startOfQuarter(qDate);
			endDate = endOfQuarter(qDate);
			break;
		case "month":
			const [mYear, month] = period.split("-");
			const mDate = new Date(parseInt(mYear, 10), parseInt(month, 10) - 1, 1);
			startDate = startOfMonth(mDate);
			endDate = endOfMonth(mDate);
			break;
		case "week":
			const [wYear, week] = period.split("-W");
			startDate = parse(period, "yyyy-WW", new Date());
			endDate = endOfWeek(startDate);
			break;
		case "day":
			startDate = startOfDay(parse(period, "yyyy-MM-dd", new Date()));
			endDate = endOfDay(startDate);
			break;
		default:
			throw new Error(`Invalid granularity: ${granularity}`);
	}

	return { startDate, endDate };
}
