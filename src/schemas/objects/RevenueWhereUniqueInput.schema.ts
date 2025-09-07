import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string(),
		})
		.strict();
export const RevenueWhereUniqueInputObjectSchema: z.ZodType<Prisma.RevenueWhereUniqueInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueWhereUniqueInput>;
export const RevenueWhereUniqueInputObjectZodSchema = makeSchema();
