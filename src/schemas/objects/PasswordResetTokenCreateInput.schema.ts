import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateNestedOneWithoutPasswordResetTokensInputObjectSchema } from "./UserCreateNestedOneWithoutPasswordResetTokensInput.schema";

export const PasswordResetTokenCreateInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenCreateInput,
	Prisma.PasswordResetTokenCreateInput
> = z
	.object({
		id: z.string().optional(),
		token: z.string(),
		expiresAt: z.date(),
		used: z.boolean().optional(),
		createdAt: z.date().optional(),
		user: z.lazy(
			() => UserCreateNestedOneWithoutPasswordResetTokensInputObjectSchema,
		),
	})
	.strict();
export const PasswordResetTokenCreateInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		token: z.string(),
		expiresAt: z.date(),
		used: z.boolean().optional(),
		createdAt: z.date().optional(),
		user: z.lazy(
			() => UserCreateNestedOneWithoutPasswordResetTokensInputObjectSchema,
		),
	})
	.strict();
