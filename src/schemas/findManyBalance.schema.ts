import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceScalarFieldEnumSchema } from "./enums/BalanceScalarFieldEnum.schema";
import { BalanceIncludeObjectSchema } from "./objects/BalanceInclude.schema";
import { BalanceOrderByWithRelationInputObjectSchema } from "./objects/BalanceOrderByWithRelationInput.schema";
import { BalanceWhereInputObjectSchema } from "./objects/BalanceWhereInput.schema";
import { BalanceWhereUniqueInputObjectSchema } from "./objects/BalanceWhereUniqueInput.schema";
import { UserArgsObjectSchema } from "./objects/UserArgs.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BalanceFindManySelectSchema: z.ZodType<
	Prisma.BalanceSelect,
	Prisma.BalanceSelect
> = z
	.object({
		id: z.boolean().optional(),
		totalAmount: z.boolean().optional(),
		totalRevenues: z.boolean().optional(),
		totalExpenses: z.boolean().optional(),
		referenceMonth: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
	})
	.strict();

export const BalanceFindManySelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		totalAmount: z.boolean().optional(),
		totalRevenues: z.boolean().optional(),
		totalExpenses: z.boolean().optional(),
		referenceMonth: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
	})
	.strict();

export const BalanceFindManySchema: z.ZodType<
	Prisma.BalanceFindManyArgs,
	Prisma.BalanceFindManyArgs
> = z
	.object({
		select: BalanceFindManySelectSchema.optional(),
		include: z.lazy(() => BalanceIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				BalanceOrderByWithRelationInputObjectSchema,
				BalanceOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: BalanceWhereInputObjectSchema.optional(),
		cursor: BalanceWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				BalanceScalarFieldEnumSchema,
				BalanceScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const BalanceFindManyZodSchema = z
	.object({
		select: BalanceFindManySelectSchema.optional(),
		include: z.lazy(() => BalanceIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				BalanceOrderByWithRelationInputObjectSchema,
				BalanceOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: BalanceWhereInputObjectSchema.optional(),
		cursor: BalanceWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				BalanceScalarFieldEnumSchema,
				BalanceScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();
