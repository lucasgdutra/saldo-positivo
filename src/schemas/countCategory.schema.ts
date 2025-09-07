import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCountAggregateInputObjectSchema } from "./objects/CategoryCountAggregateInput.schema";
import { CategoryOrderByWithRelationInputObjectSchema } from "./objects/CategoryOrderByWithRelationInput.schema";
import { CategoryWhereInputObjectSchema } from "./objects/CategoryWhereInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./objects/CategoryWhereUniqueInput.schema";

export const CategoryCountSchema: z.ZodType<
	Prisma.CategoryCountArgs,
	Prisma.CategoryCountArgs
> = z
	.object({
		orderBy: z
			.union([
				CategoryOrderByWithRelationInputObjectSchema,
				CategoryOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: CategoryWhereInputObjectSchema.optional(),
		cursor: CategoryWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		select: z
			.union([z.literal(true), CategoryCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict();

export const CategoryCountZodSchema = z
	.object({
		orderBy: z
			.union([
				CategoryOrderByWithRelationInputObjectSchema,
				CategoryOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: CategoryWhereInputObjectSchema.optional(),
		cursor: CategoryWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		select: z
			.union([z.literal(true), CategoryCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict();
