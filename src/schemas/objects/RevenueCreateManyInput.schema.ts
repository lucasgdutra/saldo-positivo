import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string().optional(),
			amount: z.number(),
			description: z.string().nullish(),
			date: z.date(),
			createdAt: z.date().optional(),
			updatedAt: z.date().optional(),
			userId: z.string(),
		})
		.strict();
export const RevenueCreateManyInputObjectSchema: z.ZodType<Prisma.RevenueCreateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueCreateManyInput>;
export const RevenueCreateManyInputObjectZodSchema = makeSchema();
