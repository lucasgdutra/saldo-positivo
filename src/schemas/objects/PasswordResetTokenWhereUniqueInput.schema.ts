import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const PasswordResetTokenWhereUniqueInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenWhereUniqueInput,
	Prisma.PasswordResetTokenWhereUniqueInput
> = z
	.object({
		id: z.string(),
		token: z.string(),
	})
	.strict();
export const PasswordResetTokenWhereUniqueInputObjectZodSchema = z
	.object({
		id: z.string(),
		token: z.string(),
	})
	.strict();
