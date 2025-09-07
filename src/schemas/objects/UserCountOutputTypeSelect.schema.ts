import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const UserCountOutputTypeSelectObjectSchema: z.ZodType<
	Prisma.UserCountOutputTypeSelect,
	Prisma.UserCountOutputTypeSelect
> = z
	.object({
		categories: z.boolean().optional(),
		expenses: z.boolean().optional(),
		revenues: z.boolean().optional(),
		passwordResetTokens: z.boolean().optional(),
	})
	.strict();
export const UserCountOutputTypeSelectObjectZodSchema = z
	.object({
		categories: z.boolean().optional(),
		expenses: z.boolean().optional(),
		revenues: z.boolean().optional(),
		passwordResetTokens: z.boolean().optional(),
	})
	.strict();
