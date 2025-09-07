import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenScalarFieldEnumSchema } from "./enums/PasswordResetTokenScalarFieldEnum.schema";
import { PasswordResetTokenIncludeObjectSchema } from "./objects/PasswordResetTokenInclude.schema";
import { PasswordResetTokenOrderByWithRelationInputObjectSchema } from "./objects/PasswordResetTokenOrderByWithRelationInput.schema";
import { PasswordResetTokenWhereInputObjectSchema } from "./objects/PasswordResetTokenWhereInput.schema";
import { PasswordResetTokenWhereUniqueInputObjectSchema } from "./objects/PasswordResetTokenWhereUniqueInput.schema";
import { UserArgsObjectSchema } from "./objects/UserArgs.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PasswordResetTokenFindManySelectSchema: z.ZodType<
	Prisma.PasswordResetTokenSelect,
	Prisma.PasswordResetTokenSelect
> = z
	.object({
		id: z.boolean().optional(),
		token: z.boolean().optional(),
		userId: z.boolean().optional(),
		expiresAt: z.boolean().optional(),
		used: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		user: z.boolean().optional(),
	})
	.strict();

export const PasswordResetTokenFindManySelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		token: z.boolean().optional(),
		userId: z.boolean().optional(),
		expiresAt: z.boolean().optional(),
		used: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		user: z.boolean().optional(),
	})
	.strict();

export const PasswordResetTokenFindManySchema: z.ZodType<
	Prisma.PasswordResetTokenFindManyArgs,
	Prisma.PasswordResetTokenFindManyArgs
> = z
	.object({
		select: PasswordResetTokenFindManySelectSchema.optional(),
		include: z.lazy(() => PasswordResetTokenIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				PasswordResetTokenOrderByWithRelationInputObjectSchema,
				PasswordResetTokenOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: PasswordResetTokenWhereInputObjectSchema.optional(),
		cursor: PasswordResetTokenWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				PasswordResetTokenScalarFieldEnumSchema,
				PasswordResetTokenScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const PasswordResetTokenFindManyZodSchema = z
	.object({
		select: PasswordResetTokenFindManySelectSchema.optional(),
		include: z.lazy(() => PasswordResetTokenIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				PasswordResetTokenOrderByWithRelationInputObjectSchema,
				PasswordResetTokenOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: PasswordResetTokenWhereInputObjectSchema.optional(),
		cursor: PasswordResetTokenWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				PasswordResetTokenScalarFieldEnumSchema,
				PasswordResetTokenScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();
