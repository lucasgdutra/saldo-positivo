import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { RevenueScalarFieldEnumSchema } from "./enums/RevenueScalarFieldEnum.schema";
import { RevenueIncludeObjectSchema } from "./objects/RevenueInclude.schema";
import { RevenueOrderByWithRelationInputObjectSchema } from "./objects/RevenueOrderByWithRelationInput.schema";
import { RevenueWhereInputObjectSchema } from "./objects/RevenueWhereInput.schema";
import { RevenueWhereUniqueInputObjectSchema } from "./objects/RevenueWhereUniqueInput.schema";
import { UserArgsObjectSchema } from "./objects/UserArgs.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RevenueFindManySelectSchema: z.ZodType<
	Prisma.RevenueSelect,
	Prisma.RevenueSelect
> = z
	.object({
		id: z.boolean().optional(),
		amount: z.boolean().optional(),
		description: z.boolean().optional(),
		date: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
	})
	.strict();

export const RevenueFindManySelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		amount: z.boolean().optional(),
		description: z.boolean().optional(),
		date: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
	})
	.strict();

export const RevenueFindManySchema: z.ZodType<
	Prisma.RevenueFindManyArgs,
	Prisma.RevenueFindManyArgs
> = z
	.object({
		select: RevenueFindManySelectSchema.optional(),
		include: z.lazy(() => RevenueIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				RevenueOrderByWithRelationInputObjectSchema,
				RevenueOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: RevenueWhereInputObjectSchema.optional(),
		cursor: RevenueWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				RevenueScalarFieldEnumSchema,
				RevenueScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const RevenueFindManyZodSchema = z
	.object({
		select: RevenueFindManySelectSchema.optional(),
		include: z.lazy(() => RevenueIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				RevenueOrderByWithRelationInputObjectSchema,
				RevenueOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: RevenueWhereInputObjectSchema.optional(),
		cursor: RevenueWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				RevenueScalarFieldEnumSchema,
				RevenueScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();
