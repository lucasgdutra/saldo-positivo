import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseScalarWhereInputObjectSchema } from "./ExpenseScalarWhereInput.schema";
import { ExpenseUncheckedUpdateManyWithoutCategoryInputObjectSchema } from "./ExpenseUncheckedUpdateManyWithoutCategoryInput.schema";
import { ExpenseUpdateManyMutationInputObjectSchema } from "./ExpenseUpdateManyMutationInput.schema";

export const ExpenseUpdateManyWithWhereWithoutCategoryInputObjectSchema: z.ZodType<
	Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput,
	Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput
> = z
	.object({
		where: z.lazy(() => ExpenseScalarWhereInputObjectSchema),
		data: z.union([
			z.lazy(() => ExpenseUpdateManyMutationInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryInputObjectSchema),
		]),
	})
	.strict();
export const ExpenseUpdateManyWithWhereWithoutCategoryInputObjectZodSchema = z
	.object({
		where: z.lazy(() => ExpenseScalarWhereInputObjectSchema),
		data: z.union([
			z.lazy(() => ExpenseUpdateManyMutationInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryInputObjectSchema),
		]),
	})
	.strict();
