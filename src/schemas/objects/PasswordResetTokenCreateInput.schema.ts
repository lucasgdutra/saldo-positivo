import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateNestedOneWithoutPasswordResetTokensInputObjectSchema } from "./UserCreateNestedOneWithoutPasswordResetTokensInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
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
export const PasswordResetTokenCreateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenCreateInput>;
export const PasswordResetTokenCreateInputObjectZodSchema = makeSchema();
