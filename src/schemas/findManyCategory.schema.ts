import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryScalarFieldEnumSchema } from "./enums/CategoryScalarFieldEnum.schema";
import { CategoryCountOutputTypeArgsObjectSchema } from "./objects/CategoryCountOutputTypeArgs.schema";
import { CategoryIncludeObjectSchema } from "./objects/CategoryInclude.schema";
import { CategoryOrderByWithRelationInputObjectSchema } from "./objects/CategoryOrderByWithRelationInput.schema";
import { CategoryWhereInputObjectSchema } from "./objects/CategoryWhereInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./objects/CategoryWhereUniqueInput.schema";
import { ExpenseArgsObjectSchema } from "./objects/ExpenseArgs.schema";
import { UserArgsObjectSchema } from "./objects/UserArgs.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CategoryFindManySelectSchema: z.ZodType<
	Prisma.CategorySelect,
	Prisma.CategorySelect
> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		userId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		user: z.boolean().optional(),
		expenses: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict();

export const CategoryFindManySelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		userId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		user: z.boolean().optional(),
		expenses: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict();

export const CategoryFindManySchema: z.ZodType<
	Prisma.CategoryFindManyArgs,
	Prisma.CategoryFindManyArgs
> = z
	.object({
		select: CategoryFindManySelectSchema.optional(),
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

export const CategoryFindManyZodSchema = z
	.object({
		select: CategoryFindManySelectSchema.optional(),
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
