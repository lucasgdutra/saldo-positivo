import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseIncludeObjectSchema } from "./ExpenseInclude.schema";
import { ExpenseSelectObjectSchema } from "./ExpenseSelect.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			select: z.lazy(() => ExpenseSelectObjectSchema).optional(),
			include: z.lazy(() => ExpenseIncludeObjectSchema).optional(),
		})
		.strict();
export const ExpenseArgsObjectSchema = makeSchema();
export const ExpenseArgsObjectZodSchema = makeSchema();
