import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseIncludeObjectSchema } from "./ExpenseInclude.schema";
import { ExpenseSelectObjectSchema } from "./ExpenseSelect.schema";

export const ExpenseArgsObjectSchema = z
	.object({
		select: z.lazy(() => ExpenseSelectObjectSchema).optional(),
		include: z.lazy(() => ExpenseIncludeObjectSchema).optional(),
	})
	.strict();
export const ExpenseArgsObjectZodSchema = z
	.object({
		select: z.lazy(() => ExpenseSelectObjectSchema).optional(),
		include: z.lazy(() => ExpenseIncludeObjectSchema).optional(),
	})
	.strict();
