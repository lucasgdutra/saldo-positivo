import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { RevenueIncludeObjectSchema } from "./RevenueInclude.schema";
import { RevenueSelectObjectSchema } from "./RevenueSelect.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			select: z.lazy(() => RevenueSelectObjectSchema).optional(),
			include: z.lazy(() => RevenueIncludeObjectSchema).optional(),
		})
		.strict();
export const RevenueArgsObjectSchema = makeSchema();
export const RevenueArgsObjectZodSchema = makeSchema();
