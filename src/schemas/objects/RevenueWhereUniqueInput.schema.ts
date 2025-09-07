import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const RevenueWhereUniqueInputObjectSchema: z.ZodType<
	Prisma.RevenueWhereUniqueInput,
	Prisma.RevenueWhereUniqueInput
> = z
	.object({
		id: z.string(),
	})
	.strict();
export const RevenueWhereUniqueInputObjectZodSchema = z
	.object({
		id: z.string(),
	})
	.strict();
