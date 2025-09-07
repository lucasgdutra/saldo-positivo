import { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseScalarFieldEnumSchema } from "./enums/ExpenseScalarFieldEnum.schema";
import { ExpenseIncludeObjectSchema } from "./objects/ExpenseInclude.schema";
import { ExpenseOrderByWithRelationInputObjectSchema } from "./objects/ExpenseOrderByWithRelationInput.schema";
import { ExpenseWhereInputObjectSchema } from "./objects/ExpenseWhereInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./objects/ExpenseWhereUniqueInput.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExpenseFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ExpenseSelect> =
	z
		.object({
			id: z.boolean().optional(),
			amount: z.boolean().optional(),
			description: z.boolean().optional(),
			date: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			updatedAt: z.boolean().optional(),
			userId: z.boolean().optional(),
			categoryId: z.boolean().optional(),
			user: z.boolean().optional(),
			category: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.ExpenseSelect>;

export const ExpenseFindFirstOrThrowSelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		amount: z.boolean().optional(),
		description: z.boolean().optional(),
		date: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		userId: z.boolean().optional(),
		categoryId: z.boolean().optional(),
		user: z.boolean().optional(),
		category: z.boolean().optional(),
	})
	.strict();

export const ExpenseFindFirstOrThrowSchema: z.ZodType<Prisma.ExpenseFindFirstOrThrowArgs> =
	z
		.object({
			select: ExpenseFindFirstOrThrowSelectSchema.optional(),
			include: z.lazy(() => ExpenseIncludeObjectSchema.optional()),
			orderBy: z
				.union([
					ExpenseOrderByWithRelationInputObjectSchema,
					ExpenseOrderByWithRelationInputObjectSchema.array(),
				])
				.optional(),
			where: ExpenseWhereInputObjectSchema.optional(),
			cursor: ExpenseWhereUniqueInputObjectSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ExpenseScalarFieldEnumSchema,
					ExpenseScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.ExpenseFindFirstOrThrowArgs>;

export const ExpenseFindFirstOrThrowZodSchema = z
	.object({
		select: ExpenseFindFirstOrThrowSelectSchema.optional(),
		include: z.lazy(() => ExpenseIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				ExpenseOrderByWithRelationInputObjectSchema,
				ExpenseOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: ExpenseWhereInputObjectSchema.optional(),
		cursor: ExpenseWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				ExpenseScalarFieldEnumSchema,
				ExpenseScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();
