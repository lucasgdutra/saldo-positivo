import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.literal(true).optional(),
			name: z.literal(true).optional(),
			color: z.literal(true).optional(),
			icon: z.literal(true).optional(),
			userId: z.literal(true).optional(),
			createdAt: z.literal(true).optional(),
			updatedAt: z.literal(true).optional(),
		})
		.strict();
export const CategoryMinAggregateInputObjectSchema: z.ZodType<Prisma.CategoryMinAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryMinAggregateInputType>;
export const CategoryMinAggregateInputObjectZodSchema = makeSchema();
