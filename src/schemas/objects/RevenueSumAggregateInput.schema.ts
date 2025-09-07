import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			amount: z.literal(true).optional(),
		})
		.strict();
export const RevenueSumAggregateInputObjectSchema: z.ZodType<Prisma.RevenueSumAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueSumAggregateInputType>;
export const RevenueSumAggregateInputObjectZodSchema = makeSchema();
