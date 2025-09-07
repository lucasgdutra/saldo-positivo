import { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryScalarFieldEnumSchema } from "./enums/CategoryScalarFieldEnum.schema";
import { CategoryCountOutputTypeArgsObjectSchema } from "./objects/CategoryCountOutputTypeArgs.schema";
import { CategoryIncludeObjectSchema } from "./objects/CategoryInclude.schema";
import { CategoryOrderByWithRelationInputObjectSchema } from "./objects/CategoryOrderByWithRelationInput.schema";
import { CategoryWhereInputObjectSchema } from "./objects/CategoryWhereInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./objects/CategoryWhereUniqueInput.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CategoryFindFirstSelectSchema: z.ZodType<Prisma.CategorySelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		color: z.boolean().optional(),
		icon: z.boolean().optional(),
		userId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		user: z.boolean().optional(),
		expenses: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.CategorySelect>;

export const CategoryFindFirstSelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		color: z.boolean().optional(),
		icon: z.boolean().optional(),
		userId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		user: z.boolean().optional(),
		expenses: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict();

export const CategoryFindFirstSchema: z.ZodType<Prisma.CategoryFindFirstArgs> =
	z
		.object({
			select: CategoryFindFirstSelectSchema.optional(),
			include: z.lazy(() => CategoryIncludeObjectSchema.optional()),
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
			distinct: z
				.union([
					CategoryScalarFieldEnumSchema,
					CategoryScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.CategoryFindFirstArgs>;

export const CategoryFindFirstZodSchema = z
	.object({
		select: CategoryFindFirstSelectSchema.optional(),
		include: z.lazy(() => CategoryIncludeObjectSchema.optional()),
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
		distinct: z
			.union([
				CategoryScalarFieldEnumSchema,
				CategoryScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();
