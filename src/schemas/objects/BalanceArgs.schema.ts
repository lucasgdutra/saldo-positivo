import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceIncludeObjectSchema } from "./BalanceInclude.schema";
import { BalanceSelectObjectSchema } from "./BalanceSelect.schema";

export const BalanceArgsObjectSchema = z
	.object({
		select: z.lazy(() => BalanceSelectObjectSchema).optional(),
		include: z.lazy(() => BalanceIncludeObjectSchema).optional(),
	})
	.strict();
export const BalanceArgsObjectZodSchema = z
	.object({
		select: z.lazy(() => BalanceSelectObjectSchema).optional(),
		include: z.lazy(() => BalanceIncludeObjectSchema).optional(),
	})
	.strict();
