import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { RevenueIncludeObjectSchema } from "./RevenueInclude.schema";
import { RevenueSelectObjectSchema } from "./RevenueSelect.schema";

export const RevenueArgsObjectSchema = z
	.object({
		select: z.lazy(() => RevenueSelectObjectSchema).optional(),
		include: z.lazy(() => RevenueIncludeObjectSchema).optional(),
	})
	.strict();
export const RevenueArgsObjectZodSchema = z
	.object({
		select: z.lazy(() => RevenueSelectObjectSchema).optional(),
		include: z.lazy(() => RevenueIncludeObjectSchema).optional(),
	})
	.strict();
