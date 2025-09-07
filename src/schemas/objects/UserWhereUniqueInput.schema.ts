import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const UserWhereUniqueInputObjectSchema: z.ZodType<
	Prisma.UserWhereUniqueInput,
	Prisma.UserWhereUniqueInput
> = z
	.object({
		id: z.string(),
		email: z.string(),
	})
	.strict();
export const UserWhereUniqueInputObjectZodSchema = z
	.object({
		id: z.string(),
		email: z.string(),
	})
	.strict();
