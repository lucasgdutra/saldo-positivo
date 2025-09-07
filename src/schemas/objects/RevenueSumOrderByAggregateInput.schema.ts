import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			amount: SortOrderSchema.optional(),
		})
		.strict();
export const RevenueSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RevenueSumOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueSumOrderByAggregateInput>;
export const RevenueSumOrderByAggregateInputObjectZodSchema = makeSchema();
