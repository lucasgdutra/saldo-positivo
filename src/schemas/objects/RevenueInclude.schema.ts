import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserArgsObjectSchema } from "./UserArgs.schema";

export const RevenueIncludeObjectSchema: z.ZodType<
	Prisma.RevenueInclude,
	Prisma.RevenueInclude
> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
	})
	.strict();
export const RevenueIncludeObjectZodSchema = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
	})
	.strict();
