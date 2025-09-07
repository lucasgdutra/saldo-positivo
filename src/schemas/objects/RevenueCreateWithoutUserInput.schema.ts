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
		})
		.strict();
export const RevenueCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueCreateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueCreateWithoutUserInput>;
export const RevenueCreateWithoutUserInputObjectZodSchema = makeSchema();
